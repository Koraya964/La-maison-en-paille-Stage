import Link from 'next/link'

export const metadata = {
  title: 'André de Bouter — Formateur | La Maison en Paille',
  description: 'André de Bouter anime des stages de construction naturelle depuis 25 ans. Paille, terre, chaux et poêle de masse à Saint-Simeux (Charente).',
}

const IMG_BANDEAU = 'https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg'

export default function AndreDeBouterPage() {
  return (
    <div className="relative min-h-screen"
      style={{ backgroundImage: `url(${IMG_BANDEAU})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-[#c8824a]/55 pointer-events-none" />
      <div className="relative z-10">
        <div className="text-center py-14">
          <h1 className="font-raleway font-black text-white uppercase tracking-[0.1em]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            André de Bouter
          </h1>
        </div>
        <div className="bg-white/95 py-14 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-[#f0e8d8] h-80 flex items-center justify-center text-[#8b3a2a] font-raleway font-bold text-xs tracking-wider uppercase">
              Photo André de Bouter
            </div>
            <div className="md:col-span-2 space-y-5 text-sm text-[#4a4a4a] leading-relaxed">
              <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl">Le formateur</h2>
              <p>Depuis 25 ans, André de Bouter anime des stages de construction naturelle dans sa ferme éco-rénovée en Charente. Sa maison en paille, chauffée au poêle de masse, est à la fois son lieu de vie et la démonstration vivante de ce qu'il enseigne.</p>
              <p>Son approche : vous transmettre des compréhensions solides et un savoir-faire pratique pour que vous puissiez réaliser vos projets avec confiance et plaisir.</p>
              <p>André est membre de l'AFPMA (Association Française des Professionnels du Poêle de Masse) et du RFCP (Réseau Français de la Construction en Paille).</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/formations/paille-terre-chaux" className="btn-terracotta">Voir les formations</Link>
                <Link href="/contact" className="font-raleway font-bold text-[10px] tracking-[0.15em] uppercase px-6 py-3 border border-[#8b3a2a] text-[#8b3a2a] hover:bg-[#8b3a2a] hover:text-white transition-colors">
                  Contacter André
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-center">
            {[
              { n: '25+', l: "années d'expérience" },
              { n: '1000+', l: 'stagiaires formés' },
              { n: '3', l: 'formations au programme' },
              { n: '6 jours', l: 'stage phare Paille Terre Chaux' },
            ].map(({ n, l }) => (
              <div key={l}>
                <p className="font-raleway font-black text-[#8b3a2a] text-3xl">{n}</p>
                <p className="font-raleway font-bold text-[9px] tracking-[0.12em] uppercase text-[#4a4a4a] mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
