import type { AccentColor } from "@/types";

interface ChipProps {
  label: string;
  accent: AccentColor;
}

export function Chip({ label, accent }: ChipProps) {
  return (
    <span className={`chip${accent === "cyan" ? " cyan" : ""}`}>
      <span className="chip-dot" />
      {label}
    </span>
  );
}
