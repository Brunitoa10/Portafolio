import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { aboutParagraphs, profile, stats } from "@/data/profile";
import { contactIntro, contactLinks } from "@/data/contact";
import { terminalLines, TERMINAL_PROMPT, TERMINAL_TITLE } from "@/data/terminal";
import type { SiteSettings } from "@/types";

/** Contenido local que se usa cuando la base de datos no responde. */
export const fallbacks = {
  projects,
  skills: skillCategories,
  timeline,
  about: aboutParagraphs,
  stats,
  profile,
  contactLinks,
  terminalLines,
} as const;

export const DEFAULT_SETTINGS: SiteSettings = {
  contactIntro,
  terminalPrompt: TERMINAL_PROMPT,
  terminalTitle: TERMINAL_TITLE,
  footerText:
    "Bruno Ariel Parisi · construido con Next.js, TypeScript & React · Bahía Blanca, Argentina",
  siteTitle: "Bruno Ariel Parisi · IT Specialist",
  siteDescription:
    "Portfolio de Bruno Ariel Parisi — IT Field Specialist en Bahía Blanca, Argentina.",
};
