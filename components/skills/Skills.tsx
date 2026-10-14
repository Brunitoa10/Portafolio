import { Section } from "@/components/layout/Section";
import { getSkills } from "@/lib/queries";
import { SkillCategoryRow } from "./SkillCategoryRow";

export async function Skills() {
  const skillCategories = await getSkills();

  return (
    <Section id="skills" eyebrow="// 02 · stack" title="Herramientas & tecnologías">
      <div className="skills-categories">
        {skillCategories.map((category, index) => (
          <SkillCategoryRow key={`${category.label}-${index}`} {...category} />
        ))}
      </div>
    </Section>
  );
}
