import { Link } from "@tanstack/react-router";
import type { Bouquet } from "@/data/bouquets";

export function BouquetCard({ bouquet, priority = false }: { bouquet: Bouquet; priority?: boolean }) {
  return (
    <Link
      to="/shop/$bouquetId"
      params={{ bouquetId: bouquet.id }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary/50">
        <img
          src={bouquet.image}
          alt={bouquet.name}
          loading={priority ? "eager" : "lazy"}
          width={1024}
          height={1280}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
          {bouquet.category}
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-foreground">{bouquet.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{bouquet.tagline}</p>
        </div>
        <p className="font-display text-lg text-foreground tabular-nums">${bouquet.price}</p>
      </div>
    </Link>
  );
}
