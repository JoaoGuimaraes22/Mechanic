"use client";

import { useEffect, useRef, useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQDict = {
  label: string;
  title: string;
  items: FAQItem[];
};

type Props = {
  dict: FAQDict;
};

function AccordionItem({
  item,
  index,
  isOpen,
  toggle,
  visible,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  toggle: () => void;
  visible: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-700 ease-out ${
        isOpen
          ? "bg-white border-slate-300 shadow-sm"
          : "bg-white/80 border-slate-200 hover:border-slate-300"
      } ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: visible ? `${200 + index * 100}ms` : "0ms" }}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left group"
        aria-expanded={isOpen}
      >
        {/* Number + question */}
        <div className="flex items-start gap-3 sm:gap-4">
          <span
            className={`text-xs font-bold mt-0.5 shrink-0 transition-colors duration-300 ${
              isOpen ? "text-red-500" : "text-slate-400 group-hover:text-slate-600"
            }`}
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${
              isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
            }`}
          >
            {item.question}
          </h3>
        </div>

        {/* Toggle icon */}
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-red-600 rotate-0"
              : "bg-slate-100 group-hover:bg-slate-200 rotate-0"
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-45 text-white" : "rotate-0 text-slate-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>

      {/* Expandable answer */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: height }}
      >
        <div ref={contentRef} className="px-5 sm:px-6 pb-5 sm:pb-6 pl-12 sm:pl-16">
          <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ dict }: Props) {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  /* Split into two columns on desktop */
  const mid = Math.ceil(dict.items.length / 2);
  const leftItems = dict.items.slice(0, mid);
  const rightItems = dict.items.slice(mid);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-16 sm:py-24 px-5 sm:px-6 bg-slate-100"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-0.5 w-8 bg-red-500 rounded-full" />
            <p className="text-red-500 uppercase tracking-[0.2em] text-xs sm:text-sm font-bold">
              {dict.label}
            </p>
            <span className="h-0.5 w-8 bg-red-500 rounded-full" />
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {dict.title}
          </h2>
        </div>

        {/* Two-column accordion grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Left column */}
          <div className="space-y-3 sm:space-y-4">
            {leftItems.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                toggle={() => toggle(i)}
                visible={visible}
              />
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-3 sm:space-y-4">
            {rightItems.map((item, i) => {
              const globalIndex = mid + i;
              return (
                <AccordionItem
                  key={globalIndex}
                  item={item}
                  index={globalIndex}
                  isOpen={openIndex === globalIndex}
                  toggle={() => toggle(globalIndex)}
                  visible={visible}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
