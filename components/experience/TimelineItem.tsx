import type { TimelineEntry } from "@/types";

export function TimelineItem({ date, role, company, items }: TimelineEntry) {
  return (
    <div className="tl-item">
      <div className="tl-date">{date}</div>
      <div className="tl-role">{role}</div>
      <div className="tl-company">{company}</div>
      <ul className="tl-items">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
