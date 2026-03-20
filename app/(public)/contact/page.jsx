import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Contact & Lieu de Formation | La Maison en Paille',
  description: 'Contactez André de Bouter. La Maison en Paille — 21 rue des Chaumes, 16120 Saint-Simeux. 05 45 66 27 68.',
}

const IMG_BANDEAU = 'https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg'
const PHOTOS = [
  'https://static.wixstatic.com/media/3e33e8_f0f5b901bea9439487bf7b84d6a712ed~mv2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_f0f5b901bea9439487bf7b84d6a712ed~mv2.jpg',
  'https://static.wixstatic.com/media/3e33e8_36c9045251444c15bf03aa3b07179c76~mv2.jpg/v1/fill/w_980,h_735,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_36c9045251444c15bf03aa3b07179c76~mv2.jpg',
  'https://static.wixstatic.com/media/3e33e8_93c532e152394bfa957776efc0029fac~mv2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_93c532e152394bfa957776efc0029fac~mv2.jpg',
]

export default function ContactPage() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${IMG_BANDEAU})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-[#c8824a]/55 pointer-events-none" />
      <div className="relative z-10">

        {/* Titre */}
        <div className="text-center py-14">
          <h1 className="font-raleway font-black text-white uppercase tracking-[0.1em]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Contact &amp; Lieu de formation
          </h1>
        </div>

        {/* Photos lieu */}
        <div className="grid grid-cols-3 gap-1 bg-[#c4613a] p-1 mx-6 max-w-5xl md:mx-auto">
          {PHOTOS.map((src, i) => (
            <div key={i} className="relative overflow-hidden aspect-[4/3]">
              <Image src={src} alt={`Lieu de formation ${i + 1}`} fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>

        {/* Contenu */}
        <div className="bg-white/95 py-14 px-6 mt-1">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14">

            {/* Colonne gauche */}
            <div className="space-y-8">
              <div>
                <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.1em] text-xl mb-4">Contact</h2>
                <div className="space-y-1 text-sm text-[#4a4a4a]">
                  <p className="font-raleway font-bold text-[#3d1a0e]">André de Bouter</p>
                  <p><a href="tel:0545662768" className="hover:text-[#8b3a2a] transition-colors">05 45 66 27 68</a></p>
                  <p><a href="mailto:contact@lamaisonenpaille.com" className="hover:text-[#8b3a2a] transition-colors">contact@lamaisonenpaille.com</a></p>
                  <p className="mt-3">La Maison en Paille<br />21, rue des Chaumes<br />Les Pellières<br />16120 MOSNAC - SAINT-SIMEUX</p>
                </div>
              </div>

              <div>
                <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.1em] text-base mb-4">Pour s&apos;inscrire</h2>
                <p className="text-sm text-[#4a4a4a] leading-relaxed mb-3">
                  Envoyez un e-mail à{' '}
                  <a href="mailto:contact@lamaisonenpaille.com?subject=INSCRIPTION" className="text-[#8b3a2a] underline">
                    contact@lamaisonenpaille.com
                  </a>{' '}
                  avec l&apos;intitulé de la formation, la date, et vos coordonnées.
                </p>
                <div className="bg-[#f5f0e6] p-4 text-xs leading-relaxed text-[#4a4a4a]">
                  <strong className="font-raleway font-bold text-[#3d1a0e] text-[10px] tracking-[0.1em] uppercase">Paiement</strong><br />
                  Par chèque (France) ou virement (étranger).<br />
                  Acompte 30 % — solde 70 %.
                </div>
              </div>

              <div>
                <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.1em] text-base mb-4">Pour venir</h2>
                <ul className="space-y-2 text-sm text-[#4a4a4a]">
                  {[
                    "TGV/OUIGO jusqu'à Angoulême, puis RER vers Châteauneuf-sur-Charente",
                    "Aéroports à Bordeaux, Poitiers et La Rochelle",
                    "Covoiturage organisé avec les autres stagiaires",
                    "Bus low cost et BlaBlaCar",
                  ].map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#8b3a2a] font-bold flex-shrink-0">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-8">
              <div>
                <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.1em] text-base mb-4">Hébergement</h2>
                <ul className="space-y-2 text-sm text-[#4a4a4a]">
                  {[
                    "Terrain pour camper gratuitement",
                    "Parking van / camping-car",
                    "Dortoir — deux salles de bain",
                    "Arrivée possible la veille entre 19h et 22h",
                  ].map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#c8a040] font-bold flex-shrink-0">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.1em] text-base mb-4">Repas</h2>
                <ul className="space-y-2 text-sm text-[#4a4a4a]">
                  <li className="flex gap-2"><span className="text-[#c8a040] font-bold">—</span> Stage Poêle de masse : repas végétariens préparés en commun dans le poêle Oxa-Libre.</li>
                  <li className="flex gap-2"><span className="text-[#c8a040] font-bold">—</span> Autres stages : petite cuisine d&apos;été à disposition.</li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-[#3d1a0e] p-7">
                <h3 className="font-raleway font-black text-white uppercase tracking-[0.1em] text-base mb-2">
                  Les Nouv&apos;d&apos;André
                </h3>
                <p className="text-white/60 text-sm mb-5">Restez informé des nouvelles dates et actualités.</p>
                <form className="flex flex-col gap-3">
                  <input type="email" placeholder="Votre adresse e-mail"
                    className="bg-white/10 border border-white/20 text-white text-sm px-4 py-3 placeholder-white/40 focus:outline-none focus:border-[#c8a040]" />
                  <button type="submit" className="btn-terracotta text-center">Je m&apos;abonne</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
