import type { Metadata, Viewport } from "next";
import { i18n } from "../../i18n-config";
import "../globals.css";

const siteUrl = "https://revicar.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const meta = {
  en: {
    title: "Revicar | Auto Repair | Carcavelos",
    description:
      "Multi-brand auto repair shop in Carcavelos. Mechanics, bodywork & paint, electrical, air conditioning, and tyres. Transparent pricing.",
  },
  pt: {
    title: "Revicar | Reparações Automóveis | Carcavelos",
    description:
      "Oficina de reparação automóvel multi-marcas em Carcavelos. Mecânica, chapa e pintura, eletricista, climatização e pneus. Preços transparentes.",
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = meta[locale as keyof typeof meta] ?? meta.pt;

  return {
    title: t.title,
    description: t.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        pt: "/pt",
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${siteUrl}/${locale}`,
      siteName: "Revicar",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      type: "website",
      images: [
        {
          url: "/img/hero.png",
          width: 1200,
          height: 630,
          alt: "Revicar — Reparações Automóveis, Carcavelos",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/img/hero.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords:
      locale === "pt"
        ? [
            "oficina carcavelos",
            "mecânico carcavelos",
            "reparação automóvel",
            "chapa e pintura",
            "pneus",
            "ar condicionado auto",
            "diagnóstico automóvel",
            "revicar",
          ]
        : [
            "auto repair carcavelos",
            "mechanic carcavelos",
            "car repair",
            "bodywork paint",
            "tyres",
            "car air conditioning",
            "car diagnostics",
            "revicar",
          ],
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Revicar — Reparações Automóveis",
    description: locale === "pt" ? meta.pt.description : meta.en.description,
    url: `${siteUrl}/${locale}`,
    telephone: "+351214578709",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Plácido de Abreu 2",
      addressLocality: "Carcavelos",
      postalCode: "2775-617",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.6879,
      longitude: -9.3305,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    priceRange: "€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
      bestRating: "5",
    },
    image: `${siteUrl}/img/hero.png`,
    sameAs: [],
  };

  return (
    <html lang={locale}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
