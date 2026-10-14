import { tagList, text } from "../helpers";
import type { ResourceDef } from "../types";

export const projectsResource: ResourceDef = {
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
};
