import type { ProjectLink, ProjectTag } from "@/types";
import type { Field, FieldValue, FormValues, SingleRecord } from "./types";

/** Conversión formulario ⇄ base de datos (funciones puras). */

export const isVisible = (field: Field, values: FormValues): boolean =>
  field.showIf ? field.showIf(values) : true;

/** Valores iniciales del formulario: del registro existente, o los valores por defecto. */
export function toFormValues(fields: Field[], source: SingleRecord | null): FormValues {
  const values: FormValues = {};

  for (const field of fields) {
    const raw = source?.[field.key];

    switch (field.type) {
      case "checkbox":
        values[field.key] = source ? Boolean(raw) : (field.defaultValue ?? false);
        break;
      case "tags":
        values[field.key] = Array.isArray(raw) ? (raw as ProjectTag[]) : [];
        break;
      case "links":
        values[field.key] = Array.isArray(raw) ? (raw as ProjectLink[]) : [];
        break;
      case "lines":
        values[field.key] = Array.isArray(raw) ? (raw as string[]).join("\n") : "";
        break;
      case "select":
        values[field.key] = typeof raw === "string" ? raw : source ? "" : field.defaultValue;
        break;
      case "text":
      case "url":
        values[field.key] =
          typeof raw === "string" ? raw : source ? "" : (field.defaultValue ?? "");
        break;
      default:
        values[field.key] = typeof raw === "string" ? raw : "";
    }
  }

  return values;
}

/** Devuelve un mensaje de error, o null si el formulario es válido. */
export function validate(fields: Field[], values: FormValues): string | null {
  for (const field of fields) {
    if (!field.required || !isVisible(field, values)) continue;

    const value = values[field.key];
    if (typeof value === "string" && value.trim() === "") {
      return `Completá «${field.label}».`;
    }
  }

  for (const field of fields) {
    if (field.type !== "links" || !isVisible(field, values)) continue;
    const problem = validateLinks(asLinks(values[field.key]));
    if (problem) return problem;
  }
  return null;
}

/** Valores listos para guardar en la tabla. */
export function toPayload(fields: Field[], values: FormValues): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  for (const field of fields) {
    if (!isVisible(field, values)) {
      payload[field.key] = null;
      continue;
    }

    const value = values[field.key];

    switch (field.type) {
      case "checkbox":
        payload[field.key] = Boolean(value);
        break;
      case "tags":
        payload[field.key] = Array.isArray(value) ? value : [];
        break;
      case "links":
        payload[field.key] = cleanLinks(asLinks(value));
        break;
      case "lines":
        payload[field.key] =
          typeof value === "string"
            ? value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            : [];
        break;
      default: {
        const raw = typeof value === "string" ? value : "";
        const keepSpaces = field.type === "text" && field.preserveSpaces;
        const cleaned = keepSpaces ? raw : raw.trim();
        payload[field.key] = cleaned.trim() === "" ? (field.required ? "" : null) : cleaned;
      }
    }
  }

  return payload;
}

/* ───────────────────────── enlaces de proyecto ─────────────────────── */

const asLinks = (value: FieldValue | undefined): ProjectLink[] =>
  Array.isArray(value) ? (value as ProjectLink[]) : [];

const isWebUrl = (url: string): boolean => /^(https?:\/\/|mailto:)\S+$/i.test(url);

/** Descarta las filas vacías y recorta los espacios. */
const cleanLinks = (links: ProjectLink[]): ProjectLink[] =>
  links
    .map((link) => ({ label: link.label.trim(), url: link.url.trim() }))
    .filter((link) => link.label !== "" || link.url !== "");

function validateLinks(links: ProjectLink[]): string | null {
  for (const link of cleanLinks(links)) {
    if (!link.label) return "Cada enlace necesita un texto (por ejemplo «Demo web»).";
    if (!link.url) return `Falta la dirección del enlace «${link.label}».`;
    if (!isWebUrl(link.url)) {
      return `El enlace «${link.label}» tiene que empezar con https://`;
    }
  }
  return null;
}
