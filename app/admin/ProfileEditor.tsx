"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FieldControl } from "./FieldControl";
import {
  PROFILE_FIELDS,
  PROFILE_GROUPS,
  isVisible,
  toFormValues,
  toPayload,
  validate,
  type FieldValue,
  type FormValues,
  type SingleRecord,
} from "./resources";
import { useToast } from "./ui";
import { usePublish } from "./usePublish";
import styles from "./admin.module.css";

export default function ProfileEditor({ record }: { record: SingleRecord | null }) {
  const supabase = useMemo(() => createClient(), []);
  const { notify } = useToast();
  const publish = usePublish();

  const [baseline, setBaseline] = useState<FormValues>(() =>
    toFormValues(PROFILE_FIELDS, record)
  );
  const [values, setValues] = useState<FormValues>(baseline);
  const [saving, setSaving] = useState(false);

  const dirty = JSON.stringify(values) !== JSON.stringify(baseline);

  function setValue(key: string, value: FieldValue) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const problem = validate(PROFILE_FIELDS, values);
    if (problem) {
      notify("error", problem);
      return;
    }

    setSaving(true);
    try {
      const payload = toPayload(PROFILE_FIELDS, values);
      const { error } = await supabase
        .from("profile")
        .upsert({ id: 1, ...payload }, { onConflict: "id" });
      if (error) throw new Error(error.message);

      const saved = toFormValues(PROFILE_FIELDS, payload);
      setBaseline(saved);
      setValues(saved);

      await publish();
      notify("ok", "Perfil guardado y publicado.");
    } catch (error) {
      notify("error", error instanceof Error ? error.message : "No se pudo guardar el perfil.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className={styles.profileForm} onSubmit={handleSubmit}>
      {PROFILE_GROUPS.map((group) => (
        <div key={group.title} className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>{group.title}</h2>
            <p className={styles.panelDescription}>{group.description}</p>
          </div>
          <div className={`${styles.panelBody} ${styles.formGrid}`}>
            {group.fields
              .filter((field) => isVisible(field, values))
              .map((field) => (
                <FieldControl
                  key={field.key}
                  field={field}
                  value={values[field.key]}
                  onChange={(value) => setValue(field.key, value)}
                />
              ))}
          </div>
        </div>
      ))}

      <div className={styles.saveBar}>
        <span className={styles.saveStatus} data-dirty={dirty}>
          {dirty ? "Hay cambios sin guardar" : "Todo guardado"}
        </span>
        <div className={styles.saveActions}>
          <button
            type="button"
            className={styles.ghostBtn}
            disabled={!dirty || saving}
            onClick={() => setValues(baseline)}
          >
            Descartar
          </button>
          <button type="submit" className={styles.primaryBtn} disabled={!dirty || saving}>
            {saving ? "Guardando…" : "Guardar y publicar"}
          </button>
        </div>
      </div>
    </form>
  );
}
