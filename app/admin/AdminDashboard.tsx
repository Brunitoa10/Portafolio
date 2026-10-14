"use client";

import { useState } from "react";
import Link from "next/link";
import CvUploader, { type CvInfo } from "./CvUploader";
import LogoutButton from "./LogoutButton";
import Overview from "./Overview";
import ProfileEditor from "./ProfileEditor";
import ResourceManager from "./ResourceManager";
import {
  RESOURCES,
  type ResourceKey,
  type Row,
  type SingleRecord,
  type TabKey,
} from "./resources";
import { ToastProvider } from "./ui";
import styles from "./admin.module.css";

interface AdminDashboardProps {
  email: string;
  rows: Record<ResourceKey, Row[]>;
  profile: SingleRecord | null;
  cv: CvInfo | null;
  loadErrors: string[];
}

interface NavGroup {
  label: string;
  items: { key: TabKey; label: string }[];
}

const NAV: NavGroup[] = [
  {
    label: "General",
    items: [
      { key: "resumen", label: "Resumen" },
      { key: "perfil", label: "Perfil" },
    ],
  },
  {
    label: "Contenido",
    items: [
      { key: "about", label: "Sobre mí" },
      { key: "stats", label: "Estadísticas" },
      { key: "skills", label: "Skills" },
      { key: "projects", label: "Proyectos" },
      { key: "timeline", label: "Experiencia" },
    ],
  },
  {
    label: "Sitio",
    items: [
      { key: "contact", label: "Contacto" },
      { key: "terminal", label: "Terminal" },
      { key: "cv", label: "Currículum" },
    ],
  },
];

const STATIC_HEADERS: Record<"resumen" | "perfil" | "cv", { title: string; description: string }> = {
  resumen: {
    title: "Resumen",
    description: "Estado del contenido y lo que falta para dejar el sitio completo.",
  },
  perfil: {
    title: "Perfil",
    description: "Presentación, contacto, terminal, buscadores y pie de página.",
  },
  cv: {
    title: "Currículum",
    description: "El PDF que descargan quienes visitan el sitio.",
  },
};

const isResourceKey = (key: TabKey): key is ResourceKey => key in RESOURCES;

export default function AdminDashboard({ email, rows, profile, cv, loadErrors }: AdminDashboardProps) {
  const [tab, setTab] = useState<TabKey>("resumen");

  const counts = Object.fromEntries(
    (Object.keys(RESOURCES) as ResourceKey[]).map((key) => [key, rows[key].length])
  ) as Record<ResourceKey, number>;

  const header = isResourceKey(tab)
    ? { title: RESOURCES[tab].title, description: RESOURCES[tab].description }
    : STATIC_HEADERS[tab];

  return (
    <div className={styles.shell}>
      <ToastProvider>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <span className={styles.accent}>~/</span>parisi
            </span>
            <span className={styles.brandNote}>Panel de contenido</span>
          </div>

          <div className={styles.nav} role="navigation" aria-label="Secciones del panel">
            {NAV.map((group) => (
              <div key={group.label} className={styles.navGroup}>
                <p className={styles.navGroupLabel}>{group.label}</p>
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTab(item.key)}
                    aria-current={tab === item.key ? "page" : undefined}
                    className={`${styles.navItem} ${tab === item.key ? styles.navItemActive : ""}`}
                  >
                    <span>{item.label}</span>
                    {isResourceKey(item.key) && (
                      <span className={styles.navCount}>{counts[item.key]}</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.sidebarFooter}>
            <p className={styles.userEmail} title={email}>
              {email}
            </p>
            <LogoutButton />
          </div>
        </aside>

        <div className={styles.main}>
          {loadErrors.length > 0 && (
            <div className={styles.notice} role="alert">
              <strong>No se pudo leer parte del contenido.</strong>{" "}
              {loadErrors.join(" · ")}. Si es la primera vez, ejecutá el script de migración en el
              SQL Editor de Supabase.
            </div>
          )}

          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>{header.title}</h1>
              <p className={styles.pageDescription}>{header.description}</p>
            </div>
            <Link href="/" className={styles.ghostBtn} target="_blank" rel="noopener noreferrer">
              Ver sitio
            </Link>
          </div>

          {tab === "resumen" && (
            <Overview counts={counts} hasProfile={profile !== null} cv={cv} onNavigate={setTab} />
          )}
          {tab === "perfil" && <ProfileEditor record={profile} />}
          {tab === "cv" && <CvUploader info={cv} />}
          {isResourceKey(tab) && <ResourceManager key={tab} def={RESOURCES[tab]} rows={rows[tab]} />}
        </div>
      </ToastProvider>
    </div>
  );
}
