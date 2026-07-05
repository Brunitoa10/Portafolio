import type { Project } from "@/types";
import { ProjectTagBadge } from "./ProjectTagBadge";

export function ProjectCard({ name, icon, description, tags, wide, linkLabel, href }: Project) {
  return (
    <div className={`proj-card${wide ? " wide" : ""}`}>
      <div className="proj-top">
        <span className="proj-icon">{icon}</span>
        {linkLabel && href && (
          <a href={href} className="proj-link-btn" target="_blank" rel="noreferrer">
            {linkLabel}
          </a>
        )}
      </div>
      <div className="proj-name">{name}</div>
      <p className="proj-desc">{description}</p>
      <div className="proj-tags">
        {tags.map((tag) => (
          <ProjectTagBadge key={tag.label} {...tag} />
        ))}
      </div>
    </div>
  );
}
