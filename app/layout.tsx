import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oficina Rodrigues — Auto Repair Carcavelos",
  description:
    "Trusted family-owned auto repair shop in Carcavelos. Factory-trained mechanics, transparent pricing, and honest service since 2007.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
