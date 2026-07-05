"use client";

import { terminalLines, TERMINAL_TITLE } from "@/data/terminal";
import { useTerminalTypewriter } from "@/hooks/useTerminalTypewriter";
import { renderTerminalLine } from "@/lib/terminalLineRenderers";

export function Terminal() {
  const revealedLines = useTerminalTypewriter(terminalLines);

  return (
    <div className="terminal">
      <div className="term-bar">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
        <span className="term-title">{TERMINAL_TITLE}</span>
      </div>
      <div className="term-body">
        {revealedLines.map((revealed, index) => (
          <span className="tl" key={index}>
            {renderTerminalLine(revealed.line, revealed)}
          </span>
        ))}
      </div>
    </div>
  );
}
