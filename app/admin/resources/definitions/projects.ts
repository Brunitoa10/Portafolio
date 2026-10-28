import { PROJECT_CATEGORIES, PROJECT_STATUSES, projectKindLabel, statusLabel } from "@/lib/projectMeta";
import type { ProjectCategory, ProjectStatus } from "@/types";
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
    {
      key: "category",
      label: "Categoría",
      type: "select",
      half: true,
      defaultValue: "web",
      options: PROJECT_CATEGORIES,
    },
    {
      key: "subcategory",
      label: "Tipo",
      type: "text",
      placeholder: "Juegos, Gestión, E-commerce…",
      hint: "Texto libre. Con él se arma el segundo filtro del sitio: usá siempre la misma palabra para agrupar.",
    },
    {
      key: "status",
      label: "Estado",
      type: "select",
      half: true,
      defaultValue: "desarrollo",
      options: PROJECT_STATUSES,
    },
    { key: "description", label: "Descripción", type: "textarea", rows: 4 },
    {
      key: "image_url",
      label: "Imagen de portada (opcional)",
      type: "url",
      placeholder: "https://… (captura o portada del proyecto)",
      hint: "Si la dejás vacía, la tarjeta muestra una portada con el ícono.",
    },
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
      label: "Destacado (tarjeta grande con imagen)",
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
        projectKindLabel(text(row, "category") as ProjectCategory, text(row, "subcategory")),
        statusLabel(text(row, "status") as ProjectStatus),
        links ? `${links} ${links === 1 ? "enlace" : "enlaces"}` : "",
        tags.join(", "),
      ]
        .filter(Boolean)
        .join(" · "),
    };
  },
};
