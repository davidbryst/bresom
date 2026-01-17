import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Resend } from "resend";
import { contactConfig } from "~/data/content";

const resend = new Resend(contactConfig.resendApiKey);

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Validation basique
  if (!name || !email || !subject || !message) {
    return json({ success: false, error: "Tous les champs sont requis" }, { status: 400 });
  }

  try {
    await resend.emails.send({
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

    return json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return json({ success: false, error: "Erreur lors de l'envoi du message" }, { status: 500 });
  }
}
