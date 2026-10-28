import type { ProjectCategory, ProjectStatus } from "@/types";

/** Etiquetas de categorías y estados de proyecto (sitio público y panel). */

export const PROJECT_CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "web", label: "Web" },
  { value: "escritorio", label: "Escritorio" },
  { value: "datos", label: "Datos & IA" },
  { value: "infra", label: "Infraestructura" },
  { value: "otros", label: "Otros" },
];

export const PROJECT_STATUSES: { value: ProjectStatus; label: string }[] = [
  { value: "produccion", label: "En producción" },
  { value: "desarrollo", label: "En desarrollo" },
  { value: "completado", label: "Completado" },
];

const labelOf = <T extends string>(options: { value: T; label: string }[], value: T): string =>
  options.find((option) => option.value === value)?.label ?? value;

export const categoryLabel = (value: ProjectCategory): string => labelOf(PROJECT_CATEGORIES, value);
export const statusLabel = (value: ProjectStatus): string => labelOf(PROJECT_STATUSES, value);

/** «Escritorio · Juegos»: categoría y, si hay, su tipo. */
export const projectKindLabel = (category: ProjectCategory, subcategory?: string): string =>
  subcategory ? `${categoryLabel(category)} · ${subcategory}` : categoryLabel(category);
