const NAV_LINKS = [
  { href: "#sobre-mi", label: "sobre" },
  { href: "#skills", label: "skills" },
  { href: "#proyectos", label: "proyectos" },
  { href: "#experiencia", label: "experiencia" },
  { href: "#contacto", label: "contacto" },
] as const;

export function Navbar() {
  return (
    <nav>
      <div className="nav-logo">
        <span className="accent">~/</span>parisi
      </div>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
