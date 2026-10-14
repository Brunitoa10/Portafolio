"use client";

import { useState } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

/**
 * Espacio visible antes de «Ver todos», medido en columnas de la grilla
 * (una tarjeta ancha ocupa 2). Un número par evita que quede una tarjeta
 * suelta en la última fila de escritorio.
 */
const INITIAL_COLUMNS = 8;

const columnsOf = (project: Project): number => (project.wide ? 2 : 1);

function takeInitial(projects: Project[]): Project[] {
  const taken: Project[] = [];
  let used = 0;
  for (const project of projects) {
    if (used + columnsOf(project) > INITIAL_COLUMNS) break;
    taken.push(project);
    used += columnsOf(project);
  }
  return taken;
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);

  const initial = takeInitial(projects);
  const collapsible = projects.length > initial.length;
  const visible = expanded || !collapsible ? projects : initial;
  const remaining = projects.length - initial.length;

  return (
    <>
      <div className="projects-layout">
        {visible.map((project, index) => (
          <ProjectCard key={`${project.name}-${index}`} {...project} />
        ))}
      </div>

      {collapsible && (
        <div className="projects-more">
          <button
            type="button"
            className="projects-more-btn"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Mostrar menos" : `Ver los ${remaining} proyectos restantes`}
          </button>
        </div>
      )}
    </>
  );
}
