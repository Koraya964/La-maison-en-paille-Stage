import Link from 'next/link'

export const metadata = {
  title: 'Ressources',
  description: 'Livres, DVDs, liens et ressources sur la construction en paille, le poêle de masse et l'habitat naturel.',
}

export default function RessourcesPage() {
  return (
    <>
      <section className="bg-[#f5f0e8] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#8b6c47] text-xs tracking-widest uppercase font-bold mb-4">Documentation</p>
          <h1 className="font-serif text-5xl text-[#3d2b1f]">Ressources</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <div>
              <h2 className="font-serif text-2xl text-[#3d2b1f] mb-6 pb-4 border-b border-stone-100">
                Livres & DVDs
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Une sélection d'ouvrages recommandés par André pour approfondir vos connaissances
                sur la construction en paille, les enduits terre et chaux, et les poêles de masse.
              </p>
              <div className="space-y-4">
                {[
                  { titre: 'Construire en paille aujourd\'hui', auteur: 'André de Bouter', type: 'Livre' },
                  { titre: 'Enduits en terre, chaux, plâtre', auteur: 'Terres & Pailles', type: 'Livre' },
                  { titre: 'Le poêle de masse', auteur: 'Collectif AFPMA', type: 'DVD' },
                ].map((doc) => (
                  <div key={doc.titre} className="flex gap-4 p-4 bg-[#f5f0e8]">
                    <span className="inline-block bg-[#8b6c47] text-white text-xs px-2 py-1 h-fit tracking-wider uppercase">
                      {doc.type}
                    </span>
                    <div>
                      <p className="font-serif text-[#3d2b1f]">{doc.titre}</p>
                      <p className="text-stone-500 text-sm">{doc.auteur}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-[#3d2b1f] mb-6 pb-4 border-b border-stone-100">
                Ressources poêle de masse
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Plans, schémas et fiches techniques pour comprendre et construire un poêle de masse
                Oxa-Libre.
              </p>
              <div className="space-y-3">
                {[
                  'Plans du poêle Oxa-Libre',
                  'Fiches matériaux réfractaires',
                  'Guide d\'entretien',
                  'Témoignages de propriétaires',
                ].map((ressource) => (
                  <div key={ressource} className="flex items-center gap-3 p-4 border border-stone-100 hover:border-[#c8a96e] transition-colors cursor-pointer">
                    <span className="text-[#c8a96e]">📄</span>
                    <span className="text-stone-700 text-sm">{ressource}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-[#3d2b1f] text-white">
                <p className="text-[#c8a96e] text-xs tracking-widest uppercase font-bold mb-2">Porte ouverte</p>
                <h3 className="font-serif text-xl mb-3">Venez voir un vrai poêle de masse</h3>
                <p className="text-stone-400 text-sm mb-4">
                  Des journées portes ouvertes sont organisées pour découvrir le confort du poêle
                  de masse auto-construit. Sur réservation.
                </p>
                <Link href="/contact" className="text-xs tracking-widest uppercase font-bold text-[#c8a96e] hover:text-white transition-colors">
                  Réserver une place →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
