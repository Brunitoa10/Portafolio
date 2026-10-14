"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./admin.module.css";

export type AboutRow = {
  id: number;
  content: string;
  sort_order: number;
};

type FormState = {
  content: string;
  sort_order: string;
};

const emptyForm = (order: number): FormState => ({
  content: "",
  sort_order: String(order),
});

export default function AboutManager({ paragraphs }: { paragraphs: AboutRow[] }) {
  const router = useRouter();
  const supabase = createClient();

  const nextOrder = paragraphs.length
    ? Math.max(...paragraphs.map((p) => p.sort_order)) + 1
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

  function startEdit(p: AboutRow) {
    setEditingId(p.id);
    setForm({ content: p.content, sort_order: String(p.sort_order) });
    setMsg(null);
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.content.trim()) {
      setMsg({ type: "error", text: "El texto no puede estar vacío." });
      return;
    }

    setSaving(true);
    setMsg(null);

    const payload = {
      content: form.content.trim(),
      sort_order: Number(form.sort_order) || 0,
    };

    let errorText: string | null = null;

    if (editingId === null) {
      const { error } = await supabase.from("about_paragraphs").insert(payload);
      if (error) errorText = error.message;
    } else {
      const { data, error } = await supabase
        .from("about_paragraphs")
        .update(payload)
        .eq("id", editingId)
        .select();
      if (error) errorText = error.message;
      else if (!data?.length) errorText = "Sin permisos para modificar este párrafo.";
    }

    setSaving(false);

    if (errorText) {
      setMsg({ type: "error", text: errorText });
      return;
    }

    setMsg({
      type: "ok",
      text: editingId === null ? "Párrafo agregado." : "Texto actualizado.",
    });
    closeForm();
    router.refresh();
  }

  async function handleDelete(p: AboutRow) {
    if (!confirm("¿Eliminar este párrafo? Esta acción no se puede deshacer."))
      return;

    const { data, error } = await supabase
      .from("about_paragraphs")
      .delete()
      .eq("id", p.id)
      .select();

    if (error || !data?.length) {
      setMsg({
        type: "error",
        text: error?.message ?? "Sin permisos para eliminar este párrafo.",
      });
      return;
    }

    setMsg({ type: "ok", text: "Párrafo eliminado." });
    router.refresh();
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>Texto de presentación</h2>
          <p className={styles.cardHint}>
            {paragraphs.length}{" "}
            {paragraphs.length === 1 ? "párrafo" : "párrafos"} · se muestran en
            orden ascendente
          </p>
        </div>
        {!open && (
          <button className={styles.primaryBtn} onClick={startNew}>
            + Nuevo párrafo
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
            {editingId === null ? "Nuevo párrafo" : "Editar párrafo"}
          </h3>

          <div className={styles.field}>
            <label htmlFor="a-content">Texto *</label>
            <textarea
              id="a-content"
              rows={10}
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
              required
            />
            <span className={styles.cardHint}>{form.content.length} caracteres</span>
          </div>

          <div className={styles.field}>
            <label htmlFor="a-order">Orden (menor = aparece primero)</label>
            <input
              id="a-order"
              type="number"
              value={form.sort_order}
              onChange={(e) => setField("sort_order", e.target.value)}
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

      {paragraphs.length === 0 ? (
        <p className={styles.empty}>Todavía no hay texto cargado.</p>
      ) : (
        <ul className={styles.list}>
          {paragraphs.map((p, i) => (
            <li key={p.id} className={styles.row}>
              <div className={styles.rowBody}>
                <strong>Párrafo {i + 1}</strong>
                <span className={styles.rowMeta}>{p.content}</span>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.ghostBtn} onClick={() => startEdit(p)}>
                  Editar
                </button>
                <button className={styles.dangerBtn} onClick={() => handleDelete(p)}>
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