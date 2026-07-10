# Notes de sync — Bresom Lite Design System

## Contexte du repo

`bresom` est le portfolio Remix de David Abraham, **pas** un package de design
system publié. Il n'y a ni Storybook, ni `dist/`, ni `.d.ts` shippé pour
`app/components/lite`. L'utilisateur a explicitement choisi de synchroniser
ce dossier quand même (fidélité limitée assumée).

## Pourquoi `cfg.entry` pointe vers `.design-sync/entry.mjs` (fichier réel, écrit à la main)

Premier essai : `cfg.entry` pointant vers un chemin inexistant pour déclencher
le mode **synth-entry** du convertisseur (qui scanne `cfg.srcDir` et génère
un point d'entrée `export * from '<fichier>'` par composant). Ça a échoué au
`package-validate.mjs` : `[BUNDLE_EXPORT] 10/10 not a component on
window.BresomLite`. Cause : **tous** les composants Lite sont des
`export default function X()` — `export * from` ne réexporte JAMAIS les
exports par défaut (sémantique ES modules), donc le bundle généré n'exposait
aucun des 10 composants sous leur nom.

Correction : `.design-sync/entry.mjs` (committé, écrit à la main) réexporte
chaque défaut sous son vrai nom (`export { default as LiteHero } from
'../app/components/lite/LiteHero'`, etc.). `cfg.entry` pointe dessus — ce
fichier existe donc `resolveDistEntry` le retourne tel quel (pas de
synth-entry), et `package-build.mjs` remonte depuis son dossier pour trouver
le `package.json` nommé le plus proche (celui de la racine du repo,
`"bresom"`) → `PKG_DIR` = racine du repo, sans avoir besoin d'un vrai package
npm installé. Comme il n'y a pas de `.d.ts` shippé (le tsconfig a
`noEmit: true`), la liste des composants ne vient plus d'un scan de types —
elle vient de `cfg.componentSrcMap` (10 entrées explicites, une par
composant, pointant vers le vrai fichier source pour l'enrichissement
JSDoc/groupe).

**Effet de bord accepté** : comme ce n'est plus le mode synth-entry, le Set
interne `exported` (utilisé pour décider si une preview doit pointer vers le
bundle partagé `window.BresomLite.*` ou compiler sa propre copie) reste
vide. Contournement : chaque preview importe le **nom du package**
(`import { LiteHero } from 'bresom-lite'`) plutôt qu'un chemin d'app — la
règle 1 de `story-imports.mjs` shim tout import du nom de package vers
`window.BresomLite`, indépendamment du Set `exported`. Donc les previews
référencent bien le bundle réellement livré, pas une copie dupliquée.

**Maintenance** : `.design-sync/entry.mjs` doit être mis à jour à la main
(ajout/suppression/renommage d'une ligne d'export) en même temps que
`cfg.componentSrcMap`, chaque fois qu'un composant est ajouté/renommé/retiré
dans `app/components/lite`.

## CSS composite (`cfg.cssEntry`)

Les composants Lite n'importent aucun CSS directement (classes Tailwind
uniquement) — Tailwind est compilé au build de toute l'app Remix
(`npm run build` → `build/client/assets/root-*.css`), et les polices
(Syne / Hanken Grotesk / JetBrains Mono) sont chargées via un
`<link rel="stylesheet">` Google Fonts distant dans `app/root.tsx` (pas de
`@font-face` local à extraire).

