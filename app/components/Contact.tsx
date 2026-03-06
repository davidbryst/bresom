import { useRef, useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contactData } from "~/data/content";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { easings } from "~/hooks/useGSAP";
import CircularText from "./CircularText";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: contactData.email,
    href: `mailto:${contactData.email}`,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: contactData.phone,
    href: `tel:${contactData.phone.split(" / ")[0]}`,
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: contactData.location,
    href: "#",
  },
];

interface ContactResponse {
  success?: boolean;
  error?: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const badge = headerRef.current.querySelector(".header-badge");
        const title = headerRef.current.querySelector(".header-title");
        const desc = headerRef.current.querySelector(".header-desc");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          badge,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: easings.elastic },
        )
          .fromTo(
            title,
            { opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.7,
              ease: easings.elastic,
            },
            "-=0.3",
          )
          .fromTo(
            desc,
            { opacity: 0, y: 20, filter: "blur(8px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              ease: easings.elastic,
            },
            "-=0.4",
          );
      }

      // Left column animation (image + contact cards)
      if (leftColRef.current) {
        const image = leftColRef.current.querySelector(".contact-image");
        const cards = leftColRef.current.querySelectorAll(".contact-card");
        const note = leftColRef.current.querySelector(".contact-note");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        if (image) {
          tl.fromTo(
            image,
            { opacity: 0, x: -50, scale: 0.95 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: easings.elastic,
            },
          );
        }

        tl.fromTo(
          cards,
          { opacity: 0, x: -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: easings.elastic,
          },
          "-=0.4",
        ).fromTo(
          note,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: easings.elastic },
          "-=0.2",
        );

        // Hover animations for contact cards
        cards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              x: 10,
              borderColor: "#7C3AED",
              backgroundColor: "rgba(26, 26, 35, 1)",
              boxShadow: "0 10px 40px -10px rgba(124, 58, 237, 0.2)",
              duration: 0.5,
              ease: easings.elastic,
            });

            const icon = card.querySelector(".card-icon");
            gsap.to(icon, {
              scale: 1.1,
              rotate: 5,
              ease: easings.elastic,
              duration: 0.5,
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              x: 0,
              borderColor: "rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(26, 26, 35, 0.5)",
              boxShadow: "none",
              duration: 0.5,
              ease: easings.elastic,
            });

            const icon = card.querySelector(".card-icon");
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              ease: easings.elastic,
              duration: 0.5,
            });
          });
        });
      }

      // Form animation
      if (formRef.current) {
        const formContainer = formRef.current.querySelector(".form-container");
        const inputs = formRef.current.querySelectorAll(".form-field");
        const button = formRef.current.querySelector(".submit-btn");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          formContainer,
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: easings.elastic },
        )
          .fromTo(
            inputs,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: easings.elastic,
            },
            "-=0.4",
          )
          .fromTo(
            button,
            { opacity: 0, y: 20, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: easings.elastic,
            },
            "-=0.2",
          );

        // Input focus animations
        inputs.forEach((input) => {
          const inputEl = input.querySelector("input, textarea");
          const label = input.querySelector("label");

          if (inputEl) {
            inputEl.addEventListener("focus", () => {
              gsap.to(inputEl, {
                borderColor: "#7C3AED",
                boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.1)",
                duration: 0.3,
              });
              if (label) {
                gsap.to(label, {
                  color: "#7C3AED",
                  duration: 0.3,
                });
              }
            });

            inputEl.addEventListener("blur", () => {
              gsap.to(inputEl, {
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "none",
                duration: 0.3,
              });
              if (label) {
                gsap.to(label, {
                  color: "#8B8B9B",
                  duration: 0.3,
                });
              }
            });
          }
        });

        // Submit button hover
        if (button) {
          button.addEventListener("mouseenter", () => {
            gsap.to(button, {
              scale: 1.02,
              boxShadow: "0 0 40px rgba(124, 58, 237, 0.5)",
              duration: 0.3,
              ease: easings.elastic,
            });
          });

          button.addEventListener("mouseleave", () => {
            gsap.to(button, {
              scale: 1,
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
              duration: 0.3,
              ease: easings.elastic,
            });
          });

          button.addEventListener("mousedown", () => {
            gsap.to(button, {
              scale: 0.98,
              duration: 0.1,
              ease: easings.elastic,
            });
          });

          button.addEventListener("mouseup", () => {
            gsap.to(button, {
              scale: 1.02,
              duration: 0.1,
              ease: easings.elastic,
            });
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Success animation
  useEffect(() => {
    if (isSuccess && successRef.current) {
      const icon = successRef.current.querySelector(".success-icon");
      const title = successRef.current.querySelector(".success-title");
      const text = successRef.current.querySelector(".success-text");

      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      );

      gsap.fromTo(
        icon,
        { scale: 0, rotate: -180 },
        { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)", delay: 0.2 },
      );

      gsap.fromTo(
        [title, text],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.4 },
      );
    }
  }, [isSuccess]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-dark-deep relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-surface to-transparent pointer-events-none" />

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-accent/5 rounded-full blur-[80px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1400px] 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="header-badge inline-block text-violet-accent font-semibold text-sm tracking-wider uppercase mb-4 px-4 py-2 bg-violet-primary/10 rounded-full border border-violet-primary/20">
            Contact
          </span>
          <h2 className="header-title text-3xl md:text-4xl lg:text-5xl font-bold text-light-primary mb-4 overflow-hidden">
            Travaillons{" "}
            <span className="text-transparent bg-clip-text bg-gradient-violet">
              Ensemble
            </span>
          </h2>
          <p className="header-desc text-light-secondary max-w-2xl mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour en
            discuter.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-8">
          {/* Contact Info & Image */}
          <div ref={leftColRef} className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="contact-image relative lg:block">
              <div className="relative bg-dark-card p-2 rounded-2xl shadow-premium border border-dark-border overflow-hidden">
                <img
                  src="/profile/face-identiter.jpg"
                  alt="David Abraham - Contact"
                  className="w-full aspect-[4/3] object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 to-transparent pointer-events-none rounded-xl" />

                <CircularText
                  text="DOCKER✦POSTGRES✦GSAP✦MOTION✦PRISMA✦"
                  onHover="slowDown"
                  spinDuration={20}
                  className="!absolute !left-6 !top-6  sm:!left-12 sm:!top-16 lg:!left-6 lg:!top-6 !text-violet-primary !inset-0 custom-class w-72 sm:w-[27rem] lg:w-80 2xl:w-[23rem]"
                />
              </div>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="contact-card flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-dark-surface/50 rounded-xl border border-dark-border transition-all duration-300 "
                >
                  <div className="card-icon w-10 h-10 sm:w-12 sm:h-12 bg-gradient-violet rounded-lg sm:rounded-xl flex items-center justify-center shadow-glow-violet flex-shrink-0">
                    <info.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-light-muted text-sm">{info.label}</p>
                    <p className="text-light-primary font-medium text-xs sm:text-sm truncate">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Reassurance message */}
            <div className="contact-note p-4 bg-dark-card/50 rounded-xl border border-dark-border">
              <p className="text-light-secondary text-sm">
                Je réponds généralement sous{" "}
                <span className="text-violet-accent font-semibold">
                  24-48 heures
                </span>
                . Pour les projets urgents, privilégiez le téléphone.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="form-container bg-dark-surface p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-dark-border shadow-premium">
              {isSuccess ? (
                <div ref={successRef} className="text-center py-12">
                  <div className="success-icon w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="success-title text-xl font-bold text-light-primary mb-2">
                    Message envoyé !
                  </h3>
                  <p className="success-text text-light-secondary">
                    Merci pour votre message. Je vous répondrai rapidement.
                  </p>
                </div>
              ) : (
                <fetcher.Form
                  method="post"
                  action="/api/contact"
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="form-field">
                      <label
                        htmlFor="name"
                        className="block text-light-secondary text-sm mb-2 transition-colors duration-300"
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
                        className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="form-field">
                      <label
                        htmlFor="email"
                        className="block text-light-secondary text-sm mb-2 transition-colors duration-300"
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
                        className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label
                      htmlFor="subject"
                      className="block text-light-secondary text-sm mb-2 transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none transition-all duration-300"
                      placeholder="Projet de site web"
                    />
                  </div>

                  <div className="form-field">
                    <label
                      htmlFor="message"
                      className="block text-light-secondary text-sm mb-2 transition-colors duration-300"
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
                      className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-xl text-light-primary placeholder-light-muted focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Décrivez votre projet ou votre demande..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-btn w-full py-4 bg-gradient-violet text-white font-semibold rounded-xl shadow-glow-violet flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
                  </button>
                </fetcher.Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
