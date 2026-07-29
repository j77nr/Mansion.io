import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { getProject, projects } from "@/data/projects";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/projets/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Projet introuvable — Atelier Ravel" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — ${project.category} | Atelier Ravel` },
        { name: "description", content: project.intro },
        { property: "og:title", content: `${project.title} — Atelier Ravel` },
        { property: "og:description", content: project.intro },
      ],
    };
  },
  component: ProjectDetail,
});

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative h-[45vh] w-full cursor-ew-resize overflow-hidden select-none md:h-[70vh]"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onMouseDown={(e) => move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <img src={after} alt="Après travaux" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt="Avant travaux"
          className="absolute inset-0 h-full w-full object-cover grayscale"
          style={{ width: ref.current?.offsetWidth ?? "100%", maxWidth: "none" }}
        />
        <span className="eyebrow absolute top-5 left-5">Avant</span>
      </div>
      <span className="eyebrow absolute top-5 right-5">Après</span>
      <div
        className="absolute inset-y-0 w-px bg-bronze"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bronze bg-background text-bronze">
          ↔
        </span>
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const specs = [
    { k: "Lieu", v: project.place },
    { k: "Surface", v: project.surface },
    { k: "Année", v: project.year },
    { k: "Typologie", v: project.category },
    { k: "Matériaux", v: project.materials },
  ];

  return (
    <article>
      <header className="mx-auto max-w-[1600px] px-6 pt-36 pb-12 md:px-12 md:pt-48">
        <Link to="/projets" className="eyebrow transition-colors hover:text-bronze">
          ← Toutes les œuvres
        </Link>
        <h1 className="mt-8 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{project.intro}</p>
      </header>

      <div className="media-zoom mx-auto max-w-[1600px] px-6 md:px-12">
        <img
          src={project.image}
          alt={`${project.title}, vue principale`}
          width={project.width}
          height={project.height}
          className="h-[55vh] w-full object-cover md:h-[80vh]"
        />
      </div>

      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 md:grid-cols-5">
          {specs.map((s) => (
            <div key={s.k}>
              <dt className="eyebrow">{s.k}</dt>
              <dd className="mt-3 text-sm leading-relaxed">{s.v}</dd>
            </div>
          ))}
        </dl>
        <Reveal>
          <p className="font-display mt-16 max-w-4xl text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.2]">
            {project.concept}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-12">
        <p className="eyebrow mb-6">Avant / Après chantier</p>
        <BeforeAfter before={others[0].image} after={project.image} />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
          <p className="eyebrow">Projets liés</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/projets/$slug"
                params={{ slug: p.slug }}
                className="media-zoom group relative block"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={p.width}
                  height={p.height}
                  className="h-72 w-full object-cover"
                />
                <div className="veil pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="eyebrow">{p.category}</p>
                  <h3 className="font-display mt-1.5 text-xl">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}