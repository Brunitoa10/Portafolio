import { Section } from "@/components/layout/Section";
import { getAbout, getStats } from "@/lib/queries";
import { parseInlineBold } from "@/lib/parseInlineBold";
import { StatCard } from "./StatCard";

export async function About() {
  const [paragraphs, stats] = await Promise.all([getAbout(), getStats()]);

  return (
    <Section id="sobre-mi" eyebrow="// 01 · sobre mí" title="¿Quién es Bruno?">
      <div className="about-grid">
        <div className="about-text">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{parseInlineBold(paragraph)}</p>
          ))}
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={`${stat.label}-${index}`} {...stat} />
          ))}
        </div>
      </div>
    </Section>
  );
}
