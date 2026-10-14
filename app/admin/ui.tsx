"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./admin.module.css";

/* ───────────────────────── Avisos (toasts) ─────────────────────────── */

type ToastKind = "ok" | "error";

interface ToastState {
  id: number;
  kind: ToastKind;
  text: string;
}

interface ToastApi {
  notify: (kind: ToastKind, text: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((kind: ToastKind, text: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ id: Date.now(), kind, text });
    timer.current = setTimeout(() => setToast(null), kind === "error" ? 8000 : 3500);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const api = useMemo<ToastApi>(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className={styles.toastRegion} aria-live="polite">
        {toast && (
          <div
            key={toast.id}
            role={toast.kind === "error" ? "alert" : "status"}
            className={`${styles.toast} ${toast.kind === "error" ? styles.toastError : styles.toastOk}`}
          >
            <span>{toast.text}</span>
            <button
              type="button"
              className={styles.toastClose}
              aria-label="Cerrar aviso"
              onClick={() => setToast(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast debe usarse dentro de ToastProvider");
  return context;
}

/* ───────────────── Atajos de teclado para diálogos ─────────────────── */

/** Cierra con Escape y devuelve el foco al elemento que abrió el diálogo. */
function useDialogBehavior(open: boolean, onClose: () => void, focusSelector: string) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>(focusSelector)?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [open, focusSelector]);

  return panelRef;
}

/* ───────────────────────── Panel lateral ───────────────────────────── */

interface DrawerProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ open, title, description, onClose, children }: DrawerProps) {
  const panelRef = useDialogBehavior(open, onClose, "input, textarea, select");

  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.drawerHeader}>
          <div>
            <h2 className={styles.drawerTitle}>{title}</h2>
            {description && <p className={styles.drawerDescription}>{description}</p>}
          </div>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

/* ───────────────────── Confirmación de acciones ────────────────────── */

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const panelRef = useDialogBehavior(open, onCancel, "[data-autofocus]");

  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onCancel} aria-hidden="true" />
      <div
        ref={panelRef}
        className={styles.confirm}
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
      >
        <h2 className={styles.confirmTitle}>{title}</h2>
        <p className={styles.confirmText}>{message}</p>
        <div className={styles.confirmActions}>
          <button type="button" className={styles.ghostBtn} onClick={onCancel} data-autofocus>
            Cancelar
          </button>
          <button type="button" className={styles.dangerSolidBtn} onClick={onConfirm} disabled={busy}>
            {busy ? "Eliminando…" : confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}
