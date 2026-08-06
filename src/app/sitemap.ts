import type { MetadataRoute } from "next";

const SITE = "https://nexus-arena.example.com";

const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, freq: "daily" },
  { path: "/games", priority: 0.9, freq: "daily" },
  { path: "/tournaments", priority: 0.9, freq: "hourly" },
  { path: "/leaderboards", priority: 0.8, freq: "hourly" },
  { path: "/store", priority: 0.8, freq: "daily" },
  { path: "/news", priority: 0.8, freq: "daily" },
  { path: "/community", priority: 0.7, freq: "weekly" },
  { path: "/about", priority: 0.5, freq: "monthly" },
  { path: "/contact", priority: 0.5, freq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
