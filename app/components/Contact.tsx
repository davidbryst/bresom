import { Button, Typography, Input, Textarea } from "@material-tailwind/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData, useNavigation } from "@remix-run/react";
import { Resend } from "resend";
import { contactData, contactConfig } from "../data/content";

type ActionData =
  | { ok: true }
  | { ok: false; error: string };

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const message = String(formData.get("message") || "");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !name ||
    !email ||
    !message ||
    name === "" ||
    email === "" ||
    message === "" ||
    !emailRegex.test(email)
  ) {
    return json(
      {
        ok: false,
        error: "Veuillez remplir tous les champs avec une adresse email valide.",
      } satisfies ActionData,
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(contactConfig.resendApiKey);
    // const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: contactConfig.from,
      to: contactConfig.email,
      subject: contactConfig.subject,
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    if (resendError) {
        console.log(resendError);
        
      return json(
        { ok: false, error: "Erreur lors de l'envoi de l'email " + resendError.message } satisfies ActionData,
        { status: 500 }
      );
    }

    return json(
      { ok: true } satisfies ActionData
    );
  } catch (error: any) {
    return json(
      { ok: false, error: "Une erreur est survenue lors de l'envoi du message." } satisfies ActionData,
      { status: 500 }
    );
  }
}


export default function Contact() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <section id="Contact" aria-labelledby="contact-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <h2 id="contact-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Contactez-moi
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="p-4 sm:p-6 cardGlass">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">
              Informations de contact
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <span className="font-medium text-white text-sm sm:text-base">Email</span>
                <div className="text-white/80 text-sm sm:text-base break-all">{contactData.email}</div>
              </div>
              <div>
                <span className="font-medium text-white text-sm sm:text-base">Téléphone</span>
                <div className="text-white/80 text-sm sm:text-base">{contactData.phone}</div>
              </div>
              <div>
                <span className="font-medium text-white text-sm sm:text-base">Localisation</span>
                <div className="text-white/80 text-sm sm:text-base">{contactData.location}</div>
              </div>
            </div>
          </div>
          <Form method="post" className="space-y-4 p-4 sm:p-6 cardGlass" aria-label="Formulaire de contact">
            <input type="hidden" name="formId" value="contact" />
            <div>
              <label htmlFor="name" className="block mb-2 text-sm text-gray-700 dark:text-white/80">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nom"
                required
                disabled={isLoading}
                className="w-full cardGlass !shadow-none  px-2 py-2 !bg-white/5 !placeholder-white/80 focus:!outline-white focus:!border-white text-sm sm:text-base"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-gray-700 dark:text-white/80">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                disabled={isLoading}
                id="email"
                className="w-full cardGlass !shadow-none  px-2 py-2 !bg-white/5 !placeholder-white/80 focus:!outline-white focus:!border-white text-sm sm:text-base"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm text-gray-700 dark:text-white/80">Message</label>
              <textarea
                name="message"
                placeholder="Message"
                required
                disabled={isLoading}
                id="message"
                className="w-full cardGlass h-96 !shadow-none  px-2 py-2 !bg-white/5 !placeholder-white/80 focus:!outline-white focus:!border-white text-sm sm:text-base"
                rows={4}
              />
            </div>

            {actionData?.ok && (
              <div className="mb-6 rounded-lg border border-green-200/40 bg-green-400/20 p-3 text-green-50/90">
                Message envoyé. Merci, nous vous répondrons au plus vite.
              </div>
            )}
            {actionData && !actionData.ok && "error" in actionData && (
              <div className="mb-6 rounded-lg border border-red-200/40 bg-red-400/20 p-3 text-red-50/90">
                {actionData.error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cardGlass hover:border-white/60 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed  text-sm sm:text-base py-3 sm:py-4"
            >
              {isLoading ? (
                <span>
                  <svg className="inline mr-2 h-4 w-4 animate-spin text-gray-900" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Envoi...
                </span>
              ) : (
                "Envoyer"
              )}
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}