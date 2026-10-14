import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { projects as fallbackProjects } from "@/data/projects";
import { timeline as fallbackTimeline } from "@/data/timeline";
import { skillCategories as fallbackSkills } from "@/data/skills";
import type { Project, SkillCategory, TimelineEntry } from "@/types";

async function getDb() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

/* ---------- Proyectos ---------- */

type ProjectRow = {
  id: number;
  name: string;
  icon: string | null;
  wide: boolean;
  link_label: string | null;
  href: string | null;
  description: string | null;
  tags: Project["tags"];
  sort_order: number;
};

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await getDb();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order")
      .order("id");

    // Si Supabase falla, el sitio sigue mostrando los datos locales
    if (error || !data) {
      console.error("getProjects:", error?.message);
      return fallbackProjects;
    }

    return (data as ProjectRow[]).map((p) => ({
      name: p.name,
      icon: p.icon ?? "",
      wide: p.wide,
      linkLabel: p.link_label ?? undefined,
      href: p.href ?? undefined,
      description: p.description ?? "",
      tags: p.tags,
    }));
  } catch (e) {
    console.error("getProjects:", e);
    return fallbackProjects;
  }
}

/* ---------- Experiencia ---------- */

type TimelineDbRow = {
  id: number;
  period: string;
  role: string;
  company: string;
  items: string[];
  sort_order: number;
};

export async function getTimeline(): Promise<TimelineEntry[]> {
  try {
    const supabase = await getDb();

    // Mayor sort_order primero: lo más reciente arriba
    const { data, error } = await supabase
      .from("timeline")
      .select("*")
      .order("sort_order", { ascending: false })
      .order("id", { ascending: false });

    if (error || !data) {
      console.error("getTimeline:", error?.message);
      return fallbackTimeline;
    }

    return (data as TimelineDbRow[]).map((t) => ({
      date: t.period,
      role: t.role,
      company: t.company,
      items: t.items,
    }));
  } catch (e) {
    console.error("getTimeline:", e);
    return fallbackTimeline;
  }
}

/* ---------- Skills ---------- */

type SkillDbRow = {
  id: number;
  label: string;
  accent: SkillCategory["accent"];
  items: string[];
  sort_order: number;
};

export async function getSkills(): Promise<SkillCategory[]> {
  try {
    const supabase = await getDb();

    const { data, error } = await supabase
      .from("skill_categories")
      .select("*")
      .order("sort_order")
      .order("id");

    if (error || !data) {
      console.error("getSkills:", error?.message);
      return fallbackSkills;
    }

    return (data as SkillDbRow[]).map((s) => ({
      label: s.label,
      accent: s.accent,
      items: s.items,
    }));
  } catch (e) {
    console.error("getSkills:", e);
    return fallbackSkills;
  }
}