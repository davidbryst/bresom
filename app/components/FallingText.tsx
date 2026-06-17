import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  highlightClass = 'text-violet-accent font-semibold',
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Contrôle de visibilité pour pause
  const rafIdRef = useRef<number | null>(null); // Pour stocker requestAnimationFrame ID
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const wordBodiesRef = useRef<{ elem: HTMLElement; body: Matter.Body }[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

    // Optimisation responsive: adapter le nombre de mots selon la taille d'écran
    const getMaxWords = () => {
      if (typeof window === 'undefined') return 100;
      const w = window.innerWidth;
      if (w < 480) return 40;      // Très petit mobile
      if (w < 640) return 50;      // Mobile
      if (w < 768) return 60;      // Grand mobile
      if (w < 1024) return 70;     // Tablette
      if (w < 1280) return 85;     // Desktop lg (plus de hauteur)
      return 100;                  // Desktop xl+
    };

    const maxWords = getMaxWords();
    const words = text.split(' ').slice(0, maxWords);

    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
        return `<span
          class="inline-block select-none ${isHighlighted ? highlightClass : 'text-light-secondary'}"
          style="will-change: transform;"
        >
          ${word}
        </span>`;
      })
      .join(' ');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true);
      return;
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // --- Construire le monde physique UNE seule fois (indépendant de la visibilité) ---
  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    if (!textRef.current) return;
    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.65,
        frictionAir: 0.02,
        friction: 0.35,
        density: 0.002
      });
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: 0
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);

      return { elem: elem as HTMLElement, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const runner = Runner.create();
    runner.enabled = false; // en pause tant que la section n'est pas visible
    Runner.run(runner, engine); // s'auto-planifie mais ne steppe rien tant que enabled=false

    engineRef.current = engine;
    runnerRef.current = runner;
    renderRef.current = render;
    wordBodiesRef.current = wordBodies;

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
      engineRef.current = null;
      runnerRef.current = null;
      renderRef.current = null;
      wordBodiesRef.current = [];
    };
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  // --- Démarrer / arrêter les boucles lourdes selon la visibilité (sans reconstruire le monde) ---
  useEffect(() => {
    const runner = runnerRef.current;
    const render = renderRef.current;
    if (!runner || !render) return;

    const syncLoop = () => {
      wordBodiesRef.current.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      rafIdRef.current = requestAnimationFrame(syncLoop);
    };

    if (isVisible) {
      // Reprise : la physique steppe, le canvas se redessine, le DOM se synchronise.
      runner.enabled = true;
      Matter.Render.run(render);
      if (rafIdRef.current === null) syncLoop();
    } else {
      // Hors écran : on gèle physique + rendu + synchro DOM (zéro coût CPU/GPU).
      runner.enabled = false;
      Matter.Render.stop(render);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      // Stopper proprement pour éviter des boucles dupliquées si l'effet re-tourne.
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) runnerRef.current.enabled = false;
    };
  }, [isVisible, effectStarted]);

  // IntersectionObserver pour contrôle de visibilité (optimisation performance)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // 10% visible minimum
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-[1] w-full h-full cursor-pointer text-center pt-4 sm:pt-5 md:pt-6 lg:pt-7 xl:pt-6 px-2 sm:px-3 md:px-4 overflow-hidden"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block max-w-full"
        style={{
          fontSize,
          lineHeight: 1.6
        }}
      />

      <div className="absolute top-0 left-0 z-0" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingText;
