"use client";

import { useEffect, useState } from "react";

type HeroDict = {
  tagline: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  phone: string;
};

type Props = {
  dict: HeroDict;
  locale: string;
};

export default function HeroContent({ dict, locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Tagline */}
      <p className="text-red-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
        {dict.tagline}
      </p>

      {/* Title */}
      <h1
        className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-tight"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {dict.title}
      </h1>

      {/* Subtitle */}
      <p className="mt-5 sm:mt-6 max-w-xl text-slate-300 text-base sm:text-lg leading-relaxed px-2">
        {dict.subtitle}
      </p>

      {/* CTAs */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4">
        <a
          href={`/${locale}#contact`}
          className="rounded-full bg-red-600 px-8 py-3.5 text-sm font-semibold text-white uppercase tracking-wide hover:bg-red-500 active:bg-red-700 transition-colors min-w-[220px] text-center"
        >
          {dict.ctaPrimary}
        </a>
        <a
          href={`tel:${dict.phone.replace(/\s/g, "")}`}
          className="rounded-full border-2 border-slate-400 px-8 py-3.5 text-sm font-semibold text-white uppercase tracking-wide hover:border-white hover:bg-white/10 active:bg-white/20 transition-colors min-w-[220px] text-center flex items-center justify-center gap-2"
        >
          {/* Phone icon */}
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
      <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          {/* Shield icon */}
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
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          <span>Factory Certified</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Clock icon */}
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
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>17+ Years Experience</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Star icon */}
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>4.9 ★ Google Rating</span>
        </div>
      </div>
    </div>
  );
}
