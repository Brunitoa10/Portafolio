"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./admin.module.css";

export type SkillRow = {
  id: number;
  label: string;
  accent: "green" | "cyan";
  items: string[];
  sort_order: number;
};

type FormState = {
  label: string;
  accent: "green" | "cyan";
  items: string;
  sort_order: string;
};

const emptyForm = (order: number): FormState => ({
  label: "",
  accent: "cyan",
  items: "",
  sort_order: String(order),
});

// Una skill por línea
const parseItems = (value: string): string[] =>
  value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function SkillsManager({ skills }: { skills: SkillRow[] }) {
  const router = useRouter();
  const supabase = createClient();

  const nextOrder = skills.length
    ? Math.max(...skills.map((s) => s.sort_order)) + 1
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

  function startEdit(s: SkillRow) {
    setEditingId(s.id);
    setForm({
      label: s.label,
      accent: s.accent,
      items: s.items.join("\n"),
      sort_order: String(s.sort_order),
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

    if (!form.label.trim()) {
      setMsg({ type: "error", text: "El nombre de la categoría es obligatorio." });
      return;
    }

    setSaving(true);
    setMsg(null);

    const payload = {
      label: form.label.trim(),
      accent: form.accent,
      items: parseItems(form.items),
      sort_order: Number(form.sort_order) || 0,
    };

    let errorText: string | null = null;

    if (editingId === null) {
      const { error } = await supabase.from("skill_categories").insert(payload);
      if (error) errorText = error.message;
    } else {
      const { data, error } = await supabase
        .from("skill_categories")
        .update(payload)
        .eq("id", editingId)
        .select();
      if (error) errorText = error.message;
      else if (!data?.length) errorText = "Sin permisos para modificar esta categoría.";
    }

    setSaving(false);

    if (errorText) {
      setMsg({ type: "error", text: errorText });
      return;
    }

    setMsg({
      type: "ok",
      text: editingId === null ? "Categoría creada." : "Categoría actualizada.",
    });
    closeForm();
    router.refresh();
  }

  async function handleDelete(s: SkillRow) {
    if (!confirm(`¿Eliminar "${s.label}"? Esta acción no se puede deshacer.`))
      return;

    const { data, error } = await supabase
      .from("skill_categories")
      .delete()
      .eq("id", s.id)
      .select();

    if (error || !data?.length) {
      setMsg({
        type: "error",
        text: error?.message ?? "Sin permisos para eliminar esta categoría.",
      });
      return;
    }

    setMsg({ type: "ok", text: "Categoría eliminada." });
    router.refresh();
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>Categorías de skills</h2>
          <p className={styles.cardHint}>
            {skills.length} {skills.length === 1 ? "categoría" : "categorías"}
          </p>
        </div>
        {!open && (
          <button className={styles.primaryBtn} onClick={startNew}>
            + Nueva categoría
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
            {editingId === null ? "Nueva categoría" : "Editar categoría"}
          </h3>

          <div className={styles.field}>
            <label htmlFor="s-label">Nombre de la categoría *</label>
            <input
              id="s-label"
              placeholder="Lenguajes & scripting"
              value={form.label}
              onChange={(e) => setField("label", e.target.value)}
              required
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="s-accent">Color</label>
              <select
                id="s-accent"
                value={form.accent}
                onChange={(e) =>
                  setField("accent", e.target.value as "green" | "cyan")
                }
              >
                <option value="cyan">Cian</option>
                <option value="green">Verde</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="s-order">Orden (menor = aparece primero)</label>
              <input
                id="s-order"
                type="number"
                value={form.sort_order}
                onChange={(e) => setField("sort_order", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="s-items">Skills (una por línea)</label>
            <textarea
              id="s-items"
              rows={7}
              placeholder={"Python\nBash / Shell\nJava"}
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

      {skills.length === 0 ? (
        <p className={styles.empty}>Todavía no hay categorías cargadas.</p>
      ) : (
        <ul className={styles.list}>
          {skills.map((s) => (
            <li key={s.id} className={styles.row}>
              <div className={styles.rowBody}>
                <strong>{s.label}</strong>
                <span className={styles.rowMeta}>
                  #{s.sort_order} · {s.accent === "cyan" ? "cian" : "verde"} ·{" "}
                  {s.items.join(", ")}
                </span>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.ghostBtn} onClick={() => startEdit(s)}>
                  Editar
                </button>
                <button className={styles.dangerBtn} onClick={() => handleDelete(s)}>
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