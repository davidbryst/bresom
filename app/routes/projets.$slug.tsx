import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";
import Lightbox from "~/components/lite/Lightbox";
import LiteFooter from "~/components/lite/LiteFooter";
import LiteHeader from "~/components/lite/LiteHeader";
import LiteThemeSwitcher from "~/components/lite/LiteThemeSwitcher";
import Reveal from "~/components/lite/Reveal";
import SmoothAnchors from "~/components/lite/SmoothAnchors";
import { projectsData } from "~/data/content";

// Project mockups live in /public/projet; content.ts stores them as "/name.webp".
const imgPath = (image: string) => `/projet${image}`;

// Same cycling accent as the grid on LiteWork, so a card's color carries over to its detail page.
// Full class strings (not built at runtime) so Tailwind's scanner can see them.
const ACCENTS = ["text-vermilion", "text-cobalt", "text-forest"];
const HOVER_ACCENTS = [
  "group-hover:text-vermilion",
  "group-hover:text-cobalt",
  "group-hover:text-forest",
];

export async function loader({ params }: LoaderFunctionArgs) {
  const index = projectsData.findIndex((p) => p.slug === params.slug);
  if (index === -1) throw new Response("Projet introuvable", { status: 404 });

  const count = projectsData.length;
  const project = projectsData[index];
  const prev = projectsData[(index - 1 + count) % count];
  const next = projectsData[(index + 1) % count];

  // Everything but the current project and its immediate prev/next, ranked by
  // shared category/tags so the closest matches lead when the catalog grows.
  const related = projectsData
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      project: p,
      score:
        (p.category === project.category ? 2 : 0) +
        p.tags.filter((t) => project.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((r) => r.project)
    .filter((p) => p.slug !== prev.slug && p.slug !== next.slug)
    .slice(0, 3);

  return json({ project, index, prev, next, related });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Projet introuvable | David Abraham" }];
  const { project } = data;
  const siteUrl = "https://davidabraham.vercel.app";
  const url = `${siteUrl}/projets/${project.slug}`;
  const title = `${project.title} — Travaux | David Abraham`;
  const imageUrl = `${siteUrl}${imgPath(project.image)}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url,
    image: imageUrl,
    creator: { "@type": "Person", name: "David Abraham" },
    keywords: project.tags.join(", "),
  };

  return [
    { title },
    { name: "description", content: project.summary },
    { property: "og:title", content: title },
    { property: "og:description", content: project.summary },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: project.summary },
    { name: "twitter:image", content: imageUrl },
    { tagName: "link", rel: "canonical", href: url },
    { "script:ld+json": structuredData },
  ];
};

// Full-format preview that opens the lightbox. object-contain (not cover) so
// nothing gets cropped — mockups range from wide laptop shots to tall phone
// screens and both need to show in full.
function ZoomableShot({
  src,
  alt,
  eager = false,
  className = "",
  onOpen,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Agrandir "${alt}"`}
      className={`group relative block w-full overflow-hidden border border-ink/35 bg-bone ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.14em] px-2.5 py-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Voir en grand <span aria-hidden>⤢</span>
      </span>
    </button>
  );
}

export default function ProjectDetail() {
  const { project, index, prev, next, related } =
    useLoaderData<typeof loader>();
  const count = projectsData.length;
  const accent = ACCENTS[index % ACCENTS.length];
  const prevHoverAccent =
    HOVER_ACCENTS[((index - 1 + count) % count) % HOVER_ACCENTS.length];
  const nextHoverAccent =
    HOVER_ACCENTS[(index + 1) % count % HOVER_ACCENTS.length];

  const galleryImages = [
    {
      src: imgPath(project.image),
      alt: `Aperçu du projet ${project.title}`,
    },
    ...(project.gallery ?? []).map((g) => ({
      src: imgPath(g),
      alt: `Aperçu supplémentaire du projet ${project.title}`,
    })),
  ];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <SmoothAnchors />
      <LiteHeader />
      <main id="main-content" className="pt-28 md:pt-36 pb-20 md:pb-32">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Link
            to="/#work"
            className="lite-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-ink/70 hover:text-ink"
          >
            <span aria-hidden>←</span> Tous les travaux
          </Link>

          {/* Title */}
          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b-2 border-ink pb-8">
            <div>
              <span className={`lite-display text-3xl md:text-4xl ${accent}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h1 className="lite-display text-[clamp(2.2rem,8vw,6.5rem)] mt-2 leading-[0.95]">
                {project.title}
              </h1>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60 mt-3">
                {project.category}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end md:max-w-xs">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] uppercase tracking-wide text-ink/60 border border-ink/20 px-2.5 py-1"
                >
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Summary + CTA + meta */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <p className="text-lg md:text-xl leading-relaxed text-ink/80 max-w-2xl">
                {project.summary}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-8 inline-flex items-center gap-2 bg-ink text-paper font-mono text-sm uppercase tracking-[0.14em] px-7 py-4 hover:bg-vermilion transition-colors"
              >
                Voir le site en ligne
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
            <div className="lg:col-span-4 grid grid-cols-1 gap-px bg-ink/15 border border-ink/35 self-start">
              <div className="bg-paper p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                  Rôle
                </div>
                <div className="font-display font-bold text-sm mt-1">
                  {project.role}
                </div>
              </div>
              <div className="bg-paper p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                  Catégorie
                </div>
                <div className="font-display font-bold text-sm mt-1">
                  {project.category}
                </div>
              </div>
              <div className="bg-paper p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                  Projet
                </div>
                <div className="font-display font-bold text-sm mt-1">
                  {String(index + 1).padStart(2, "0")} / {projectsData.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cover shot — full width, click to zoom, never cropped */}
        <Reveal className="mt-12 md:mt-16 px-5 md:px-10">
          <div className="mx-auto max-w-[1500px]">
            <ZoomableShot
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              eager
              onOpen={() => setLightboxIndex(0)}
              className="h-[46vh] sm:h-[56vh] md:h-[68vh] border-2"
            />
          </div>
        </Reveal>

        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          {/* Approach + gallery */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/80">
                (0{index + 1}) — L'approche
              </span>
              <div className="mt-5">
                {project.highlights.map((h, i) => (
                  <div
                    key={h}
                    className="flex gap-4 border-t border-ink/15 py-5 first:border-t-0 first:pt-0"
                  >
                    <span
                      className={`lite-display text-xl md:text-2xl leading-none ${accent}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-ink/80 leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            {galleryImages.length > 1 && (
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 self-start">
                {galleryImages.slice(1).map((img, i) => (
                  <ZoomableShot
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    onOpen={() => setLightboxIndex(i + 1)}
                    className="h-72 sm:h-80 md:h-96"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stack strip — full-bleed, matches the marquee treatment on the homepage */}
        <div className="mt-16 md:mt-24 border-y-2 border-ink bg-ink text-paper">
          <div className="mx-auto max-w-[1500px] px-5 md:px-10 py-6 flex flex-wrap items-center gap-x-10 gap-y-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
              Stack & outils
            </span>
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-display font-bold text-lg md:text-2xl uppercase"
              >
                {t.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          {/* Closing CTA */}
          <div className="mt-16 md:mt-24 text-center py-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              Envie d'un résultat similaire ?
            </p>
            <h2 className="lite-display text-[clamp(2rem,6vw,4rem)] mt-4">
              Discutons de votre projet
            </h2>
            <Link
              to="/#contact"
              className="group mt-8 inline-flex items-center gap-2 bg-ink text-paper font-mono text-sm uppercase tracking-[0.14em] px-7 py-4 hover:bg-vermilion transition-colors"
            >
              Me contacter
              <span className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div className="mt-16 md:mt-24 border-t-2 border-ink pt-8">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-ink/80">
                Projets liés
              </span>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => {
                  const rIndex = projectsData.findIndex(
                    (p) => p.slug === r.slug,
                  );
                  const rAccent = ACCENTS[rIndex % ACCENTS.length];
                  return (
                    <Link
                      key={r.slug}
                      to={`/projets/${r.slug}`}
                      className="group block"
                    >
                      <div className="overflow-hidden border border-ink/35 bg-bone aspect-[4/3]">
                        <img
                          src={imgPath(r.image)}
                          alt={`Aperçu du projet ${r.title}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-center grayscale-[35%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="mt-3 flex items-baseline justify-between gap-2">
                        <span className="font-display font-bold text-base group-hover:underline">
                          {r.title}
                        </span>
                        <span className={`font-mono text-xs ${rAccent}`}>
                          {String(rIndex + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                        {r.category}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Prev / next project */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 border-t-2 border-ink">
            <Link
              to={`/projets/${prev.slug}`}
              className="group flex items-center gap-4 py-8 sm:pr-8 sm:border-r border-ink/35"
            >
              <span className="text-3xl transition-transform group-hover:-translate-x-2">
                ←
              </span>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                  Précédent
                </span>
                <div
                  className={`lite-display text-2xl md:text-4xl mt-2 transition-colors ${prevHoverAccent}`}
                >
                  {prev.title}
                </div>
              </div>
            </Link>
            <Link
              to={`/projets/${next.slug}`}
              className="group flex items-center justify-between gap-4 py-8 sm:pl-8 text-right"
            >
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/60">
                  Suivant
                </span>
                <div
                  className={`lite-display text-2xl md:text-4xl mt-2 transition-colors ${nextHoverAccent}`}
                >
                  {next.title}
                </div>
              </div>
              <span className="text-3xl transition-transform group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </main>
      <LiteFooter />
      <LiteThemeSwitcher />

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <>
      <SmoothAnchors />
      <LiteHeader />
      <main className="pt-40 md:pt-48 pb-32 text-center">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-vermilion">
            {notFound ? "Erreur — 404" : "Erreur — 500"}
          </span>
          <h1 className="lite-display text-[clamp(2.5rem,10vw,7rem)] mt-4">
            {notFound ? "Projet introuvable" : "Oups."}
          </h1>
          <p className="mt-4 text-ink/70 max-w-md mx-auto">
            {notFound
              ? "Ce projet n'existe pas ou a été déplacé."
              : "Une erreur est survenue en chargeant ce projet."}
          </p>
          <Link
            to="/#work"
            className="mt-8 inline-flex items-center gap-2 bg-ink text-paper font-mono text-sm uppercase tracking-[0.14em] px-7 py-4 hover:bg-vermilion transition-colors"
          >
            Retour aux travaux
          </Link>
        </div>
      </main>
      <LiteFooter />
    </>
  );
}
