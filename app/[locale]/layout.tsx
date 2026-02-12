import type { Metadata } from "next";
import { i18n } from "../../i18n-config";
import "../globals.css";

export const metadata: Metadata = {
  title: "Oficina Rodrigues — Auto Repair Carcavelos",
  description:
    "Trusted family-owned auto repair shop in Carcavelos. Factory-trained mechanics, transparent pricing, and honest service since 2007.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
