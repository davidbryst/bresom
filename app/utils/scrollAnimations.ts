import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animation fluide pour les sections au scroll
export function animateSectionEntrance(
  element: HTMLElement,
  staggerChildren: boolean = false,
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 75%",
      once: true,
      markers: false,
    },
  });

  if (staggerChildren) {
    const children = element.querySelectorAll("> div, > article, > h2, > p");
    tl.fromTo(
      children,
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      },
    );
  } else {
    tl.fromTo(
      element,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  }

  return tl;
}

// Animation de morphing pour les cards
export function animateCardHover(card: HTMLElement) {
  gsap.to(card, {
    overwrite: "auto",
    duration: 0.3,
    ease: "power2.out",
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  });
}

export function animateCardHoverReverse(card: HTMLElement) {
  gsap.to(card, {
    overwrite: "auto",
    duration: 0.3,
    ease: "power2.out",
    y: 0,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  });
}

// Animation de texte avec clip-path
export function animateTextReveal(
  element: HTMLElement,
  stagger: number = 0.05,
) {
  const words = element.innerText
    .split(" ")
    .map((word) => `<span class="reveal-word">${word}</span>`)
    .join(" ");
  element.innerHTML = words;

  const wordSpans = element.querySelectorAll(".reveal-word");

  return gsap.fromTo(
    wordSpans,
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
    },
  );
}

// Animation de progression (pour les skill bars)
export function animateProgressBar(
  barElement: HTMLElement,
  targetWidth: number,
  duration: number = 1.5,
) {
  return gsap.fromTo(
    barElement,
    { width: 0 },
    {
      width: `${targetWidth}%`,
      duration,
      ease: "power3.out",
      scrollTrigger: {
        trigger: barElement.closest(".skill-item"),
        start: "top 80%",
        once: true,
      },
    },
  );
}

// Animation de particules/éléments flottants
export function animateFloatingElements(elements: HTMLElement[]) {
  elements.forEach((el, index) => {
    gsap.to(el, {
      y: -20,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2,
    });
  });
}

// Animation de compteur de nombre
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  duration: number = 2,
) {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.innerText = Math.round(obj.value).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
    },
  });
}

// Animation de scroll parallax
export function animateParallaxElement(
  element: HTMLElement,
  speed: number = -0.5,
) {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      markers: false,
    },
  });
}

// Animation de rotation/tilt au hover
export function animateTiltOnHover(
  element: HTMLElement,
  maxRotation: number = 5,
) {
  element.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    gsap.to(element, {
      rotationX: -rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  });
}

// Animation d'entrée en cascade
export function animateCascadeEntrance(
  container: HTMLElement,
  childSelector: string = "> *",
  duration: number = 0.6,
  staggerDelay: number = 0.12,
) {
  const children = container.querySelectorAll(childSelector);

  return gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration,
      stagger: staggerDelay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        once: true,
      },
    },
  );
}

// Animation de shine/brillance
export function animateShine(element: HTMLElement) {
  const shine = document.createElement("div");
  shine.className = "shine-effect";
  shine.style.cssText = `
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    transform: rotate(45deg);
    pointer-events: none;
  `;

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(shine);

  gsap.to(shine, {
    x: 100,
    duration: 2,
    repeat: -1,
    delay: 1,
    ease: "none",
  });
}

// Animation de morphing/transformation
export function animateMorphShape(element: HTMLElement) {
  const shapes = [
    "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  ];

  let shapeIndex = 0;

  setInterval(() => {
    gsap.to(element, {
      clipPath: shapes[shapeIndex],
      duration: 1.5,
      ease: "power2.inOut",
    });
    shapeIndex = (shapeIndex + 1) % shapes.length;
  }, 2000);
}
