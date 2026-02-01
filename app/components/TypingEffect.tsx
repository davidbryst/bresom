import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface TypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
  loop?: boolean;
}

export default function TypingEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
  cursorClassName = "",
  loop = true,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Cursor blink animation
  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      gsap.killTweensOf(cursorRef.current);
    };
  }, []);

  // Typing logic
  useEffect(() => {
    const currentText = texts[textIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
          return;
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          if (loop || textIndex < texts.length - 1) {
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
          return;
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [
    displayText,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span
        ref={cursorRef}
        className={`inline-block w-[3px] h-[1em] bg-violet-accent ml-1 align-middle ${cursorClassName}`}
      />
    </span>
  );
}

// Alternative: GSAP-powered typing for more control
interface GSAPTypingProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function GSAPTyping({
  text,
  duration = 2,
  delay = 0,
  className = "",
  onComplete,
}: GSAPTypingProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = text.split("");
    containerRef.current.innerHTML = "";

    // Create spans for each character
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";
      span.className = "typing-char";
      containerRef.current?.appendChild(span);
    });

    // Cursor blink
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    // Animate characters
    const charElements = containerRef.current.querySelectorAll(".typing-char");
    gsap.to(charElements, {
      opacity: 1,
      duration: 0.05,
      stagger: duration / chars.length,
      delay,
      ease: "none",
      onComplete,
    });

    return () => {
      gsap.killTweensOf(charElements);
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
      }
    };
  }, [text, duration, delay, onComplete]);

  return (
    <span className={className}>
      <span ref={containerRef} />
      <span
        ref={cursorRef}
        className="inline-block w-[3px] h-[1em] bg-violet-accent ml-1 align-middle"
      />
    </span>
  );
}

// Code typing effect with syntax highlighting feel
interface CodeTypingProps {
  lines: string[];
  typingSpeed?: number;
  lineDelay?: number;
  className?: string;
}

export function CodeTyping({
  lines,
  typingSpeed = 50,
  lineDelay = 500,
  className = "",
}: CodeTypingProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      gsap.killTweensOf(cursorRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      // Line complete
      const timer = setTimeout(() => {
        setCompletedLines((prev) => [...prev, line]);
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines, typingSpeed, lineDelay]);

  return (
    <div className={`font-mono text-sm ${className}`}>
      {completedLines.map((line, i) => (
        <div key={i} className="text-light-secondary">
          <span className="text-violet-accent mr-2">{">"}</span>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="text-light-primary">
          <span className="text-violet-accent mr-2">{">"}</span>
          {lines[currentLine].slice(0, currentChar)}
          <span
            ref={cursorRef}
            className="inline-block w-2 h-4 bg-violet-accent ml-0.5 align-middle"
          />
        </div>
      )}
    </div>
  );
}
