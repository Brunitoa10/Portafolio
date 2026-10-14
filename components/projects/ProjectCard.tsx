import type { Project } from "@/types";
import { ProjectTagBadge } from "./ProjectTagBadge";

/** Etiquetas visibles por tarjeta; el resto se resume como «+n». */
const MAX_TAGS = 5;

export function ProjectCard({ name, icon, description, tags, wide, links }: Project) {
  const visibleTags = tags.slice(0, MAX_TAGS);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <article className={`proj-card${wide ? " wide" : ""}`}>
      <header className="proj-top">
        <h3 className="proj-name">
          {icon && (
            <span className="proj-icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{name}</span>
        </h3>
        {links.length > 0 && (
          <div className="proj-links">
            {links.map((link, index) => (
              <a
                key={`${link.url}-${index}`}
                href={link.url}
                className="proj-link-btn"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {description && <p className="proj-desc">{description}</p>}

      {tags.length > 0 && (
        <ul className="proj-tags">
          {visibleTags.map((tag, index) => (
            <li key={`${tag.label}-${index}`}>
              <ProjectTagBadge {...tag} />
            </li>
          ))}
          {hiddenCount > 0 && (
            <li>
              <span className="ptag ptag-more">+{hiddenCount}</span>
            </li>
          )}
        </ul>
      )}
    </article>
  );
}
