import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { bouquets, type Bouquet } from "@/data/bouquets";
import { BouquetCard } from "@/components/bouquet-card";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop bouquets — Maison Fleur" },
      {
        name: "description",
        content:
          "Browse our seasonal collection of hand-tied bouquets and arrangements. New designs added weekly.",
      },
      { property: "og:title", content: "Shop bouquets — Maison Fleur" },
      {
        property: "og:description",
        content: "Hand-tied seasonal bouquets and arrangements, ready to ship.",
      },
    ],
  }),
  component: ShopPage,
});

const categories: Array<Bouquet["category"] | "All"> = [
  "All",
  "Signature",
  "Seasonal",
  "Romance",
  "Minimal",
];

function ShopPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (filter === "All" ? bouquets : bouquets.filter((b) => b.category === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          The collection
        </p>
        <h1 className="mt-4 font-display text-5xl text-foreground sm:text-6xl">
          Bouquets <span className="italic text-primary">in season</span>
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Each design is composed the morning it ships. Stems may vary slightly
          based on what arrives that week — that's the nature of slow flowers.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-b border-border/60 py-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "design" : "designs"}
        </span>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <BouquetCard key={b.id} bouquet={b} />
        ))}
      </div>
    </div>
  );
}
