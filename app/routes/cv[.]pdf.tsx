import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToStream, Image } from "@react-pdf/renderer";
import { aboutData, contactData, experiencesData, heroData, projectsData, skillsData } from "../data/cvContent";

// Palette moderne
const ACCENT = "#0ea5e9"; // Sky 500
const ACCENT_LIGHT = "#e0f2fe"; // Sky 100
const TEXT_MUTED = "#6b7280"; // Gray 500
const SURFACE = "#ffffff";
const SIDEBAR_BG = "#111827"; // Gray 900
const SIDEBAR_TEXT = "#e5e7eb"; // Gray 200

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: SURFACE,
    padding: 0,
  },
  sidebar: {
    width: 180,
    backgroundColor: SIDEBAR_BG,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  verticalText: { display: "none" },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
    objectFit: "cover",
  },
  sideName: { color: SIDEBAR_TEXT, fontSize: 16, fontWeight: 700, textAlign: "center" },
  sideRole: { color: ACCENT_LIGHT, fontSize: 10, textAlign: "center", marginBottom: 12 },
  sideSection: { width: "100%", marginTop: 10 },
  sideSectionTitle: { color: ACCENT_LIGHT, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 },
  sideItem: { color: SIDEBAR_TEXT, fontSize: 10, marginBottom: 4 },
  sideMuted: { color: "#9ca3af", fontSize: 10 },
  interestsRow: { flexDirection: "row", flexWrap: "wrap" },
  interestIcon: { color: SIDEBAR_TEXT, fontSize: 12, marginRight: 8, marginBottom: 6 },
  main: {
    flex: 1,
    padding: 32,
    justifyContent: "flex-start",
  },
  header: { fontSize: 22, fontWeight: 700, marginBottom: 4 },
  subHeader: { fontSize: 11, color: TEXT_MUTED, marginBottom: 10 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginTop: 10, marginBottom: 6 },
  sectionBar: { width: 16, height: 2, backgroundColor: ACCENT, marginRight: 6, borderRadius: 2 },
  sectionTitle: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 },
  bullet: { marginBottom: 3, lineHeight: 1.3 },
  small: { color: TEXT_MUTED, lineHeight: 1.2 },
  row: { flexDirection: "row" },
  colLeft: { width: 240, paddingRight: 16 },
  colRight: { flex: 1, paddingLeft: 16 },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 8 },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  barLabel: {
  width: 90,
  fontSize: 10,
    color: "#333",
  },
  bar: {
  height: 6,
    borderRadius: 4,
    backgroundColor: ACCENT,
    marginLeft: 8,
  },
  barBg: {
  width: 140,
  height: 6,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",
    marginLeft: 8,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 6, marginBottom: 6 },
  chip: { fontSize: 9, color: "#0369a1", backgroundColor: ACCENT_LIGHT, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 10, marginRight: 4, marginBottom: 4 },
  experienceCard: { borderLeftColor: ACCENT, borderLeftWidth: 2, paddingLeft: 8, marginBottom: 8 },
  skillGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 4 },
  skillCard: { width: "48%", borderColor: "#e5e7eb", borderWidth: 1, borderRadius: 6, padding: 8, marginBottom: 8 },
  skillAbbrev: { fontSize: 20, fontWeight: 700, color: ACCENT, marginBottom: 4 },
  skillName: { fontSize: 10, color: "#111827" },
  skillRule: { width: 40, height: 2, backgroundColor: ACCENT, borderRadius: 2, marginTop: 6 },
});

