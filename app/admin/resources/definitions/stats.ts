import { text } from "../helpers";
import type { ResourceDef } from "../types";

export const statsResource: ResourceDef = {
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
};
