import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Maison Fleur" },
      { name: "description", content: "Review your selected bouquets and complete your order." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailedItems, subtotal, setQuantity, remove, clear } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shipping = subtotal >= 80 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Order received
        </p>
        <h1 className="mt-4 font-display text-5xl text-foreground">Thank you.</h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Your bouquet will be composed by hand the morning of dispatch. We'll send a confirmation
          and tracking note to your inbox shortly.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
        >
          Keep browsing
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (detailedItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Your cart</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">
          Quietly <span className="italic text-primary">empty</span>
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Nothing in your cart yet. Begin with a single stem or a hand-tied bouquet.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
        >
          Browse the collection
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Your cart</p>
      <h1 className="mt-3 font-display text-5xl text-foreground sm:text-6xl">
        Your <span className="italic text-primary">selection</span>
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <ul className="divide-y divide-border border-t border-b border-border lg:col-span-8">
          {detailedItems.map(({ bouquet, quantity, subtotal: itemSubtotal }) => (
            <li key={bouquet.id} className="flex gap-5 py-6">
              <Link
                to="/shop/$bouquetId"
                params={{ bouquetId: bouquet.id }}
                className="block h-28 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-secondary/40"
              >
                <img
                  src={bouquet.image}
                  alt={bouquet.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      to="/shop/$bouquetId"
                      params={{ bouquetId: bouquet.id }}
                      className="font-display text-xl text-foreground hover:text-primary"
                    >
                      {bouquet.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">{bouquet.tagline}</p>
                  </div>
                  <p className="font-display text-lg text-foreground tabular-nums">
                    ${itemSubtotal}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      onClick={() => setQuantity(bouquet.id, quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center text-foreground hover:text-primary"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{quantity}</span>
                    <button
                      onClick={() => setQuantity(bouquet.id, quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center text-foreground hover:text-primary"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(bouquet.id)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-4">
          <div className="rounded-sm bg-secondary/50 p-8">
            <h2 className="font-display text-2xl text-foreground">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="tabular-nums text-foreground">${subtotal}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Delivery</dt>
                <dd className="tabular-nums text-foreground">
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-display text-lg text-foreground">Total</dt>
                <dd className="font-display text-lg text-foreground tabular-nums">${total}</dd>
              </div>
            </dl>

            {subtotal < 80 && (
              <p className="mt-4 text-xs text-muted-foreground">
                Add ${80 - subtotal} more for free Stockholm delivery.
              </p>
            )}

            <button
              onClick={() => {
                setOrderPlaced(true);
                clear();
              }}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Place order
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Demo checkout — no payment is processed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
