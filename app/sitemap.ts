import type { MetadataRoute } from "next";
import { siteOrigin } from "../data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteOrigin).toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
