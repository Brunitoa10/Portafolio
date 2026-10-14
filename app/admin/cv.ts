import type { SupabaseClient } from "@supabase/supabase-js";

/** Currículum: constantes, formato y almacenamiento (bucket `cv`). */

export interface CvInfo {
  size: number | null;
  updatedAt: string | null;
}

const BUCKET = "cv";
const FILE_NAME = "cv.pdf";
const PUBLIC_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${FILE_NAME}`;

export const CV_MAX_SIZE = 5 * 1024 * 1024; // igual que el límite del bucket

/** URL pública; el parámetro `v` evita que el navegador muestre una versión vieja. */
export const cvUrl = (info: CvInfo | null): string =>
  info?.updatedAt ? `${PUBLIC_URL}?v=${encodeURIComponent(info.updatedAt)}` : PUBLIC_URL;

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

/** Devuelve un mensaje de error, o null si el archivo es válido. */
export function validateCvFile(file: File): string | null {
  if (file.type !== "application/pdf") return "El currículum tiene que ser un archivo PDF.";
  if (file.size > CV_MAX_SIZE) return "El archivo supera los 5 MB. Probá con una versión más liviana.";
  return null;
}

export async function uploadCv(client: SupabaseClient, file: File): Promise<void> {
  const { error } = await client.storage.from(BUCKET).upload(FILE_NAME, file, {
    upsert: true,
    contentType: "application/pdf",
    cacheControl: "60",
  });
  if (error) throw new Error(error.message);
}
