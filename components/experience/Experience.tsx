import { Section } from "@/components/layout/Section";
import { getTimeline } from "@/lib/queries";
import { TimelineItem } from "./TimelineItem";

export async function Experience() {
  const timeline = await getTimeline();

  return (
    <Section id="experiencia" eyebrow="// 04 · trayectoria" title="Experiencia">
      <div className="timeline">
        {timeline.map((entry, index) => (
          <TimelineItem key={`${entry.role}-${index}`} {...entry} />
        ))}
      </div>
    </Section>
  );
}
