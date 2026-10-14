import Link from "next/link";

const NAV_LINKS = [
  { href: "#sobre-mi", label: "sobre" },
  { href: "#skills", label: "skills" },
  { href: "#proyectos", label: "proyectos" },
  { href: "#experiencia", label: "experiencia" },
  { href: "#contacto", label: "contacto" },
] as const;

const CV_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cv/cv.pdf`;

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
        <li>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cv"
          >
            CV
          </a>
        </li>
        <li>
          <Link href="/admin" className="nav-login">
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
}