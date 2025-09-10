import { useState, useEffect } from "react";

interface TypewriterEffectProps {
  titre: string[];
  description: string[];
}

export default function TypewriterEffect({ titre, description }: TypewriterEffectProps) {
  // On ne gère que titre et description comme props
  const lignesAAnimer = [
    ...(titre ? [titre] : []),
    ...(description ? [description] : []),
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (currentLineIndex >= lignesAAnimer.length) return;

    const currentLine = lignesAAnimer[currentLineIndex];

    let timeout: NodeJS.Timeout;

    if (currentText.length < currentLine.length) {
      timeout = setTimeout(() => {
        setCurrentText(currentLine.slice(0, currentText.length + 1));
      }, 100);
    } else {
      // Pause avant de passer à la ligne suivante
      timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentText("");
        setCurrentLineIndex((prev) => prev + 1);
      }, 1200);
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentLineIndex, lignesAAnimer]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Ligne titre */}
      {titre && displayedLines[0] && (
        <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {displayedLines[0]}
        </div>
      )}
      {/* Ligne description */}
      {description && (
        displayedLines.length > (titre ? 1 : 0) && (
          <div className="text-base sm:text-lg text-gray-700 dark:text-white/70 mb-3">
            {displayedLines[titre ? 1 : 0]}
          </div>
        )
      )}
      {/* Ligne en cours d'écriture */}
      {currentLineIndex < lignesAAnimer.length && (
        <div
          className={
            currentLineIndex === 0 && titre
              ? "text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white"
              : currentLineIndex === 1 && description
              ? "text-base sm:text-lg text-gray-700 dark:text-white/70 mb-3"
              : ""
          }
        >
          {currentText}
          <span className="animate-pulse">|</span>
        </div>
      )}
    </div>
  );
}
