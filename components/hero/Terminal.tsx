"use client";

import type { TerminalLine } from "@/types";
import { useTerminalTypewriter } from "@/hooks/useTerminalTypewriter";
import { renderTerminalLine } from "@/lib/terminalLineRenderers";

interface TerminalProps {
  lines: TerminalLine[];
  prompt: string;
  title: string;
}

export function Terminal({ lines, prompt, title }: TerminalProps) {
  const revealedLines = useTerminalTypewriter(lines);

  return (
    <div className="terminal">
      <div className="term-bar">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-body">
        {revealedLines.map((revealed, index) => (
          <span className="tl" key={index}>
            {renderTerminalLine(revealed.line, { ...revealed, prompt })}
          </span>
        ))}
      </div>
    </div>
  );
}
