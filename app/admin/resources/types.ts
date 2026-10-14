import type { ProjectLink, ProjectTag } from "@/types";

/* ──────────────────────────────────────────────────────────────────────
   Descripción declarativa de cada sección editable del panel.

   El panel no tiene un formulario por tabla: tiene UN gestor genérico
   (ResourceManager) que se configura con estas definiciones. Para sumar una
   sección nueva alcanza con agregar una definición acá, sin tocar el gestor.
────────────────────────────────────────────────────────────────────── */

export type ResourceKey =
  | "about"
  | "stats"
  | "skills"
  | "projects"
  | "timeline"
  | "contact"
  | "terminal";

/** Pestañas del panel. */
export type TabKey = "resumen" | "perfil" | ResourceKey | "cv";

/** Fila de una tabla ordenable (todas menos `profile`). */
export type Row = { id: number; sort_order: number; [column: string]: unknown };

/** Registro de una sola fila (`profile`). */
export type SingleRecord = Record<string, unknown>;

export type FieldValue = string | boolean | ProjectTag[] | ProjectLink[];
export type FormValues = Record<string, FieldValue>;

interface FieldBase {
  /** Nombre de la columna en la tabla. */
  key: string;
  label: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  /** Ocupa media fila del formulario. */
  half?: boolean;
  /** Si devuelve false, el campo se oculta y se guarda vacío. */
  showIf?: (values: FormValues) => boolean;
}

export type Field =
  | (FieldBase & {
      type: "text" | "url";
      defaultValue?: string;
      /** No recorta espacios (la terminal alinea con espacios). */
      preserveSpaces?: boolean;
    })
  | (FieldBase & { type: "textarea"; rows?: number })
  | (FieldBase & { type: "lines"; rows?: number })
  | (FieldBase & {
      type: "select";
      options: { value: string; label: string }[];
      defaultValue: string;
    })
  | (FieldBase & { type: "checkbox"; defaultValue?: boolean })
  | (FieldBase & { type: "tags" })
  | (FieldBase & { type: "links"; suggestions?: string[] });

export interface RowSummary {
  /** Texto o emoji corto que se muestra a la izquierda. */
  leading?: string;
  title: string;
  meta: string;
}

export interface ResourceDef {
  key: ResourceKey;
  table: string;
  title: string;
  noun: string;
  newLabel: string;
  description: string;
  emptyText: string;
  /** Orden en que se muestra en el sitio. */
  direction: "asc" | "desc";
  /** Dónde queda un elemento nuevo por defecto. */
  newItemAt: "first" | "last";
  fields: Field[];
  summarize: (row: Row, index: number) => RowSummary;
}
