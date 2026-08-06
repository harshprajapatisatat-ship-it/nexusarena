"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Gamepad2, Heart, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useWishlist } from "@/components/providers/WishlistProvider";
import SearchOverlay from "./SearchOverlay";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/leaderboards", label: "Leaderboards" },
  { href: "/store", label: "Store" },
  { href: "/news", label: "News" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useWishlist();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cmd/Ctrl+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a href="#main" className="sr-only-focusable z-[100] left-4 top-4 rounded-lg bg-neon-blue px-4 py-2 font-display text-sm font-bold text-void">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/8 bg-void/80 backdrop-blur-xl supports-[backdrop-filter]:bg-void/60"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-10"
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Nexus Arena — home"
          >
            <span className="relative grid h-9 w-9 place-items-center">
              <span
                aria-hidden
                className="absolute inset-0 rounded-lg bg-[linear-gradient(135deg,#00e5ff,#7c3aed,#ff2e88)] opacity-90 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"
              />
              <Gamepad2 size={18} className="relative text-void" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-black tracking-tight">
              NEXUS<span className="text-gradient">ARENA</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="ml-4 hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      active ? "text-ink" : "text-ink-dim hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[linear-gradient(90deg,#00e5ff,#ff2e88)]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search games"
              className="glass hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-faint transition-all duration-300 hover:border-neon-blue/50 hover:text-ink sm:flex"
            >
              <Search size={15} />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] lg:inline">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search games"
              className="glass grid h-9 w-9 place-items-center rounded-lg text-ink-dim transition-colors hover:text-ink sm:hidden"
            >
              <Search size={16} />
            </button>

            <Link
              href="/store#wishlist"
              aria-label={`Wishlist, ${count} item${count === 1 ? "" : "s"}`}
              className="glass relative grid h-9 w-9 place-items-center rounded-lg text-ink-dim transition-all duration-300 hover:border-neon-pink/50 hover:text-neon-pink"
            >
              <Heart size={16} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-neon-pink px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <Link
              href="/contact#signin"
              className="clip-notch hidden bg-[linear-gradient(100deg,#00e5ff,#7c3aed_60%,#ff2e88)] bg-[length:200%_auto] px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-void transition-all duration-500 hover:bg-[position:100%_center] hover:shadow-[0_0_28px_-6px_rgba(0,229,255,0.8)] sm:block"
            >
              Sign In
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="glass grid h-9 w-9 place-items-center rounded-lg text-ink xl:hidden"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>

        {/* Scroll progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-[2px] origin-left bg-[linear-gradient(90deg,#00e5ff,#7c3aed,#ff2e88)]"
        />
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-45 flex h-dvh w-[min(84vw,340px)] flex-col border-l border-white/10 bg-abyss/95 pt-20 backdrop-blur-2xl xl:hidden"
            >
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => {
                    const active =
                      link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center justify-between rounded-lg px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider transition-all ${
                            active
                              ? "bg-[linear-gradient(90deg,rgba(0,229,255,0.14),transparent)] text-neon-blue"
                              : "text-ink-dim hover:bg-white/5 hover:text-ink"
                          }`}
                        >
                          {link.label}
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 rounded-full ${active ? "bg-neon-blue" : "bg-transparent"}`}
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-white/8 p-5">
                <Link
                  href="/contact#signin"
                  className="clip-notch block bg-[linear-gradient(100deg,#00e5ff,#7c3aed_60%,#ff2e88)] py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-void"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
