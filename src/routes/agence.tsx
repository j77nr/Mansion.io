import { createFileRoute } from "@tanstack/react-router";
import studio from "@/assets/studio.jpg";
import { Reveal, Counter } from "@/components/reveal";

export const Route = createFileRoute("/agence")({
  head: () => ({
    meta: [
      { title: "L'agence — Démarche, presse & récompenses | Atelier Ravel" },
      {
        name: "description",
        content:
          "Démarche d'un cabinet d'architecture de luxe : processus de projet, distinctions et publications presse d'Atelier Ravel.",
      },
      { property: "og:title", content: "L'agence — Atelier Ravel" },
      {
        property: "og:description",
        content: "Processus, presse et récompenses du cabinet d'architecture Atelier Ravel.",
      },
    ],
  }),
  component: AgencyPage,
});

const steps = [
  {
    n: "01",
    t: "Analyse & concept",
    d: "Lecture du site, du programme et des contraintes. Esquisses, maquettes d'étude et parti architectural.",
  },
  {
    n: "02",
    t: "Modélisation 3D",
    d: "Maquette numérique, images d'ambiance et prototypes de matière pour arbitrer chaque détail.",
  },
  {
    n: "03",
    t: "Dépôt du permis",
    d: "Dossier réglementaire complet, dialogue avec les services d'urbanisme et bureaux de contrôle.",
  },
  {
    n: "04",
    t: "Suivi de chantier",
    d: "Direction d'exécution, arbitrages hebdomadaires sur site, réception et livraison clé en main.",
  },
];

const press = [
  "Dezeen",
  "ArchDaily",
  "AMC",
  "Domus",
  "Wallpaper*",
  "Prix de l'Équerre d'argent",
  "Mies van der Rohe — nommé",
  "AJAP",
];

function AgencyPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pt-36 pb-16 md:px-12 md:pt-48">
        <p className="eyebrow">L'agence</p>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">
          Une architecture <span className="text-bronze">durable</span>, sobre et habitée.
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
          Fondé en 2004, Atelier Ravel dessine des bâtiments qui assument leur matière : béton
          banché, bois massif, métal brossé. Nous concevons peu de projets par an pour rester
          présents du premier croquis à la dernière finition.
        </p>
      </section>

      <div className="media-zoom mx-auto max-w-[1600px] px-6 md:px-12">
        <img
          src={studio}
          alt="Studio d'architecture Atelier Ravel"
          width={1600}
          height={1000}
          className="h-[45vh] w-full object-cover md:h-[70vh]"
        />
      </div>

      <section className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-8 gap-y-12 px-6 py-24 md:grid-cols-4 md:px-12">
        <Counter to={186} label="Projets livrés" />
        <Counter to={412000} suffix=" m²" label="Surfaces conçues" />
        <Counter to={14} label="Prix & distinctions" />
        <Counter to={22} label="Années d'expertise" />
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12">
          <p className="eyebrow">Processus de travail</p>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100} className="bg-background p-8">
                <span className="font-display text-bronze text-sm tracking-[0.3em]">{s.n}</span>
                <h2 className="mt-6 text-2xl">{s.t}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-12">
        <p className="eyebrow">Presse & récompenses</p>
        <div className="mt-10 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {press.map((p) => (
            <div
              key={p}
              className="font-display flex min-h-28 items-center justify-center bg-background px-4 text-center text-sm tracking-[0.15em] text-muted-foreground uppercase transition-colors duration-500 hover:text-bronze"
            >
              {p}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}