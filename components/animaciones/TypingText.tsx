"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  className?: string;
}

export default function TypingText({ text, className }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState(" ");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <h1 className={`text-4xl font-bold ${className}`}>
      {displayedText}
      <span className={`text-cyan-500 ${showCursor ? "opacity-100" : "opacity-0"}`}>
        |
      </span>
    </h1>
  );
}
