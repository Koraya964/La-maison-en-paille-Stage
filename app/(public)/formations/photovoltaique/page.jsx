import Link from 'next/link'

export const metadata = {
  title: 'Stage Autonomie Photovoltaïque — 2 jours',
  description:
    'Stage 2 jours pour être plus autonome en énergie. Animé par Sébastien Deroo. Idéal pour toute personne souhaitant réduire sa dépendance au réseau électrique.',
}

export default function PhotovoltaiquePage() {
  return (
    <>
      <section className="bg-yellow-50 border-b border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-[#5a6e4a] text-xs tracking-widest uppercase font-bold mb-4">Stage 2 jours — Par Sébastien Deroo</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#3d2b1f] mb-4">
            Autonomie<br />Photovoltaïque
          </h1>
          <p className="text-xl text-stone-600 mb-2 font-light tracking-wide">
            Être plus autonome en énergie
          </p>
          <p className="text-stone-600 max-w-2xl leading-relaxed mt-6">
            Pour toute personne désirant être davantage autonome, résiliente et économe dans
            sa consommation d'énergie. Comprendre, dimensionner et installer votre propre
            installation photovoltaïque.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-block">Je m'inscris</Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-3xl text-[#3d2b1f] mb-6">Contenu du stage</h2>
              <ul className="space-y-4 text-stone-600 text-sm">
                {[
                  'Comprendre le fonctionnement d\'une installation photovoltaïque autonome',
                  'Dimensionner l\'installation selon vos besoins réels',
                  'Choisir les bons composants (panneaux, batteries, onduleurs)',
                  'Gérer la consommation et les priorités de charge',
                  'Sécurité électrique et bonnes pratiques',
                  'Retours d\'expérience et cas concrets',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#5a6e4a] font-bold flex-shrink-0">☀</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="bg-[#f5f0e8] p-6">
                <h3 className="font-serif text-lg text-[#3d2b1f] mb-3">Formateur</h3>
                <p className="text-stone-600 text-sm">Sébastien Deroo, praticien de l'autonomie énergétique.</p>
              </div>
              <div className="bg-[#f5f0e8] p-6">
                <h3 className="font-serif text-lg text-[#3d2b1f] mb-3">Public visé</h3>
                <p className="text-stone-600 text-sm">Particuliers souhaitant une installation hors réseau ou hybride, auto-constructeurs, habitants de zones isolées.</p>
              </div>
              <div className="bg-[#f5f0e8] p-6">
                <h3 className="font-serif text-lg text-[#3d2b1f] mb-3">Lieu</h3>
                <p className="text-stone-600 text-sm">21, rue des Chaumes — 16120 Saint-Simeux (Charente)</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">Nous contacter pour les dates</Link>
          </div>
        </div>
      </section>
    </>
  )
}
