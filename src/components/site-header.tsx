import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
          Maison <span className="italic text-primary">Fleur</span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm uppercase tracking-[0.18em] text-muted-foreground md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/shop" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Studio
          </Link>
          <Link to="/contact" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Visit
          </Link>
        </nav>

        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm tracking-wide text-foreground hover:bg-secondary transition-colors"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          <span className="tabular-nums">{count}</span>
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl text-foreground">
            Maison <span className="italic text-primary">Fleur</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            A small floral studio composing seasonal arrangements from the garden, the field, and the
            occasional quiet greenhouse. Made by hand in Stockholm.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Linnégatan 22</li>
            <li>114 47 Stockholm</li>
            <li>Tue–Sat · 10–18</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reach</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@maisonfleur.se</li>
            <li>+46 8 555 0 142</li>
            <li>@maisonfleur</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs tracking-wider text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} Maison Fleur · A florist's studio
      </div>
    </footer>
  );
}
