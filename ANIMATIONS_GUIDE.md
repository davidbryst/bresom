# Guide d'Utilisation des Animations GSAP

Ce projet utilise GSAP (GreenSock Animation Platform) pour créer des animations fluides et performantes au scroll. Voici comment utiliser les différents composants et hooks fournis.

## Composants Principaux

### 1. AnimatedSection

Composant wrapper pour ajouter des animations au scroll

```tsx
import { AnimatedSection } from "~/components/AnimatedSection";

export function MyComponent() {
  return (
    <AnimatedSection animationType="slideUp" staggerChildren={true}>
      <h2>Mon titre</h2>
      <p>Mon contenu</p>
    </AnimatedSection>
  );
}
```

**Props:**

- `animationType`: "slideUp" | "fadeIn" | "cascade" | "parallax" | "none"
- `staggerChildren`: boolean - Active l'animation décalée des enfants
- `delay`: number - Délai avant le début de l'animation
- `className`: string - Classes CSS supplémentaires

### 2. ScrollReveal

Révélation au scroll avec directions variables

```tsx
import { ScrollReveal } from "~/components/ScrollEffects";

<ScrollReveal direction="up" distance={50} duration={0.8}>
  <div>Contenu révélé</div>
</ScrollReveal>;
```

**Directions:** "up" | "down" | "left" | "right"

### 3. Parallax

Effet parallax au scroll

```tsx
import { Parallax } from "~/components/ScrollEffects";

<Parallax speed={-0.5} offset={0}>
  <img src="image.jpg" alt="Parallax" />
</Parallax>;
```

**Props:**

- `speed`: number (-1 à 1) - Vitesse du parallax
- `offset`: number - Décalage supplémentaire

### 4. SplitText

Anime le texte mot par mot

```tsx
import { SplitText } from "~/components/ScrollEffects";

<SplitText text="Voici du texte animé" staggerDelay={0.05} />;
```

### 5. NumberCounter

Anime les compteurs de nombres

```tsx
import { NumberCounter } from "~/components/ScrollEffects";

<NumberCounter from={0} to={100} duration={2} suffix="%" />;
```

### 6. StaggerContainer

Conteneur pour animer les enfants en cascade

```tsx
import { StaggerContainer } from "~/components/AnimatedSection";

<StaggerContainer staggerDelay={0.12}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>;
```

## Hooks Personnalisés

### useScrollAnimation

Hook pour créer des animations au scroll

```tsx
import { useScrollAnimation } from "~/hooks/useGSAP";

const ref = useScrollAnimation<HTMLDivElement>({
  start: "top 80%",
  scrub: true,
});

return <div ref={ref}>Contenu animé</div>;
```

### useScrollReveal

Hook pour les révélations au scroll

```tsx
import { useScrollReveal } from "~/hooks/useScrollAnimations";

const ref = useRef<HTMLDivElement>(null);
useScrollReveal(ref, {
  direction: "up",
  distance: 50,
  duration: 0.8,
  once: true,
});

return <div ref={ref}>Révélé au scroll</div>;
```

### useHoverAnimation

Hook pour les animations au hover

```tsx
import { useHoverAnimation } from "~/hooks/useScrollAnimations";

const ref = useRef<HTMLDivElement>(null);
useHoverAnimation(ref, {
  scale: 1.05,
  y: -10,
  duration: 0.3,
});

return <div ref={ref}>Survolez moi</div>;
```

### useStaggerAnimation

Hook pour l'animation en cascade

```tsx
import { useStaggerAnimation } from "~/hooks/useScrollAnimations";

const ref = useRef<HTMLDivElement>(null);
useStaggerAnimation(ref, {
  selector: "> *",
  duration: 0.6,
  stagger: 0.1,
});

return (
  <div ref={ref}>
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
);
```

### useParallaxAnimation

Hook pour le parallax

```tsx
import { useParallaxAnimation } from "~/hooks/useScrollAnimations";

const ref = useRef<HTMLDivElement>(null);
useParallaxAnimation(ref, -0.5);

return <div ref={ref}>Parallax effect</div>;
```

## Composants Avancés

### MouseFollower

Curseur de souris personnalisé

```tsx
import { MouseFollower } from "~/components/ScrollAdvanced";

<MouseFollower size={20} color="rgba(124, 58, 237, 0.8)" />;
```

