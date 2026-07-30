import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/projets", label: "Œuvres" },
  { to: "/agence", label: "Agence" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-border bg-background/80 py-4 backdrop-blur-xl"
          : "border-b border-transparent py-7",
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-display text-lg tracking-[0.2em] uppercase">
            Atelier<span className="text-bronze">·</span>Ravel
          </Link>
          <span className="hidden text-xs tracking-[0.2em] text-muted-foreground uppercase lg:inline-block">
            Lomé — Togo
          </span>
        </div>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-bronze after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="border border-bronze px-5 py-2.5 text-xs tracking-[0.2em] text-bronze uppercase transition-colors duration-500 hover:bg-bronze hover:text-accent-foreground"
          >
            Prendre rendez-vous
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-7 bg-foreground transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-foreground transition-all duration-300",
              open && "w-7 -translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      {open && (
        <nav className="mt-4 flex flex-col gap-1 border-t border-border bg-background px-6 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="font-display py-3 text-2xl"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Atelier Ravel — Architecture contemporaine</p>
          <p className="font-display mt-4 max-w-xl text-3xl leading-tight md:text-4xl">
            Façonner l'espace, sublimer la matière.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Boulevard du Mono, Lomé — Togo</p>
          <p className="mt-1">bonjour@atelier-ravel.fr — +228 90 00 00 00</p>
          <p className="mt-6 text-xs">
            © {new Date().getFullYear()} Atelier Ravel. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}