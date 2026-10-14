"use client";

import { useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "./ui";
import { cvUrl, formatDate, formatSize, uploadCv, validateCvFile, type CvInfo } from "./cv";
import { usePublish } from "./usePublish";
import styles from "./admin.module.css";

export default function CvUploader({ info }: { info: CvInfo | null }) {
  const supabase = useMemo(() => createClient(), []);
  const { notify } = useToast();
  const publish = usePublish();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  async function upload(file: File | undefined) {
    if (!file) return;

    const problem = validateCvFile(file);
    if (problem) {
      notify("error", problem);
      return;
    }

    setUploading(true);
    try {
      await uploadCv(supabase, file);
    } catch (error) {
      notify("error", error instanceof Error ? error.message : "No se pudo subir el archivo.");
      return;
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }

    await publish();
    notify("ok", "Currículum actualizado.");
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Archivo publicado</h2>
        <p className={styles.panelDescription}>
          El botón «CV» del sitio descarga siempre este archivo. Al subir uno nuevo, reemplaza al anterior.
        </p>
      </div>

      <div className={styles.panelBody}>
        {info ? (
          <div className={styles.fileRow}>
            <span className={styles.fileBadge}>PDF</span>
            <div className={styles.fileBody}>
              <span className={styles.fileName}>cv.pdf</span>
              <span className={styles.fileMeta}>
                {formatSize(info.size)}
                {info.size !== null && info.updatedAt ? " · " : ""}
                {info.updatedAt && (
                  <>
                    actualizado el <time suppressHydrationWarning>{formatDate(info.updatedAt)}</time>
                  </>
                )}
              </span>
            </div>
            <a
              className={styles.ghostBtn}
              href={cvUrl(info)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir
            </a>
          </div>
        ) : (
          <p className={styles.mutedText}>Todavía no hay un currículum cargado.</p>
        )}

        <div
          className={`${styles.dropzone} ${dragging ? styles.dropzoneActive : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            void upload(event.dataTransfer.files[0]);
          }}
        >
          <p className={styles.dropTitle}>
            {uploading ? "Subiendo…" : info ? "Reemplazar el currículum" : "Subir el currículum"}
          </p>
          <p className={styles.mutedText}>Arrastrá un PDF acá o elegilo desde tu equipo. Máximo 5 MB.</p>
          <button
            type="button"
            className={styles.primaryBtn}
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            Elegir PDF
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(event) => void upload(event.target.files?.[0])}
          />
        </div>
      </div>
    </div>
  );
}
