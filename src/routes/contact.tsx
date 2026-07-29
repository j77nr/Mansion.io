import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & rendez-vous — Atelier Ravel, architecte contemporain" },
      {
        name: "description",
        content:
          "Parlez de votre construction neuve, rénovation ou extension avec Atelier Ravel. Premier échange sur rendez-vous à Paris.",
      },
      { property: "og:title", content: "Contact — Atelier Ravel" },
      {
        property: "og:description",
        content: "Prenez rendez-vous avec le cabinet d'architecture Atelier Ravel.",
      },
    ],
  }),
  component: ContactPage,
});

const types = ["Construction neuve", "Rénovation", "Extension", "Design d'intérieur"];
const budgets = ["< 250 k€", "250 – 750 k€", "750 k€ – 2 M€", "> 2 M€"];

const field =
  "w-full border border-border bg-transparent px-4 py-3.5 text-sm outline-none transition-colors duration-300 placeholder:text-muted-foreground focus:border-bronze";

function ContactPage() {
  const [type, setType] = useState(types[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-36 pb-24 md:px-12 md:pt-48">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-5 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">
        Parlons de votre <span className="text-bronze">lieu</span>.
      </h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} className="space-y-10">
          <fieldset>
            <legend className="eyebrow mb-4">Type de projet</legend>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={cn(
                    "border border-border px-4 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors duration-300",
                    type === t
                      ? "border-bronze bg-bronze text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-4">Budget estimé</legend>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={cn(
                    "border border-border px-4 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors duration-300",
                    budget === b
                      ? "border-bronze bg-bronze text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 md:grid-cols-2">
            <input required className={field} placeholder="Nom et prénom" aria-label="Nom" />
            <input
              required
              type="email"
              className={field}
              placeholder="Adresse e-mail"
              aria-label="E-mail"
            />
            <input className={cn(field, "md:col-span-2")} placeholder="Lieu du projet" aria-label="Lieu" />
            <textarea
              className={cn(field, "md:col-span-2 min-h-40 resize-none")}
              placeholder="Décrivez votre projet en quelques lignes…"
              aria-label="Message"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              className="border border-bronze px-8 py-4 text-xs tracking-[0.25em] text-bronze uppercase transition-colors duration-500 hover:bg-bronze hover:text-accent-foreground"
            >
              Envoyer la demande
            </button>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              className="border-b border-border pb-1 text-xs tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              Réserver un premier échange
            </a>
          </div>

          {sent && (
            <p className="text-sm text-bronze">
              Merci — votre demande ({type}, {budget}) est enregistrée. Nous revenons vers vous sous
              48 h.
            </p>
          )}
        </form>

        <aside className="space-y-8">
          <div className="border border-border">
            <iframe
              title="Localisation de l'agence à Paris"
              className="h-72 w-full grayscale invert-[0.92]"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.3650%2C48.8530%2C2.3900%2C48.8680&layer=mapnik"
            />
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="eyebrow">Atelier</p>
            <p className="text-foreground">18 quai des Ateliers, 75011 Paris</p>
            <p>bonjour@atelier-ravel.fr</p>
            <p>+33 1 84 20 11 09</p>
            <p className="pt-4">Lundi – vendredi, 9h – 19h</p>
          </div>
        </aside>
      </div>
    </section>
  );
}