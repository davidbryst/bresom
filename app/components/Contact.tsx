import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { contactData } from "~/data/content";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";

interface ContactResponse {
  success?: boolean;
  error?: string;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const fetcher = useFetcher<ContactResponse>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const isSubmitting = fetcher.state === "submitting";
  const isSuccess = fetcher.data?.success;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: contactData.email, href: `mailto:${contactData.email}` },
    { icon: Phone, label: "Téléphone", value: contactData.phone, href: `tel:${contactData.phone.split(" / ")[0]}` },
    { icon: MapPin, label: "Localisation", value: contactData.location, href: "#" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32 bg-dark-deep relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-surface to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4">
            Travaillons{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Ensemble
            </span>
          </h2>
          <p className="text-light-secondary max-w-2xl mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info & Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-8"
          >
            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="relative hidden lg:block"
            >
              <div className="relative bg-dark-card p-2 rounded-2xl shadow-premium border border-dark-border overflow-hidden">
                <img
                  src="/profile/face-identiter.jpg"
                  alt="David Abraham - Contact"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent pointer-events-none rounded-xl" />
              </div>
            </motion.div>

            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={itemVariants}
                  whileHover={{ x: 8, borderColor: "#7C3AED" }}
                  className="flex items-center gap-4 p-4 bg-dark-surface rounded-xl border border-dark-border hover:bg-dark-card transition-all duration-300 block"
                >
                  <div className="w-12 h-12 bg-gradient-violet rounded-xl flex items-center justify-center shadow-glow-violet flex-shrink-0">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-light-muted text-sm">{info.label}</p>
                    <p className="text-light-primary font-medium text-sm truncate">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Reassurance message */}
            <motion.div
              variants={itemVariants}
              className="p-4 bg-dark-card/50 rounded-xl border border-dark-border"
            >
              <p className="text-light-secondary text-sm">
                Je réponds généralement sous <span className="text-violet-accent font-semibold">24-48 heures</span>.
                Pour les projets urgents, privilégiez le téléphone.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.div
              variants={itemVariants}
              className="bg-dark-surface p-8 rounded-2xl border border-dark-border shadow-premium"
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-light-primary mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-light-secondary">
                    Merci pour votre message. Je vous répondrai rapidement.
                  </p>
                </motion.div>
              ) : (
                <fetcher.Form method="post" action="/api/contact" className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="name"
                        className="block text-light-secondary text-sm mb-2"
                      >
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none focus:border-violet-accent focus:ring-2 focus:ring-violet-accent/20 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="email"
                        className="block text-light-secondary text-sm mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none focus:border-violet-accent focus:ring-2 focus:ring-violet-accent/20 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="subject"
                      className="block text-light-secondary text-sm mb-2"
                    >
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none focus:border-violet-accent focus:ring-2 focus:ring-violet-accent/20 transition-all duration-300"
                      placeholder="Projet de site web"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="message"
                      className="block text-light-secondary text-sm mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none focus:border-violet-accent focus:ring-2 focus:ring-violet-accent/20 transition-all duration-300 resize-none"
                      placeholder="Décrivez votre projet ou votre demande..."
                    />
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(124, 58, 237, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </motion.button>
                </fetcher.Form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
