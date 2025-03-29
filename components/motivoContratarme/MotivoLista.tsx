"use client";

interface MotivoListaProps {
  items: string[];
}

export function MotivoLista({ items }: MotivoListaProps) {
  return (
    <ul className="text-lg text-cyan font-extrabold space-y-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
