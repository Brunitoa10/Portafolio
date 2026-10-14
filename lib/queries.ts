import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { projects as fallbackProjects } from "@/data/projects";
import { skillCategories as fallbackSkills } from "@/data/skills";
import { timeline as fallbackTimeline } from "@/data/timeline";
import {
  aboutParagraphs as fallbackAbout,
  profile as fallbackProfile,
  stats as fallbackStats,
} from "@/data/profile";
import {
  contactIntro as fallbackContactIntro,
  contactLinks as fallbackContactLinks,
} from "@/data/contact";
import {
  terminalLines as fallbackTerminalLines,
  TERMINAL_PROMPT,
  TERMINAL_TITLE,
} from "@/data/terminal";
import type {
  AccentColor,
  ContactContent,
  ContactIconName,
  ContactLink,
  Profile,
  Project,
  SiteSettings,
  SkillCategory,
  StatItem,
  TerminalContent,
  TerminalLine,
  TimelineEntry,
} from "@/types";

/**
 * Lectura del contenido público desde Supabase.
 *
 * Regla general: si Supabase falla (variables sin cargar, red, tabla
 * inexistente), el sitio sigue mostrando los datos locales de data/.
 * Si la consulta funciona y la tabla está vacía, la sección queda vacía:
 * lo que borrás desde el panel no reaparece.
 */

type SortDirection = "asc" | "desc";

async function readTable<Row>(
  table: string,
  direction: SortDirection = "asc"
): Promise<Row[] | null> {
  try {
    const ascending = direction === "asc";
    const { data, error } = await createPublicClient()
      .from(table)
      .select("*")
      .order("sort_order", { ascending })
      .order("id", { ascending });

    if (error || !data) {
      console.error(`[queries] ${table}:`, error?.message);
      return null;
    }
    return data as Row[];
  } catch (error) {
    console.error(`[queries] ${table}:`, error);
    return null;
  }
}

async function readMapped<Row, Item>(
  table: string,
  direction: SortDirection,
  fallback: Item[],
  toItem: (row: Row) => Item
): Promise<Item[]> {
  const rows = await readTable<Row>(table, direction);
  return rows ? rows.map(toItem) : fallback;
}

/* ---------- Proyectos ---------- */

interface ProjectRow {
  name: string;
  icon: string | null;
  wide: boolean;
  link_label: string | null;
  href: string | null;
  description: string | null;
  tags: Project["tags"] | null;
}

const toProject = (row: ProjectRow): Project => ({
  name: row.name,
  icon: row.icon ?? "",
  wide: row.wide,
  linkLabel: row.link_label ?? undefined,
  href: row.href ?? undefined,
  description: row.description ?? "",
  tags: row.tags ?? [],
});

export const getProjects = cache(() =>
  readMapped<ProjectRow, Project>("projects", "asc", fallbackProjects, toProject)
);

/* ---------- Skills ---------- */

interface SkillRow {
  label: string;
  accent: AccentColor;
  items: string[] | null;
}

const toSkill = (row: SkillRow): SkillCategory => ({
  label: row.label,
  accent: row.accent,
  items: row.items ?? [],
});

export const getSkills = cache(() =>
  readMapped<SkillRow, SkillCategory>("skill_categories", "asc", fallbackSkills, toSkill)
);

/* ---------- Experiencia (lo más reciente primero) ---------- */

interface TimelineRow {
  period: string;
  role: string;
  company: string;
  items: string[] | null;
}

const toTimelineEntry = (row: TimelineRow): TimelineEntry => ({
  date: row.period,
  role: row.role,
  company: row.company,
  items: row.items ?? [],
});

export const getTimeline = cache(() =>
  readMapped<TimelineRow, TimelineEntry>("timeline", "desc", fallbackTimeline, toTimelineEntry)
);

/* ---------- Sobre mí y estadísticas ---------- */

