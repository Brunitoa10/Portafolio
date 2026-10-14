"use client";

import { useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "./ui";
import { usePublish } from "./usePublish";
import styles from "./admin.module.css";

export interface CvInfo {
  size: number | null;
  updatedAt: string | null;
}

const CV_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cv/cv.pdf`;
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB, igual que el límite del bucket

export const cvUrl = (info: CvInfo | null): string =>
  info?.updatedAt ? `${CV_URL}?v=${encodeURIComponent(info.updatedAt)}` : CV_URL;

export function formatSize(bytes: number | null): string {
  if (bytes === null) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("es-AR", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(iso)
  );
}

export default function CvUploader({ info }: { info: CvInfo | null }) {
  const supabase = useMemo(() => createClient(), []);
  const { notify } = useToast();
  const publish = usePublish();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  async function upload(file: File | undefined) {
    if (!file) return;

    if (file.type !== "application/pdf") {
      notify("error", "El currículum tiene que ser un archivo PDF.");
      return;
    }
    if (file.size > MAX_SIZE) {
      notify("error", "El archivo supera los 5 MB. Probá con una versión más liviana.");
      return;
    }

    setUploading(true);
    const { error } = await supabase.storage.from("cv").upload("cv.pdf", file, {
      upsert: true,
      contentType: "application/pdf",
      cacheControl: "60",
    });
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";

    if (error) {
      notify("error", error.message);
      return;
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
