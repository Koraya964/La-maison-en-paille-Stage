export default function sitemap() {
  return [
    {
      url: 'https://www.lamaisonenpaille.com',
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://www.lamaisonenpaille.com/formations/poele-de-masse',
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://www.lamaisonenpaille.com/formations/paille-terre-chaux',
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://www.lamaisonenpaille.com/formations/photovoltaique',
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://www.lamaisonenpaille.com/actualites',
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    {
      url: 'https://www.lamaisonenpaille.com/realisations',
      lastModified: new Date(),
      priority: 0.6,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://www.lamaisonenpaille.com/andre-de-bouter',
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: 'yearly',
    },
    {
      url: 'https://www.lamaisonenpaille.com/contact',
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: 'yearly',
    },
  ];
}