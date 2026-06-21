import { useFetcher } from "@remix-run/react";
import { contactData } from "~/data/content";
import Reveal from "./Reveal";

type ContactResponse = { success?: boolean; error?: string };

const fieldClass =
  "w-full bg-transparent border border-ink/25 px-4 py-3.5 text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-colors";

export default function LiteContact() {
  const fetcher = useFetcher<ContactResponse>();
  const sending = fetcher.state !== "idle";
  const sent = fetcher.data?.success === true;
  const error = fetcher.data?.error;

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 border-t-2 border-ink bg-ink text-paper"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-paper/55">
          (06) — Contact
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          <Reveal>
            <h2 className="lite-display break-words text-[clamp(1.5rem,8.5vw,7rem)] text-paper">
              TRAVAILLONS
              <br />
              <span className="text-vermilion">ENSEMBLE</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          {/* Left: statement + coordinates */}
          <div className="lg:col-span-6">
            <Reveal delay={80}>
              <p className="mt-6 text-paper/70 text-lg max-w-md">
                Un projet, une idée, une refonte ? Écrivez‑moi — je réponds
                vite.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contactData.email}`}
                      className="lite-link font-display font-bold text-xl md:text-3xl break-all hover:text-vermilion transition-colors"
                    >
                      {contactData.email}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
                      Téléphone
                    </dt>
                    <dd className="mt-1 text-paper/85 text-sm leading-relaxed">
                      {contactData.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/45">
                      Localisation
                    </dt>
                    <dd className="mt-1 text-paper/85 text-sm leading-relaxed">
                      {contactData.location}
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-6">
            {sent ? (
              <div className="border border-paper/25 p-10 h-full flex flex-col items-start justify-center">
                <span className="text-vermilion text-5xl">✦</span>
                <h3 className="lite-display text-3xl md:text-4xl mt-4">
                  Message envoyé.
                </h3>
                <p className="mt-3 text-paper/70">
                  Merci ! Je vous reviens dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <fetcher.Form
                method="post"
                action="/api/contact"
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="sr-only">Nom</span>
                    <input
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Votre nom"
                      className={`${fieldClass} border-paper/25 text-paper placeholder:text-paper/40 focus:border-paper focus:ring-paper`}
                    />
                  </label>
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Votre email"
                      className={`${fieldClass} border-paper/25 text-paper placeholder:text-paper/40 focus:border-paper focus:ring-paper`}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="sr-only">Sujet</span>
                  <input
                    name="subject"
                    type="text"
                    required
                    maxLength={200}
                    placeholder="Sujet"
                    className={`${fieldClass} border-paper/25 text-paper placeholder:text-paper/40 focus:border-paper focus:ring-paper`}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Message</span>
                  <textarea
                    name="message"
                    required
                    maxLength={5000}
                    rows={5}
                    placeholder="Parlez‑moi de votre projet…"
                    className={`${fieldClass} border-paper/25 text-paper placeholder:text-paper/40 focus:border-paper focus:ring-paper resize-none`}
                  />
                </label>

                {error && (
                  <p className="font-mono text-xs text-vermilion">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-vermilion text-white font-mono text-sm uppercase tracking-[0.16em] px-8 py-4 hover:bg-paper hover:text-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? "Envoi…" : "Envoyer le message"}
                  {!sending && (
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  )}
                </button>
              </fetcher.Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
