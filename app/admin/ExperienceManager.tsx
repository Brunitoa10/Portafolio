"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./admin.module.css";

export type TimelineRow = {
  id: number;
  period: string;
  role: string;
  company: string;
  items: string[];
  sort_order: number;
};

type FormState = {
  role: string;
  company: string;
  period: string;
  items: string;
  sort_order: string;
};

const emptyForm = (order: number): FormState => ({
  role: "",
  company: "",
  period: "",
  items: "",
  sort_order: String(order),
});

// Una tarea por línea
const parseItems = (value: string): string[] =>
  value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function ExperienceManager({
  entries,
}: {
  entries: TimelineRow[];
}) {
  const router = useRouter();
  const supabase = createClient();

  // Mayor número = más reciente = aparece primero en el sitio
  const nextOrder = entries.length
    ? Math.max(...entries.map((e) => e.sort_order)) + 1
    : 1;

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm(nextOrder));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startNew() {
    setEditingId(null);
    setForm(emptyForm(nextOrder));
    setMsg(null);
    setOpen(true);
  }

  function startEdit(e: TimelineRow) {
    setEditingId(e.id);
    setForm({
      role: e.role,
      company: e.company,
      period: e.period,
      items: e.items.join("\n"),
      sort_order: String(e.sort_order),
    });
    setMsg(null);
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.role.trim() || !form.company.trim() || !form.period.trim()) {
      setMsg({ type: "error", text: "Puesto, empresa y período son obligatorios." });
      return;
    }

    setSaving(true);
    setMsg(null);

    const payload = {
      role: form.role.trim(),
      company: form.company.trim(),
      period: form.period.trim(),
      items: parseItems(form.items),
      sort_order: Number(form.sort_order) || 0,
    };

    let errorText: string | null = null;

    if (editingId === null) {
      const { error } = await supabase.from("timeline").insert(payload);
      if (error) errorText = error.message;
    } else {
      const { data, error } = await supabase
        .from("timeline")
        .update(payload)
        .eq("id", editingId)
        .select();
      if (error) errorText = error.message;
      else if (!data?.length) errorText = "Sin permisos para modificar este registro.";
    }

    setSaving(false);

    if (errorText) {
      setMsg({ type: "error", text: errorText });
      return;
    }

    setMsg({
      type: "ok",
      text: editingId === null ? "Experiencia agregada." : "Experiencia actualizada.",
    });
    closeForm();
    router.refresh();
  }

  async function handleDelete(entry: TimelineRow) {
    if (!confirm(`¿Eliminar "${entry.role}"? Esta acción no se puede deshacer.`))
      return;

    const { data, error } = await supabase
      .from("timeline")
      .delete()
      .eq("id", entry.id)
      .select();

    if (error || !data?.length) {
      setMsg({
        type: "error",
        text: error?.message ?? "Sin permisos para eliminar este registro.",
      });
      return;
    }

    setMsg({ type: "ok", text: "Registro eliminado." });
    router.refresh();
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>Puestos y formación</h2>
          <p className={styles.cardHint}>
            {entries.length} {entries.length === 1 ? "registro" : "registros"} ·
            se muestran del más reciente al más antiguo
          </p>
        </div>
        {!open && (
          <button className={styles.primaryBtn} onClick={startNew}>
            + Nuevo puesto
          </button>
        )}
      </div>

      {msg && (
        <p
          role={msg.type === "error" ? "alert" : "status"}
          className={msg.type === "error" ? styles.error : styles.success}
        >
          {msg.text}
        </p>
      )}

      {open && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h3 className={styles.formTitle}>
            {editingId === null ? "Nuevo puesto" : "Editar puesto"}
          </h3>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="e-role">Puesto o título *</label>
              <input
                id="e-role"
                placeholder="Field Service Jr"
                value={form.role}
                onChange={(e) => setField("role", e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="e-company">Empresa o institución *</label>
              <input
                id="e-company"
                placeholder="TIVIT · Planta Bunge, Bahía Blanca"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="e-period">Período *</label>
              <input
                id="e-period"
                placeholder="2025 octubre — actualidad"
                value={form.period}
                onChange={(e) => setField("period", e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="e-order">Orden (mayor = aparece primero)</label>
              <input
                id="e-order"
                type="number"
                value={form.sort_order}
                onChange={(e) => setField("sort_order", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="e-items">Tareas y logros (una por línea)</label>
            <textarea
              id="e-items"
              rows={6}
              placeholder={"Soporte L1/L2/L3 en entorno industrial crítico\nAdministración de Active Directory"}
              value={form.items}
              onChange={(e) => setField("items", e.target.value)}
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryBtn} disabled={saving}>
              {saving ? "Guardando…" : "Guardar"}
            </button>
            <button type="button" className={styles.ghostBtn} onClick={closeForm}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {entries.length === 0 ? (
        <p className={styles.empty}>Todavía no hay registros cargados.</p>
      ) : (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <li key={entry.id} className={styles.row}>
              <div className={styles.rowBody}>
                <strong>{entry.role}</strong>
                <span className={styles.rowMeta}>
                  {entry.company} · {entry.period} · {entry.items.length}{" "}
                  {entry.items.length === 1 ? "ítem" : "ítems"}
                </span>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.ghostBtn} onClick={() => startEdit(entry)}>
                  Editar
                </button>
                <button className={styles.dangerBtn} onClick={() => handleDelete(entry)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}