export const getAbout = cache(() =>
  readMapped<{ content: string }, string>(
    "about_paragraphs",
    "asc",
    fallbackAbout,
    (row) => row.content
  )
);

export const getStats = cache(() =>
  readMapped<StatItem, StatItem>("stats", "asc", fallbackStats, (row) => ({
    value: row.value,
    label: row.label,
  }))
);

/* ---------- Perfil y ajustes del sitio (una sola fila) ---------- */

interface ProfileRow {
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

const getProfileRow = cache(async (): Promise<ProfileRow | null> => {
  try {
    const { data, error } = await createPublicClient()
      .from("profile")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("[queries] profile:", error.message);
      return null;
    }
    return (data as ProfileRow | null) ?? null;
  } catch (error) {
    console.error("[queries] profile:", error);
    return null;
  }
});

export const getProfile = cache(async (): Promise<Profile> => {
  const row = await getProfileRow();
  if (!row) return fallbackProfile;

  return {
    name: row.name,
    highlightedName: row.highlighted_name ?? "",
    role: row.role ?? "",
    location: row.location ?? "",
    tagline: row.tagline ?? "",
    description: row.description ?? "",
  };
});

const DEFAULT_SETTINGS: SiteSettings = {
  contactIntro: fallbackContactIntro,
  terminalPrompt: TERMINAL_PROMPT,
  terminalTitle: TERMINAL_TITLE,
  footerText:
    "Bruno Ariel Parisi · construido con Next.js, TypeScript & React · Bahía Blanca, Argentina",
  siteTitle: "Bruno Ariel Parisi · IT Specialist",
  siteDescription:
    "Portfolio de Bruno Ariel Parisi — IT Field Specialist en Bahía Blanca, Argentina.",
};

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const row = await getProfileRow();
  if (!row) return DEFAULT_SETTINGS;

  return {
    contactIntro: row.contact_intro ?? "",
    terminalPrompt: row.terminal_prompt ?? "",
    terminalTitle: row.terminal_title ?? "",
    footerText: row.footer_text ?? DEFAULT_SETTINGS.footerText,
    siteTitle: row.site_title ?? DEFAULT_SETTINGS.siteTitle,
    siteDescription: row.site_description ?? DEFAULT_SETTINGS.siteDescription,
  };
});

/* ---------- Contacto ---------- */

interface ContactRow {
  icon: string;
  label: string;
  href: string;
  external: boolean;
}

const CONTACT_ICONS: readonly ContactIconName[] = ["github", "email", "linkedin"];

const isContactIcon = (value: string): value is ContactIconName =>
  (CONTACT_ICONS as readonly string[]).includes(value);

const toContactLinks = (rows: ContactRow[]): ContactLink[] =>
  rows
    .filter((row) => isContactIcon(row.icon))
    .map((row) => ({
      icon: row.icon as ContactIconName,
      label: row.label,
      href: row.href,
      external: row.external,
    }));

export const getContact = cache(async (): Promise<ContactContent> => {
  const [rows, settings] = await Promise.all([
    readTable<ContactRow>("contact_links", "asc"),
    getSettings(),
  ]);

  return {
    intro: settings.contactIntro,
    links: rows ? toContactLinks(rows) : fallbackContactLinks,
  };
});

/* ---------- Terminal del hero ---------- */

interface TerminalRow {
  kind: TerminalLine["kind"];
  text: string | null;
  accent: AccentColor | null;
}

function toTerminalLine(row: TerminalRow): TerminalLine {
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

export const getTerminal = cache(async (): Promise<TerminalContent> => {
  const [lines, settings] = await Promise.all([
    readMapped<TerminalRow, TerminalLine>(
      "terminal_lines",
      "asc",
      fallbackTerminalLines,
      toTerminalLine
    ),
    getSettings(),
  ]);

  return {
    lines,
    prompt: settings.terminalPrompt,
    title: settings.terminalTitle,
  };
});
