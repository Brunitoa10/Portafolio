import type { ProjectTag } from "@/types";

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

export type FieldValue = string | boolean | ProjectTag[];
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
  | (FieldBase & { type: "tags" });

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

/* ───────────────────────── utilidades de lectura ───────────────────── */

const text = (row: SingleRecord, key: string): string => {
  const value = row[key];
  return typeof value === "string" ? value : "";
};

const list = (row: SingleRecord, key: string): string[] => {
  const value = row[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
};

const tagList = (row: SingleRecord, key: string): ProjectTag[] => {
  const value = row[key];
  return Array.isArray(value) ? (value as ProjectTag[]) : [];
};

const clip = (value: string, max: number): string =>
  value.length > max ? `${value.slice(0, max).trimEnd()}…` : value;

const ACCENT_OPTIONS = [
  { value: "cyan", label: "Cian" },
  { value: "green", label: "Verde" },
];

/* ───────────────────────── definiciones ────────────────────────────── */

export const RESOURCES: Record<ResourceKey, ResourceDef> = {
  about: {
    key: "about",
    table: "about_paragraphs",
    title: "Sobre mí",
    noun: "párrafo",
    newLabel: "Nuevo párrafo",
    description: "Texto de presentación de la sección «sobre mí». Cada párrafo se muestra por separado.",
    emptyText: "Todavía no hay texto de presentación.",
    direction: "asc",
    newItemAt: "last",
    fields: [
      {
        key: "content",
        label: "Texto",
        type: "textarea",
        rows: 12,
        required: true,
        hint: "Podés resaltar palabras con **negrita**.",
      },
    ],
    summarize: (row, index) => ({
      title: `Párrafo ${index + 1}`,
      meta: clip(text(row, "content"), 160),
    }),
  },

  stats: {
    key: "stats",
    table: "stats",
    title: "Estadísticas",
    noun: "estadística",
    newLabel: "Nueva estadística",
    description: "Tarjetas con cifras junto al texto de presentación.",
    emptyText: "Todavía no hay estadísticas.",
    direction: "asc",
    newItemAt: "last",
    fields: [
      { key: "value", label: "Valor", type: "text", required: true, half: true, placeholder: "24/7" },
      {
        key: "label",
        label: "Descripción",
        type: "text",
        required: true,
        half: true,
        placeholder: "entorno industrial crítico",
      },
    ],
    summarize: (row) => ({
      title: text(row, "value"),
      meta: text(row, "label"),
    }),
  },

  skills: {
    key: "skills",
    table: "skill_categories",
    title: "Skills",
    noun: "categoría",
    newLabel: "Nueva categoría",
    description: "Categorías de tecnologías de la sección de stack.",
    emptyText: "Todavía no hay categorías de skills.",
    direction: "asc",
    newItemAt: "last",
    fields: [
      {
        key: "label",
        label: "Nombre de la categoría",
        type: "text",
        required: true,
        half: true,
        placeholder: "Lenguajes & scripting",
      },
      {
        key: "accent",
        label: "Color",
        type: "select",
        half: true,
        defaultValue: "cyan",
        options: ACCENT_OPTIONS,
      },
      {
        key: "items",
        label: "Skills",
        type: "lines",
        rows: 8,
        hint: "Una por línea.",
      },
    ],
    summarize: (row) => {
      const items = list(row, "items");
      return {
        title: text(row, "label"),
        meta: `${items.length} ${items.length === 1 ? "skill" : "skills"} · ${items.join(", ")}`,
      };
    },
  },

  projects: {
    key: "projects",
    table: "projects",
    title: "Proyectos",
    noun: "proyecto",
    newLabel: "Nuevo proyecto",
    description: "Tarjetas de la sección de proyectos.",
    emptyText: "Todavía no hay proyectos cargados.",
    direction: "asc",
    newItemAt: "last",
    fields: [
      { key: "name", label: "Nombre", type: "text", required: true, half: true },
      { key: "icon", label: "Ícono (emoji)", type: "text", half: true, defaultValue: "📁" },
      { key: "description", label: "Descripción", type: "textarea", rows: 4 },
      {
        key: "href",
        label: "Enlace",
        type: "url",
        half: true,
        placeholder: "https://github.com/…",
      },
      {
        key: "link_label",
        label: "Texto del enlace",
        type: "text",
        half: true,
        defaultValue: "⌥ code",
      },
      {
        key: "tags",
        label: "Etiquetas",
        type: "tags",
        hint: "Enter para agregar. Tocá una etiqueta para cambiarle el color.",
      },
      {
        key: "wide",
        label: "Destacar (tarjeta ancha)",
        type: "checkbox",
      },
    ],
    summarize: (row) => {
      const tags = tagList(row, "tags").map((tag) => tag.label);
      return {
        leading: text(row, "icon") || "📁",
        title: text(row, "name"),
        meta: [row.wide ? "Destacado" : "", tags.join(", ")].filter(Boolean).join(" · "),
      };
    },
  },

  timeline: {
    key: "timeline",
    table: "timeline",
    title: "Experiencia",
    noun: "puesto",
    newLabel: "Nuevo puesto",
    description: "Puestos y formación de la línea de tiempo. Arriba va lo más reciente.",
    emptyText: "Todavía no hay experiencia cargada.",
    direction: "desc",
    newItemAt: "first",
    fields: [
      {
        key: "role",
        label: "Puesto o título",
        type: "text",
        required: true,
        half: true,
        placeholder: "Field Service Jr",
      },
      {
        key: "company",
        label: "Empresa o institución",
        type: "text",
        required: true,
        half: true,
        placeholder: "TIVIT · Planta Bunge, Bahía Blanca",
      },
      {
        key: "period",
        label: "Período",
        type: "text",
        required: true,
        placeholder: "2025 octubre — actualidad",
      },
      {
        key: "items",
        label: "Tareas y logros",
        type: "lines",
        rows: 8,
        hint: "Una por línea.",
      },
    ],
    summarize: (row) => ({
      title: text(row, "role"),
      meta: [text(row, "company"), text(row, "period")].filter(Boolean).join(" · "),
    }),
  },

  contact: {
    key: "contact",
    table: "contact_links",
    title: "Contacto",
    noun: "enlace",
    newLabel: "Nuevo enlace",
    description: "Botones de la sección de contacto.",
    emptyText: "Todavía no hay enlaces de contacto.",
    direction: "asc",
    newItemAt: "last",
    fields: [
      {
        key: "icon",
        label: "Ícono",
        type: "select",
        half: true,
        defaultValue: "github",
        options: [
          { value: "github", label: "GitHub" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "email", label: "Correo" },
        ],
      },
      { key: "label", label: "Texto del botón", type: "text", required: true, half: true },
      {
        key: "href",
        label: "Enlace",
        type: "text",
        required: true,
        placeholder: "https://… o mailto:tu@correo.com",
      },
      {
        key: "external",
        label: "Abrir en una pestaña nueva",
        type: "checkbox",
        defaultValue: true,
      },
    ],
    summarize: (row) => ({
      leading: { github: "GH", linkedin: "in", email: "@" }[text(row, "icon")] ?? "·",
      title: text(row, "label"),
      meta: text(row, "href"),
    }),
  },

  terminal: {
    key: "terminal",
    table: "terminal_lines",
    title: "Terminal",
    noun: "línea",
    newLabel: "Nueva línea",
    description: "Líneas que la terminal del inicio escribe al cargar la página.",
    emptyText: "Todavía no hay líneas en la terminal.",
    direction: "asc",
    newItemAt: "last",
    fields: [
      {
        key: "kind",
        label: "Tipo de línea",
        type: "select",
        required: true,
        defaultValue: "prompt",
        options: [
          { value: "prompt", label: "Comando (se escribe letra por letra)" },
          { value: "output", label: "Salida" },
          { value: "blank", label: "Línea en blanco" },
          { value: "cursor", label: "Cursor final" },
        ],
      },
      {
        key: "text",
        label: "Texto",
        type: "text",
        required: true,
        preserveSpaces: true,
        showIf: (values) => values.kind === "prompt" || values.kind === "output",
        hint: "Se conservan los espacios, así que podés alinear cuadros y columnas.",
      },
      {
        key: "accent",
        label: "Color",
        type: "select",
        defaultValue: "",
        showIf: (values) => values.kind === "output",
        options: [
          { value: "", label: "Normal" },
          { value: "cyan", label: "Cian" },
          { value: "green", label: "Verde" },
        ],
      },
    ],
    summarize: (row) => {
      const kind = text(row, "kind");
      const content = text(row, "text");
      switch (kind) {
        case "prompt":
          return { leading: "$", title: content.trim() || "(vacío)", meta: "Comando" };
        case "output":
          return { leading: ">", title: content.trim() || "(vacío)", meta: "Salida" };
        case "blank":
          return { leading: "·", title: "Línea en blanco", meta: "Separador" };
        default:
          return { leading: "_", title: "Cursor", meta: "Cursor final" };
      }
    },
  },
};

export const RESOURCE_LIST: ResourceDef[] = Object.values(RESOURCES);

/* ───────────────────── perfil y ajustes (fila única) ───────────────── */

export interface FieldGroup {
  title: string;
  description: string;
  fields: Field[];
}

export const PROFILE_GROUPS: FieldGroup[] = [
  {
    title: "Presentación",
    description: "Lo primero que ve quien entra al sitio.",
    fields: [
      { key: "highlighted_name", label: "Nombre destacado", type: "text", half: true, hint: "Va resaltado, arriba." },
      { key: "name", label: "Apellido o nombre completo", type: "text", required: true, half: true },
      { key: "role", label: "Rol", type: "text", placeholder: "IT Field JR · Bahía Blanca, ARG" },
      { key: "tagline", label: "Frase de disponibilidad", type: "text", placeholder: "// disponible para nuevos desafíos" },
      { key: "location", label: "Ubicación", type: "text" },
      { key: "description", label: "Descripción", type: "textarea", rows: 4 },
    ],
  },
  {
    title: "Contacto",
    description: "Texto que acompaña a los botones de contacto.",
    fields: [{ key: "contact_intro", label: "Introducción", type: "textarea", rows: 3 }],
  },
  {
    title: "Terminal",
    description: "Marco de la terminal del inicio. Las líneas se editan en la sección Terminal.",
    fields: [
      { key: "terminal_prompt", label: "Prompt", type: "text", half: true, preserveSpaces: true, placeholder: "PS usuario@equipo:~> " },
      { key: "terminal_title", label: "Título de la ventana", type: "text", half: true },
    ],
  },
  {
    title: "Sitio y buscadores",
    description: "Título de la pestaña, descripción para Google y pie de página.",
    fields: [
      { key: "site_title", label: "Título del sitio", type: "text" },
      { key: "site_description", label: "Descripción para buscadores", type: "textarea", rows: 3 },
      { key: "footer_text", label: "Pie de página", type: "text" },
    ],
  },
];

export const PROFILE_FIELDS: Field[] = PROFILE_GROUPS.flatMap((group) => group.fields);

/* ──────────────────── conversión formulario ⇄ base de datos ────────── */

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

/** Posición (1 = primero) que ocupa o ocuparía una fila. */
export function defaultPosition(def: ResourceDef, total: number, currentIndex: number | null): number {
  if (currentIndex !== null) return currentIndex + 1;
  return def.newItemAt === "first" ? 1 : total + 1;
}
