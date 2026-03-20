export default function sitemap() {
  const baseUrl = 'https://www.lamaisonenpaille.com'

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/formations/paille-terre-chaux`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/formations/poele-de-masse`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/formations/photovoltaique`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/actualites`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/realisations`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/ressources`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/andre-de-bouter`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
  ]
}
