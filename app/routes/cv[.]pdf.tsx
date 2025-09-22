import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToStream, Image, Font, Svg, Path, Circle } from "@react-pdf/renderer";
import fs from "node:fs/promises";
import path from "node:path";
let fontsRegistered = false;
let faAvailable = false;
import { aboutData, contactData, experiencesData, formationsData, heroData, projectsData, skillsData } from "../data/cvContent";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontSize: 10,
    fontFamily: "Poppins",
    backgroundColor: "#ffffff",
    // padding: 32,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    minHeight: "100%",
  },
  header: {
    // display: "flex",
    backgroundColor: "#f3f4f6",
    paddingVertical: 6,
    marginVertical: 16,
    // marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  headerContent: {
    // flex: 1,
    alignItems: "center",
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    fontSize: 32,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 900,
    color: "#374151",
  },
  imText: {
    fontSize: 8,
    color: "#6b7280",
    fontWeight: 100,
    marginLeft: 8,
    marginTop: 4,
  },
  name: {
    fontSize: 32,
    fontWeight: 900,
    color: "#ea580c",
    marginTop: 4,
  },
  imInline: {
    fontSize: 18,
    color: "#6b7280",
    fontWeight: 200,
    marginLeft: 8,
  },
  nameInline: {
    fontSize: 18,
    fontWeight: 900,
    color: "#ea580c",
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 8,
    color: "#374151C4",
    marginTop: 0,
    textTransform: "uppercase",
    letterSpacing: 3,
    textAlign: "center",
  },
  profileImageContainer: {
    width: 110,
    height: 110,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#e5e7eb",
  },
  profileImage: {
    borderRadius: 4,
    width: "100%",
    height: "100%",
  },
  aboutContactSection: {
    paddingHorizontal: 28,
    paddingVertical: 0,
  },
  aboutContactRow: {
    flexDirection: "row",
    // gap: 24,
  },
  aboutCard: {
    flex: 2,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#fb923c",
  },
  contactCard: {
    flex: 1,
  },
  sectionHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  sectionTag: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    paddingHorizontal: 12,
    gap: 6,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 800,
  },
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#fed7aa",
  },
  faIcon: {
    fontFamily: "Font Awesome 6 Free",
    fontWeight: 900,
    fontSize: 11,
    color: "#ea580c",
  },
  aboutText: {
    fontSize: 8,
    color: "#4b5563",
    lineHeight: 1.6,
    marginBottom: 0,
  },
  contactBox: {
    backgroundColor: "#fff7ed",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  contactTitle: {
    color: "#ea580c",
    fontWeight: 800,
    fontSize: 12,
    marginBottom: 4,
  },
  contactItem: {
    fontWeight: 400,
    fontSize: 8,
    color: "#4b5563",
    // marginBottom: 8,
  },
  referencesBox: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  mainContent: {
    paddingHorizontal: 32,
    // paddingBottom: 32,
  },
  mainRow: {
    flexDirection: "row",
    gap: 24,
  },
  leftColumn: {
    flex: 6,
  },
  rightColumn: {
    flex: 4,
  },
  sectionBlock: {
    marginVertical: 4,
  },
  experienceItem: {
    marginBottom: 8,
    position: "relative",
    paddingLeft: 4,
  },
  experienceDot: {
    position: "absolute",
    left: 0,
    top: 4,
    width: 8,
    height: 8,
    backgroundColor: "#fb923c",
    borderRadius: 2,
  },
  experienceTitle: {
    fontWeight: 800,
    fontSize: 9,
    color: "#374151",
    marginBottom: 4,
  },
  experienceYears: {
    fontSize: 9,
    color: "#9ca3af",
  },
  experienceCompany: {
    fontSize: 9,
    color: "#021638FF",
    textTransform: "uppercase",
    letterSpacing: 1,
    // marginTop: 2,
    marginBottom: 2,
  },
  experienceDesc: {
    fontSize: 9,
    color: "#4b5563",
    // lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
    marginTop: 1,
  },
  skillBadge: {
    fontSize: 7,
    fontWeight: 700,
    color: "#ffffff",
    backgroundColor: "#ea580c",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 3,
    marginBottom: 3,
    textAlign: "center",
  },
  skillBadgeSecondary: {
    fontSize: 9,
    fontWeight: 400,
    color: "#ea580c",
    backgroundColor: "#FFFAF4FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 3,
    // marginBottom: 3,
    borderWidth: 1,
    borderColor: "#fed7aa",
    textAlign: "center",
  },
  educationItem: {
    marginBottom: 16,
  },
  educationTitle: {
    fontWeight: 800,
    fontSize: 11,
    color: "#374151",
  },
  educationDesc: {
    fontSize: 10,
    color: "#4b5563",
    marginTop: 4,
    lineHeight: 1.4,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  languageItem: {
    width: "32%",
    alignItems: "center",
  },
  languagePercent: {
    fontSize: 10,
    fontWeight: 800,
    color: "#374151",
    // marginBottom: 8,
  },
  languageText: {
    fontSize: 9,
    color: "#525F74FF",
    textAlign: "center",
    textWrapping: "nowrap" as any,
  },
});

