import { createFileRoute, Link } from "@tanstack/react-router";
import heroBouquet from "@/assets/hero-bouquet.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Studio notes — Maison Fleur" },
      {
        name: "description",
        content:
          "Inside Maison Fleur — a small Stockholm floral studio working with seasonal stems from local growers.",
      },
      { property: "og:title", content: "Studio notes — Maison Fleur" },
      {
        property: "og:description",
        content: "Inside our slow-flower studio in Stockholm.",
      },
      { property: "og:image", content: heroBouquet },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Studio notes
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-foreground sm:text-6xl">
            A small studio,
            <br />
            <span className="italic text-primary">slow flowers,</span>
            <br />
            honest hands.
          </h1>

          <div className="mt-12 space-y-6 text-base leading-relaxed text-foreground/80">
            <p>
              Maison Fleur began in 2019 as a kitchen-table experiment — three
              friends, a borrowed cooler, and a Saturday market stall. We've
              grown carefully since: still small, still composing every bouquet
              by hand, still working with the same circle of growers we started
              with.
            </p>
            <p>
              Every stem we use comes from within a hundred kilometers of the
              studio, from farms practicing low-impact growing. That means our
              catalogue shifts gently with the seasons. In May, peonies. By
              August, dahlias and cosmos. In December, evergreen and hellebores.
            </p>
            <p>
              We design the way we'd design for our own kitchen tables —
              generously, a little wild, never over-arranged. If you have a
              specific occasion in mind, please tell us. We love a brief.
            </p>
          </div>

          <Link
            to="/contact"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
          >
            Visit the studio
          </Link>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={heroBouquet}
              alt="Hand-tied bouquet of cream roses and eucalyptus"
              width={1024}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
