"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type NavbarDict = {
  home: string;
  about: string;
  services: string;
  reviews: string;
  contact: string;
  cta: string;
};

type Props = {
  dict: NavbarDict;
  locale: string;
};

export default function Navbar({ dict, locale }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: dict.home, href: `/${locale}#` },
    { label: dict.about, href: `/${locale}#about` },
    { label: dict.services, href: `/${locale}#services` },
    { label: dict.reviews, href: `/${locale}#reviews` },
    { label: dict.contact, href: `/${locale}#contact` },
  ];

  const pathWithoutLocale = pathname.replace(/^\/(en|pt)/, "") || "/";
  const otherLocale = locale === "en" ? "pt" : "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-slate-950/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-6 py-4">
        {/* Logo */}
        <a
          href={`/${locale}`}
          className="text-xl sm:text-2xl font-bold text-white"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          REVI<span className="text-red-500">CAR</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm uppercase tracking-wide text-slate-300 hover:text-red-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`/${locale}#contact`}
              className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white uppercase tracking-wide hover:bg-red-500 transition-colors"
            >
              {dict.cta}
            </a>
          </li>
          <li>
            <a
              href={`/${otherLocale}${pathWithoutLocale}`}
              className="text-sm uppercase tracking-wide text-slate-400 hover:text-white transition-colors border border-slate-600 rounded-full px-3 py-1"
            >
              {otherLocale.toUpperCase()}
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger — 44px minimum touch target */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-3 -mr-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu — full screen overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-1 bg-slate-950/95 backdrop-blur-sm px-6 pb-8 pt-4">
          {navLinks.map((link) => (
            <li key={link.label} className="w-full">
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm uppercase tracking-wide text-slate-300 hover:text-red-400 active:text-red-400 transition-colors py-3.5"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="w-full mt-3">
            <a
              href={`/${locale}#contact`}
              onClick={() => setMobileOpen(false)}
              className="block text-center rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white uppercase tracking-wide hover:bg-red-500 active:bg-red-700 transition-colors"
            >
              {dict.cta}
            </a>
          </li>
          <li className="mt-3">
            <a
              href={`/${otherLocale}${pathWithoutLocale}`}
              className="inline-block text-sm uppercase tracking-wide text-slate-400 hover:text-white transition-colors border border-slate-600 rounded-full px-5 py-2.5"
            >
              {otherLocale === "en" ? "English" : "Português"}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
