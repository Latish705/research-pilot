"use client";

import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypewriterEffect({ 
  text, 
  speed = 10, 
  onComplete 
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  return (
    <div>
      {displayedText.split('\n\n').map((paragraph, i) => (
        <p key={i} className="mb-4">{paragraph}</p>
      ))}
      {currentIndex < text.length && (
        <span className="inline-block w-1 h-4 bg-primary animate-pulse ml-0.5" />
      )}
    </div>
  );
}