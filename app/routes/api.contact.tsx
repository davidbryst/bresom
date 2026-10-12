import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";
import { contactConfig } from "~/data/content";
import { isRateLimited } from "~/utils/rateLimiter";

// ✅ Charger la clé API depuis les variables d'environnement (sécurisé côté serveur)
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const resend = new Resend(RESEND_API_KEY);

// Configuration de sanitization stricte
const sanitizeOptions = {
  allowedTags: [], // Aucune balise HTML autorisée
  allowedAttributes: {},
  disallowedTagsMode: 'discard' as const
};

// Validation d'email améliorée
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function action({ request }: ActionFunctionArgs) {
  // ✅ Vérification du rate limiting
  const rateLimitResult = isRateLimited(request);
  if (rateLimitResult.limited) {
    const resetInSeconds = Math.ceil(rateLimitResult.resetIn / 1000);
    return json(
      {
        success: false,
        error: `Trop de tentatives. Veuillez réessayer dans ${resetInSeconds} secondes.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(resetInSeconds),
        },
      }
    );
  }

  const formData = await request.formData();

  // Honeypot : champ invisible pour un humain. Rempli = robot → on répond
  // « succès » sans rien envoyer, pour ne pas lui indiquer qu'il est bloqué.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return json({ success: true });
  }

  // ✅ Sanitization des inputs pour prévenir XSS
  const rawName = formData.get("name") as string;
  const rawEmail = formData.get("email") as string;
  const rawSubject = formData.get("subject") as string;
  const rawMessage = formData.get("message") as string;

  // Validation basique
  if (!rawName || !rawEmail || !rawSubject || !rawMessage) {
    return json({ success: false, error: "Tous les champs sont requis" }, { status: 400 });
  }

  // Sanitization
  const name = sanitizeHtml(rawName, sanitizeOptions).trim();
  const email = sanitizeHtml(rawEmail, sanitizeOptions).trim().toLowerCase();
  const subject = sanitizeHtml(rawSubject, sanitizeOptions).trim();
  const message = sanitizeHtml(rawMessage, sanitizeOptions).trim();

  // Validation longueur
  if (name.length > 100) {
    return json({ success: false, error: "Le nom est trop long (max 100 caractères)" }, { status: 400 });
  }
  if (subject.length > 200) {
    return json({ success: false, error: "Le sujet est trop long (max 200 caractères)" }, { status: 400 });
  }
  if (message.length > 5000) {
    return json({ success: false, error: "Le message est trop long (max 5000 caractères)" }, { status: 400 });
  }

  // Validation email
  if (!isValidEmail(email)) {
    return json({ success: false, error: "L'adresse email n'est pas valide" }, { status: 400 });
  }

  try {
    const result = await resend.emails.send({
      from: contactConfig.from,
      to: contactConfig.email,
      subject: `${contactConfig.subject} - ${subject}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%); padding: 30px; border-radius: 16px 16px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau message de contact</h1>
          </div>
          <div style="background: #1A1A23; padding: 30px; border-radius: 0 0 16px 16px; color: #EDEDED;">
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #2D2D3D;">
              <p style="margin: 0 0 8px 0; color: #8B8B99; font-size: 12px; text-transform: uppercase;">Nom</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">${name}</p>
            </div>
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #2D2D3D;">
              <p style="margin: 0 0 8px 0; color: #8B8B99; font-size: 12px; text-transform: uppercase;">Email</p>
              <p style="margin: 0; font-size: 16px;">
                <a href="mailto:${email}" style="color: #7C3AED; text-decoration: none;">${email}</a>
              </p>
            </div>
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #2D2D3D;">
              <p style="margin: 0 0 8px 0; color: #8B8B99; font-size: 12px; text-transform: uppercase;">Sujet</p>
              <p style="margin: 0; font-size: 16px; font-weight: 600;">${subject}</p>
            </div>
            <div>
              <p style="margin: 0 0 8px 0; color: #8B8B99; font-size: 12px; text-transform: uppercase;">Message</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <p style="text-align: center; color: #8B8B99; font-size: 12px; margin-top: 20px;">
            Envoyé depuis le portfolio de David Abraham
          </p>
        </div>
      `,
    });

    // The SDK resolves normally even when Resend rejects the send (e.g.
    // unverified domain/recipient) — it does not throw, it reports the
    // failure via `error`. Ignoring it is how a rejected send was silently
    // reported as a success.
    if (result.error) {
      console.error("Resend a refusé l'envoi:", result.error);
      return json(
        { success: false, error: "Erreur lors de l'envoi du message" },
        { status: 502 }
      );
    }

    return json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return json({ success: false, error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}
