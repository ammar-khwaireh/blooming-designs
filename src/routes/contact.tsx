import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit & contact — Maison Fleur" },
      {
        name: "description",
        content:
          "Visit our Stockholm studio, send a brief, or arrange a custom bouquet for an occasion.",
      },
      { property: "og:title", content: "Visit & contact — Maison Fleur" },
      {
        property: "og:description",
        content: "Visit our Stockholm studio or send a custom brief.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Visit & contact
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-foreground sm:text-6xl">
            Come <span className="italic text-primary">say hello</span>
          </h1>

          <div className="mt-10 space-y-8 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Studio
              </p>
              <p className="mt-2 text-base text-foreground">
                Linnégatan 22
                <br />
                114 47 Stockholm
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Hours
              </p>
              <p className="mt-2 text-base text-foreground">
                Tuesday – Saturday
                <br />
                10:00 — 18:00
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Reach
              </p>
              <p className="mt-2 text-base text-foreground">
                hello@maisonfleur.se
                <br />
                +46 8 555 0 142
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-sm bg-secondary/50 p-8 lg:p-12">
            <h2 className="font-display text-3xl text-foreground">Send a brief</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us about the occasion, the recipient, or the feeling you'd like the
              flowers to carry.
            </p>

            {sent ? (
              <div className="mt-10 flex items-start gap-4 rounded-sm border border-primary/30 bg-primary/10 p-6">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-display text-xl text-foreground">Brief received.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We'll reply within one working day with thoughts and a quote.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-8 space-y-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Occasion (optional)" name="occasion" />
                <div>
                  <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Brief
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90"
                >
                  Send brief
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
