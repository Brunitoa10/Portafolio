/**
 * Domain types for the portfolio.
 * Keeping these separate from components/data lets both sides depend on
 * a stable contract instead of on each other (Dependency Inversion).
 */

export type AccentColor = "green" | "cyan";

/** Discriminated union consumed by the Terminal's rendering strategy map. */
export type TerminalLine =
  | { kind: "prompt"; text: string }
  | { kind: "output"; text: string; accent?: AccentColor }
  | { kind: "blank" }
  | { kind: "cursor" };

export interface SkillCategory {
  label: string;
  accent: AccentColor;
  items: string[];
}

export interface ProjectTag {
  label: string;
  accent: AccentColor;
}

/** Enlace de un proyecto (repositorio, demo web, documentación…). */
export interface ProjectLink {
  label: string;
  url: string;
}

export type ProjectCategory = "web" | "escritorio" | "datos" | "infra" | "otros";

export type ProjectStatus = "produccion" | "desarrollo" | "completado";

export interface Project {
  name: string;
  icon: string;
  description: string;
  tags: ProjectTag[];
  links: ProjectLink[];
  category: ProjectCategory;
  /** Tipo dentro de la categoría: Juegos, Gestión, E-commerce… (texto libre). */
  subcategory?: string;
  status: ProjectStatus;
  /** Se muestra como tarjeta grande, con imagen. */
  featured: boolean;
  /** Captura o portada (URL). Si falta, se dibuja una portada con el ícono. */
  imageUrl?: string;
}

export interface TimelineEntry {
  date: string;
  role: string;
  company: string;
  items: string[];
}

export type ContactIconName = "github" | "email" | "linkedin";

export interface ContactLink {
  icon: ContactIconName;
  label: string;
  href: string;
  external?: boolean;
}

export interface Profile {
  name: string;
  highlightedName: string;
  role: string;
  location: string;
  tagline: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}

/** Textos generales del sitio que no pertenecen a una sección en particular. */
export interface SiteSettings {
  contactIntro: string;
  terminalPrompt: string;
  terminalTitle: string;
  footerText: string;
  siteTitle: string;
  siteDescription: string;
}

export interface TerminalContent {
  lines: TerminalLine[];
  prompt: string;
  title: string;
}

export interface ContactContent {
  intro: string;
  links: ContactLink[];
}
