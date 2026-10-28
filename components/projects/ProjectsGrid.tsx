"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types";
import { PROJECT_CATEGORIES } from "@/lib/projectMeta";
import { ProjectCard } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";

/** Filas visibles antes de «Ver todos». */
const INITIAL_ROWS = 8;

const ALL_KINDS = "";

type Filter = ProjectCategory | "todos";

interface FilterOption<T extends string> {
  value: T;
  label: string;
  count: number;
}

/** Cuenta cuántos proyectos hay por cada valor, manteniendo el orden de aparición. */
function countBy<T>(items: Project[], pick: (project: Project) => T | undefined): Map<T, number> {
  const counts = new Map<T, number>();
  items.forEach((project) => {
    const key = pick(project);
    if (key !== undefined) counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return counts;
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [kind, setKind] = useState<string>(ALL_KINDS);
  const [expanded, setExpanded] = useState(false);

  // Solo se ofrecen las categorías que tienen proyectos.
  const filters = useMemo<FilterOption<Filter>[]>(() => {
    const counts = countBy(projects, (p) => p.category);
    const present = PROJECT_CATEGORIES.filter((c) => counts.has(c.value)).map((c) => ({
      value: c.value as Filter,
      label: c.label,
      count: counts.get(c.value) ?? 0,
    }));
    return [{ value: "todos", label: "Todos", count: projects.length }, ...present];
  }, [projects]);

  // Tipos (Juegos, Gestión, E-commerce…) de la categoría elegida.
  const kinds = useMemo<FilterOption<string>[]>(() => {
    if (filter === "todos") return [];
    const inCategory = projects.filter((p) => p.category === filter);
    const counts = countBy(inCategory, (p) => p.subcategory?.trim() || undefined);
    if (counts.size < 2) return [];

    const options = Array.from(counts, ([value, count]) => ({ value, label: value, count }));
    return [{ value: ALL_KINDS, label: "Todos los tipos", count: inCategory.length }, ...options];
  }, [projects, filter]);

  const byCategory = filter === "todos" ? projects : projects.filter((p) => p.category === filter);
  const shown = kind === ALL_KINDS ? byCategory : byCategory.filter((p) => p.subcategory?.trim() === kind);
  const featured = shown.filter((p) => p.featured);
  const others = shown.filter((p) => !p.featured);

  const collapsible = others.length > INITIAL_ROWS;
  const rows = expanded || !collapsible ? others : others.slice(0, INITIAL_ROWS);

  function select(next: Filter) {
    setFilter(next);
    setKind(ALL_KINDS);
    setExpanded(false);
  }

  function selectKind(next: string) {
    setKind(next);
    setExpanded(false);
  }

  return (
    <>
      {filters.length > 2 && (
        <div className="proj-filters" role="group" aria-label="Filtrar proyectos por categoría">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              className="proj-filter"
              aria-pressed={filter === item.value}
              onClick={() => select(item.value)}
            >
              {item.label}
              <span className="proj-filter-count">{item.count}</span>
            </button>
          ))}
        </div>
      )}

      {kinds.length > 0 && (
        <div className="proj-kinds" role="group" aria-label="Filtrar proyectos por tipo">
          {kinds.map((item) => (
            <button
              key={item.value}
              type="button"
              className="proj-kind"
              aria-pressed={kind === item.value}
              onClick={() => selectKind(item.value)}
            >
              {item.label}
              <span className="proj-filter-count">{item.count}</span>
            </button>
          ))}
        </div>
      )}

      {featured.length > 0 && (
        <div className="proj-featured">
          {featured.map((project, index) => (
            <ProjectCard key={`${project.name}-${index}`} {...project} />
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <div className="proj-list">
          {featured.length > 0 && <h3 className="proj-list-title">Más proyectos</h3>}
          {rows.map((project, index) => (
            <ProjectRow key={`${project.name}-${index}`} {...project} />
          ))}
        </div>
      )}

      {collapsible && (
        <div className="projects-more">
          <button
            type="button"
            className="projects-more-btn"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Mostrar menos" : `Ver los ${others.length - INITIAL_ROWS} proyectos restantes`}
          </button>
        </div>
      )}
    </>
  );
}
