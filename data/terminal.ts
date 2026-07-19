import type { TerminalLine } from "@/types";

/**
 * Scripted lines the fake terminal "types" on mount.
 * Each entry is a plain data object; the rendering strategy for a given
 * `kind` lives in lib/terminalLineRenderers.tsx, not here.
 */
export const terminalLines: TerminalLine[] = [
  { kind: "prompt", text: "whoami" },
  { kind: "output", text: "Bruno Ariel Parisi" },
  { kind: "blank" },
  { kind: "prompt", text: "Get-Content .\\perfil.txt" },
  { kind: "output", text: "┌─────────────────────────────────────┐" },
  { kind: "output", text: "  Rol     : IT Field JR                ", accent: "cyan" },
  { kind: "output", text: "  Empresa : TIVIT · Bunge BB           " },
  { kind: "output", text: "  Stack   : Bash · Powershell          " },
  { kind: "output", text: "  Lugar   : Bahía Blanca, Argentina    " },
  { kind: "output", text: "└─────────────────────────────────────┘" },
  { kind: "blank" },
  { kind: "prompt", text: "Get-ChildItem .\\proyectos\\" },
  { kind: "output", text: "Field/  prometeo/  topology-docs/  inventario/", accent: "cyan" },
  { kind: "blank" },
  { kind: "cursor" },
];

export const TERMINAL_PROMPT = "PS bruno@prometeo:~> ";
export const TERMINAL_TITLE = "prometeo — powershell — 80×24";