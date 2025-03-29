"use client";

const botones = [
  { label: "+ Info", path: "/sobreMi" },
  { label: "Contacto", path: "/contacto" },
  { label: "Proyectos", path: "/proyectos" }
];

export function ButtonsAboutMe() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {botones.map(({ label, path }) => (
        <a key={path} href={path} className="btnAboutMe">
          {label}
        </a>
      ))}
    </div>
  );
}
