"use client";

import { RESOURCES, type ResourceKey, type TabKey } from "./resources";
import { cvUrl, formatDate, formatSize, type CvInfo } from "./cv";
import styles from "./admin.module.css";

interface OverviewProps {
  counts: Record<ResourceKey, number>;
  hasProfile: boolean;
  cv: CvInfo | null;
  onNavigate: (tab: TabKey) => void;
}

const CONTENT_ORDER: ResourceKey[] = [
  "projects",
  "timeline",
  "skills",
  "about",
  "stats",
  "contact",
  "terminal",
];

export default function Overview({ counts, hasProfile, cv, onNavigate }: OverviewProps) {
  const checklist: { label: string; done: boolean; tab: TabKey }[] = [
    { label: "Perfil y datos del sitio", done: hasProfile, tab: "perfil" },
    { label: "Texto «sobre mí»", done: counts.about > 0, tab: "about" },
    { label: "Al menos un proyecto", done: counts.projects > 0, tab: "projects" },
    { label: "Experiencia cargada", done: counts.timeline > 0, tab: "timeline" },
    { label: "Un medio de contacto", done: counts.contact > 0, tab: "contact" },
    { label: "Currículum en PDF", done: cv !== null, tab: "cv" },
  ];
  const completed = checklist.filter((item) => item.done).length;

  return (
    <div className={styles.overview}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Contenido del sitio</h2>
          <p className={styles.panelDescription}>Lo que hoy está publicado, por sección.</p>
        </div>
        <ul className={styles.ledger}>
          {CONTENT_ORDER.map((key) => (
            <li key={key} className={styles.ledgerRow}>
              <div className={styles.ledgerBody}>
                <span className={styles.ledgerTitle}>{RESOURCES[key].title}</span>
              </div>
              <span className={styles.ledgerCount}>{counts[key]}</span>
              <div className={styles.ledgerActions}>
                <button type="button" className={styles.textBtn} onClick={() => onNavigate(key)}>
                  Gestionar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.overviewSide}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Antes de compartir el sitio</h2>
            <p className={styles.panelDescription}>
              {completed} de {checklist.length} listos
            </p>
          </div>
          <div
            className={styles.progress}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={checklist.length}
            aria-valuenow={completed}
            aria-label="Contenido completo"
          >
            <span style={{ width: `${(completed / checklist.length) * 100}%` }} />
          </div>
          <ul className={styles.checklist}>
            {checklist.map((item) => (
              <li key={item.label} className={styles.checkItem} data-done={item.done}>
                <span className={styles.checkMark} aria-hidden="true">
                  {item.done ? "✓" : ""}
                </span>
                <span className={styles.checkLabel}>{item.label}</span>
                {!item.done && (
                  <button type="button" className={styles.textBtn} onClick={() => onNavigate(item.tab)}>
                    Completar
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Currículum</h2>
            <p className={styles.panelDescription}>
              {cv ? (
                <>
                  {formatSize(cv.size)}
                  {cv.updatedAt && (
                    <>
                      {" · "}
                      <time suppressHydrationWarning>{formatDate(cv.updatedAt)}</time>
                    </>
                  )}
                </>
              ) : (
                "Sin archivo cargado"
              )}
            </p>
          </div>
          <div className={`${styles.panelBody} ${styles.inlineActions}`}>
            {cv && (
              <a className={styles.ghostBtn} href={cvUrl(cv)} target="_blank" rel="noopener noreferrer">
                Abrir
              </a>
            )}
            <button type="button" className={styles.primaryBtn} onClick={() => onNavigate("cv")}>
              {cv ? "Reemplazar" : "Subir PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
