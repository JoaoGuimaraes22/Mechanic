"use client";

import { useEffect, useState } from "react";

type HeroDict = {
  tagline: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  phone: string;
  badge1: string;
  badge2: string;
  badge3: string;
};

type Props = {
  dict: HeroDict;
  locale: string;
};

export default function HeroContent({ dict, locale }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [100, 400, 700, 1000, 1400];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (n: number) =>
    step >= n ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5";

  return (
    <div className="relative z-10 flex flex-col items-center">
      {/* Tagline */}
      <p
        className={`text-red-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4 sm:mb-6 transition-all duration-700 ease-out ${show(1)}`}
      >
        {dict.tagline}
      </p>

      {/* Title */}
      <h1
        className={`text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight transition-all duration-700 ease-out ${show(2)}`}
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {dict.title}
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-5 sm:mt-6 max-w-xl text-slate-300 text-base sm:text-lg leading-relaxed px-2 transition-all duration-700 ease-out ${show(3)}`}
      >
        {dict.subtitle}
      </p>

      {/* CTAs */}
      <div
        className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 ease-out ${show(4)}`}
      >
        <a
          href={`/${locale}#contact`}
          className="rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white uppercase tracking-wide hover:bg-red-500 hover:scale-105 active:scale-95 transition-all duration-200 min-w-[220px] text-center"
        >
          {dict.ctaPrimary}
        </a>
        <a
          href={`tel:${dict.phone.replace(/\s/g, "")}`}
          className="rounded-full border-2 border-slate-400 px-8 py-3.5 text-sm font-semibold text-white uppercase tracking-wide hover:border-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 min-w-[220px] text-center flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          {dict.ctaSecondary}
        </a>
      </div>

      {/* Trust badges */}
      <div
        className={`mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-xs sm:text-sm transition-all duration-700 ease-out ${show(5)}`}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
          <span>{dict.badge1}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
          <span>{dict.badge2}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{dict.badge3}</span>
        </div>
      </div>
    </div>
  );
}
