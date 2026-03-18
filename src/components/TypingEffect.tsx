import React, { useState, useEffect } from 'react';

export function TypingEffect({ text }: any) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);
  return <span>{displayText}<span className="inline-block w-0.5 h-5 bg-[#E8272A] animate-pulse ml-0.5 align-middle" /></span>;
}
