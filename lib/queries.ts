import { cache } from "react";
import type {
  ContactContent,
  Profile,
  Project,
  SiteSettings,
  SkillCategory,
  StatItem,
  TerminalContent,
  TerminalLine,
  TimelineEntry,
} from "@/types";
import { DEFAULT_SETTINGS, fallbacks } from "@/lib/content/fallbacks";
import {
  toAboutParagraph,
  toContactLinks,
  toProfile,
  toProject,
  toSettings,
  toSkill,
  toStat,
  toTerminalLine,
  toTimelineEntry,
} from "@/lib/content/mappers";
import { createListRepository, createRawListReader } from "@/lib/content/repositories";
import type {
  AboutRow,
  ContactRow,
  ProfileRow,
  ProjectRow,
  SkillRow,
  StatRow,
  TerminalRow,
  TimelineRow,
} from "@/lib/content/rows";
import { supabaseSource } from "@/lib/content/source";

/**
 * Fachada de lectura del contenido público.
 *
 * Los componentes llaman a estas funciones y no saben de dónde salen los
 * datos. Cada una está envuelta en `cache` para que una misma petición no
 * repita consultas. Si Supabase falla se usa el contenido local de data/.
 */

const source = supabaseSource;

const projectsRepo = createListRepository<ProjectRow, Project>(source, {
  table: "projects",
  direction: "asc",
  fallback: fallbacks.projects,
  map: toProject,
});

const skillsRepo = createListRepository<SkillRow, SkillCategory>(source, {
  table: "skill_categories",
  direction: "asc",
  fallback: fallbacks.skills,
  map: toSkill,
});

// Experiencia: mayor sort_order = aparece primero.
const timelineRepo = createListRepository<TimelineRow, TimelineEntry>(source, {
  table: "timeline",
  direction: "desc",
  fallback: fallbacks.timeline,
  map: toTimelineEntry,
});

const aboutRepo = createListRepository<AboutRow, string>(source, {
  table: "about_paragraphs",
  direction: "asc",
  fallback: fallbacks.about,
  map: toAboutParagraph,
});

const statsRepo = createListRepository<StatRow, StatItem>(source, {
  table: "stats",
  direction: "asc",
  fallback: fallbacks.stats,
  map: toStat,
});

const terminalRepo = createListRepository<TerminalRow, TerminalLine>(source, {
  table: "terminal_lines",
  direction: "asc",
  fallback: fallbacks.terminalLines,
  map: toTerminalLine,
});

const readContactRows = createRawListReader<ContactRow>(source, "contact_links", "asc");

export const getProjects = cache(() => projectsRepo.findAll());
export const getSkills = cache(() => skillsRepo.findAll());
export const getTimeline = cache(() => timelineRepo.findAll());
export const getAbout = cache(() => aboutRepo.findAll());
export const getStats = cache(() => statsRepo.findAll());

/* ---------- Perfil y ajustes (una sola fila compartida) ---------- */

const getProfileRow = cache(async (): Promise<ProfileRow | null> => {
  const row = await source.readSingle<ProfileRow>("profile", 1);
  return row ?? null;
});

export const getProfile = cache(async (): Promise<Profile> => {
  const row = await getProfileRow();
  return row ? toProfile(row) : fallbacks.profile;
});

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const row = await getProfileRow();
  return row ? toSettings(row, DEFAULT_SETTINGS) : DEFAULT_SETTINGS;
});

/* ---------- Contenidos que combinan varias fuentes ---------- */

export const getContact = cache(async (): Promise<ContactContent> => {
  const [rows, settings] = await Promise.all([readContactRows(), getSettings()]);
  return {
    intro: settings.contactIntro,
    links: rows ? toContactLinks(rows) : fallbacks.contactLinks,
  };
});

export const getTerminal = cache(async (): Promise<TerminalContent> => {
  const [lines, settings] = await Promise.all([terminalRepo.findAll(), getSettings()]);
  return {
    lines,
    prompt: settings.terminalPrompt,
    title: settings.terminalTitle,
  };
});
