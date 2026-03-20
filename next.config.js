/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Autoriser les images depuis Wix (ancien site) et domaines externes
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'www.lamaisonenpaille.com' },
    ],
  },
  // Désactiver le cache de route pour les pages admin (toujours fraîches)
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'argon2'],
  },
};

webpack: (config) => {
  config.resolve.alias['@'] = path.resolve(__dirname)
  return config
}

module.exports = nextConfig
