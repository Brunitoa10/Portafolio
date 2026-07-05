import type { ReactNode } from "react";

/**
 * Splits text on **bold** markers and wraps the matched parts in <strong>.
 * Keeps content files free of JSX while still allowing simple emphasis.
 */
export function parseInlineBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}
