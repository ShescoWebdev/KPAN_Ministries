import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, pages } from '../src/seo/pages.js'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const siteUrl = (process.env.URL || SITE.url).replace(/\/$/, '')

const esc = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const absolute = (src) => (/^https?:\/\//.test(src) ? src : `${siteUrl}${encodeURI(src)}`)
const pageUrl = (route) => (route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`)
const meta = (key, value, content) => `<meta data-seo ${key}="${value}" content="${esc(content)}" />`

// Tags unique to one page
const headFor = (page) => {
  const isHome = page.path === '/'
  const image = absolute(page.image ?? SITE.image)
  const alt = page.imageAlt ?? SITE.imageAlt

  const lines = [
    `<title data-seo>${esc(page.title)}</title>`,
    meta('name', 'description', page.description),
    meta('name', 'robots', page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', SITE.name),
    meta('property', 'og:locale', SITE.locale),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', alt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', alt),
  ]

  // Home file doubles as fallback
  if (!isHome) {
    lines.push(`<link data-seo rel="canonical" href="${pageUrl(page.path)}" />`)
    lines.push(meta('property', 'og:url', pageUrl(page.path)))
  }

  if (isHome && SITE.schema) {
    const schema = { ...SITE.schema, url: pageUrl('/'), image, logo: absolute(SITE.schema.logo) }
    const json = JSON.stringify(schema).replace(/</g, '\\u003c')
    lines.push(`<script data-seo type="application/ld+json">${json}</script>`)
  }

  return lines
}

// Tags to replace
// Remove tags we will replace
const strip = (html) =>
  html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<(?:meta|link)\b[^>]*\bdata-seo\b[^>]*>\s*/gi, '')
    .replace(/<script\b[^>]*\bdata-seo\b[^>]*>[\s\S]*?<\/script>\s*/gi, '')

const template = strip(await readFile(path.join(dist, 'index.html'), 'utf8'))

for (const page of pages) {
  if (!page.path.startsWith('/')) throw new Error(`Page path must start with "/": ${page.path}`)

  const html = template.replace('</head>', () => `    ${headFor(page).join('\n    ')}\n  </head>`)
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
  const target = path.join(dist, file)

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, html)
}

const listed = pages.filter((page) => !page.noindex)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...listed.map((page) => `  <url><loc>${pageUrl(page.path)}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

await writeFile(path.join(dist, 'sitemap.xml'), sitemap)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)

console.log(`SEO: ${pages.length} pages written for ${siteUrl}`)