"use client";

import { useEffect, useRef } from "react";

/**
 * Observer pattern wrapper around IntersectionObserver.
 * Returns a ref to attach to any element; once it's ~8% visible it gets
 * the `visible` class and the observer stops watching it.
 */
export function useFadeInOnScroll<T extends HTMLElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
