import type {
  ContactIconName,
  ContactLink,
  Profile,
  Project,
  ProjectLink,
  SiteSettings,
  SkillCategory,
  StatItem,
  TerminalLine,
  TimelineEntry,
} from "@/types";
import type {
  AboutRow,
  ContactRow,
  ProfileRow,
  ProjectRow,
  SkillRow,
  StatRow,
  TerminalRow,
  TimelineRow,
} from "./rows";

/** Funciones puras: fila de la base → modelo del sitio. */

/**
 * Enlaces del proyecto. Mientras la columna `links` no exista (migración
 * pendiente) se usa el enlace único anterior; una vez migrada, `links`
 * manda aunque esté vacía.
 */
function toProjectLinks(row: ProjectRow): ProjectLink[] {
  if (row.links) return row.links.filter((link) => link.label && link.url);
  return row.href ? [{ label: row.link_label || "Enlace", url: row.href }] : [];
}

export const toProject = (row: ProjectRow): Project => ({
  name: row.name,
  icon: row.icon ?? "",
  featured: row.wide,
  category: row.category === "juegos" ? "escritorio" : (row.category ?? "otros"),
  subcategory: row.subcategory ?? (row.category === "juegos" ? "Juegos" : undefined),
  status: row.status ?? "completado",
  imageUrl: row.image_url ?? undefined,
  description: row.description ?? "",
  tags: row.tags ?? [],
  links: toProjectLinks(row),
});

export const toSkill = (row: SkillRow): SkillCategory => ({
  label: row.label,
  accent: row.accent,
  items: row.items ?? [],
});

export const toTimelineEntry = (row: TimelineRow): TimelineEntry => ({
  date: row.period,
  role: row.role,
  company: row.company,
  items: row.items ?? [],
});

export const toAboutParagraph = (row: AboutRow): string => row.content;

export const toStat = (row: StatRow): StatItem => ({
  value: row.value,
  label: row.label,
});

const CONTACT_ICONS: readonly ContactIconName[] = ["github", "email", "linkedin"];

const isContactIcon = (value: string): value is ContactIconName =>
  (CONTACT_ICONS as readonly string[]).includes(value);

/** Descarta los enlaces con un ícono que el sitio no sabe dibujar. */
export const toContactLinks = (rows: ContactRow[]): ContactLink[] =>
  rows
    .filter((row) => isContactIcon(row.icon))
    .map((row) => ({
      icon: row.icon as ContactIconName,
      label: row.label,
      href: row.href,
      external: row.external,
    }));

export function toTerminalLine(row: TerminalRow): TerminalLine {
  switch (row.kind) {
    case "prompt":
      return { kind: "prompt", text: row.text ?? "" };
    case "output":
      return { kind: "output", text: row.text ?? "", accent: row.accent ?? undefined };
    case "blank":
      return { kind: "blank" };
    default:
      return { kind: "cursor" };
  }
}

export const toProfile = (row: ProfileRow): Profile => ({
  name: row.name,
  highlightedName: row.highlighted_name ?? "",
  role: row.role ?? "",
  location: row.location ?? "",
  tagline: row.tagline ?? "",
  description: row.description ?? "",
});

export const toSettings = (row: ProfileRow, defaults: SiteSettings): SiteSettings => ({
  contactIntro: row.contact_intro ?? "",
  terminalPrompt: row.terminal_prompt ?? "",
  terminalTitle: row.terminal_title ?? "",
  footerText: row.footer_text ?? defaults.footerText,
  siteTitle: row.site_title ?? defaults.siteTitle,
  siteDescription: row.site_description ?? defaults.siteDescription,
});
