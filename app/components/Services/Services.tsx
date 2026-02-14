"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type ServiceItem = {
  name: string;
  description: string;
  icon: string;
};

type ServicesDict = {
  label: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  items: ServiceItem[];
};

type Props = {
  dict: ServicesDict;
};

const icons: Record<string, React.ReactNode> = {
  ac: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  ),
  battery: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
      />
    </svg>
  ),
  tyres: (
    <svg
      className="w-6 h-6"
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
  ),
  engine: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  mechanic: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
      />
    </svg>
  ),
  revision: (
    <svg
      className="w-6 h-6"
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
  ),
  diagnostics: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    </svg>
  ),
  bodywork: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),
};

const gradients = [
  "from-slate-600 via-slate-700 to-slate-800",
  "from-slate-700 via-slate-600 to-slate-700",
  "from-slate-600 to-slate-700",
  "from-slate-700 to-slate-800",
  "from-slate-800 via-slate-700 to-slate-600",
  "from-slate-600 via-slate-700 to-slate-700",
  "from-slate-700 via-slate-800 to-slate-700",
  "from-slate-700 to-slate-600",
];

export default function Services({ dict }: Props) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasDragged = useRef(false);

  // Section fade-in
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

  // Track active card on scroll
  const updateActive = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const sliderRect = slider.getBoundingClientRect();
    const center = sliderRect.left + sliderRect.width / 2;

    let closestIdx = 0;
    let closestDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener("scroll", updateActive, { passive: true });
    return () => slider.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  // Click dot -> scroll to card
  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (card && sliderRef.current) {
      const slider = sliderRef.current;
      const sliderPadding =
        parseInt(getComputedStyle(slider).paddingLeft) || 20;
      const cardWidth = card.offsetWidth;
      const sliderWidth = slider.offsetWidth;
      const scrollTarget =
        card.offsetLeft -
        sliderPadding -
        (sliderWidth - cardWidth) / 2 +
        sliderPadding;
      slider.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  };

  // Mouse drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollStart.current = sliderRef.current?.scrollLeft ?? 0;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grabbing";
      sliderRef.current.style.userSelect = "none";
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 3) hasDragged.current = true;
    sliderRef.current.scrollLeft = scrollStart.current - dx;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.userSelect = "";
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-slate-100"
    >
      <div
        className={`transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Label with red lines */}
        <div className="flex items-center justify-center gap-3 mb-5 px-5">
          <span className="h-[2px] w-8 bg-red-500 rounded-full" />
          <p className="text-red-600 uppercase tracking-[0.2em] text-xs sm:text-sm font-bold">
            {dict.label}
          </p>
          <span className="h-[2px] w-8 bg-red-500 rounded-full" />
        </div>

        {/* Title with highlighted word */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 text-center mb-12 sm:mb-16 px-5 sm:px-6 leading-tight"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {dict.titleBefore}{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-red-600">
              {dict.titleHighlight}
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-500 rounded-full" />
          </span>{" "}
          {dict.titleAfter}
        </h2>

        {/* Card slider — draggable */}
        <div
          ref={sliderRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-5 sm:px-6 pb-2 scrollbar-hide cursor-grab select-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Leading spacer */}
          <div
            className="hidden lg:block shrink-0"
            style={{ width: "calc((100vw - 1152px) / 2 - 12px)" }}
          />

          {dict.items.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="snap-center shrink-0 w-[280px] sm:w-[300px] md:w-[320px]"
            >
              <div className="rounded-2xl bg-white shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                {/* Image area */}
                <div
                  className={`relative h-44 sm:h-48 bg-gradient-to-br ${gradients[i % gradients.length]} rounded-t-2xl overflow-hidden`}
                >
                  {/* Number badge */}
                  <div className="absolute top-3 left-3 bg-red-600 rounded-lg w-10 h-10 flex items-center justify-center shadow-md">
                    <span
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Large faded decorative icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 scale-[3] text-white pointer-events-none">
                    {icons[item.icon]}
                  </div>
                </div>

                {/* Red circle icon */}
                <div className="flex justify-center -mt-7 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg text-white ring-4 ring-white">
                    {icons[item.icon]}
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 pt-3 pb-6 text-center">
                  <h3
                    className="text-slate-900 font-bold text-lg sm:text-xl mb-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Trailing spacer */}
          <div
            className="hidden lg:block shrink-0"
            style={{ width: "calc((100vw - 1152px) / 2 - 12px)" }}
          />
          <div className="shrink-0 w-1 lg:hidden" />
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {dict.items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Service ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "bg-red-600 w-8 h-3"
                  : "bg-red-300/50 w-3 h-3 hover:bg-red-400/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
