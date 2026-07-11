import type { LoaderFunctionArgs } from "@remix-run/node";
import { projectsData } from "~/data/content";

/**
 * ✅ Génère dynamiquement le sitemap.xml pour le SEO
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = new URL(request.url).origin;

  // Liste des URLs statiques
  const staticUrls = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "1.0",
    },
  ];

  // Une page dédiée existe pour chaque projet (voir app/routes/projets.$slug.tsx).
  const projectUrls = projectsData.map((project) => ({
    loc: `${baseUrl}/projets/${project.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.8",
  }));

  const allUrls = [...staticUrls, ...projectUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600", // Cache pendant 1 heure
    },
  });
}
