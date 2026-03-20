export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/login/'],
    },
    sitemap: 'https://www.lamaisonenpaille.com/sitemap.xml',
  }
}
