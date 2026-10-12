type ContactEmailPayload = {
  name: string;
  email: string;
  message: string;
};

export function buildContactEmailHtml({ name, email, message }: ContactEmailPayload): string {
  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br/>");

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Nouveau message de contact</title>
    </head>
    <body style="margin:0;padding:0;background:#0b0b14;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#fff;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b0b14;padding:24px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" style="max-width:600px;background:#121225;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:24px 24px 8px 24px;">
                  <h1 style="margin:0;font-size:20px;line-height:28px;color:#fff;">Nouveau message de contact</h1>
                  <p style="margin:8px 0 0 0;font-size:14px;color:rgba(255,255,255,0.7);">Vous avez reçu un message depuis le formulaire du portfolio.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 24px 0 24px;">
                  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;">
                    <p style="margin:0 0 6px 0;font-size:13px;color:#9ca3af;">Nom</p>
                    <p style="margin:0 0 12px 0;font-size:15px;color:#fff;">${name}</p>
                    <p style="margin:0 0 6px 0;font-size:13px;color:#9ca3af;">Email</p>
                    <p style="margin:0 0 12px 0;font-size:15px;color:#fff;">${email}</p>
                    <p style="margin:0 0 6px 0;font-size:13px;color:#9ca3af;">Message</p>
                    <div style="margin:0;font-size:15px;color:#fff;line-height:1.6;">${escapedMessage}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px 24px 24px;">
                  <p style="margin:16px 0 0 0;font-size:12px;color:#9ca3af;">Email automatique — merci de ne pas répondre directement à ce message. Utilisez le bouton « Répondre » (reply) de votre client mail.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

export function buildContactEmailText({ name, email, message }: ContactEmailPayload): string {
  return [
    `Nouveau message de contact`,
    `Nom: ${name}`,
    `Email: ${email}`,
    ``,
    `Message:`,
    message,
  ].join("\n");
}


