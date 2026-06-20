import type { MetaFunction } from "@remix-run/node";
import LiteHeader from "~/components/lite/LiteHeader";
import LiteHero from "~/components/lite/LiteHero";
import LiteWork from "~/components/lite/LiteWork";
import LiteAbout from "~/components/lite/LiteAbout";
import LiteServices from "~/components/lite/LiteServices";
import LiteSkills from "~/components/lite/LiteSkills";
import LiteExperience from "~/components/lite/LiteExperience";
import LiteContact from "~/components/lite/LiteContact";
import LiteFooter from "~/components/lite/LiteFooter";
import { aboutData, contactData } from "~/data/content";

export const meta: MetaFunction = () => {
  const siteUrl = "https://davidabraham.vercel.app";
  const title = "David Abraham — Développeur Full-Stack & Designer UI/UX";
  const description =
    "Portfolio de David Abraham — Développeur Web & Mobile Full-Stack et Designer UI/UX à Abidjan. Sites, applications et systèmes de design sur-mesure.";
  const imageUrl = `${siteUrl}/profile/face-identiter-large.webp`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "David Abraham",
    jobTitle: "Développeur Full-Stack & Designer UI/UX",
    url: siteUrl,
    image: imageUrl,
    description: aboutData.description,
    email: contactData.email,
    telephone: contactData.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abidjan",
      addressRegion: "Cocody",
      addressCountry: "CI",
    },
    knowsAbout: [
      "Développement Web",
      "React",
      "Remix",
      "Next.js",
      "TypeScript",
      "Node.js",
      "UI/UX Design",
      "Figma",
      "React Native",
    ],
  };

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "développeur, full stack, react, remix, nextjs, typescript, ui/ux, design, web, mobile, abidjan, côte d'ivoire",
    },
    { name: "author", content: "David Abraham" },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: siteUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:site_name", content: "David Abraham" },
    { property: "og:locale", content: "fr_FR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { tagName: "link", rel: "canonical", href: siteUrl },
    { "script:ld+json": structuredData },
  ];
};

export default function Index() {
  return (
    <>
      <LiteHeader />
      <main id="main-content">
        <LiteHero />
        <LiteWork />
        <LiteAbout />
        <LiteServices />
        <LiteSkills />
        <LiteExperience />
        <LiteContact />
      </main>
      <LiteFooter />
    </>
  );
}
