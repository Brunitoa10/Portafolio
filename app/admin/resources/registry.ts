import { aboutResource } from "./definitions/about";
import { contactResource } from "./definitions/contact";
import { projectsResource } from "./definitions/projects";
import { skillsResource } from "./definitions/skills";
import { statsResource } from "./definitions/stats";
import { terminalResource } from "./definitions/terminal";
import { timelineResource } from "./definitions/timeline";
import type { ResourceDef, ResourceKey } from "./types";

/**
 * Registro de secciones editables. Para sumar una sección nueva: crear su
 * definición en definitions/ y registrarla acá (abierto a extensión, sin
 * tocar el gestor genérico).
 */
export const RESOURCES: Record<ResourceKey, ResourceDef> = {
  about: aboutResource,
  stats: statsResource,
  skills: skillsResource,
  projects: projectsResource,
  timeline: timelineResource,
  contact: contactResource,
  terminal: terminalResource,
};

export const RESOURCE_LIST: ResourceDef[] = Object.values(RESOURCES);
