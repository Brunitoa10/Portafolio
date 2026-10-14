"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#sobre-mi", label: "sobre" },
  { href: "#skills", label: "skills" },
  { href: "#proyectos", label: "proyectos" },
  { href: "#experiencia", label: "experiencia" },
  { href: "#contacto", label: "contacto" },
] as const;

const CV_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cv/cv.pdf`;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape cierra el menú en pantallas chicas.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav data-open={open}>
      <div className="nav-logo">
        <span className="accent">~/</span>parisi
      </div>

      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" />
      </button>

      <ul className="nav-links" id="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={close}>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cv"
            onClick={close}
          >
            CV
          </a>
        </li>
        <li>
          <Link href="/admin" className="nav-login" onClick={close}>
            login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
