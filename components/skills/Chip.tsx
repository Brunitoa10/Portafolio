interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return <li className="chip">{label}</li>;
}
