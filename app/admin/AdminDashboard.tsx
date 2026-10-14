"use client";

import { useState } from "react";
import Link from "next/link";
import CvUploader from "./CvUploader";
import LogoutButton from "./LogoutButton";
import ProjectsManager, { type ProjectRow } from "./ProjectsManager";
import ExperienceManager, { type TimelineRow } from "./ExperienceManager";
import SkillsManager, { type SkillRow } from "./SkillsManager";
import styles from "./admin.module.css";

type Tab = "resumen" | "proyectos" | "experiencia" | "skills" | "cv";

const CV_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cv/cv.pdf`;

const HEADERS: Record<Tab, { title: string; subtitle: string }> = {
  resumen: {
    title: "Resumen",
    subtitle: "Estado general del contenido publicado en el sitio.",
  },
  proyectos: {
    title: "Proyectos",
    subtitle: "Alta, edición y baja de los proyectos del portafolio.",
  },
  experiencia: {
    title: "Experiencia",
    subtitle: "Puestos y formación que se muestran en la línea de tiempo.",
  },
  skills: {
    title: "Skills",
    subtitle: "Categorías y tecnologías que se muestran en la sección de habilidades.",
  },
  cv: {
    title: "Currículum",
    subtitle: "Documento PDF disponible para descarga pública.",
  },
};

export default function AdminDashboard({
  email,
  projects,
  timeline,
  skills,
}: {
  email: string;
  projects: ProjectRow[];
  timeline: TimelineRow[];
  skills: SkillRow[];
}) {
  const [tab, setTab] = useState<Tab>("resumen");

  const navItems: { key: Tab; label: string; count?: number }[] = [
    { key: "resumen", label: "Resumen" },
    { key: "proyectos", label: "Proyectos", count: projects.length },
    { key: "experiencia", label: "Experiencia", count: timeline.length },
    { key: "skills", label: "Skills", count: skills.length },
    { key: "cv", label: "Currículum" },
  ];

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.accent}>~/</span>parisi
          </span>
          <span className={styles.brandTag}>Admin</span>
        </div>

        <div className={styles.nav} role="navigation" aria-label="Secciones">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              aria-current={tab === item.key ? "page" : undefined}
              className={`${styles.navItem} ${
                tab === item.key ? styles.navItemActive : ""
              }`}
            >
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span className={styles.navCount}>{item.count}</span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.sidebarFooter}>
          <p className={styles.userEmail}>{email}</p>
          <Link href="/" className={styles.ghostBtn}>
            Ver sitio
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <div className={styles.content}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{HEADERS[tab].title}</h1>
          <p className={styles.pageSubtitle}>{HEADERS[tab].subtitle}</p>
        </div>

        {tab === "resumen" && (
          <>
            <div className={styles.kpis}>
              <div className={styles.kpi}>
                <span className={styles.kpiLabel}>Proyectos publicados</span>
                <span className={styles.kpiValue}>{projects.length}</span>
              </div>
              <div className={styles.kpi}>
                <span className={styles.kpiLabel}>Registros de experiencia</span>
                <span className={styles.kpiValue}>{timeline.length}</span>
              </div>
              <div className={styles.kpi}>
                <span className={styles.kpiLabel}>Categorías de skills</span>
                <span className={styles.kpiValue}>{skills.length}</span>
              </div>
              <div className={styles.kpi}>
                <span className={styles.kpiLabel}>Currículum</span>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.kpiLink}
                >
                  Ver documento actual →
                </a>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Acciones rápidas</h2>
              <div className={styles.quick}>
                <button className={styles.primaryBtn} onClick={() => setTab("experiencia")}>
                  + Agregar puesto
                </button>
                <button className={styles.ghostBtn} onClick={() => setTab("proyectos")}>
                  Gestionar proyectos
                </button>
                <button className={styles.ghostBtn} onClick={() => setTab("skills")}>
                  Gestionar skills
                </button>
                <button className={styles.ghostBtn} onClick={() => setTab("cv")}>
                  Actualizar CV
                </button>
              </div>
            </div>
          </>
        )}

        {tab === "proyectos" && <ProjectsManager projects={projects} />}
        {tab === "experiencia" && <ExperienceManager entries={timeline} />}
        {tab === "skills" && <SkillsManager skills={skills} />}
        {tab === "cv" && <CvUploader />}
      </div>
    </div>
  );
}