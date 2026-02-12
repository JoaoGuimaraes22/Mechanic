import { i18n } from "../../i18n-config";
import type { Locale } from "../../i18n-config";

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
