import type { SkillCategory } from "@/types";
import { Chip } from "./Chip";

export function SkillCategoryRow({ label, accent, items }: SkillCategory) {
  return (
    <div>
      <div className="skill-cat-label">{label}</div>
      <div className="chips">
        {items.map((item) => (
          <Chip key={item} label={item} accent={accent} />
        ))}
      </div>
    </div>
  );
}
