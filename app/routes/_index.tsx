import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Resend } from "resend";
import { buildContactEmailHtml, buildContactEmailText } from "../emails/contactTemplate";
import Hero from "../../app/components/Hero";
import Skills from "../../app/components/Skills";
import Dos from "../../app/components/Dos";
import Projects from "../../app/components/Projects";
import Contact from "../../app/components/Contact";
// import Experience from "../../app/components/Experience";
import Experiences from "../../app/components/Experience";
import About from "../../app/components/About";
// import Navbar from "../../app/components/Navbar";
// import Footer from "../../app/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formId = formData.get("formId");

  if (formId !== "contact") {
    return json({ ok: false, error: "Formulaire invalide" }, { status: 400 });
  }

  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: "Veuillez remplir tous les champs." }, { status: 400 });
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return json({ ok: false, error: "Clé API Resend manquante côté serveur." }, { status: 500 });
    }
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["pro.mailer.sender@gmail.com"],
      subject: `Nouveau message de contact — ${name}`,
      reply_to: email,
      text: buildContactEmailText({ name, email, message }),
      html: buildContactEmailHtml({ name, email, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return json({ ok: false, error: "Erreur lors de l'envoi de l'email." }, { status: 502 });
    }

    return json({ ok: true, message: "Merci, votre message a bien été envoyé.", id: data?.id });
  } catch (error) {
    return json({ ok: false, error: "Impossible d'envoyer le message pour le moment." }, { status: 500 });
  }
}

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Effet de fond avec points lumineux */}
      {/* <div className="fixed inset-0">
        <div className="absolute inset-0">
          <div className="absolute w-full h-full">
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full top-20 left-1/4"></div>
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full top-40 right-1/3"></div>
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full bottom-32 left-1/3"></div>
            <div className="absolute w-2 h-2 bg-indigo-500/20 rounded-full top-1/2 right-1/4"></div>
          </div>
        </div>
      </div> */}

      {/* Contenu principal avec effet glassmorphisme */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Dos />
        <Experiences />
        {/* <Skills /> */}
        <Projects />
        <Contact />
      </div>
    </main>
  );
}

