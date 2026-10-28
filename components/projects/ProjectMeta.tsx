import type { Project, ProjectStatus } from "@/types";
import { statusLabel } from "@/lib/projectMeta";
import { ProjectTagBadge } from "./ProjectTagBadge";

/** Etiquetas visibles por proyecto; el resto se resume como «+n». */
const MAX_TAGS = 4;

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="proj-status" data-status={status}>
      {statusLabel(status)}
    </span>
  );
}

export function ProjectTags({ tags }: Pick<Project, "tags">) {
  if (tags.length === 0) return null;

  const visible = tags.slice(0, MAX_TAGS);
  const hidden = tags.length - visible.length;

  return (
    <ul className="proj-tags">
      {visible.map((tag, index) => (
        <li key={`${tag.label}-${index}`}>
          <ProjectTagBadge {...tag} />
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <span className="ptag ptag-more">+{hidden}</span>
        </li>
      )}
    </ul>
  );
}

export function ProjectLinks({ links }: Pick<Project, "links">) {
  if (links.length === 0) return null;

  return (
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
  );
}
