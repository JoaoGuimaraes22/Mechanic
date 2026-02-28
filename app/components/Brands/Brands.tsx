"use client";

import { useEffect, useRef, useState } from "react";

type BrandsDict = {
  label: string;
};

type Props = {
  dict: BrandsDict;
};

/* Simple SVG text logos — clean, no external assets needed */
const brands = [
  "BMW",
  "Mercedes",
  "Volkswagen",
  "Audi",
  "Renault",
  "Peugeot",
  "Citroën",
  "Toyota",
  "Ford",
  "Fiat",
  "Opel",
  "Nissan",
  "Honda",
  "Volvo",
  "Hyundai",
  "Kia",
];

/* Minimal brand icons — one per brand for visual variety */
const brandIcons: Record<string, React.ReactNode> = {
  BMW: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 1.5v21M1.5 12h21"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
    </svg>
  ),
  Mercedes: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v10l-8.66 5M12 12l8.66 5" />
    </svg>
  ),
  Volkswagen: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M7 6l5 12 5-12M5.5 14h13" />
    </svg>
  ),
  Audi: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 32 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="5.5" cy="8" r="4.5" />
      <circle cx="12.5" cy="8" r="4.5" />
      <circle cx="19.5" cy="8" r="4.5" />
      <circle cx="26.5" cy="8" r="4.5" />
    </svg>
  ),
  Renault: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 3L4 21h4l4-9 4 9h4L12 3z" />
    </svg>
  ),
  Peugeot: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2v8m0 0c-3 2-5 5-5 9h10c0-4-2-7-5-9z" />
      <path d="M12 6c1-2 3-3 5-3" />
    </svg>
  ),
  Citroën: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 8l8-5 8 5-8 5-8-5z" />
      <path d="M4 13l8-5 8 5-8 5-8-5z" />
    </svg>
  ),
  Toyota: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <ellipse cx="12" cy="12" rx="10" ry="6" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
    </svg>
  ),
  Ford: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <ellipse cx="12" cy="12" rx="10" ry="7" />
    </svg>
  ),
  Fiat: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 12h18" />
    </svg>
  ),
  Opel: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M22 10L12 12 2 10" />
    </svg>
  ),
  Nissan: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M4 12h16" />
    </svg>
  ),
  Honda: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 18V6h3c4 0 4 5 0 5h2c4 0 4 7 0 7H4zM20 18V6h-3c-4 0-4 5 0 5h-2c-4 0-4 7 0 7h5z" />
    </svg>
  ),
  Volvo: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M5 12h14M12 5l5 7" />
    </svg>
  ),
  Hyundai: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <ellipse cx="12" cy="12" rx="10" ry="7" />
    </svg>
  ),
  Kia: (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 18L12 6l10 12" />
    </svg>
  ),
};

export default function Brands({ dict }: Props) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Duplicate brands for seamless infinite scroll */
  const doubled = [...brands, ...brands];

  return (
    <section
      ref={sectionRef}
      className="py-6 sm:py-8 bg-black/80 backdrop-blur-sm overflow-hidden"
    >
      <div
        className={`transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Label */}
        <p className="text-center text-slate-400 uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold mb-5 sm:mb-6">
          {dict.label}
        </p>

        {/* Infinite scroll strip */}
        <div className="relative">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex items-center gap-10 sm:gap-14 animate-scroll"
          >
            {doubled.map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex flex-col items-center gap-2 shrink-0 group cursor-default"
              >
                <div className="text-slate-600 group-hover:text-red-500 transition-colors duration-300">
                  {brandIcons[brand]}
                </div>
                <span
                  className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 group-hover:text-slate-300 transition-colors duration-300 whitespace-nowrap"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe for infinite scroll */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
