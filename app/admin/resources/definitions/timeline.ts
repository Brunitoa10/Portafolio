import { text } from "../helpers";
import type { ResourceDef } from "../types";

export const timelineResource: ResourceDef = {
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
};
