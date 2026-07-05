import { Section } from "@/components/layout/Section";
import { timeline } from "@/data/timeline";
import { TimelineItem } from "./TimelineItem";

export function Experience() {
  return (
    <Section id="experiencia" eyebrow="// 04 · trayectoria" title="Experiencia">
      <div className="timeline">
        {timeline.map((entry) => (
          <TimelineItem key={entry.role} {...entry} />
        ))}
      </div>
    </Section>
  );
}
