import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import studio from "@/assets/studio.jpg";
import { projects, categories } from "@/data/projects";
import { Reveal, Counter } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Ravel — Architecte contemporain & design de luxe" },
      {
        name: "description",
        content:
          "Cabinet d'architecture de luxe à Lomé : résidences contemporaines, projets commerciaux, design d'intérieur et urbanisme.",
      },
      { property: "og:title", content: "Atelier Ravel — Architecte contemporain" },
      {
        property: "og:description",
        content: "Façonner l'espace, sublimer la matière. Architecture contemporaine de luxe.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState<string>("Tous");

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown =
    filter === "Tous" ? projects.slice(0, 5) : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="relative h-[100svh] overflow-hidden">
        <img
          src={hero}
          alt="Villa contemporaine en béton conçue par Atelier Ravel"
          width={1920}
          height={1280}
          className="absolute inset-0 h-[120%] w-full object-cover"
          style={{ transform: `translate3d(0, ${offset * 0.35}px, 0) scale(1.02)` }}
        />
        <div className="veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-20 md:px-12 md:pb-24">
          <p className="eyebrow reveal-up">CABINET D'ARCHITECTURE CONTEMPORAINE — LOMÉ</p>
          <h1 className="reveal-up font-display mt-6 max-w-5xl text-[clamp(2.75rem,8vw,7rem)] leading-[0.92]">
            Façonner l'espace,
            <br />
            <span className="text-bronze">sublimer</span> la matière.
          </h1>
          <div className="reveal-up mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/projets"
              className="group flex items-center gap-4 border border-foreground/30 px-8 py-4 text-xs tracking-[0.25em] uppercase transition-colors duration-500 hover:border-bronze hover:text-bronze"
            >
              Découvrir nos œuvres
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Vingt-deux ans de constructions habitées, dessinées à la lumière et à la matière.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Projets vedettes</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[1]">Œuvres sélectionnées</h2>
          </div>
          <div className="flex flex-wrap gap-2">
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
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
          {shown.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 80}
              className={cn(
                "md:col-span-6",
                i % 5 === 0 && "md:col-span-7",
                i % 5 === 1 && "md:col-span-5",
                i % 5 === 4 && "md:col-span-12",
              )}
            >
              <Link
                to="/projets/$slug"
                params={{ slug: p.slug }}
                className="media-zoom group relative block"
              >
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.category}, ${p.place}`}
                  loading="lazy"
                  width={p.width}
                  height={p.height}
                  className={cn(
                    "w-full object-cover",
                    i % 5 === 4 ? "h-[60vh]" : "h-[52vh] md:h-[68vh]",
                  )}
                />
                <div className="absolute inset-0 bg-background/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="card-veil pointer-events-none absolute inset-x-0 bottom-0 h-2/5" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="eyebrow">{p.category}</p>
                    <h3 className="font-display mt-2 text-2xl md:text-3xl">{p.title}</h3>
                  </div>
                  <span className="translate-y-2 text-xs tracking-[0.2em] text-bronze uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    Voir le projet
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-6 py-24 md:grid-cols-2 md:px-12">
          <Reveal>
            <p className="eyebrow">Manifeste</p>
            <p className="font-display mt-6 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15]">
              Nous construisons peu, mais nous construisons juste : des bâtiments sobres en énergie,
              généreux en lumière, faits de matières qui vieillissent bien.
            </p>
            <Link
              to="/agence"
              className="mt-10 inline-block border-b border-bronze pb-1 text-xs tracking-[0.25em] text-bronze uppercase"
            >
              Notre démarche
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 self-center">
            <Counter to={186} suffix="" label="Projets livrés" />
            <Counter to={412000} suffix=" m²" label="Surfaces conçues" />
            <Counter to={14} label="Prix & distinctions" />
            <Counter to={22} label="Années d'expertise" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32">
        <Reveal className="media-zoom">
          <img
            src={studio}
            alt="Atelier d'architecture : maquettes et plans sur table en béton"
            loading="lazy"
            width={1600}
            height={1000}
            className="h-full w-full object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">L'atelier</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05]">
            Un studio de dix-huit architectes, une seule obsession : la justesse.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            De la première esquisse au suivi de chantier, nous gardons la main sur chaque détail.
            Maquettes physiques, prototypes de matière et modélisation 3D nourrissent une
            architecture pensée pour durer.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-xs tracking-[0.25em] uppercase transition-colors duration-500 hover:border-bronze hover:text-bronze"
          >
            Discuter de votre projet →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
