import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ArrowLeft, Check } from "lucide-react";
import { getBouquet, bouquets } from "@/data/bouquets";
import { useCart } from "@/lib/cart";
import { BouquetCard } from "@/components/bouquet-card";

export const Route = createFileRoute("/shop/$bouquetId")({
  loader: ({ params }) => {
    const bouquet = getBouquet(params.bouquetId);
    if (!bouquet) throw notFound();
    return { bouquet };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.bouquet.name} — Maison Fleur` },
          { name: "description", content: loaderData.bouquet.description },
          { property: "og:title", content: `${loaderData.bouquet.name} — Maison Fleur` },
          { property: "og:description", content: loaderData.bouquet.description },
          { property: "og:image", content: loaderData.bouquet.image },
          { name: "twitter:image", content: loaderData.bouquet.image },
        ]
      : [],
  }),
  component: BouquetDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl">Bouquet not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-sm uppercase tracking-[0.18em] underline">
        Back to shop
      </Link>
    </div>
  ),
});

function BouquetDetail() {
  const { bouquet } = Route.useLoaderData();
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const others = bouquets.filter((b) => b.id !== bouquet.id).slice(0, 3);

  const handleAdd = () => {
    add(bouquet.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-10">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          The collection
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-16">
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden rounded-sm bg-secondary/50">
            <img
              src={bouquet.image}
              alt={bouquet.name}
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {bouquet.category}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-foreground">
            {bouquet.name}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{bouquet.tagline}</p>

          <p className="mt-6 font-display text-3xl text-foreground tabular-nums">
            ${bouquet.price}
          </p>

          <p className="mt-8 text-base leading-relaxed text-foreground/80">
            {bouquet.description}
          </p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Composed with
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {bouquet.flowers.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:text-primary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm tabular-nums">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-foreground hover:text-primary"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added
                </>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>

          <div className="mt-10 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>· Composed the morning of dispatch</p>
            <p>· Free local delivery within Stockholm on orders over $80</p>
            <p>· Care notes included with every bouquet</p>
          </div>
        </div>
      </div>

      {/* Others */}
      <section className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Also <span className="italic text-primary">in the studio</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((b) => (
              <BouquetCard key={b.id} bouquet={b} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
