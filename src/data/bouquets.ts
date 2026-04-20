import bouquet1 from "@/assets/bouquet-1.jpg";
import bouquet2 from "@/assets/bouquet-2.jpg";
import bouquet3 from "@/assets/bouquet-3.jpg";
import bouquet4 from "@/assets/bouquet-4.jpg";
import bouquet5 from "@/assets/bouquet-5.jpg";
import bouquet6 from "@/assets/bouquet-6.jpg";

export type Bouquet = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: "Signature" | "Seasonal" | "Minimal" | "Romance";
  flowers: string[];
};

export const bouquets: Bouquet[] = [
  {
    id: "linen-vow",
    name: "Linen Vow",
    tagline: "Cream peony · garden rose · eucalyptus",
    description:
      "A hand-tied composition of cream peonies and garden roses, softened with silver-dollar eucalyptus and wrapped in kraft paper. Designed to feel like a quiet moment.",
    price: 78,
    image: bouquet1,
    category: "Signature",
    flowers: ["Cream peony", "Garden rose", "Ranunculus", "Eucalyptus"],
  },
  {
    id: "harvest-still",
    name: "Harvest Still",
    tagline: "Pampas · wheat · dried botanicals",
    description:
      "An everlasting study in beige and bronze. Pampas plumes, dried wheat and seeded grasses, gathered loosely and bound with raw twine.",
    price: 64,
    image: bouquet2,
    category: "Seasonal",
    flowers: ["Pampas grass", "Bunny tail", "Dried wheat", "Limonium"],
  },
  {
    id: "three-petals",
    name: "Three Petals",
    tagline: "A trio of white peonies",
    description:
      "Three perfect white peony stems wrapped in cream paper. The minimalist gesture — for the desk, the bedside, the just-because.",
    price: 36,
    image: bouquet3,
    category: "Minimal",
    flowers: ["White peony"],
  },
  {
    id: "garden-room",
    name: "Garden Room",
    tagline: "Hydrangea · cream rose · seeded eucalyptus",
    description:
      "A lush, sculptural arrangement built for a console table. White hydrangea anchors a bed of cream roses, trailing greenery and lavender accents.",
    price: 124,
    image: bouquet4,
    category: "Signature",
    flowers: ["Hydrangea", "Cream rose", "Seeded eucalyptus", "Lavender"],
  },
  {
    id: "single-stem",
    name: "Single Stem",
    tagline: "One ranunculus, one terracotta vessel",
    description:
      "A single ivory ranunculus paired with a small terracotta bud vase. The quietest gift in the studio.",
    price: 28,
    image: bouquet5,
    category: "Minimal",
    flowers: ["Ivory ranunculus", "Eucalyptus sprig"],
  },
  {
    id: "blush-letter",
    name: "Blush Letter",
    tagline: "Pink garden rose · spray rose · greenery",
    description:
      "Soft blush garden roses gathered into a romantic posy with spray roses and trailing greenery. Tied with natural twine.",
    price: 92,
    image: bouquet6,
    category: "Romance",
    flowers: ["Garden rose", "Spray rose", "Astrantia", "Italian ruscus"],
  },
];

export const getBouquet = (id: string) => bouquets.find((b) => b.id === id);