### ScrollProgressBar

Barre de progression du scroll

```tsx
import { ScrollProgressBar } from "~/components/ScrollAdvanced";

<ScrollProgressBar
  height={3}
  color="linear-gradient(90deg, #7C3AED, #EC4899)"
/>;
```

### ScrollingText

Texte qui défile horizontalement

```tsx
import { ScrollingText } from "~/components/ScrollAdvanced";

<ScrollingText text="Texte qui défile • " duration={20} />;
```

### FloatingElements

Éléments qui flottent

```tsx
import { FloatingElements } from "~/components/ScrollAdvanced";

<FloatingElements count={5} />;
```

## Classes CSS Utilitaires

Le projet inclut également des classes CSS prêtes à l'emploi:

```tsx
// Animations simples
<div className="animate-float">Flotte</div>
<div className="animate-pulse-glow">Pulse</div>
<div className="animate-shimmer">Shimmer</div>
<div className="animate-bounce-custom">Bounce</div>
<div className="animate-scale-pulse">Scale</div>
<div className="animate-rotate-slow">Rotate</div>
<div className="animate-skew">Skew</div>

// Animations d'entrée
<div className="animate-blur-in">Blur In</div>
<div className="animate-slide-up">Slide Up</div>
<div className="animate-slide-down">Slide Down</div>
<div className="animate-fade-in">Fade In</div>
<div className="animate-zoom-in">Zoom In</div>
<div className="animate-flip">Flip</div>

// Gradient animé
<div className="animate-gradient bg-gradient-to-r from-purple-600 to-pink-600">
  Gradient animé
</div>

// Délais d'animation
<div className="animate-slide-up animate-delay-100">Item 1</div>
<div className="animate-slide-up animate-delay-200">Item 2</div>
<div className="animate-slide-up animate-delay-300">Item 3</div>
```

## Bonnes Pratiques

### 1. Performance

- Utilisez `will-change` sur les éléments animés
- Limitez le nombre d'animations simultanées
- Préférez les animations sur `transform` et `opacity`

```tsx
<div className="will-animate animate-float">Contenu</div>
```

### 2. Accessibilité

- Respectez `prefers-reduced-motion`
- Fournissez des alternatives non-animées
- Les animations reduites sont automatiquement gérées par CSS

### 3. Responsive

- Testez les animations sur mobile
- Ajustez les durées pour les petits écrans
- Utilisez des breakpoints media queries

### 4. Organisation

- Regroupez les animations liées
- Utilisez des timelines pour les séquences complexes
- Commentez les configurations d'animation

## Exemple Complet

```tsx
import { useRef } from "react";
import {
  AnimatedSection,
  StaggerContainer,
} from "~/components/AnimatedSection";
import {
  ScrollReveal,
  Parallax,
  NumberCounter,
} from "~/components/ScrollEffects";
import {
  useHoverAnimation,
  useStaggerAnimation,
} from "~/hooks/useScrollAnimations";

export function HomePage() {
  const cardRef = useRef<HTMLDivElement>(null);
  useHoverAnimation(cardRef, { scale: 1.05, y: -10 });

  return (
    <main>
      {/* Section avec parallax */}
      <Parallax speed={-0.3}>
        <h1>Bienvenue</h1>
      </Parallax>

      {/* Section avec cascade d'animations */}
      <AnimatedSection animationType="cascade" staggerChildren={true}>
        <h2>Mes services</h2>
        <StaggerContainer>
          <div className="card">Service 1</div>
          <div className="card">Service 2</div>
          <div className="card">Service 3</div>
        </StaggerContainer>
      </AnimatedSection>

      {/* Section avec révélation */}
      <ScrollReveal direction="left" distance={100}>
        <div ref={cardRef}>Carte interactive</div>
      </ScrollReveal>

      {/* Section avec compteur */}
      <div>
        <NumberCounter to={150} duration={2} suffix="+" />
      </div>
    </main>
  );
}
```

## Ressources

- [GSAP Documentation](https://gsap.com/)
- [ScrollTrigger Plugin](https://gsap.com/docs/v3/Plugins/ScrollTrigger)
- [Easing Functions](https://gsap.com/docs/v3/Eases)

## Support

Pour plus d'informations ou des questions sur les animations, consultez la documentation GSAP officielle.
