# Portfolio Premium - David Abraham

## Projet

Création d'un portfolio personnel haut de gamme pour **DAVID ABRAHAM** (Développeur Web & Mobile Full Stack + Designer UI/UX).

## Stack Technique

- React 18 + Remix
- TypeScript
- Tailwind CSS (palette premium personnalisée)
- Framer Motion (animations)
- Lucide React (icônes)
- Resend (envoi d'emails)

---

## Fichiers Créés / Modifiés

### 1. Configuration

#### `tailwind.config.ts`
Configuration Tailwind avec palette premium :
- Violet principal : `#6D28D9` / `#7C3AED`
- Noir profond : `#0B0B0F`
- Gris sombre : `#1A1A23`
- Blanc cassé : `#EDEDED`
- Animations personnalisées (float, pulse-glow, text-reveal)
- Box shadows avec glow violet

#### `tsconfig.json`
Correction du path alias : `"~/*": ["app/*"]`

#### `package.json`
Ajout de la dépendance : `framer-motion`

---

### 2. Composants (`app/components/`)

#### `Hero.tsx`
- Section hero plein écran
- Photo principale (`face-identiter-large.jpg`) dans une card flottante
- Texte animé avec rôles en boucle (Graphisme & Design / Développement Web & Mobile)
- Particules flottantes en arrière-plan
- CTA animés (Voir mes projets / Me contacter)
- Indicateur de scroll animé
- Badge "Disponible" avec animation pulse

#### `About.tsx`
- Section à propos avec photo identité (`face-identiter.jpg`)
- Bullet points avec stagger animation
- Stats cards (Experience, Stack, Passion)
- Section valeurs

#### `Services.tsx`
- 3 cards de services (Développement Web, Mobile, Design UI/UX)
- Chaque service avec : Le Défi, La Solution, Le Résultat
- Photo en plongée (`face-plonger.jpg`) en arrière-plan
- Hover effects premium avec glow

#### `Skills.tsx`
- Tabs pour catégories (Web, Design, Mobile, Autres)
- Cards de compétences avec :
  - Icônes emoji
  - Barres de progression animées
  - Tags de technologies
  - Summary au hover
- Données depuis `content.ts`

#### `Projects.tsx`
- Grille de 3 projets
- Cards avec :
  - Image avec zoom au hover
  - Overlay avec icône externe
  - Tags animés
  - Barre violette en bas au hover
- Lien vers GitHub

#### `Experience.tsx`
- Timeline verticale avec ligne animée
- Photo contre-plongée (`prodile-contreplonger.jpg`) sticky à droite
- Cards d'expérience avec :
  - Date badge
  - Entreprise et poste
  - Liste de responsabilités animées
- Badge "Toujours en quête d'excellence"

#### `Contact.tsx`
- Formulaire de contact complet (nom, email, sujet, message)
- Integration avec Remix fetcher
- Photo identité
- Cards d'info contact (Email, Téléphone, Localisation)
- Message de réassurance (24-48h)
- Feedback visuel (loading, success)

#### `Navbar.tsx`
- Navigation fixe avec blur au scroll
- Logo "DA."
- Liens vers toutes les sections
- Menu mobile avec animation slide
- CTA "Discutons"

#### `Footer.tsx`
- Logo et description
- Liens sociaux (GitHub, LinkedIn, Twitter, Email)
- Navigation rapide
- Infos de contact
- Copyright avec coeur animé

---

### 3. Routes (`app/routes/`)

#### `_index.tsx`
Page principale assemblée avec :
- Meta tags SEO complets
- AnimatePresence pour transitions
- Tous les composants dans l'ordre
- Bouton scroll-to-top flottant

#### `api.contact.tsx`
API route pour le formulaire de contact :
- Validation des champs
- Envoi d'email avec Resend
- Template HTML stylisé

---

### 4. Layout (`app/root.tsx`)

- Import de la font Inter (Google Fonts)
- Classe `scroll-smooth` sur html
- Meta theme-color
- ErrorBoundary stylisée

---

## Photos Utilisées

| Photo | Fichier | Section |
|-------|---------|---------|
| Identité classique | `face-identiter.jpg` | About, Contact |
| Identité large | `face-identiter-large.jpg` | Hero |
| Plongée | `face-plonger.jpg` | Services |
| Contre-plongée | `prodile-contreplonger.jpg` | Experience |

---

## Animations Framer Motion

- **containerVariants** : staggerChildren pour animer les enfants en séquence
- **itemVariants** : fade + translateY avec easing cubic-bezier
- **imageVariants** : scale + opacity avec delay
- **lineVariants** : scaleY pour la timeline
- **useInView** : trigger au scroll avec margin
- **whileHover** : scale, glow, translations
- **AnimatePresence** : transitions de texte en boucle

---

## Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Vérification TypeScript
npm run typecheck

# Lancer en production
npm run start
```

---

## Structure Finale

```
app/
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   ├── Services.tsx
│   └── Skills.tsx
├── data/
│   └── content.ts (existant - données)
├── routes/
│   ├── _index.tsx
│   ├── api.contact.tsx
│   ├── cv[.]pdf.tsx (existant)
│   └── yscv[.]pdf.tsx (existant)
├── root.tsx
├── tailwind.css
└── entry.client.tsx / entry.server.tsx
```

---

## Date de création

17 janvier 2026
