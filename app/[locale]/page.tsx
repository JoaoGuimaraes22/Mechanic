import Image from "next/image";
import { getDictionary } from "../../get-dictionary";
import type { Locale } from "../../i18n-config";
import Navbar from "../components/Navbar/Navbar";
import HeroContent from "../components/HeroContent/HeroContent";
import About from "../components/About/About";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main>
      <Navbar dict={dict.navbar} locale={locale} />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center text-white text-center px-5 sm:px-6 overflow-hidden"
      >
        <Image
          src="/img/hero.png"
          alt="Oficina Rodrigues — auto repair workshop"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
        <HeroContent dict={dict.hero} locale={locale} />
      </section>

      <About dict={dict.about} />

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
