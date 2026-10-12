import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Document, Page, Text, View, StyleSheet, renderToStream, Image, Font, Svg, Path, Circle } from "@react-pdf/renderer";
import fs from "node:fs/promises";
import path from "node:path";
let fontsRegistered = false;
let faAvailable = false;
const cv_data = {
    "nom": "SARA YAPO",
    "titre": "Économiste",
  "profil": "Économiste en formation avec un Master 2 en économie du développement et une solide base académique en sciences économiques et de gestion. Dotée d'une expertise analytique et d'une passion pour l'innovation méthodologique, je recherche des opportunités professionnelles pour approfondir mes compétences en analyse économique et modélisation financière au service du développement économique.",
    "coordonnees": {
        "email": "yaposara222@gmail.com",
        "telephone": "+225 07 69 12 54 90",
        "localisation": "Abidjan, Côte d’Ivoire"
    },
    "formation": [
        {
            "diplome": "Master",
            "specialite": "Économie du développement",
            "etablissement": "Université Félix Houphouët Boigny",
            "periode": "Octobre 2023 - en cours",
            "details": "Étude des causes de la pauvreté dans les pays en voie de développement et recherche de solutions pour la croissance économique et l’émergence."
        },
        {
            "diplome": "Licence",
            "specialite": "Sciences économiques et de Gestion option économie",
            "etablissement": "Université Internationale Privée d'Abidjan",
            "periode": "Octobre 2020 - Juillet 2023"
        },
        {
            "diplome": "Baccalauréat",
            "serie": "Série D",
            "etablissement": "Lycée Classique d'Abidjan",
            "periode": "Septembre 2019 - Juillet 2020"
        }
    ],
    "experiences": [
      {
            "poste": "Hôtesse événementiel",
            "lieu": "Abidjan",
            "periode": "Septembre 2024",
            "details": "Réception et accueil chaleureux des invités, orientation vers les différents espaces de l’événement."
        },
        {
            "poste": "Agent enquêteur",
            "lieu": "Abidjan",
            "periode": "Juillet 2023 - Août 2023",
            "details": "Réalisation de sondages auprès de la population pour recueillir leurs préoccupations sur les besoins du ménage et leurs avis sur les efforts du gouvernement."
        },
        {
            "poste": "Stage école",
            "periode": "Octobre 2022 - Juillet 2023",
            "details": "Modélisation des tendances du marché financier (indice BRVM Composite) avec des outils économétriques."
        }
    ],
    "competences": [
        "Word",
        "Excel",
        "Power Point",
        "Power BI",
        "Python",
        "Soft skills"
    ],
    "langues": {
        "Français": "Bonne maîtrise",
        "Anglais": "Niveau académique"
    },
    "certificats": [
        "Certificat de formation de maîtrise d'analyse des données avec Power BI",
        "Attestation de réussite pour avoir assimilé les modules Word, Excel et Power Point"
    ],
    "associations": [
        {
            "nom": "Association des Étudiants en Statistique et Économétrie Financière",
            "role": "Chargée de la communication",
            "details": "Coordination des activités de communication, suivi des projets étudiants en économétrie et statistiques."
        }
    ],
    "centres_interet": [
        "Lecture : Romans, BD",
        "Musique : Choriste",
        "Sport : Footing, musculation"
    ]
}
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontSize: 10,
    fontFamily: "Poppins",
    backgroundColor: "#ffffff",
    padding: 0,
  },
  container: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    minHeight: "100%",
    width: "100%",
  },
  leftSidebar: {
    width: "35%",
    backgroundColor: "#F4A460",
    paddingVertical: 30,
    paddingHorizontal: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  rightContent: {
    width: "65%",
    backgroundColor: "#ffffff",
    paddingVertical: 30,
    paddingHorizontal: 24,
    flexDirection: "column",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  headerLine: {
    flexDirection: "column",
    alignItems: "center",
    fontSize: 32,
  },
  name: {
    fontSize: 19,
    fontWeight: 900,
    color: "#FFFFFFFF",
    textAlign: "center",
    marginBottom: 3,
  },
  surname: {
    fontSize: 19,
    fontWeight: 900,
    color: "#FFFFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 11,
    color: "#FFFFFFFF",
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ffffff",
    marginBottom: 16,
  },
  profileImage: {
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
  sidebarSection: {
    marginBottom: 18,
  },
  sectionHeader: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingBottom: 3,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#2c2c2c",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionTitleWhite: {
    fontSize: 11,
    fontWeight: 700,
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  aboutText: {
    fontSize: 8,
    color: "#4b5563",
    lineHeight: 1.5,
    marginBottom: 0,
  },
  contactItem: {
    fontWeight: 400,
    fontSize: 8,
    color: "#4b5563",
  },
  experienceItem: {
    marginBottom: 6,
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
    marginBottom: 3,
  },
  experienceYears: {
    fontSize: 8,
    color: "#9ca3af",
  },
  experienceCompany: {
    fontSize: 9,
    color: "#021638FF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  experienceDesc: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.3,
  },
  skillItem: {
    fontSize: 9,
    color: "#ffffff",
    marginBottom: 1,
  },
});

// Lucide-style icons using inline SVG (works in @react-pdf/renderer)
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

function CVDocument({ imageUrl }: { imageUrl: string; faAvailable: boolean }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Sidebar */}
          <View style={styles.leftSidebar}>
            {/* Profile Photo */}
            <View style={styles.profileImageContainer}>
              {imageUrl ? (
                <Image src={imageUrl} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImage} />
              )}
            </View>

            {/* Name and Title */}
            <View style={[styles.header]}>
              <Text style={styles.name}>SARA</Text>
              <Text style={styles.surname}>YAPO</Text>
              <Text style={styles.subtitle}>{cv_data.titre}</Text>
            </View>

            {/* Profile Summary */}
            {/* <View style={{marginBottom: 18, width: "100%"}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitleWhite}>PROFIL </Text>
              </View>
              <Text style={[styles.aboutText, {color: "#ffffff", fontSize: 9, lineHeight: 1.3}]}>
                {cv_data.profil}
              </Text>
            </View> */}

            {/* Contact */}
            <View style={{marginBottom: 18, width: "100%"}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitleWhite}>CONTACT</Text>
              </View>
              <View style={{gap: 6, marginHorizontal: 10}}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
                  <LucideMailIcon />
                  <Text style={[styles.contactItem, {color: "#ffffff", fontSize: 9, fontWeight: 600}]}>{cv_data.coordonnees.email}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
                  <LucidePhoneIcon />
                  <Text style={[styles.contactItem, {color: "#ffffff", fontSize: 9, fontWeight: 600}]}>{cv_data.coordonnees.telephone}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
                  <LucideMapPinIcon />
                  <Text style={[styles.contactItem, {color: "#ffffff", fontSize: 9, fontWeight: 600}]}>{cv_data.coordonnees.localisation}</Text>
                </View>
              </View>
            </View>

            {/* Skills */}
            <View style={{marginBottom: 18, width: "100%"}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitleWhite}>COMPÉTENCES</Text>
              </View>
              <View style={{gap: 2, marginHorizontal: 10}}>
                {cv_data.competences.map((comp, index) => (
                  <Text key={index} style={[styles.contactItem, {color: "#ffffff", fontSize: 9, fontWeight: 600, marginBottom: 1}]}>
                    • {comp}
                  </Text>
                ))}
              </View>
            </View>

            {/* Languages */}
            <View style={{marginBottom: 18, width: "100%"}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitleWhite}>LANGUES</Text>
              </View>
              <View style={{gap: 6, marginHorizontal: 10}}>
                {Object.entries(cv_data.langues).map(([langue, niveau], index) => (
                  <View key={index}>
                    <Text style={[styles.contactItem, {color: "#ffffff", fontSize: 10, fontWeight: 700}]}>{langue}</Text>
                    <View style={{flexDirection: "row", gap: 1, marginTop: 1}}>
                      {[1,2,3,4,5].map((dot, i) => (
                        <View key={i} style={{
                          width: 6, 
                          height: 6, 
                          borderRadius: 3, 
                          backgroundColor: i < (niveau.includes("Bonne") ? 4 : 3) ? "#ffffff" : "rgba(255,255,255,0.3)"
                        }} />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
            
            {/* Centres d'intérêt */}
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitleWhite }>CENTRES D&apos;INTÉRÊT</Text>
              </View>
              <View style={{flexDirection: "row", flexWrap: "wrap", gap: 3, marginHorizontal: 10}}>
                {cv_data.centres_interet.map((interet, index) => (
                  <Text key={index} style={[styles.experienceDesc, {fontSize: 9, fontWeight: 600, color: "#ffffff"}]}>
                    • {interet}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Right Content */}
          <View style={styles.rightContent}>
            {/* Profile Summary */}
            <View style={{marginBottom: 12, width: "100%"}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>PROFIL </Text>
              </View>
              <Text style={[styles.aboutText, {color: "#666666", fontSize: 9, lineHeight: 1.3}]}>
                {cv_data.profil}
              </Text>
            </View>
            {/* Professional Experience */}
            <View style={{marginBottom: 6}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>EXPÉRIENCE PROFESSIONNELLE</Text>
              </View>
              {cv_data.experiences.map((exp, index) => (
                <View key={index} style={{marginBottom: 6}}>
                  <Text style={[styles.experienceTitle, {fontSize: 10, fontWeight: 700, color: "#2c2c2c"}]}>
                    {exp.poste.toUpperCase()} | <Text style={{color: "#F4A460", fontWeight: 400}}>{exp.lieu || "Stage"}</Text>
                  </Text>
                  <Text style={[styles.experienceYears, {fontSize: 9, color: "#666666", marginBottom: 3}]}>
                    {exp.periode}
                  </Text>
                  <Text style={[styles.experienceDesc, {fontSize: 9, color: "#4b5563", lineHeight: 1.3}]}>
                    • {exp.details}
                  </Text>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={{marginBottom: 6}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>FORMATION</Text>
              </View>
              {cv_data.formation.map((formation, index) => (
                <View key={index} style={{marginBottom: 6}}>
                  <Text style={[styles.experienceTitle, {fontSize: 10, fontWeight: 700, color: "#2c2c2c"}]}>
                    {formation.diplome.toUpperCase()} {formation.specialite ? `| ${formation.specialite}` : ""}
                  </Text>
                  <Text style={[styles.experienceCompany, {fontSize: 9, color: "#F4A460", fontWeight: 400, marginBottom: 2}]}>
                    {formation.etablissement}
                  </Text>
                  <Text style={[styles.experienceYears, {fontSize: 9, color: "#666666", marginBottom: 3}]}>
                    {formation.periode}
                  </Text>
                  {formation.details && (
                    <Text style={[styles.experienceDesc, {fontSize: 9, color: "#4b5563", lineHeight: 1.3}]}>
                      • {formation.details}
                    </Text>
                  )}
                </View>
              ))}
            </View>

            {/* Certificats */}
            <View style={{marginBottom: 6}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>CERTIFICATS</Text>
              </View>
              {cv_data.certificats.map((cert, index) => (
                <View key={index} style={{marginBottom: 6}}>
                  <Text style={[styles.experienceDesc, {fontSize: 9, color: "#4b5563", lineHeight: 1.3}]}>
                    • {cert}
                  </Text>
                </View>
              ))}
            </View>

            {/* Associations */}
            <View style={{marginBottom: 0}}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>ASSOCIATIONS</Text>
              </View>
              {cv_data.associations.map((assoc, index) => (
                <View key={index} style={{marginBottom: 12}}>
                  <Text style={[styles.experienceTitle, {fontSize: 10, fontWeight: 700, color: "#2c2c2c"}]}>
                    {assoc.role.toUpperCase()}
                  </Text>
                  <Text style={[styles.experienceCompany, {fontSize: 9, color: "#F4A460", fontWeight: 400, marginBottom: 2}]}>
                    {assoc.nom}
                  </Text>
                  <Text style={[styles.experienceDesc, {fontSize: 9, color: "#4b5563", lineHeight: 1.3}]}>
                    • {assoc.details}
                  </Text>
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
  const imageUrl = `${base}/cvasset/profileysr.jpg`;
  const stream = await renderToStream(<CVDocument imageUrl={imageUrl} faAvailable={faAvailable} />);
    return new Response(stream as unknown as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=Sara-Yapo-CV.pdf",
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


