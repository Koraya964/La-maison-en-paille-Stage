import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#3d2b1f] text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Identity */}
          <div>
            <div className="w-16 h-16 bg-[#8b6c47] rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-serif text-xs text-center leading-tight px-1">MP</span>
            </div>
            <h3 className="font-serif text-white text-lg mb-3">La Maison en Paille</h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              21, rue des Chaumes — Les Pellières<br />
              16120 MOSNAC - SAINT-SIMEUX
            </p>
            <p className="mt-4 text-sm text-stone-400">
              <a href="tel:0545662768" className="hover:text-[#c8a96e] transition-colors">05 45 66 27 68</a><br />
              <a href="mailto:contact@lamaisonenpaille.com" className="hover:text-[#c8a96e] transition-colors">
                contact@lamaisonenpaille.com
              </a>
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#c8a96e] font-bold mb-5">Formations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/formations/paille-terre-chaux" className="hover:text-white transition-colors">Paille, Terre & Chaux</Link></li>
              <li><Link href="/formations/poele-de-masse" className="hover:text-white transition-colors">Poêle de masse</Link></li>
              <li><Link href="/formations/photovoltaique" className="hover:text-white transition-colors">Photovoltaïque</Link></li>
            </ul>
            <h4 className="text-xs tracking-widest uppercase text-[#c8a96e] font-bold mt-8 mb-5">Liens</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/actualites" className="hover:text-white transition-colors">Actualités</Link></li>
              <li><Link href="/realisations" className="hover:text-white transition-colors">Réalisations</Link></li>
              <li><Link href="/andre-de-bouter" className="hover:text-white transition-colors">André de Bouter</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#c8a96e] font-bold mb-5">
              Les Nouv'd'André
            </h4>
            <p className="text-sm text-stone-400 mb-4">
              Restez informé des nouvelles dates de stage et actualités.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Votre e-mail"
                className="bg-[#2a1d15] border border-stone-600 text-white text-sm px-4 py-3 placeholder-stone-500 focus:outline-none focus:border-[#c8a96e]"
              />
              <button
                type="submit"
                className="bg-[#8b6c47] text-white text-xs tracking-widest uppercase px-4 py-3 font-bold hover:bg-[#c8a96e] transition-colors"
              >
                Je m'abonne
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-stone-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} La Maison en Paille. Tous droits réservés.</p>
          <p className="text-stone-500 leading-relaxed max-w-sm">
            Organisme de formation — Déclaration n° 75160129316 auprès de la préfète de région Nouvelle-Aquitaine.
          </p>
          <Link href="/mentions-legales" className="hover:text-stone-300 transition-colors">Mentions légales</Link>
        </div>
      </div>
    </footer>
  )
}
