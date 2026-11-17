import type { MetadataRoute } from 'next';
import { games } from '@/data/games';
import { siteUrl } from '@/lib/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, priority: 1 }, ...games.map((game) => ({ url: `${siteUrl}games/${game.slug}/`, priority: 0.7 }))];
}