function CVDocument({ imageUrl }: { imageUrl?: string }) {
  // Build compact content to fit a single A4 page (simplified)
  const maxExperiences = 2;
  const maxRespPerExp = 1;
  const maxProjects = 1;

  // Helper to create a concise profile summary
  const summarize = (text: string, max = 220) => {
    if (!text) return "";
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const lastPeriod = cut.lastIndexOf(".");
    if (lastPeriod > max * 0.5) return cut.slice(0, lastPeriod + 1);
    return cut.trim() + "…";
  };

  // Derive 4-6 skills from skillsData if available, else fallback
  const derivedSkills = (skillsData && skillsData.length
    ? skillsData
        .flatMap((g) => g.buckets.flatMap((b) => b.items.map((i) => i.name)))
        .slice(0, 6)
    : ["Adobe XD", "Figma", "Photoshop", "Illustrator", "React", "TypeScript"]).map(
    (name, idx) => ({ label: name, value: 0.9 - (idx % 5) * 0.1 })
  );

  const profileSummary = summarize(aboutData.description);
  const initials = heroData.name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Photo */}
          {imageUrl ? (
            <Image src={imageUrl} style={styles.profileImage} />
          ) : (
            <View style={{ height: 110, width: 110, borderRadius: 55, backgroundColor: "#1f2937", marginBottom: 16 }} />
          )}
          <Text style={styles.sideName}>{heroData.name}</Text>
          <Text style={styles.sideRole}>{heroData.primaryLines[0]}</Text>

          {/* Contact */}
          <View style={styles.sideSection}>
            <Text style={styles.sideSectionTitle}>Contact</Text>
            <Text style={styles.sideItem}>✉ {contactData.email}</Text>
            <Text style={styles.sideItem}>☎ {contactData.phone}</Text>
            <Text style={styles.sideItem}>📍 {contactData.location}</Text>
          </View>

          {/* Interests */}
          <View style={styles.sideSection}>
            <Text style={styles.sideSectionTitle}>Intérêts</Text>
            <View style={styles.interestsRow}>
              <Text style={styles.interestIcon}>🎧</Text>
              <Text style={styles.interestIcon}>🎮</Text>
              <Text style={styles.interestIcon}>📷</Text>
              <Text style={styles.interestIcon}>✈️</Text>
            </View>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.main}>
          {/* Main starts directly with sections (header moved to sidebar) */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionTitle}>Profil</Text>
          </View>
          <Text style={{ lineHeight: 1.3, marginBottom: 6 }}>{profileSummary}</Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            {/* Left column */}
            <View style={styles.colLeft}>
              {aboutData.points?.slice(0, 2).map((p) => (
                <Text key={p} style={styles.bullet}>• {p}</Text>
              ))}
              <Text style={styles.small}>Expérience: {aboutData.experience}</Text>
              <Text style={styles.small}>Stack: {aboutData.stack}</Text>
              <Text style={styles.small}>Valeurs: {aboutData.values}</Text>

              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Compétences</Text>
              </View>
              <View style={styles.skillGrid}>
                {derivedSkills.slice(0, 4).map((s) => (
                  <View key={`card-${s.label}`} style={styles.skillCard}>
                    <Text style={styles.skillAbbrev}>{s.label.split(" ")[0].slice(0,2)}</Text>
                    <Text style={styles.skillName}>{s.label}</Text>
                    <View style={styles.skillRule} />
                  </View>
                ))}
              </View>

              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Projets</Text>
              </View>
              {projectsData.slice(0, maxProjects).map((p) => (
                <Text key={p.title} style={styles.bullet}>• {p.title} — {p.description}</Text>
              ))}
            </View>

            {/* Right column */}
            <View style={styles.colRight}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Expériences</Text>
              </View>
              {experiencesData.slice(0, maxExperiences).map((exp) => (
                <View key={`${exp.company}-${exp.date}`} style={styles.experienceCard}>
                  <Text style={{ fontWeight: 700 }}>{exp.company}</Text>
                  <Text>{exp.position}</Text>
                  <Text style={styles.small}>{exp.date}</Text>
                  {exp.responsibilities.slice(0, maxRespPerExp).map((r) => (
                    <Text key={r} style={styles.bullet}>• {r}</Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
  const url = new URL(request.url);
  const base = `${url.protocol}//${url.host}`;
  // Use public/profile.jpg if exists; otherwise undefined
  const imageUrl = `${base}/profile.jpg`;
  const stream = await renderToStream(<CVDocument imageUrl={imageUrl} />);
    return new Response(stream as unknown as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=David-Abraham-CV.pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return json({ error: e?.message || "PDF generation failed" }, { status: 500 });
  }
}

export const headers = () => ({
  "Content-Type": "application/pdf",
});


