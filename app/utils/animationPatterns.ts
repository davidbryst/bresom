import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Collection de patterns d'animation avancés réutilisables
 */

/**
 * Pattern 1: Reveal avec clip-path
 */
export function createClipPathReveal(
  element: HTMLElement,
  direction: "ltr" | "rtl" | "ttb" | "btt" = "ltr",
  duration: number = 0.8
) {
  const clipPaths = {
    ltr: {
      from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    rtl: {
      from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    ttb: {
      from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    btt: {
      from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
  };

  const config = clipPaths[direction];

  return gsap.fromTo(
    element,
    { clipPath: config.from, opacity: 0 },
    {
      clipPath: config.to,
      opacity: 1,
      duration,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        once: true,
      },
    }
  );
}

/**
 * Pattern 2: Zoom in avec blur
 */
export function createZoomBlurReveal(
  element: HTMLElement,
  duration: number = 0.8
) {
  return gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
      filter: "blur(20px)",
    },
    {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        once: true,
      },
    }
  );
}

/**
 * Pattern 3: Rotation reveal
 */
export function createRotationReveal(
  element: HTMLElement,
  rotationDegrees: number = 45,
  duration: number = 0.8
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      rotation: rotationDegrees,
      transformOrigin: "center center",
    },
    {
      opacity: 1,
      rotation: 0,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        once: true,
      },
    }
  );
}

/**
 * Pattern 4: Skew and fade
 */
export function createSkewFadeReveal(
  element: HTMLElement,
  skewAngle: number = 10,
  duration: number = 0.8
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      skewX: skewAngle,
      x: 50,
    },
    {
      opacity: 1,
      skewX: 0,
      x: 0,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        once: true,
      },
    }
  );
}

/**
 * Pattern 5: Splitting text reveal
 */
export function createSplitTextReveal(
  element: HTMLElement,
  splitBy: "word" | "char" | "line" = "word",
  stagger: number = 0.05
) {
  const text = element.innerText;
  const splits: string[] = [];

  if (splitBy === "word") {
    splits.push(...text.split(" "));
  } else if (splitBy === "char") {
    splits.push(...text.split(""));
  } else if (splitBy === "line") {
    splits.push(...text.split("\n"));
  }

  const html = splits
    .map((item) => `<span class="split-item">${item}</span>`)
    .join(splitBy === "word" || splitBy === "line" ? " " : "");

  element.innerHTML = html;

  const items = element.querySelectorAll(".split-item");

  return gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        once: true,
      },
    }
  );
}

/**
 * Pattern 6: Background color transition
 */
export function createColorTransition(
  element: HTMLElement,
  colors: string[],
  duration: number = 3
) {
  const tl = gsap.timeline({ repeat: -1 });

  colors.forEach((color, index) => {
    const nextColor = colors[(index + 1) % colors.length];
    tl.to(
      element,
      {
        backgroundColor: nextColor,
        duration,
        ease: "power2.inOut",
      },
      0
    );
  });

  return tl;
}

/**
 * Pattern 7: Pin and animate
 */
export function createPinAnimation(
  element: HTMLElement,
  animationFunction: (tl: gsap.core.Timeline) => void,
  duration: number = 3
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top top",
      end: `bottom top+=${duration * 100}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      markers: false,
    },
  });

  animationFunction(tl);

  return tl;
}

/**
 * Pattern 8: Flip card effect
 */
export function createFlipCard(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  duration: number = 0.6
) {
  let isFlipped = false;

  const flip = () => {
    const tl = gsap.timeline();

    if (!isFlipped) {
      // Flip to back
      tl.to(frontElement, { rotationY: 90, duration: duration / 2 }, 0)
        .to(backElement, { rotationY: 0, duration: duration / 2 }, 0)
        .to(frontElement, { pointerEvents: "none", opacity: 0 }, 0)
        .to(backElement, { pointerEvents: "auto", opacity: 1 }, 0);
    } else {
      // Flip to front
      tl.to(frontElement, { rotationY: 0, duration: duration / 2 }, 0)
        .to(backElement, { rotationY: -90, duration: duration / 2 }, 0)
        .to(frontElement, { pointerEvents: "auto", opacity: 1 }, 0)
        .to(backElement, { pointerEvents: "none", opacity: 0 }, 0);
    }

    isFlipped = !isFlipped;
  };

  // Style setup
  const parent = frontElement.parentElement;
  if (parent) {
    parent.style.perspective = "1000px";
    frontElement.style.transformStyle = "preserve-3d";
    backElement.style.transformStyle = "preserve-3d";
    (backElement.style as any).rotationY = "-90deg";
    backElement.style.pointerEvents = "none";
    backElement.style.opacity = "0";
  }

  frontElement.addEventListener("click", flip);
  backElement.addEventListener("click", flip);

  return flip;
}

/**
 * Pattern 9: Morphing SVG
 */
export function createMorphSVG(
  pathElement: SVGPathElement,
  pathVariants: string[],
  morphDuration: number = 2,
  holdDuration: number = 0.5
) {
  let currentIndex = 0;

  const morph = () => {
    const nextIndex = (currentIndex + 1) % pathVariants.length;

    gsap.to(
      pathElement,
      {
        attr: { d: pathVariants[nextIndex] },
        duration: morphDuration,
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = nextIndex;
          setTimeout(morph, holdDuration * 1000);
        },
      }
    );
  };

  morph();
}

/**
 * Pattern 10: Scroll velocity based animation
 */
export function createVelocityAnimation(
  element: HTMLElement,
  maxVelocity: number = 5
) {
  let velocity = 0;
  let lastScrollY = 0;

  const updateVelocity = () => {
    const currentScrollY = window.scrollY;
    velocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Scale based on velocity
    const scale = 1 + Math.min(Math.abs(velocity) / maxVelocity, 0.2);

    gsap.to(element, {
      scale,
      duration: 0.3,
      overwrite: "auto",
    });

    requestAnimationFrame(updateVelocity);
  };

  updateVelocity();
}
