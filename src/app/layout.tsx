import type { Metadata } from "next";
import { Manrope, Playfair_Display, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CursorTrail from "@/components/ui/CursorTrail";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ace Tech Solutions — We Build Digital Products",
    template: "%s · Ace Tech Solutions",
  },
  description:
    "Ace Tech Solutions is a premium technology partner. We build digital products, scale engineering teams, and ship fast — from funded startups to global enterprises.",
  keywords: [
    "tech firm",
    "software development",
    "AI automation",
    "cloud devops",
    "UI/UX design",
    "API integrations",
  ],
  authors: [{ name: "Ace Tech Solutions" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ace Tech Solutions",
    title: "Ace Tech Solutions — We Build Digital Products",
    description:
      "A premium technology partner. We build digital products, scale engineering, and ship fast.",
    images: [{ url: "/logo/ace-core-poster.png", width: 1080, height: 1080, alt: "The Ace Core — Ace Tech Solutions mark" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ace Tech Solutions — We Build Digital Products",
    description:
      "A premium technology partner. We build digital products, scale engineering, and ship fast.",
    images: ["/logo/ace-core-poster.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${sora.variable}`}
    >
      <body className="min-h-screen bg-void font-sans text-ice antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <div className="grain" aria-hidden="true" />
          <CursorTrail />
          <Navbar />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
