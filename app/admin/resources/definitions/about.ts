import { clip, text } from "../helpers";
import type { ResourceDef } from "../types";

export const aboutResource: ResourceDef = {
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
};
