import { getDictionary } from "../../get-dictionary";
import type { Locale } from "../../i18n-config";
import Navbar from "../components/Navbar/Navbar";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <Navbar dict={dict.navbar} locale={locale} />

      {/* Hero Section — placeholder */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center text-white text-center px-5 sm:px-6 bg-slate-950"
      >
        <p className="text-red-500 uppercase tracking-widest text-sm font-semibold mb-4">
          {dict.hero.tagline}
        </p>
        <h1
          className="text-5xl sm:text-7xl font-bold"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {dict.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-slate-300 text-lg leading-relaxed">
          {dict.hero.subtitle}
        </p>
      </section>

      {/* About — coming next */}
      <section id="about" className="py-20 px-5 bg-slate-900">
        <p className="text-center text-slate-400">About section coming soon</p>
      </section>

      {/* Services — coming next */}
      <section id="services" className="py-20 px-5 bg-slate-950">
        <p className="text-center text-slate-400">
          Services section coming soon
        </p>
      </section>

      {/* Reviews — coming next */}
      <section id="reviews" className="py-20 px-5 bg-slate-900">
        <p className="text-center text-slate-400">
          Reviews section coming soon
        </p>
      </section>

      {/* Contact — coming next */}
      <section id="contact" className="py-20 px-5 bg-slate-950">
        <p className="text-center text-slate-400">
          Contact section coming soon
        </p>
      </section>
    </main>
  );
}
