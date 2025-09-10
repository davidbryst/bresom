import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Document, Page, Text, View, StyleSheet, renderToStream, Image } from "@react-pdf/renderer";
import { aboutData, contactData, experiencesData, heroData, projectsData, skillsData } from "../data/cvContent";

// Palette moderne et sophistiquée
const ACCENT = "#3b82f6"; // Blue 500 - plus moderne et professionnel
const ACCENT_LIGHT = "#dbeafe"; // Blue 100
const ACCENT_DARK = "#1e40af"; // Blue 800
const TEXT_PRIMARY = "#111827"; // Gray 900 - texte principal plus sombre
const TEXT_MUTED = "#6b7280"; // Gray 500
const SURFACE = "#ffffff";
const SIDEBAR_BG = "#0f172a"; // Slate 900 - plus moderne
const SIDEBAR_TEXT = "#f1f5f9"; // Slate 100
const SIDEBAR_ACCENT = "#64748b"; // Slate 500

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: SURFACE,
    padding: 0,
    lineHeight: 1.4,
  },
  sidebar: {
    width: 190,
    backgroundColor: SIDEBAR_BG,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  verticalText: { display: "none" },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    objectFit: "cover",
    border: `4px solid ${ACCENT}`,
    boxShadow: `0 4px 20px rgba(59, 130, 246, 0.3)`,
  },
  sideName: { 
    color: SIDEBAR_TEXT, 
    fontSize: 18, 
    fontWeight: 700, 
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sideRole: { 
    color: ACCENT, 
    fontSize: 11, 
    textAlign: "center", 
    marginBottom: 20,
    fontWeight: 500,
  },
  sideSection: { width: "100%", marginTop: 16 },
  sideSectionTitle: { 
    color: ACCENT, 
    fontSize: 11, 
    letterSpacing: 1.2, 
    textTransform: "uppercase", 
    marginBottom: 10,
    fontWeight: 600,
  },
  sideItem: { 
    color: SIDEBAR_TEXT, 
    fontSize: 10, 
    marginBottom: 6,
    lineHeight: 1.3,
  },
  sideMuted: { color: SIDEBAR_ACCENT, fontSize: 10 },
  interestsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  interestIcon: { 
    color: SIDEBAR_TEXT, 
    fontSize: 16, 
    marginRight: 12, 
    marginBottom: 8,
    textAlign: "center",
  },
  main: {
    flex: 1,
    padding: 36,
    justifyContent: "flex-start",
  },
  header: { 
    fontSize: 24, 
    fontWeight: 700, 
    marginBottom: 6,
    color: TEXT_PRIMARY,
    letterSpacing: 0.3,
  },
  subHeader: { 
    fontSize: 12, 
    color: TEXT_MUTED, 
    marginBottom: 12,
    fontWeight: 400,
  },
  sectionHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 14, 
    marginBottom: 10 
  },
  sectionBar: { 
    width: 20, 
    height: 3, 
    backgroundColor: ACCENT, 
    marginRight: 8, 
    borderRadius: 2 
  },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: 700, 
    textTransform: "uppercase", 
    letterSpacing: 0.8,
    color: TEXT_PRIMARY,
  },
  bullet: { 
    marginBottom: 5, 
    lineHeight: 1.4,
    color: TEXT_PRIMARY,
    fontSize: 10,
  },
  small: { 
    color: TEXT_MUTED, 
    lineHeight: 1.3,
    fontSize: 9,
    marginBottom: 3,
  },
  row: { flexDirection: "row" },
  colLeft: { width: 250, paddingRight: 20 },
  colRight: { flex: 1, paddingLeft: 20 },
  divider: { 
    height: 1, 
    backgroundColor: "#e5e7eb", 
    marginVertical: 12,
    opacity: 0.7,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  barLabel: {
    width: 90,
    fontSize: 10,
    color: TEXT_PRIMARY,
  },
  bar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: ACCENT,
    marginLeft: 8,
  },
  barBg: {
    width: 140,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",
    marginLeft: 8,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 10,
  },
  chipRow: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginTop: 8, 
    marginBottom: 8 
  },
  chip: { 
    fontSize: 9, 
    color: ACCENT_DARK, 
    backgroundColor: ACCENT_LIGHT, 
    paddingVertical: 3, 
    paddingHorizontal: 8, 
    borderRadius: 12, 
    marginRight: 6, 
    marginBottom: 6,
    fontWeight: 500,
  },
  experienceCard: { 
    borderLeftColor: ACCENT, 
    borderLeftWidth: 4, 
    paddingLeft: 12, 
    marginBottom: 12,
    backgroundColor: "#f8fafc",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    borderRadius: 6,
    borderTopColor: "#e2e8f0",
    borderTopWidth: 1,
    borderRightColor: "#e2e8f0",
    borderRightWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomWidth: 1,
  },
  skillGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    marginTop: 8 
  },
  skillCard: { 
    width: "48%", 
    borderColor: "#cbd5e1", 
    borderWidth: 1, 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 10,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    borderTopColor: "#e2e8f0",
    borderTopWidth: 1,
  },
  skillIcon: { 
    fontSize: 24, 
    color: ACCENT, 
    marginBottom: 6,
    textAlign: "center",
  },
  skillName: { 
    fontSize: 10, 
    color: TEXT_PRIMARY,
    textAlign: "center",
    fontWeight: 500,
  },
  skillRule: { 
    width: 50, 
    height: 3, 
    backgroundColor: ACCENT, 
    borderRadius: 2, 
    marginTop: 8 
  },
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
  const skillIcons = {
    "Adobe XD": "🎨",
    "Figma": "📐",
    "Photoshop": "🖼️",
    "Illustrator": "✏️",
    "React": "⚛️",
    "TypeScript": "📘",
    "Node.js": "🟢",
    "Laravel": "🔶",
    "Spring Boot": "🍃",
    "Angular": "🅰️",
  };

  const derivedSkills = (skillsData && skillsData.length
    ? skillsData
        .flatMap((g) => g.buckets.flatMap((b) => b.items.map((i) => i.name)))
        .slice(0, 6)
    : ["Adobe XD", "Figma", "Photoshop", "Illustrator", "React", "TypeScript"]).map(
    (name, idx) => ({ 
      label: name, 
      value: 0.9 - (idx % 5) * 0.1,
      icon: skillIcons[name] || "🛠️"
    })
  );

  const profileSummary = summarize(aboutData.description);

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
            <Text style={styles.sideItem}>📧 {contactData.email}</Text>
            <Text style={styles.sideItem}>📱 {contactData.phone}</Text>
            <Text style={styles.sideItem}>📍 {contactData.location}</Text>
          </View>

          {/* Interests with better spacing */}
          <View style={styles.sideSection}>
            <Text style={styles.sideSectionTitle}>Centres d&apos;Intérêt</Text>
            <View style={styles.interestsRow}>
              <Text style={styles.interestIcon}>🎵</Text>
              <Text style={styles.interestIcon}>🎮</Text>
              <Text style={styles.interestIcon}>📸</Text>
              <Text style={styles.interestIcon}>✈️</Text>
            </View>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.main}>
          {/* Subtle header decoration */}
          <View style={{ 
            height: 3, 
            backgroundColor: ACCENT, 
            marginBottom: 20,
            borderRadius: 2,
            width: 100,
          }} />
          
          {/* Profile Section with enhanced styling */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionTitle}>Profil Professionnel</Text>
          </View>
          <Text style={{ lineHeight: 1.4, marginBottom: 8, fontSize: 11, color: TEXT_PRIMARY }}>
            {profileSummary}
          </Text>
          <View style={styles.divider} />

          <View style={styles.row}>
            {/* Left column - Enhanced with better spacing */}
            <View style={styles.colLeft}>
              <View style={{ marginBottom: 12 }}>
                {aboutData.points?.slice(0, 2).map((p) => (
                  <Text key={p} style={styles.bullet}>• {p}</Text>
                ))}
              </View>
              
              <View style={{ marginBottom: 14 }}>
                <Text style={[styles.small, { fontWeight: 600, color: TEXT_MUTED }]}>Expérience: {aboutData.experience}</Text>
                <Text style={[styles.small, { fontWeight: 600, color: TEXT_MUTED }]}>Stack: {aboutData.stack}</Text>
                <Text style={[styles.small, { fontWeight: 600, color: TEXT_MUTED }]}>Valeurs: {aboutData.values}</Text>
              </View>

              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Compétences Clés</Text>
              </View>
              <View style={styles.skillGrid}>
                {derivedSkills.slice(0, 4).map((s) => (
                  <View key={`card-${s.label}`} style={styles.skillCard}>
                    <Text style={styles.skillIcon}>{s.icon}</Text>
                    <Text style={styles.skillName}>{s.label}</Text>
                    <View style={styles.skillRule} />
                  </View>
                ))}
              </View>

              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Projets Sélectionnés</Text>
              </View>
              {projectsData.slice(0, maxProjects).map((p) => (
                <View key={p.title} style={{ 
                  marginBottom: 8,
                  backgroundColor: "#f8fafc",
                  padding: 8,
                  borderRadius: 6,
                  borderLeftColor: ACCENT,
                  borderLeftWidth: 2,
                }}>
                  <Text style={[styles.bullet, { fontWeight: 600, fontSize: 10 }]}>• {p.title}</Text>
                  <Text style={[styles.small, { marginLeft: 8, fontStyle: "italic" }]}>{p.description}</Text>
                </View>
              ))}
            </View>

            {/* Right column - Enhanced experience cards */}
            <View style={styles.colRight}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionBar} />
                <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
              </View>
              {experiencesData.slice(0, maxExperiences).map((exp) => (
                <View key={`${exp.company}-${exp.date}`} style={styles.experienceCard}>
                  <Text style={{ fontWeight: 700, fontSize: 11, color: TEXT_PRIMARY, marginBottom: 2 }}>
                    {exp.company}
                  </Text>
                  <Text style={{ fontWeight: 500, fontSize: 10, color: ACCENT, marginBottom: 2 }}>
                    {exp.position}
                  </Text>
                  <Text style={[styles.small, { fontWeight: 500, marginBottom: 6 }]}>{exp.date}</Text>
                  {exp.responsibilities.slice(0, maxRespPerExp).map((r) => (
                    <Text key={r} style={[styles.bullet, { fontSize: 10 }]}>• {r}</Text>
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "PDF generation failed";
    return json({ error: message }, { status: 500 });
  }
}

export const headers = () => ({
  "Content-Type": "application/pdf",
});


