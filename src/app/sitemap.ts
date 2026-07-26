import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "weekly" },
    { path: "/portfolio", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/careers", priority: 0.6, freq: "monthly" },
  ];
  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.freq as "weekly" | "monthly" | "yearly",
    priority: r.priority,
  }));
}
