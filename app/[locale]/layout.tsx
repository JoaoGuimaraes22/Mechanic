import type { Metadata, Viewport } from "next";
import { i18n } from "../../i18n-config";
import "../globals.css";

const siteUrl = "https://oficina-rodrigues.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const meta = {
  en: {
    title: "Oficina Rodrigues | Auto Repair | Carcavelos",
    description:
      "Trusted family-owned auto repair in Carcavelos. Factory-trained mechanics, transparent pricing, and honest service since 2007.",
  },
  pt: {
    title: "Oficina Rodrigues | Reparação Automóvel | Carcavelos",
    description:
      "Oficina automóvel familiar de confiança em Carcavelos. Mecânicos certificados, preços transparentes e serviço honesto desde 2007.",
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
      siteName: "Oficina Rodrigues",
      locale: locale === "pt" ? "pt_PT" : "en_US",
      type: "website",
      images: [
        {
          url: "/img/hero.png",
          width: 1200,
          height: 630,
          alt: "Oficina Rodrigues — Auto Repair, Carcavelos",
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
            "revisão carro",
            "diagnóstico automóvel",
            "mudança óleo",
            "travões",
            "oficina rodrigues",
          ]
        : [
            "auto repair carcavelos",
            "mechanic carcavelos",
            "car repair",
            "car service",
            "car diagnostics",
            "oil change",
            "brakes",
            "oficina rodrigues",
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
    name: "Oficina Rodrigues",
    description: locale === "pt" ? meta.pt.description : meta.en.description,
    url: `${siteUrl}/${locale}`,
    telephone: "+351214000000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua da Oficina 42",
      addressLocality: "Carcavelos",
      postalCode: "2775-000",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.6893,
      longitude: -9.3321,
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
