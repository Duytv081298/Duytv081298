import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
export const dynamic = 'force-static';
// Project Pages serves this under the repo path; host-root robots policy still applies.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}sitemap.xml` };
}
