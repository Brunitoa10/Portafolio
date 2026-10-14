"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FieldControl } from "./FieldControl";
import {
  clampPosition,
  defaultPosition,
  isVisible,
  placeAt,
  swapWithNeighbour,
  toFormValues,
  toPayload,
  validate,
  type FieldValue,
  type FormValues,
  type ResourceDef,
  type Row,
} from "./resources";
import { createResourceGateway } from "./resourceGateway";
import { ConfirmDialog, Drawer, useToast } from "./ui";
import { usePublish } from "./usePublish";
import styles from "./admin.module.css";

interface ResourceManagerProps {
  def: ResourceDef;
  /** Filas ya ordenadas como se muestran en el sitio. */
  rows: Row[];
}

type DrawerState = { mode: "create" } | { mode: "edit"; row: Row } | null;

const SEARCH_THRESHOLD = 6;

export default function ResourceManager({ def, rows }: ResourceManagerProps) {
  const gateway = useMemo(() => createResourceGateway(createClient(), def), [def]);
  const { notify } = useToast();
  const publish = usePublish();

  const [drawer, setDrawer] = useState<DrawerState>(null);
  const [values, setValues] = useState<FormValues>({});
  const [position, setPosition] = useState("1");
  const [pendingDelete, setPendingDelete] = useState<Row | null>(null);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);

  const editing = drawer?.mode === "edit" ? drawer.row : null;
  const totalAfterSave = editing ? rows.length : rows.length + 1;

  const summaries = rows.map((row, index) => ({ row, index, ...def.summarize(row, index) }));
  const needle = query.trim().toLowerCase();
  const visibleRows = needle
    ? summaries.filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(needle))
    : summaries;
  const canReorder = !needle && !busy;

  /** Ejecuta una acción, publica el sitio y avisa el resultado. */
  async function run(action: () => Promise<void>, successText: string): Promise<boolean> {
    setBusy(true);
    try {
      await action();
      await publish();
      notify("ok", successText);
      return true;
    } catch (error) {
      notify("error", error instanceof Error ? error.message : "No se pudo completar la acción.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  /* ───────── panel lateral ───────── */

  function openCreate() {
    setValues(toFormValues(def.fields, null));
    setPosition(String(defaultPosition(def, rows.length, null)));
    setDrawer({ mode: "create" });
  }

  function openEdit(row: Row) {
    setValues(toFormValues(def.fields, row));
    setPosition(String(defaultPosition(def, rows.length, rows.findIndex((r) => r.id === row.id))));
    setDrawer({ mode: "edit", row });
  }

  const closeDrawer = () => setDrawer(null);

  function setValue(key: string, value: FieldValue) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const problem = validate(def.fields, values);
    if (problem) {
      notify("error", problem);
      return;
    }

    const payload = toPayload(def.fields, values);
    const target = clampPosition(position, totalAfterSave);

    const saved = await run(async () => {
      let id: number;
      if (editing) {
        await gateway.update(editing.id, payload);
        id = editing.id;
      } else {
        id = await gateway.create(payload, rows);
      }

      const ids = placeAt(rows.map((row) => row.id), id, target);
      await gateway.reorder(ids, rows);
    }, editing ? "Cambios guardados y publicados." : `Se agregó el ${def.noun} y ya está publicado.`);

    if (saved) closeDrawer();
  }

  async function move(row: Row, delta: -1 | 1) {
    const ids = swapWithNeighbour(rows.map((r) => r.id), row.id, delta);
    if (!ids) return;
    await run(() => gateway.reorder(ids, rows), "Orden actualizado.");
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    const row = pendingDelete;

    const deleted = await run(() => gateway.remove(row.id), `Se eliminó el ${def.noun}.`);

    if (deleted) setPendingDelete(null);
  }

  /* ───────── render ───────── */

  const deleteTitle = pendingDelete ? def.summarize(pendingDelete, 0).title : "";

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarInfo}>
          <span className={styles.count}>
            {rows.length} {rows.length === 1 ? def.noun : `${def.noun}s`}
          </span>
          {rows.length > SEARCH_THRESHOLD && (
            <input
              type="search"
              className={styles.search}
              placeholder={`Buscar en ${def.title.toLowerCase()}`}
              aria-label={`Buscar en ${def.title}`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          )}
        </div>
        <button type="button" className={styles.primaryBtn} onClick={openCreate}>
          {def.newLabel}
        </button>
      </div>

      {rows.length === 0 ? (
        <div className={styles.empty}>
          <p>{def.emptyText}</p>
          <button type="button" className={styles.ghostBtn} onClick={openCreate}>
            Agregar el primero
          </button>
        </div>
      ) : visibleRows.length === 0 ? (
        <div className={styles.empty}>
          <p>Ningún resultado para «{query}».</p>
        </div>
      ) : (
        <ul className={styles.ledger}>
          {visibleRows.map(({ row, index, leading, title, meta }) => (
            <li key={row.id} className={styles.ledgerRow}>
              <span className={styles.ledgerIndex}>{String(index + 1).padStart(2, "0")}</span>
              {leading !== undefined && <span className={styles.ledgerLeading}>{leading}</span>}
              <div className={styles.ledgerBody}>
                <span className={styles.ledgerTitle}>{title}</span>
                {meta && <span className={styles.ledgerMeta}>{meta}</span>}
              </div>
              <div className={styles.ledgerActions}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label={`Subir ${title}`}
                  disabled={!canReorder || index === 0}
                  onClick={() => move(row, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  aria-label={`Bajar ${title}`}
                  disabled={!canReorder || index === rows.length - 1}
                  onClick={() => move(row, 1)}
                >
                  ↓
                </button>
                <button type="button" className={styles.textBtn} onClick={() => openEdit(row)}>
                  Editar
                </button>
                <button
                  type="button"
                  className={`${styles.textBtn} ${styles.textBtnDanger}`}
                  onClick={() => setPendingDelete(row)}
                  disabled={busy}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Drawer
        open={drawer !== null}
        title={editing ? `Editar ${def.noun}` : def.newLabel}
        description={editing ? undefined : "Al guardar, el cambio se publica en el sitio."}
        onClose={closeDrawer}
      >
        <form className={styles.drawerForm} onSubmit={handleSubmit}>
          <div className={styles.drawerBody}>
            <div className={styles.formGrid}>
              {def.fields
                .filter((field) => isVisible(field, values))
                .map((field) => (
                  <FieldControl
                    key={field.key}
                    field={field}
                    value={values[field.key]}
                    onChange={(value) => setValue(field.key, value)}
                  />
                ))}

              <div className={`${styles.field} ${styles.fieldHalf}`}>
                <label className={styles.label} htmlFor="position-input">Posición en el sitio</label>
                <input
                  id="position-input"
                  className={styles.control}
                  type="number"
                  min={1}
                  max={totalAfterSave}
                  value={position}
                  onChange={(event) => setPosition(event.target.value)}
                />
                <p className={styles.hint}>
                  1 aparece primero. Hay {totalAfterSave}{" "}
                  {totalAfterSave === 1 ? "lugar" : "lugares"}.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.drawerFooter}>
            <button type="button" className={styles.ghostBtn} onClick={closeDrawer}>
              Cancelar
            </button>
            <button type="submit" className={styles.primaryBtn} disabled={busy}>
              {busy ? "Guardando…" : "Guardar y publicar"}
            </button>
          </div>
        </form>
      </Drawer>

      <ConfirmDialog
        open={pendingDelete !== null}
        title={`Eliminar ${def.noun}`}
        message={`Se va a eliminar «${deleteTitle}» del sitio. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
