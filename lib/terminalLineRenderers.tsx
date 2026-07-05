import type { ReactNode } from "react";
import type { TerminalLine } from "@/types";
import { TERMINAL_PROMPT } from "@/data/terminal";

interface RenderContext {
  typedText: string;
  done: boolean;
}

type LineRenderer = (line: TerminalLine, ctx: RenderContext) => ReactNode;

/**
 * Strategy pattern: instead of an if/else chain switching on `line.kind`
 * inside the Terminal component, each kind owns a small render function
 * registered here. Adding a new line type only means adding an entry,
 * never touching the component that consumes it.
 */
const renderers: Record<TerminalLine["kind"], LineRenderer> = {
  prompt: (line, ctx) => {
    if (line.kind !== "prompt") return null;
    return (
      <>
        <span className="tp">{TERMINAL_PROMPT}</span>
        <span className="tc">{ctx.typedText}</span>
      </>
    );
  },
  output: (line) => {
    if (line.kind !== "output") return null;
    return <span className={`to${line.accent === "cyan" ? " cy" : ""}`}>{line.text}</span>;
  },
  blank: () => <>&nbsp;</>,
  cursor: () => (
    <>
      <span className="tp">{TERMINAL_PROMPT}</span>
      <span className="tcursor" />
    </>
  ),
};

export function renderTerminalLine(line: TerminalLine, ctx: RenderContext): ReactNode {
  return renderers[line.kind](line, ctx);
}
