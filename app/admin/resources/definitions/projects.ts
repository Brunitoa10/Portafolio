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
      key: "links",
      label: "Enlaces",
      type: "links",
      suggestions: ["⌥ GitHub", "▶ Demo web", "🌐 Sitio web", "📄 Documentación"],
      hint: "Código, demo web, sitio publicado… Podés agregar todos los que quieras.",
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
    const links = Array.isArray(row.links) ? row.links.length : 0;
    return {
      leading: text(row, "icon") || "📁",
      title: text(row, "name"),
      meta: [
        row.wide ? "Destacado" : "",
        links ? `${links} ${links === 1 ? "enlace" : "enlaces"}` : "",
        tags.join(", "),
      ]
        .filter(Boolean)
        .join(" · "),
    };
  },
};
