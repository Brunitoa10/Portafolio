"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./admin.module.css";

type Tag = { label: string; accent: "green" | "cyan" };

export type ProjectRow = {
  id: number;
  name: string;
  icon: string | null;
  wide: boolean;
  link_label: string | null;
  href: string | null;
  description: string | null;
  tags: Tag[];
  sort_order: number;
};

type FormState = {
  name: string;
  icon: string;
  link_label: string;
  href: string;
  description: string;
  tags: string;
  wide: boolean;
  sort_order: string;
};

const emptyForm = (order: number): FormState => ({
  name: "",
  icon: "📁",
  link_label: "⌥ code",
  href: "",
  description: "",
  tags: "",
  wide: false,
  sort_order: String(order),
});

// "Python, Bash" -> [{label:"Python",accent:"green"},{label:"Bash",accent:"cyan"}]
const parseTags = (value: string): Tag[] =>
  value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((label, i) => ({ label, accent: i % 2 === 0 ? "green" : "cyan" }));

export default function ProjectsManager({
  projects,
}: {
  projects: ProjectRow[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const nextOrder = projects.length
    ? Math.max(...projects.map((p) => p.sort_order)) + 1
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

  function startEdit(p: ProjectRow) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      icon: p.icon ?? "",
      link_label: p.link_label ?? "",
      href: p.href ?? "",
      description: p.description ?? "",
      tags: p.tags.map((t) => t.label).join(", "),
      wide: p.wide,
      sort_order: String(p.sort_order),
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

    if (!form.name.trim()) {
      setMsg({ type: "error", text: "El nombre es obligatorio." });
      return;
    }

    setSaving(true);
    setMsg(null);

    const payload = {
      name: form.name.trim(),
      icon: form.icon.trim() || null,
      wide: form.wide,
      link_label: form.link_label.trim() || null,
      href: form.href.trim() || null,
      description: form.description.trim() || null,
      tags: parseTags(form.tags),
      sort_order: Number(form.sort_order) || 0,
    };

    let errorText: string | null = null;

    if (editingId === null) {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) errorText = error.message;
    } else {
      const { data, error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingId)
        .select();
      if (error) errorText = error.message;
      else if (!data?.length) errorText = "Sin permisos para modificar este proyecto.";
    }

    setSaving(false);

    if (errorText) {
      setMsg({ type: "error", text: errorText });
      return;
    }

    setMsg({
      type: "ok",
      text: editingId === null ? "Proyecto creado." : "Proyecto actualizado.",
    });
    closeForm();
    router.refresh();
  }

  async function handleDelete(p: ProjectRow) {
    if (!confirm(`¿Eliminar "${p.name}"? Esta acción no se puede deshacer.`))
      return;

    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", p.id)
      .select();

    if (error || !data?.length) {
      setMsg({
        type: "error",
        text: error?.message ?? "Sin permisos para eliminar este proyecto.",
      });
      return;
    }

    setMsg({ type: "ok", text: "Proyecto eliminado." });
    router.refresh();
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>Proyectos</h2>
          <p className={styles.cardHint}>
            {projects.length} {projects.length === 1 ? "proyecto" : "proyectos"}
          </p>
        </div>
        {!open && (
          <button className={styles.primaryBtn} onClick={startNew}>
            + Nuevo proyecto
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
            {editingId === null ? "Nuevo proyecto" : "Editar proyecto"}
          </h3>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="p-name">Nombre *</label>
              <input
                id="p-name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="p-icon">Ícono (emoji)</label>
              <input
                id="p-icon"
                value={form.icon}
                onChange={(e) => setField("icon", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="p-desc">Descripción</label>
            <textarea
              id="p-desc"
              rows={4}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="p-href">Link (GitHub o sitio)</label>
              <input
                id="p-href"
                type="url"
                placeholder="https://"
                value={form.href}
                onChange={(e) => setField("href", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="p-link">Texto del link</label>
              <input
                id="p-link"
                value={form.link_label}
                onChange={(e) => setField("link_label", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="p-tags">Tags (separados por coma)</label>
            <input
              id="p-tags"
              placeholder="Python, Bash, Networking"
              value={form.tags}
              onChange={(e) => setField("tags", e.target.value)}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="p-order">Orden</label>
              <input
                id="p-order"
                type="number"
                value={form.sort_order}
                onChange={(e) => setField("sort_order", e.target.value)}
              />
            </div>
            <label className={styles.check}>
              <input
                type="checkbox"
                checked={form.wide}
                onChange={(e) => setField("wide", e.target.checked)}
              />
              Tarjeta ancha (destacado)
            </label>
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

      {projects.length === 0 ? (
        <p className={styles.empty}>Todavía no hay proyectos cargados.</p>
      ) : (
        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.id} className={styles.row}>
              <span className={styles.rowIcon}>{p.icon ?? "📁"}</span>
              <div className={styles.rowBody}>
                <strong>{p.name}</strong>
                <span className={styles.rowMeta}>
                  #{p.sort_order}
                  {p.wide ? " · destacado" : ""}
                  {p.tags.length
                    ? ` · ${p.tags.map((t) => t.label).join(", ")}`
                    : ""}
                </span>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.ghostBtn} onClick={() => startEdit(p)}>
                  Editar
                </button>
                <button
                  className={styles.dangerBtn}
                  onClick={() => handleDelete(p)}
                >
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