// Lucide-style icons using inline SVG (works in @react-pdf/renderer)
const LucideUserIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M20 21a8 8 0 1 0-16 0" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LucideBriefcaseIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LucideCodeIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M16 18l6-6-6-6" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 6l-6 6 6 6" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LucideGraduationCapIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 12v5c3 3 9 3 12 0v-5" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LucideInfoIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" stroke="#ea580c" strokeWidth={2} fill="none" />
    <Path d="M12 16v-4" stroke="#ea580c" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 8h.01" stroke="#ea580c" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LucidePhoneIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LucideMailIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#ea580c" strokeWidth={2} fill="none" />
    <Path d="m22 6-10 7L2 6" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LucideMapPinIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#ea580c" strokeWidth={2} fill="none" />
    <Circle cx="12" cy="10" r="3" stroke="#ea580c" strokeWidth={2} fill="none" />
  </Svg>
);

const LucideStarIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 24 24">
    <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#ea580c" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

function CVDocument({ imageUrl, gg, faAvailable }: { imageUrl: string; gg: string; faAvailable: boolean }) {
  // Extract skills from skillsData with proper levels
  // const extractedSkills = skillsData
  //   .flatMap(group => group.buckets.flatMap(bucket => bucket.items))
  //   .slice(0, 5)
  //   .map((item: any) => ({
  //     name: item.name,
  //     level: item.level,
  //     tags: Array.isArray(item.tags) ? item.tags : [],
  //   }));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerLine}>
                <Text style={styles.greeting}>Salut.</Text>
                <Text style={styles.imInline}>Je suis</Text>
                <Text style={styles.nameInline}>{heroData.name}</Text>
              </View>
              <Text style={styles.subtitle}>{heroData.primaryLines.join(" • ")}</Text>
            </View>
          </View>

          {/* About + Contact section */}
          <View style={styles.aboutContactSection}>
            <View style={styles.aboutContactRow}>
              
              <View style={styles.profileImageContainer}>
                {imageUrl ? (
                  <Image src={imageUrl} style={styles.profileImage} />
                ) : (
                  <View style={styles.profileImage} />
                )}
              </View>
              <View style={{marginRight: 16, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                <View style={{display: "flex", flexDirection: "row", backgroundColor: "#ffffff00", alignItems: "center", gap: 12}}>
                  <Image src={gg} style={{width: 15}} />
                  <View style={[styles.sectionHeader, { marginBottom: 0,}]}>
                    <View style={styles.sectionTag}>
                      <LucideUserIcon />
                      <Text>À PROPOS</Text>
                    </View>
                    <View style={styles.sectionLine} />
                  </View>
                </View>
                <View style={{display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 12}}>
                  <Image src={gg} style={{width: 15, marginTop: 4}} />
                  <Text style={[styles.aboutText, {width: "100%"}]}>
                    {aboutData.description}
                  </Text>
                </View>
                <View style={{display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 12}}>
                  <Image src={gg} style={{width: 15, marginTop: 4}} />
                  <View style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                    {aboutData.points?.slice(0, 2).map((point, index) => (
                      <Text key={index} style={styles.aboutText}>
                        • {point}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.header, {marginTop: 12, marginBottom: 12, flexDirection: "column"}]}>
            {/* <Text style={styles.contactTitle}>CONTACT</Text> */}
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 12}}>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucidePhoneIcon />
                <Text style={styles.contactItem}>{contactData.phone}</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucideMailIcon />
                <Text style={styles.contactItem}>{contactData.email}</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucideMapPinIcon />
                <Text style={styles.contactItem}>{contactData.location}</Text>
              </View>
            </View> 
          </View>
            
          <View style={styles.aboutContactSection}>
            <View style={styles.aboutContactRow}>
            </View>
          </View>

          {/* Main content */}
          <View style={styles.mainContent}>
            <View style={styles.mainRow}>
              {/* Left column - Experience & Awards */}
              <View style={styles.leftColumn}>
                <View style={styles.sectionBlock}>
                  <View style={styles.sectionHeader}>
                    <View  style={styles.sectionTag}>
                      <LucideBriefcaseIcon />
                      <Text>EXPÉRIENCE PROFESSIONNELLE</Text>
                    </View>
                    <View style={styles.sectionLine} />
                  </View>

                  {experiencesData.map((exp, index) => (
                    <View key={index} style={styles.experienceItem}>
                      {/* <View style={styles.experienceDot} /> */}
                      <Text style={styles.experienceTitle}>
                        {exp.position} <Text style={[styles.experienceYears]}>  {exp.date}</Text>
                      </Text>
                      <Text style={styles.experienceCompany}>{exp.company}</Text>
                      {exp.responsibilities.map((resp, idx) => (
                        <Text key={idx} style={[styles.experienceDesc, {marginBottom: 1}]}> • {resp}</Text>
                      ))}
                    </View>
                  ))}
                </View>

                <View style={styles.sectionBlock}>
                  <View style={styles.sectionHeader}>
                    <View  style={styles.sectionTag}>
                      <LucideInfoIcon />
                      <Text>INFORMATIONS</Text>
                    </View>
                    <View style={styles.sectionLine} />
                  </View>

                  <View style={styles.languageGrid}>
                    <View style={styles.languageItem}>
                      <Text style={styles.languagePercent}>3+</Text>
                      <Text style={styles.languageText}>Années</Text>
                      <Text style={styles.languageText}>d'expérience</Text>
                    </View>

                    <View style={styles.languageItem}>
                      <Text style={styles.languagePercent}>100%</Text>
                      <Text style={styles.languageText}>Disponible</Text>
                    </View>

                    <View style={styles.languageItem}>
                      <Text style={styles.languagePercent}>CI</Text>
                      <Text style={styles.languageText}>Côte d'Ivoire</Text>
                    </View>

                    <View style={styles.languageItem}>
                      <Text style={styles.languagePercent}>FR</Text>
                      <Text style={styles.languageText}>Français (Natif)</Text>
                    </View>

                    <View style={styles.languageItem}>
                      <Text style={styles.languagePercent}>EN</Text>
                      <Text style={styles.languageText}>Anglais (Courant)</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right column - Education, Skills, Languages */}
              <View style={styles.rightColumn}>
                <View style={styles.sectionBlock}>
                  <View style={styles.sectionHeader}>
                    <View  style={styles.sectionTag}>
                      <LucideCodeIcon />
                      <Text>COMPÉTENCES TECHNIQUES</Text>
                    </View>
                    <View style={styles.sectionLine} />
                  </View>

                  {skillsData.slice(0, 5).map((skill, index) => (
                    <View key={index} style={{marginBottom: 8, padding: 4, backgroundColor: "#F3F4F69A", borderRadius: 5}}>
                      <Text style={{fontSize: 8.5, fontWeight: 400, color: "#374151", marginBottom: 4}}>
                        {skill.title}
                      </Text>
                      <View style={[styles.skillsGrid]}>
                        {skill.items.slice(0, 10).map((s) => (
                          <Text key={s.name} style={styles.skillBadgeSecondary}>
                            {s.name}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
                <View style={styles.sectionBlock}>
                  <View style={styles.sectionHeader}>
                    <View  style={styles.sectionTag}>
                      <LucideGraduationCapIcon />
                      <Text>FORMATION</Text>
                    </View>
                    <View style={styles.sectionLine} />
                  </View>

                  {formationsData.map((formation, index) => (
                    <View key={index} style={styles.experienceItem}>
                      {/* <View style={styles.experienceDot} /> */}
                      <Text style={styles.experienceTitle}>
                        {formation.diplome} <Text style={[styles.experienceYears]}>  {formation.date}</Text>
                      </Text>
                      <Text style={styles.experienceCompany}>{formation.ecole}</Text>
                      {formation.desc && <Text style={styles.experienceDesc}>{formation.desc}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          
          <View style={[styles.header, {marginTop: 0, marginBottom: 0, flexDirection: "column", borderBottomWidth: 1, borderBottomColor: "#ea580c", }]}>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 12}}>
              <Text style={[styles.contactTitle,{ fontSize: 10, fontWeight: 700, marginBottom: 0}]}>QUALITES</Text>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucideStarIcon />
                <Text style={styles.contactItem}>Apprend très vite</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucideStarIcon />
                <Text style={styles.contactItem}>Polyvalent</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucideStarIcon />
                <Text style={styles.contactItem}>Autonome</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucideStarIcon />
                <Text style={styles.contactItem}>Adaptatif</Text>
              </View>
              <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 3}}>
                <LucideStarIcon />
                <Text style={styles.contactItem}>Créatif</Text>
              </View>
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
  // Register Poppins fonts (once) using data URIs to avoid HTTP/content-type issues
  if (!fontsRegistered) {
    const fontsDir = path.resolve(process.cwd(), "public", "fonts");
    const [thinBuf, extraLightBuf, lightBuf, regularBuf, maybeMediumBuf, boldBuf, extraBoldBuf, blackBuf, maybeFaSolid] = await Promise.all([
      fs.readFile(path.join(fontsDir, "Poppins-Thin.ttf")),        // 100
      fs.readFile(path.join(fontsDir, "Poppins-ExtraLight.ttf")), // 200
      fs.readFile(path.join(fontsDir, "Poppins-Light.ttf")),      // 300
      fs.readFile(path.join(fontsDir, "Poppins-Regular.ttf")),    // 400
      // Medium is optional; we'll try to read and fall back if missing
      fs.readFile(path.join(fontsDir, "Poppins-Medium.ttf")).catch(() => Buffer.from("")), // 500 (optional)
      fs.readFile(path.join(fontsDir, "Poppins-Bold.ttf")),       // 700
      fs.readFile(path.join(fontsDir, "Poppins-ExtraBold.ttf")),  // 800
      fs.readFile(path.join(fontsDir, "Poppins-Black.ttf")),      // 900
      // Try to load Font Awesome 6 Free Solid if available (e.g., fa-solid-900.ttf)
      fs.readFile(path.join(fontsDir, "fa-solid-900.ttf")).catch(() => Buffer.from("")),
    ]);
    const toDataUri = (buf: Buffer) => `data:font/ttf;base64,${buf.toString("base64")}`;
    Font.register({
      family: "Poppins",
      fonts: [
        { src: toDataUri(thinBuf), fontWeight: 100 },
        { src: toDataUri(extraLightBuf), fontWeight: 200 },
        { src: toDataUri(lightBuf), fontWeight: 300 },
        { src: toDataUri(regularBuf), fontWeight: 400 },
        // Only include 500 if we actually have the bytes
        ...(maybeMediumBuf && maybeMediumBuf.length ? [{ src: toDataUri(maybeMediumBuf), fontWeight: 500 as const }] : []),
        { src: toDataUri(boldBuf), fontWeight: 700 },
        { src: toDataUri(extraBoldBuf), fontWeight: 800 },
        { src: toDataUri(blackBuf), fontWeight: 900 },
      ],
    });
    if (maybeFaSolid && maybeFaSolid.length) {
      Font.register({
        family: "Font Awesome 6 Free",
        fonts: [
          { src: toDataUri(maybeFaSolid), fontWeight: 900 },
        ],
      });
      faAvailable = true;
    } else {
      faAvailable = false;
    }
    fontsRegistered = true;
  }
  // Use public/profile.jpg if exists; otherwise undefined
  const imageUrl = `${base}/profile.jpg`;
  const gg = `${base}/gg.png`;
  const stream = await renderToStream(<CVDocument imageUrl={imageUrl} gg={gg} faAvailable={faAvailable} />);
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


