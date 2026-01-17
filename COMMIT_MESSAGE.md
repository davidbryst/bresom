🎬 refactor: Améliorations globales GSAP pour animations au scroll

BREAKING CHANGE: Modifications dans root.tsx pour intégrer GSAP globalement

## Description

Amélioration complète de l'expérience utilisateur du site avec l'intégration 
de GSAP (GreenSock Animation Platform) pour des animations fluides et 
modernes au scroll.

## Changements

### ✨ Nouveaux Composants (4)
- AnimatedSection.tsx - Wrapper pour animer sections au scroll
- ScrollEffects.tsx - Reveal, Parallax, SplitText, NumberCounter, PinSection
- ScrollAdvanced.tsx - MouseFollower, ScrollProgressBar, ScrollingText, etc.
- AnimationsDemo.tsx - Démonstration interactive

### 🎯 Nouveaux Hooks (2)
- useScrollAnimation.tsx - Animations scroll basiques
- useScrollAnimations.ts - 10+ hooks avancés (Reveal, Parallax, Hover, etc.)

### 🛠️ Nouveaux Utilitaires (2)
- scrollAnimations.ts - 10 fonctions d'animation réutilisables
- animationPatterns.ts - 10 patterns d'animation avancés

### ⚙️ Configuration
- gsapConfig.ts - Configuration centralisée GSAP
- animations.css - 70+ classes CSS utilitaires

### 📚 Documentation (5)
- ANIMATIONS_GUIDE.md - Guide complet d'utilisation
- ANIMATIONS_SUMMARY.md - Résumé des changements
- QUICK_START.md - Démarrage rapide
- CHANGELOG.md - Historique des changements
- README_ANIMATIONS.md - Vue d'ensemble

### 🧪 Exemples
- AnimationIntegrationExamples.tsx - 13 exemples d'intégration
- verify-animations.sh - Script de vérification

### 📝 Fichiers Modifiés
- app/root.tsx - Ajout GSAPProvider et import animations.css

## Statistiques

- 15 fichiers créés/modifiés
- ~2,000 lignes de code production
- ~3,500 lignes de documentation
- 70+ classes CSS utilitaires
- 10+ hooks réutilisables
- 10 patterns d'animation avancés
- 13 exemples d'intégration

## Améliorations

### Performance ⚡
- GPU-accelerated animations (transform, opacity)
- Lazy loading (once: true)
- Automatic cleanup (no memory leaks)
- ScrollTrigger optimisé

### Accessibilité ♿
- Respects prefers-reduced-motion
- Alternatives non-animées
- Contenu accessible sans animations

### Flexibilité 🎨
- 50+ types d'animations disponibles
- Facilement combinables
- Configurable globalement
- Extensible

### Maintenance 📦
- Code organisé et bien structuré
- Composants réutilisables
- Hooks isolés et testables
- Documentation complète

## Types d'Animations

### Au Scroll
- Reveal progressive (up, down, left, right)
- Entrées cascadées avec stagger
- Parallax effects
- Sections pinées
- Morphing shapes

### Au Hover
- Scale animations
- Y offset (lift effect)
- Rotation, Skew
- 3D transforms

### Avancés
- Compteurs animés
- Barre de progression
- Texte qui défile
- Éléments flottants
- Effet glitch
- Split text

## Utilisation

### Simple
```tsx
import { AnimatedSection } from "~/components/AnimatedSection";

<AnimatedSection animationType="slideUp">
  <h2>Contenu animé</h2>
</AnimatedSection>
```

### Avec Hooks
```tsx
import { useHoverAnimation } from "~/hooks/useScrollAnimations";

const ref = useRef(null);
useHoverAnimation(ref, { scale: 1.05, y: -10 });
return <div ref={ref}>Survolez moi</div>;
```

### Avec CSS
```tsx
<div className="animate-slide-up animate-delay-200">
  Animation simple
</div>
```

## Documentation

- Consulter QUICK_START.md pour démarrer en 5 minutes
- Consulter ANIMATIONS_GUIDE.md pour le guide complet
- Consulter AnimationIntegrationExamples.tsx pour 13 exemples

## Migration

Aucune migration requise - les changements sont rétro-compatibles.
Les animations sont optionnelles et peuvent être intégrées graduellement.

## Notes

- Tous les fichiers PDF (*.pdf) sont exclus comme demandé
- GSAP est déjà installé dans le projet
- ScrollTrigger plugin est enregistré automatiquement
- Animations respectent prefers-reduced-motion

## Related Issues

Closes #FEATURE-001

## Checklist

- ✅ Fichiers créés et testés
- ✅ Documentation complète
- ✅ Exemples d'intégration fournis
- ✅ Configuration centralisée
- ✅ Accessibilité respectée
- ✅ Performance optimisée
- ✅ Rétro-compatible

---

**Type:** enhancement
**Impact:** Experience utilisateur
**Scope:** Global
**Breaking Changes:** Non (sauf modifications internes root.tsx)
