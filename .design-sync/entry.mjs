// Hand-authored entry for the design-sync package build. Every component in
// app/components/lite is a DEFAULT export; the converter's synth-entry mode
// generates blind `export * from <file>` lines, which never forward default
// exports (ES module semantics) — window.BresomLite.<Name> ends up
// undefined. This file re-exports each default under its real name instead.
// See .design-sync/NOTES.md for the full story. Update alongside
// cfg.componentSrcMap whenever a lite component is added, removed, or renamed.
export { default as LiteAbout } from '../app/components/lite/LiteAbout';
export { default as LiteExperience } from '../app/components/lite/LiteExperience';
export { default as LiteFooter } from '../app/components/lite/LiteFooter';
export { default as LiteHeader } from '../app/components/lite/LiteHeader';
export { default as LiteHero } from '../app/components/lite/LiteHero';
export { default as LiteServices } from '../app/components/lite/LiteServices';
export { default as LiteSkills } from '../app/components/lite/LiteSkills';
export { default as LiteThemeSwitcher } from '../app/components/lite/LiteThemeSwitcher';
export { default as LiteWork } from '../app/components/lite/LiteWork';
export { default as Reveal } from '../app/components/lite/Reveal';
