import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroBouquet from "@/assets/hero-bouquet.jpg";
import { bouquets } from "@/data/bouquets";
import { BouquetCard } from "@/components/bouquet-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Fleur — Seasonal floral studio in Stockholm" },
      {
        name: "description",
        content:
          "Hand-tied seasonal bouquets, arrangements and single stems. Composed weekly from the garden, the field and the greenhouse.",
      },
      { property: "og:title", content: "Maison Fleur — Seasonal floral studio" },
      {
        property: "og:description",
        content: "Hand-tied seasonal bouquets composed weekly in our Stockholm studio.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = bouquets.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-12 pb-24 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-20">
          <div className="fade-in-up lg:col-span-6 lg:pt-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Studio · Spring Edition
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Flowers,
              <br />
              <span className="italic text-primary">arranged</span> with
              <br />
              quiet intention.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              A small floral studio composing seasonal bouquets and arrangements
              by hand. Each piece is built around what's growing this week —
              cream peonies, soft eucalyptus, and the occasional wild surprise.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground underline-offset-8 hover:underline"
              >
                Our studio
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={heroBouquet}
                alt="Cream roses and eucalyptus arranged in a stoneware vase by a window"
                width={1080}
                height={1350}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>No. 014</span>
              <span>Linen Vow · Cream peony</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-border/60 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                This week
              </p>
              <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                Composed by hand
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground underline-offset-8 hover:underline sm:inline-flex"
            >
              All bouquets
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((b, i) => (
              <BouquetCard key={b.id} bouquet={b} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The studio
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Slow flowers,
              <br />
              <span className="italic text-primary">honestly grown.</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p>
              We work with a small circle of growers within a hundred kilometers
              of the studio. Stems travel less, last longer, and arrive with the
              quiet character of the season they came from.
            </p>
            <p>
              Each bouquet is composed the morning it ships — never pre-made,
              never rushed. If a flower in our catalogue isn't lovely that week,
              we substitute thoughtfully and tell you what changed.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground underline-offset-8 hover:underline"
            >
              Read the studio notes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
