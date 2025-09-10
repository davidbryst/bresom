import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToStream } from "@react-pdf/renderer";
import { aboutData, contactData, experiencesData, heroData, projectsData, skillsData } from "../data/content";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, fontFamily: "Helvetica" },
  header: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
  subHeader: { fontSize: 12, color: "#555", marginBottom: 16 },
  sectionTitle: { fontSize: 14, marginTop: 12, marginBottom: 6, fontWeight: 700 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  bullet: { marginBottom: 4 },
  small: { color: "#666" },
});

function CVDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{heroData.name}</Text>
        <Text style={styles.subHeader}>{heroData.primaryLines.join(" • ")}</Text>

        <View style={{ marginBottom: 8 }}>
          <Text style={styles.sectionTitle}>Profil</Text>
          <Text>{aboutData.description}</Text>
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text style={styles.sectionTitle}>Coordonnées</Text>
          <Text>{contactData.email}</Text>
          <Text>{contactData.phone}</Text>
          <Text>{contactData.location}</Text>
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text style={styles.sectionTitle}>Expériences</Text>
          {experiencesData.map((exp) => (
            <View key={`${exp.company}-${exp.date}`} style={{ marginBottom: 6 }}>
              <Text>
                {exp.company} — {exp.position}
              </Text>
              <Text style={styles.small}>{exp.date}</Text>
              {exp.responsibilities.map((r) => (
                <Text key={r} style={styles.bullet}>• {r}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={{ marginBottom: 8 }}>
          <Text style={styles.sectionTitle}>Projets</Text>
          {projectsData.slice(0, 3).map((p) => (
            <Text key={p.title} style={styles.bullet}>• {p.title} — {p.description}</Text>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Compétences</Text>
          {skillsData.map((group) => (
            <View key={group.category} style={{ marginBottom: 4 }}>
              <Text>{group.category}</Text>
              <Text style={styles.small}>
                {group.buckets
                  .flatMap((b) => b.items.map((i) => i.name))
                  .slice(0, 8)
                  .join(", ")}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const stream = await renderToStream(<CVDocument />);
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


