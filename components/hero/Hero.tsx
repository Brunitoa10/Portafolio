import { profile } from "@/data/profile";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-tag">{profile.tagline}</div>
          <h1 className="hero-name">
            <span className="glitch hl" data-text={profile.highlightedName}>
              {profile.highlightedName}
            </span>
            <br />
            {profile.name}
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-desc">{profile.description}</p>
          <div className="hero-actions">
            <a href="#proyectos" className="btn btn-fill">
              Ver proyectos
            </a>
            <a href="#contacto" className="btn btn-outline">
              Contacto
            </a>
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
