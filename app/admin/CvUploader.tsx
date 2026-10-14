"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./admin.module.css";

const CV_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cv/cv.pdf`;
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export default function CvUploader() {
  const [msg, setMsg] = useState<{ type: "ok" | "error"; text: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState(() => Date.now());

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMsg({ type: "error", text: "Solo se permiten archivos PDF." });
      input.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      setMsg({ type: "error", text: "El archivo supera los 5 MB." });
      input.value = "";
      return;
    }

    setLoading(true);
    setMsg(null);

    const { error } = await createClient()
      .storage.from("cv")
      .upload("cv.pdf", file, {
        upsert: true,
        contentType: "application/pdf",
        cacheControl: "60",
      });

    setLoading(false);
    input.value = "";

    if (error) {
      setMsg({ type: "error", text: error.message });
      return;
    }

    setVersion(Date.now());
    setMsg({ type: "ok", text: "CV actualizado." });
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>Currículum</h2>
          <p className={styles.cardHint}>PDF · máximo 5 MB · reemplaza el actual</p>
        </div>
        <a
          href={`${CV_URL}?v=${version}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ghostBtn}
        >
          Ver CV actual
        </a>
      </div>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        disabled={loading}
        className={styles.file}
      />

      {loading && <p className={styles.cardHint}>Subiendo…</p>}
      {msg && (
        <p
          role={msg.type === "error" ? "alert" : "status"}
          className={msg.type === "error" ? styles.error : styles.success}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}