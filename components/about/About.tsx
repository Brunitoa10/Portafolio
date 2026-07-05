import { Section } from "@/components/layout/Section";
import { aboutParagraphs, stats } from "@/data/profile";
import { parseInlineBold } from "@/lib/parseInlineBold";
import { StatCard } from "./StatCard";

export function About() {
  return (
    <Section id="sobre-mi" eyebrow="// 01 · sobre mí" title="¿Quién es Bruno?">
      <div className="about-grid">
        <div className="about-text">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{parseInlineBold(paragraph)}</p>
          ))}
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </Section>
  );
}
