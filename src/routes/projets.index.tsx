import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { projects, categories } from "@/data/projects";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projets/")({
  head: () => ({
    meta: [
      { title: "Œuvres — Portfolio d'architecture contemporaine | Atelier Ravel" },
      {
        name: "description",
        content:
          "Portfolio détaillé : résidences contemporaines, projets commerciaux, design d'intérieur et urbanisme signés Atelier Ravel.",
      },
      { property: "og:title", content: "Portfolio — Atelier Ravel" },
      {
        property: "og:description",
        content: "Galerie des œuvres du cabinet d'architecture Atelier Ravel.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<string>("Tous");
  const shown = filter === "Tous" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="mx-auto max-w-[1600px] px-6 pt-36 pb-24 md:px-12 md:pt-48">
      <p className="eyebrow">Galerie des œuvres</p>
      <h1 className="mt-5 max-w-3xl text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">
        Chaque projet, une réponse au lieu.
      </h1>

      <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
        {["Tous", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "border border-border px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors duration-300",
              filter === c
                ? "border-bronze bg-bronze text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 90} className="break-inside-avoid">
            <Link
              to="/projets/$slug"
              params={{ slug: p.slug }}
              className="media-zoom group relative block"
            >
              <img
                src={p.image}
                alt={`${p.title}, ${p.category} à ${p.place}`}
                loading="lazy"
                width={p.width}
                height={p.height}
                className="w-full object-cover"
              />
              <div className="card-veil pointer-events-none absolute inset-x-0 bottom-0 h-3/5" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <p className="eyebrow">
                    {p.category} — {p.year}
                  </p>
                  <h2 className="font-display mt-1.5 text-xl">{p.title}</h2>
                </div>
                <span className="translate-y-2 text-[0.65rem] tracking-[0.2em] text-bronze uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Voir
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}