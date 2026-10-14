import { text } from "../helpers";
import type { ResourceDef } from "../types";

export const contactResource: ResourceDef = {
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
};
