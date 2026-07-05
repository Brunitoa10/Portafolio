import { Section } from "@/components/layout/Section";
import { skillCategories } from "@/data/skills";
import { SkillCategoryRow } from "./SkillCategoryRow";

export function Skills() {
  return (
    <Section id="skills" eyebrow="// 02 · stack" title="Herramientas & tecnologías">
      <div className="skills-categories">
        {skillCategories.map((category) => (
          <SkillCategoryRow key={category.label} {...category} />
        ))}
      </div>
    </Section>
  );
}