`cfg.cssEntry` pointe donc vers `.design-sync/.cache/generated-styles.css`,
un fichier **généré** (gitignored) = `@import url(googleapis…)` (police
distante, `[FONT_REMOTE]`, chargée à l'exécution) + le contenu du CSS Tailwind
compilé. Régénérer avant chaque re-sync avec `cfg.buildCmd` (ou : `npm run
build` puis concaténer l'import Google Fonts + `build/client/assets/root-*.css`
dans ce fichier). **Risque de re-sync** : le nom du fichier CSS de sortie
Vite est haché (`root-<hash>.css`) et change à chaque build — le glob
`build/client/assets/root-*.css` gère ça.

## Composants exclus (`cfg.componentSrcMap`)

- **`LiteContact`** : utilise `useFetcher`/`fetcher.Form` de `@remix-run/react`,
  qui exige un contexte de routeur Remix (`RemixServer`/`RemixBrowser`).
  Rendu isolé (hors de l'app Remix), ce hook lève une erreur d'invariant —
  impossible à monter dans une preview statique sans reconstituer tout le
  contexte de routing Remix. Exclu plutôt que livré cassé.
- **`SmoothAnchors`** : composant comportemental pur (`return null`, juste des
  écouteurs d'événements pour le scroll fluide vers les ancres) — aucun rendu
  visuel, ne correspond à aucune carte utile dans le panneau Design System.

## Limitation connue : `Reveal` / animations scroll-fade

`Reveal.tsx` (et tout composant qui l'utilise en interne : `LiteAbout`,
`LiteExperience`, `LiteServices`, `LiteSkills`, `LiteWork`) démarre à
`opacity: 0` et bascule à `opacity: 1` via une transition CSS de 0.8s
déclenchée par un `IntersectionObserver` au montage. Le contrôle de rendu
automatisé (`package-validate.mjs`) ne vérifie pas l'opacité (seulement le
contenu DOM/texte/peinture structurelle), donc ça ne fait pas échouer le
gate — mais une capture d'écran prise juste après le chargement réseau peut
montrer le contenu en fondu partiel plutôt qu'à pleine opacité. Cosmétique,
pas bloquant.

## Known render warns

- `[RENDER_BLANK] LiteThemeSwitcher` — le screenshot plein-page (`fullPage: true`)
  sort quasi blanc (4513 B) car le composant n'a qu'un enfant `position: fixed`
  (le widget flottant bas-droite), qui ne contribue pas à la hauteur de
  page mesurée. Confirmé **bénin** via `.render-check.json` :
  `rootEmpty: false`, `maxHeight: 48` (la vraie hauteur du bouton 48px est
  bien mesurée), `texts: ["Accent"]` (le label du panneau de nuances est bien
  monté), `errs: 0`. Le composant se monte et peint correctement — c'est un
  artefact de capture plein-page sur un élément fixed, pas un vrai défaut de
  rendu. À re-confirmer si ce warn disparaît ou change de forme lors d'un
  futur re-sync (signe que quelque chose a changé).
- Images cassées attendues sur `LiteHero`/`LiteAbout` (photo placeholder visible
  en boîte vide) — chemins absolus vers des assets du site réel, non servis
  dans l'environnement de rendu isolé. Voir "Re-sync risks" plus bas.

## Re-sync — commande unique

```
npm run build && bash -c "{ echo \"@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');\"; cat build/client/assets/root-*.css; } > .design-sync/.cache/generated-styles.css"
```
puis relancer le driver (`resync.mjs`) comme d'habitude.

## Re-sync risks

- Le CSS livré est un **sur-ensemble** : il contient TOUT le Tailwind de
  l'app entière (pas seulement les classes `lite-*`), donc plus lourd que
  nécessaire mais sans classe manquante.
- Les images référencées en dur (`/profile/face-identiter-large.webp`, etc.)
  sont des chemins absolus vers les assets du site réel — elles ne seront
  pas servies dans l'environnement de rendu de claude.ai/design (images
  cassées attendues sur les previews qui en dépendent, ex. `LiteHero`).
- `.design-sync/entry.mjs` est **maintenu à la main** — si un composant Lite
  est ajouté/renommé/retiré dans `app/components/lite` sans mettre à jour ce
  fichier ET `cfg.componentSrcMap` en même temps, le build sortira désynchro
  (`[BUNDLE_EXPORT]` va recommencer à échouer pour le nouveau composant, ou
  `.d.ts`/`.prompt.md` pointeront vers un fichier qui n'existe plus).
- Playwright/Chromium ne sont **pas commités** (installés dans `.ds-sync/` et
  `~/.cache/ms-playwright` ou équivalent Windows) — à réinstaller sur toute
  nouvelle machine/clone avant de pouvoir lancer `package-validate.mjs`.
- Les `cfg.overrides` `cardMode` (`LiteAbout`, `LiteExperience`, `LiteFooter`,
  `LiteSkills`, `LiteWork` en `column` ; `LiteHeader`, `LiteThemeSwitcher` en
  `single` + viewport) sont calibrés sur le contenu actuel de `content.ts` —
  si le contenu change significativement (plus/moins de texte), revalider
  qu'aucun nouveau `[GRID_OVERFLOW]` n'apparaît sur un composant qui n'en a
  pas aujourd'hui.
