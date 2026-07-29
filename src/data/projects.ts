import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import hero from "@/assets/hero.jpg";

export type Category = "Résidentiel" | "Commercial" | "Design d'Intérieur" | "Urbanisme";

export const categories: Category[] = [
  "Résidentiel",
  "Commercial",
  "Design d'Intérieur",
  "Urbanisme",
];

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  place: string;
  surface: string;
  materials: string;
  concept: string;
  intro: string;
  image: string;
  width: number;
  height: number;
};

export const projects: Project[] = [
  {
    slug: "villa-monolithe",
    title: "Villa Monolithe",
    category: "Résidentiel",
    year: "2025",
    place: "Saint-Paul-de-Vence, FR",
    surface: "420 m²",
    materials: "Béton banché, chêne massif, verre structurel",
    concept: "Un volume unique creusé par la lumière, orienté sur la ligne d'horizon.",
    intro:
      "Une résidence taillée dans la pente, où chaque percement cadre le paysage méditerranéen comme une pièce de collection.",
    image: p1,
    width: 1200,
    height: 1500,
  },
  {
    slug: "atrium-bronze",
    title: "Atrium Bronze",
    category: "Commercial",
    year: "2024",
    place: "Lyon Confluence, FR",
    surface: "6 800 m²",
    materials: "Bronze brossé, béton poli, verre feuilleté",
    concept: "Un hall civique qui transforme la circulation en expérience.",
    intro:
      "Siège social conçu comme une place publique intérieure : lumière zénithale, matière chaude, silence maîtrisé.",
    image: p2,
    width: 1200,
    height: 900,
  },
  {
    slug: "appartement-terracotta",
    title: "Appartement Terracotta",
    category: "Design d'Intérieur",
    year: "2025",
    place: "Paris VII, FR",
    surface: "180 m²",
    materials: "Travertin, enduit terracotta, lin naturel",
    concept: "La couleur comme structure : un monolithe pigmenté ordonne l'espace.",
    intro:
      "Réhabilitation haussmannienne épurée jusqu'à l'os, réchauffée par une masse terracotta pleine hauteur.",
    image: p3,
    width: 1200,
    height: 1500,
  },
  {
    slug: "plateau-nord",
    title: "Plateau Nord",
    category: "Urbanisme",
    year: "2023",
    place: "Genève, CH",
    surface: "42 000 m²",
    materials: "Pierre reconstituée, acier corten, végétal",
    concept: "Une trame ouverte qui rend le sol aux piétons.",
    intro:
      "Masterplan de reconversion : îlots poreux, socles actifs et une esplanade minérale plantée d'ombre.",
    image: p4,
    width: 1400,
    height: 900,
  },
  {
    slug: "escalier-lumen",
    title: "Escalier Lumen",
    category: "Commercial",
    year: "2024",
    place: "Anvers, BE",
    surface: "90 m²",
    materials: "Béton brut, acier inoxydable, verre diffusant",
    concept: "Un puits de lumière comme colonne vertébrale du bâtiment.",
    intro:
      "Intervention chirurgicale dans un entrepôt classé : une faille verticale amène le ciel jusqu'au sous-sol.",
    image: p5,
    width: 1200,
    height: 1600,
  },
  {
    slug: "maison-horizon",
    title: "Maison Horizon",
    category: "Résidentiel",
    year: "2026",
    place: "Cap Ferret, FR",
    surface: "310 m²",
    materials: "Béton matricé, bois brûlé, miroir d'eau",
    concept: "Deux porte-à-faux qui encadrent le couchant.",
    intro:
      "Une maison-belvédère posée sur la dune, dont les volumes décalés dessinent des patios protégés du vent.",
    image: hero,
    width: 1920,
    height: 1280,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);