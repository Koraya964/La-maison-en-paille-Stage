import { query } from '@/lib/db'

export const metadata = {
  title: 'Actualités',
  description: 'Les dernières nouvelles de La Maison en Paille : dates de stage, portes ouvertes, articles et ressources.',
}

// Cette fonction s'exécute côté serveur — accès direct à la BDD
async function getActualites() {
  try {
    return await query(
      'SELECT * FROM actualites WHERE publie = TRUE ORDER BY created_at DESC'
    )
  } catch {
    // En développement, retourner des données fictives si la BDD n'est pas connectée
    return [
      {
        id: 1,
        titre: 'Porte ouverte Poêle de masse — Samedi 14 mars 2026',
        contenu: 'Venez découvrir le confort du poêle de masse auto-construit. Sur réservation, places limitées.',
        image_url: null,
        created_at: new Date('2026-02-01'),
      },
      {
        id: 2,
        titre: 'Nouvelles dates de stage 2026 disponibles',
        contenu: 'Les inscriptions pour les stages Paille Terre Chaux, Poêle de masse et Photovoltaïque 2026 sont ouvertes.',
        image_url: null,
        created_at: new Date('2026-01-15'),
      },
    ]
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function ActualitesPage() {
  const actualites = await getActualites()

  return (
    <>
      <section className="bg-[#f5f0e8] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#8b6c47] text-xs tracking-widest uppercase font-bold mb-4">Nouvelles</p>
          <h1 className="font-serif text-5xl text-[#3d2b1f]">Actualités</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {actualites.length === 0 ? (
            <p className="text-stone-500 text-center py-16 font-serif text-lg">
              Aucune actualité pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {actualites.map((news) => (
                <article key={news.id} className="border border-stone-100 hover:border-[#c8a96e] transition-colors p-8 flex flex-col">
                  {news.image_url && (
                    <div className="h-48 bg-stone-100 mb-6 overflow-hidden">
                      <img
                        src={news.image_url}
                        alt={news.titre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-3">
                    {formatDate(news.created_at)}
                  </p>
                  <h2 className="font-serif text-xl text-[#3d2b1f] mb-3">{news.titre}</h2>
                  <p className="text-stone-600 text-sm leading-relaxed flex-1 line-clamp-4">
                    {news.contenu}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
