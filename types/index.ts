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

export interface Project {
  name: string;
  icon: string;
  description: string;
  tags: ProjectTag[];
  wide?: boolean;
  linkLabel?: string;
  href?: string;
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
