"use client";

import { useEffect, useState } from "react";

type CallBarDict = {
  label: string;
  cta: string;
};

type Props = {
  dict: CallBarDict;
  phone: string;
};

export default function CallBar({ dict, phone }: Props) {
  const cleanPhone = phone.replace(/\s/g, "");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-500 ease-out ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-slate-950/95 backdrop-blur-sm border-t border-slate-800 px-4 py-3 flex items-center justify-between gap-3">
        <span className="text-slate-400 text-xs truncate">{dict.label}</span>
        <a
          href={`tel:${cleanPhone}`}
          className="relative flex items-center gap-2 shrink-0 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white uppercase tracking-wide hover:bg-red-500 active:scale-95 transition-all duration-200"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
          <svg
            className="w-4 h-4 relative"
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
          <span className="relative">{dict.cta}</span>
        </a>
      </div>
    </div>
  );
}
