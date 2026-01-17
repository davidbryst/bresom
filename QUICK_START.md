# GSAP Animations - Démarrage Rapide

## ✅ Installation

GSAP est déjà installé dans le projet:
```bash
npm install gsap
```

## 🚀 Utilisation Rapide

### 1. Animer une section complète
```tsx
import { AnimatedSection } from "~/components/AnimatedSection";

<AnimatedSection animationType="slideUp">
  <h2>Mon titre</h2>
  <p>Mon contenu</p>
</AnimatedSection>
```

### 2. Animer au survol
```tsx
import { useRef } from "react";
import { useHoverAnimation } from "~/hooks/useScrollAnimations";

const ref = useRef<HTMLDivElement>(null);
useHoverAnimation(ref, { scale: 1.05, y: -10 });

return <div ref={ref}>Survolez moi</div>;
```

### 3. Utiliser les classes CSS
```tsx
<div className="animate-slide-up animate-delay-200">
  Animation simple avec CSS
</div>
```

## 📂 Structure des fichiers créés

```
app/
├── components/
│   ├── AnimatedSection.tsx          ← Wrapper principal pour animations
│   ├── ScrollEffects.tsx            ← Composants reveal, parallax
│   ├── ScrollAdvanced.tsx           ← Effets avancés
│   └── AnimationsDemo.tsx           ← Démonstration
│
├── hooks/
│   ├── useScrollAnimation.tsx       ← Hook pour scroll
│   └── useScrollAnimations.ts       ← 10+ hooks personnalisés
│
├── utils/
│   ├── scrollAnimations.ts          ← Utilitaires
│   └── animationPatterns.ts         ← 10 patterns avancés
│
├── config/
│   └── gsapConfig.ts                ← Configuration
│
├── styles/
│   └── animations.css               ← 70+ classes CSS
│
├── examples/
│   └── AnimationIntegrationExamples.tsx ← Exemples d'intégration
│
└── root.tsx                         ← Mise à jour avec GSAPProvider

Documentation/
├── ANIMATIONS_GUIDE.md              ← Guide complet
├── ANIMATIONS_SUMMARY.md            ← Résumé des changements
└── QUICK_START.md                   ← Ce fichier
```

## 💡 Cas d'usage courants

### Section avec cascade d'éléments
```tsx
import { AnimatedSection, StaggerContainer } from "~/components/AnimatedSection";

<AnimatedSection animationType="cascade" staggerChildren={true}>
  <h2>Titre</h2>
  <StaggerContainer>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </StaggerContainer>
</AnimatedSection>
```

### Galerie avec parallax
```tsx
import { Parallax } from "~/components/ScrollEffects";

<div className="grid grid-cols-3 gap-6">
  <Parallax speed={-0.3}><img src="1.jpg" /></Parallax>
  <Parallax speed={-0.5}><img src="2.jpg" /></Parallax>
  <Parallax speed={-0.7}><img src="3.jpg" /></Parallax>
</div>
```

### Compteurs animés
```tsx
import { NumberCounter } from "~/components/ScrollEffects";

<NumberCounter from={0} to={100} duration={2} suffix="%" />
```

### Texte animé
```tsx
import { SplitText } from "~/components/ScrollEffects";

<SplitText text="Texte animé mot par mot" staggerDelay={0.05} />
```

## ⚙️ Configuration personnalisée

Modifier `app/config/gsapConfig.ts`:
```typescript
export const GSAP_CONFIG = {
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
  },
  stagger: {
    small: 0.05,
    normal: 0.1,
    large: 0.2,
  },
  eases: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
  },
};
```

## 🎨 Types d'animations disponibles

### Avec composants
- `slideUp` - Glisse vers le haut
- `fadeIn` - Fondu
- `cascade` - En cascade avec délai
- `parallax` - Parallax effect
- `none` - Pas d'animation

### Directions ScrollReveal
- `up` - Du bas vers le haut
- `down` - Du haut vers le bas
- `left` - De la droite vers la gauche
- `right` - De la gauche vers la droite

## 📊 Performance

Les animations utilisent:
- ✅ GPU acceleration (transform, opacity)
- ✅ Prefers-reduced-motion respecté
- ✅ Killable animations (pas de memory leak)
- ✅ ScrollTrigger optimisé

## 🔧 Dépannage

### Animations ne s'exécutent pas
1. Vérifier que GSAP est installé: `npm ls gsap`
2. Vérifier que le composant/hook est importé correctement
3. Vérifier que l'élément est visible au scroll

### Performance dégradée
1. Limiter le nombre d'animations simultanées
2. Utiliser `once: true` pour les animations une seule fois
3. Réduire la durée des animations
4. Vérifier dans Lighthouse Performance

### Animations saccadées sur mobile
1. Réduire le nombre d'éléments animés
2. Augmenter la durée des animations
3. Utiliser `scrub: 0.5` au lieu de `scrub: 1`
4. Désactiver parallax sur mobile

## 📚 Ressources

- [Guide complet](./ANIMATIONS_GUIDE.md)
- [Résumé des changements](./ANIMATIONS_SUMMARY.md)
- [Exemples d'intégration](./app/examples/AnimationIntegrationExamples.tsx)
- [Documentation GSAP](https://gsap.com/)

## 🎯 Prochaines étapes

1. ✅ Installer et configurer GSAP (déjà fait)
2. ✅ Créer les composants et hooks (déjà fait)
3. ✅ Ajouter les styles CSS (déjà fait)
4. 📝 Intégrer dans vos composants existants
5. 🧪 Tester et optimiser
6. 📊 Monitorer la performance

## 💬 Support

Pour des questions ou des problèmes:
1. Consulter le guide complet: `ANIMATIONS_GUIDE.md`
2. Voir les exemples: `AnimationIntegrationExamples.tsx`
3. Consulter la documentation GSAP

---

**Prêt à l'emploi!** 🚀
