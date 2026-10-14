import type { Field } from "./types";

/** Perfil y ajustes del sitio (tabla de una sola fila). */

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
