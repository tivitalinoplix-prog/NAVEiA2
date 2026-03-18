import React, { useState, useEffect } from 'react';

export function ScrambleText({ text, trigger }: any) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  useEffect(() => {
    if (trigger === 0) return;
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char: any, index: any) => {
        if (index < iterations) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text, trigger]);
  return <span>{displayText}</span>;
}
