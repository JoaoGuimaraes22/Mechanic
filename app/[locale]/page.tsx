import Image from "next/image";
import { getDictionary } from "../../get-dictionary";
import type { Locale } from "../../i18n-config";
import Navbar from "../components/Navbar/Navbar";
import HeroContent from "../components/HeroContent/HeroContent";
import Brands from "../components/Brands/Brands";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import Reviews from "../components/Reviews/Reviews";
import FAQ from "../components/FAQ/FAQ";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import CallBar from "../components/CallBar/CallBar";

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
          alt="Revicar — reparações automóveis"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />
        <HeroContent dict={dict.hero} locale={locale} />

        {/* Brands bar pinned to bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <Brands dict={dict.brands} />
        </div>
      </section>

      <About dict={dict.about} />

      <Services dict={dict.services} />

      <Reviews dict={dict.reviews} />

      <FAQ dict={dict.faq} />

      <Contact dict={dict.contact} />
      <Footer dict={dict.footer} navDict={dict.navbar} locale={locale} />
      <CallBar dict={dict.callBar} phone={dict.hero.phone} />
    </main>
  );
}
