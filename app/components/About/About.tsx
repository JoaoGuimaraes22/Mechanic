"use client";

import { useEffect, useRef, useState } from "react";

type AboutDict = {
  label: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
};

type Props = {
  dict: AboutDict;
};

export default function About({ dict }: Props) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: dict.stat1Value, label: dict.stat1Label },
    { value: dict.stat2Value, label: dict.stat2Label },
    { value: dict.stat3Value, label: dict.stat3Label },
    { value: dict.stat4Value, label: dict.stat4Label },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-24 px-5 sm:px-6 bg-slate-900"
    >
      <div
        className={`mx-auto max-w-6xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Label */}
        <p className="text-red-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3 text-center">
          {dict.label}
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 sm:mb-16"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {dict.title}
        </h2>

        {/* Content grid — text + image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-14 sm:mb-20">
          {/* Text */}
          <div className="space-y-5 sm:space-y-6">
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {dict.paragraph1}
            </p>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {dict.paragraph2}
            </p>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {dict.paragraph3}
            </p>
          </div>

          {/* Image placeholder */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
              {/* Wrench icon */}
              <svg
                className="w-16 h-16 mb-3 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
              <span className="text-sm">Workshop photo here</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              <p
                className="text-3xl sm:text-4xl font-bold text-red-500 mb-1"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
