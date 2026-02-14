"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

/* Animated counter that counts up to a numeric target */
function AnimatedStat({
  value,
  label,
  active,
}: {
  value: string;
  label: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) return;

    // Extract leading number from value (e.g. "4.9", "1000+", "100%", "Multi")
    const match = value.match(/^([\d.]+)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = value.replace(match[1], "");
    const isDecimal = match[1].includes(".");
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // Ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;

      if (isDecimal) {
        setDisplay(val.toFixed(1) + suffix);
      } else {
        setDisplay(Math.round(val).toLocaleString() + suffix);
      }

      if (current >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [active, value]);

  return (
    <div className="text-center p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700/50">
      <p
        className="text-3xl sm:text-4xl font-bold text-red-500 mb-1"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {display}
      </p>
      <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

export default function About({ dict }: Props) {
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
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
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <p
          className={`text-red-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3 text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {dict.label}
        </p>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 sm:mb-16 transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {dict.title}
        </h2>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-14 sm:mb-20">
          {/* Text — staggered paragraphs */}
          <div className="space-y-5 sm:space-y-6">
            {[dict.paragraph1, dict.paragraph2, dict.paragraph3].map((p, i) => (
              <p
                key={i}
                className={`text-slate-300 leading-relaxed text-sm sm:text-base transition-all duration-700 ease-out ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{
                  transitionDelay: visible ? `${300 + i * 200}ms` : "0ms",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Image — slides in from right */}
          <div
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 transition-all duration-1000 ease-out delay-500 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Image
              src="/img/oficina.png"
              alt="Revicar — oficina de reparação automóvel"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Stats bar — animated counters */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-out ${
                statsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: statsVisible ? `${i * 150}ms` : "0ms" }}
            >
              <AnimatedStat
                value={stat.value}
                label={stat.label}
                active={statsVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
