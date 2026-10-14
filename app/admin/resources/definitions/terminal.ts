import { text } from "../helpers";
import type { ResourceDef } from "../types";

export const terminalResource: ResourceDef = {
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
};
