import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";

import { LenisProvider } from "@/components/lenis-provider";
import { ViewOptions } from "@/components/ViewOptions";
import { siteConfig } from "@/content/site";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <LenisProvider />
        {children}
        <ViewOptions />
      </body>
    </html>
  );
}
