"use client";

import { useEffect, useRef, useState } from "react";

type ContactDict = {
  label: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  hoursTitle: string;
  weekdays: string;
  saturday: string;
  sunday: string;
  formName: string;
  formEmail: string;
  formPhone: string;
  formCar: string;
  formMessage: string;
  formSubmit: string;
  formSuccess: string;
};

type Props = {
  dict: ContactDict;
};

export default function Contact({ dict }: Props) {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 px-5 sm:px-6 bg-slate-950"
    >
      <div
        className={`mx-auto max-w-6xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <p className="text-red-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold mb-3 text-center">
          {dict.label}
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-10 sm:mb-14"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {dict.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Form */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mb-5">
                  <svg
                    className="w-7 h-7 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <p className="text-white text-lg font-semibold mb-2">
                  {dict.formSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-red-900/30 border border-red-800 px-4 py-3 text-sm text-red-400">
                    Something went wrong. Please try again or call us directly.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={dict.formName}
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={dict.formEmail}
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={dict.formPhone}
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <input
                    type="text"
                    name="car"
                    placeholder={dict.formCar}
                    className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={dict.formMessage}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white uppercase tracking-wide hover:bg-red-500 active:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "..." : dict.formSubmit}
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="space-y-6">
            {/* Contact details */}
            <div className="space-y-4">
              {/* Address */}
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-red-500 transition-colors">
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
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-red-400 transition-colors">
                    {dict.address}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${dict.phone.replace(/\s/g, "")}`}
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-red-500 transition-colors">
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium group-hover:text-red-400 transition-colors">
                  {dict.phone}
                </p>
              </a>

              {/* Email */}
              <a
                href={`mailto:${dict.email}`}
                className="flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-red-500 transition-colors">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium group-hover:text-red-400 transition-colors">
                  {dict.email}
                </p>
              </a>
            </div>

            {/* Hours */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">
                {dict.hoursTitle}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300">{dict.weekdays}</p>
                <p className="text-slate-300">{dict.saturday}</p>
                <p className="text-slate-400">{dict.sunday}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] bg-slate-800 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <svg
                  className="w-10 h-10 mx-auto mb-2 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                  />
                </svg>
                <span className="text-xs">Google Maps embed here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
