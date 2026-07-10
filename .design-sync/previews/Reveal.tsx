import { Reveal } from 'bresom-lite';

export const Default = () => (
  <Reveal>
    <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 24, color: '#0E0E0E' }}>
      Contenu révélé au scroll — David Abraham, Développeur Full-Stack &amp; Designer UI/UX.
    </p>
  </Reveal>
);

export const WithDelay = () => (
  <Reveal delay={140}>
    <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 18, color: '#0E0E0E' }}>
      Variante avec un délai d'apparition décalé (utilisée pour l'effet de cascade).
    </p>
  </Reveal>
);
