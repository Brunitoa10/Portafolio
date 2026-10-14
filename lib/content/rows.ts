import type { AccentColor, Project, ProjectLink, TerminalLine } from "@/types";

/** Forma de cada fila tal como está en la base de datos. */

export interface ProjectRow {
  name: string;
  icon: string | null;
  wide: boolean;
  link_label: string | null;
  href: string | null;
  description: string | null;
  tags: Project["tags"] | null;
  /** Puede faltar si todavía no se ejecutó la migración de enlaces. */
  links?: ProjectLink[] | null;
}

export interface SkillRow {
  label: string;
  accent: AccentColor;
  items: string[] | null;
}

export interface TimelineRow {
  period: string;
  role: string;
  company: string;
  items: string[] | null;
}

export interface AboutRow {
  content: string;
}

export interface StatRow {
  value: string;
  label: string;
}

export interface ContactRow {
  icon: string;
  label: string;
  href: string;
  external: boolean;
}

export interface TerminalRow {
  kind: TerminalLine["kind"];
  text: string | null;
  accent: AccentColor | null;
}

export interface ProfileRow {
  name: string;
  highlighted_name: string | null;
  role: string | null;
  location: string | null;
  tagline: string | null;
  description: string | null;
  contact_intro: string | null;
  terminal_prompt: string | null;
  terminal_title: string | null;
  footer_text: string | null;
  site_title: string | null;
  site_description: string | null;
}
