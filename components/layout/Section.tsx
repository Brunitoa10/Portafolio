"use client";

import type { ReactNode } from "react";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  /** Hero doesn't want the fade-in/label/title chrome — it renders bare. */
  bare?: boolean;
  align?: "left" | "center";
}

/**
 * Template Method pattern: every content section shares the same skeleton
 * (fade-in wrapper → eyebrow label → title → body). Individual sections
 * only ever provide the body via `children`; they never re-implement the
 * label/title/animation plumbing.
 */
export function Section({ id, eyebrow, title, children, bare, align = "left" }: SectionProps) {
  const ref = useFadeInOnScroll<HTMLElement>();

  if (bare) {
    return (
      <section id={id}>
        {children}
      </section>
    );
  }

  return (
    <section id={id} ref={ref} className="fade-in" style={align === "center" ? { textAlign: "center" } : undefined}>
      <p className="section-label">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}
