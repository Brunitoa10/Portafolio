import type { Project } from "@/types";
import { projectKindLabel } from "@/lib/projectMeta";
import { ProjectLinks, ProjectTags, StatusBadge } from "./ProjectMeta";

/** Tarjeta grande para los proyectos destacados. */
export function ProjectCard({
  name,
  icon,
  description,
  tags,
  links,
  category,
  subcategory,
  status,
  imageUrl,
}: Project) {
  return (
    <article className="proj-feature" data-category={category}>
      <div className="proj-visual">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={`Captura de ${name}`} loading="lazy" />
        ) : (
          <span className="proj-visual-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="proj-visual-category">{projectKindLabel(category, subcategory)}</span>
      </div>

      <div className="proj-feature-body">
        <div className="proj-feature-head">
          <h3 className="proj-name">{name}</h3>
          <StatusBadge status={status} />
        </div>
        {description && <p className="proj-desc">{description}</p>}
        <ProjectTags tags={tags} />
        <ProjectLinks links={links} />
      </div>
    </article>
  );
}
