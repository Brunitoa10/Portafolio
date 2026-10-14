import { ACCENT_OPTIONS, list, text } from "../helpers";
import type { ResourceDef } from "../types";

export const skillsResource: ResourceDef = {
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
};
