"use client";

import { useId, useState } from "react";
import type { AccentColor, ProjectTag } from "@/types";
import type { Field, FieldValue } from "./resources";
import styles from "./admin.module.css";

interface FieldControlProps {
  field: Field;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
}

const asString = (value: FieldValue | undefined): string =>
  typeof value === "string" ? value : "";

/** Campo de formulario genérico: renderiza el control según `field.type`. */
export function FieldControl({ field, value, onChange }: FieldControlProps) {
  const id = useId();
  const wrapperClass = `${styles.field} ${field.half ? styles.fieldHalf : styles.fieldFull}`;

  if (field.type === "checkbox") {
    return (
      <div className={wrapperClass}>
        <label className={styles.check} htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            checked={value === true}
            onChange={(event) => onChange(event.target.checked)}
          />
          {field.label}
        </label>
        {field.hint && <p className={styles.hint}>{field.hint}</p>}
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <label className={styles.label} htmlFor={id}>
        {field.label}
        {field.required && <span className={styles.required}> *</span>}
      </label>

      {(field.type === "text" || field.type === "url") && (
        <input
          id={id}
          className={styles.control}
          type={field.type === "url" ? "url" : "text"}
          value={asString(value)}
          placeholder={field.placeholder}
          autoComplete="off"
          spellCheck={field.type === "text" && !field.preserveSpaces}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {(field.type === "textarea" || field.type === "lines") && (
        <textarea
          id={id}
          className={styles.control}
          rows={field.rows ?? 4}
          value={asString(value)}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {field.type === "select" && (
        <select
          id={id}
          className={styles.control}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "tags" && (
        <TagsInput
          id={id}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      )}

      {field.hint && <p className={styles.hint}>{field.hint}</p>}
    </div>
  );
}

/* ───────────────────── Editor de etiquetas con color ───────────────── */

interface TagsInputProps {
  id: string;
  value: ProjectTag[];
  onChange: (tags: ProjectTag[]) => void;
}

function TagsInput({ id, value, onChange }: TagsInputProps) {
  const [draft, setDraft] = useState("");

  function add(raw: string) {
    const label = raw.trim();
    const exists = value.some((tag) => tag.label.toLowerCase() === label.toLowerCase());
    setDraft("");
    if (!label || exists) return;

    // Alterna el color respecto de la etiqueta anterior.
    const last = value[value.length - 1];
    const accent: AccentColor = last?.accent === "green" ? "cyan" : "green";
    onChange([...value, { label, accent }]);
  }

  function toggleAccent(index: number) {
    onChange(
      value.map((tag, i) =>
        i === index ? { ...tag, accent: tag.accent === "green" ? "cyan" : "green" } : tag
      )
    );
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.tagsBox}>
      {value.map((tag, index) => (
        <span key={`${tag.label}-${index}`} className={styles.tagChip} data-accent={tag.accent}>
          <button
            type="button"
            className={styles.tagLabel}
            onClick={() => toggleAccent(index)}
            title="Cambiar color"
          >
            {tag.label}
          </button>
          <button
            type="button"
            className={styles.tagRemove}
            onClick={() => remove(index)}
            aria-label={`Quitar ${tag.label}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        id={id}
        className={styles.tagsInput}
        value={draft}
        placeholder={value.length ? "Agregar…" : "Python, Bash, Redes…"}
        autoComplete="off"
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => add(draft)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            add(draft);
          } else if (event.key === "Backspace" && draft === "" && value.length > 0) {
            remove(value.length - 1);
          }
        }}
      />
    </div>
  );
}
