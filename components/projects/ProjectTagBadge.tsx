import type { ProjectTag } from "@/types";

export function ProjectTagBadge({ label, accent }: ProjectTag) {
  return <span className={`ptag ptag-${accent === "cyan" ? "c" : "g"}`}>{label}</span>;
}
