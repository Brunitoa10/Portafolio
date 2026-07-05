"use client";

import { useEffect, useState } from "react";
import type { TerminalLine } from "@/types";

interface RevealedLine {
  line: TerminalLine;
  typedText: string;
  done: boolean;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Drives the fake-terminal animation: reveals `lines` one at a time,
 * "typing" prompt text character by character. Kept as a hook so the
 * Terminal component stays a thin, presentational consumer.
 */
export function useTerminalTypewriter(lines: TerminalLine[], typingSpeedMs = 52) {
  const [revealed, setRevealed] = useState<RevealedLine[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      await sleep(700);

      for (const line of lines) {
        if (cancelled) return;

        if (line.kind === "prompt") {
          setRevealed((prev) => [...prev, { line, typedText: "", done: false }]);
          await sleep(180);

          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return;
            await sleep(typingSpeedMs);
            setRevealed((prev) => {
              const next = [...prev];
              next[next.length - 1] = { line, typedText: line.text.slice(0, i), done: false };
              return next;
            });
          }
          await sleep(320);
          setRevealed((prev) => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], done: true };
            return next;
          });
        } else {
          if (line.kind === "output") await sleep(55);
          setRevealed((prev) => [...prev, { line, typedText: "", done: true }]);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [lines, typingSpeedMs]);

  return revealed;
}
