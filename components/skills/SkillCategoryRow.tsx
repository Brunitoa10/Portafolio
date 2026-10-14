import type { SkillCategory } from "@/types";
import { Chip } from "./Chip";

export function SkillCategoryRow({ label, accent, items }: SkillCategory) {
  return (
    <article className={`skill-cat${accent === "cyan" ? " cyan" : ""}`}>
      <header className="skill-cat-head">
        <h3 className="skill-cat-label">{label}</h3>
        <span className="skill-cat-count">{items.length}</span>
      </header>
      <ul className="chips">
        {items.map((item, index) => (
          <Chip key={`${item}-${index}`} label={item} />
        ))}
      </ul>
    </article>
  );
}
