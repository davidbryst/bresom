import { Button, Typography, Input, Textarea } from "@material-tailwind/react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { Resend } from "resend";

export default function Contact() {
  const submit = () => async () => {
    // e.preventDefault();
    // const formData = new FormData(e.target as HTMLFormElement);
    // const data = Object.fromEntries(formData);
    // console.log(data);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.name || !formData.email || !formData.message || 
          formData.name === "" || formData.email === "" || formData.message === "" || 
          !emailRegex.test(formData.email)) {
        setActionData({ ok: false, error: "Veuillez remplir tous les champs avec une adresse email valide." });
        return;
      }
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data: resendData, error: resendError } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "pro.mailer.sender@gmail.com",
        subject: "Contact Form Submission",
        html: `
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        `
      });
      setActionData({ ok: true, message: "Email sent successfully" });
    } catch (error) {
      setActionData({ ok: false, error: error as string });
    };
  };
  // const actionData = useActionData<{ ok?: boolean; error?: string; message?: string }>();
  const [actionData, setActionData] = useState<{ ok?: boolean; error?: string; message?: string }>({});
  const [formData, setFormData] = useState<{ name?: string; email?: string; message?: string }>({});
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  return (
    <section id="Contact" aria-labelledby="contact-title" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <Typography id="contact-title" variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
          Contactez-moi
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="p-4 sm:p-6 rounded-xl border bg-white/90 text-gray-800 border-gray-200 dark:bg-black/20 dark:text-white dark:border-white/10">
            <Typography variant="h3" className="text-lg sm:text-xl font-semibold mb-4 text-white">
              Informations de contact
            </Typography>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Typography className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Email</Typography>
                <Typography className="text-gray-700 dark:text-white/80 text-sm sm:text-base break-all">sh.david.abraham@gmail.com</Typography>
              </div>
              <div>
                <Typography className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Téléphone</Typography>
                <Typography className="text-gray-700 dark:text-white/80 text-sm sm:text-base">
                  (+225) 01 40 54 41 97<br />
                  (+225) 07 12 41 01 34
                </Typography>
              </div>
              <div>
                <Typography className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Localisation</Typography>
                <Typography className="text-gray-700 dark:text-white/80 text-sm sm:text-base">Abidjan, cocody riviera 2</Typography>
              </div>
            </div>
          </div>
          <Form method="post" onSubmit={(e) => e.preventDefault()} className="space-y-4 backdrop-blur-md p-4 sm:p-6 rounded-xl border bg-white/70 text-gray-800 border-gray-200 dark:bg-black/20 dark:text-white dark:border-white/10" aria-label="Formulaire de contact">
            <input type="hidden" name="formId" value="contact" />
            <div>
              <label htmlFor="contact-name" className="block mb-2 text-sm text-gray-700 dark:text-white/80">Nom</label>
              <Input
                name="name"
                type="text"
                placeholder="Nom"
                required
                value={formData.name}
                id="contact-name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-500 dark:bg-white/10 dark:border-white/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/30 text-sm sm:text-base"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block mb-2 text-sm text-gray-700 dark:text-white/80">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                id="contact-email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-500 dark:bg-white/10 dark:border-white/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/30 text-sm sm:text-base"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block mb-2 text-sm text-gray-700 dark:text-white/80">Message</label>
              <Textarea
                name="message"
                placeholder="Message"
                required
                id="contact-message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/40 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-500 dark:bg-white/10 dark:border-white/10 dark:text-white dark:placeholder-white/50 dark:focus:border-white/30 text-sm sm:text-base"
                rows={4}
              />
            </div>
            {actionData?.error && (
              <div className="text-red-600 dark:text-red-400 text-sm">{actionData?.error}</div>
            )}
            {actionData?.ok && actionData?.message && (
              <div className="text-green-700 dark:text-green-400 text-sm">{actionData?.message}</div>
            )}
            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
              onClick={submit()}
              className="w-full backdrop-blur-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed bg-gray-900 text-white hover:bg-gray-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 text-sm sm:text-base py-3 sm:py-4"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}