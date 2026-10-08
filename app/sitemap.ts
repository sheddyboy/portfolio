import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.8 },
    ...projects
      .filter((p) => p.hasCaseStudy)
      .map((p) => ({
        url: `${SITE_URL}/projects/${p.slug}`,
        lastModified: p.date ?? undefined,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      })),
  ];
}
