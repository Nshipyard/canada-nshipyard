import type { MetadataRoute } from 'next'

const BASE = 'https://canada.nshipyard.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/showcase', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/charts', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/impact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/data-fixes', priority: 0.5, changeFrequency: 'monthly' as const },
  ]
  const now = new Date()
  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
