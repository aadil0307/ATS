import type { Metadata } from "next";
import {
  Manrope,
  Playfair_Display,
  JetBrains_Mono,
  Sora,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CursorTrail from "@/components/ui/CursorTrail";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";

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
    default: "Ace Tech Solutions | Elite Software Development & AI Agency",
    template: "%s | Ace Tech Solutions",
  },
  description:
    "Accelerate your business with Ace Tech Solutions. We build scalable enterprise software, AI automations, and high-performance digital products that drive revenue.",
  keywords: [
    "Enterprise Software Development",
    "AI Automation Agency",
    "Cloud DevOps Services",
    "Custom Web Applications",
    "B2B SaaS Development",
    "Digital Transformation Partner",
    "Tech Consultancy India",
    "Ace Tech Solutions"
  ],
  authors: [{ name: "Ace Tech Solutions", url: siteUrl }],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/logo/ace.png",
    apple: "/logo/ace.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ace Tech Solutions",
    title: "Ace Tech Solutions | Elite Software Development & AI Agency",
    description:
      "Accelerate your business with Ace Tech Solutions. We build scalable enterprise software, AI automations, and high-performance digital products that drive revenue.",
    images: [{ url: "/logo/ace.png", width: 1200, height: 630, alt: "Ace Tech Solutions - Elite Software & AI Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ace Tech Solutions | Elite Software Development & AI Agency",
    description:
      "Accelerate your business with Ace Tech Solutions. We build scalable enterprise software, AI automations, and high-performance digital products that drive revenue.",
    images: ["/logo/ace.png"],
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
        <StructuredData />
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
