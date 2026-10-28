import type { Project } from "@/types";
import { projectKindLabel } from "@/lib/projectMeta";
import { ProjectLinks, ProjectTags, StatusBadge } from "./ProjectMeta";

/** Fila compacta para el resto de los proyectos. */
export function ProjectRow({ name, icon, description, tags, links, category, subcategory, status }: Project) {
  return (
    <article className="proj-row" data-category={category}>
      <span className="proj-row-icon" aria-hidden="true">
        {icon}
      </span>

      <div className="proj-row-main">
        <div className="proj-row-head">
          <h3 className="proj-name">{name}</h3>
          <StatusBadge status={status} />
          <span className="proj-row-category">{projectKindLabel(category, subcategory)}</span>
        </div>
        {description && <p className="proj-desc">{description}</p>}
        <ProjectTags tags={tags} />
      </div>

      <ProjectLinks links={links} />
    </article>
  );
}
