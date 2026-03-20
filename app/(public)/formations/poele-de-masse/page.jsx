import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Stage Poêle de Masse — 3 jours | La Maison en Paille',
  description: '1 heure de feu = 24h de confort. Stage 3 jours pour construire votre poêle de masse. André de Bouter, Charente (16). 380 €.',
}

const IMG_BG      = 'https://static.wixstatic.com/media/3e33e8_d95d5a776364461ab0e8f33345cb57f1~mv2.jpg/v1/fill/w_1240,h_1748,al_c,q_90,enc_avif,quality_auto/3e33e8_d95d5a776364461ab0e8f33345cb57f1~mv2.jpg'
const IMG_BANDEAU = 'https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg'
const IMG_GIF     = 'https://static.wixstatic.com/media/f4c673_9e107a544f7a4064a4a68de072001bac~mv2.gif'
const IMG_PORTE   = 'https://static.wixstatic.com/media/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png/v1/fill/w_475,h_285,al_c,q_85,enc_avif,quality_auto/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png'

const PHOTOS = [
  'https://static.wixstatic.com/media/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg',
  'https://static.wixstatic.com/media/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg',
  'https://static.wixstatic.com/media/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg',
  'https://static.wixstatic.com/media/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg',
  'https://static.wixstatic.com/media/457787_382aa54518cd47ef86e021eb696b0c7c~mv2_d_2579_2579_s_4_2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_382aa54518cd47ef86e021eb696b0c7c~mv2_d_2579_2579_s_4_2.jpg',
  'https://static.wixstatic.com/media/457787_ceca839650634ae2b5bc8c1aaf5077b1~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_ceca839650634ae2b5bc8c1aaf5077b1~mv2_d_3264_2176_s_2.jpg',
]

export default function PoeleDeMassePage() {
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

        {/* ── Hero ── */}
        <div className="relative overflow-hidden" style={{ maxHeight: '60vh' }}>
          <Image src={IMG_BG} alt="Poêle de Masse" width={1240} height={700}
            className="w-full object-cover" style={{ maxHeight: '60vh' }} unoptimized />
          <div className="absolute inset-0 bg-[#c06030]/70 flex flex-col items-center justify-center text-center px-6">
            <p className="font-raleway font-bold text-[10px] tracking-[0.25em] uppercase text-white/80 mb-3">
              Stage 3 jours — 380 €
            </p>
            <h1 className="font-raleway font-black text-white uppercase leading-tight"
                style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '0.06em', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              Poêle de Masse
            </h1>
            <p className="font-raleway font-bold text-white uppercase mt-3"
               style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
              1 heure de feu = 24h de confort
            </p>
            <Link href="/contact" className="btn-terracotta mt-6">Je m&apos;inscris</Link>
          </div>
        </div>

        {/* ── Intro + GIF thermique ── */}
        <div className="bg-white/95 py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl mb-4">
                Construisez votre propre poêle
              </h2>
              <p className="text-sm text-[#4a4a4a] leading-relaxed mb-4">
                Les apports du stage vous permettent de construire ensuite votre poêle personnalisé.
                Optionnel : four à pain, production d&apos;eau chaude, banc chauffé.
              </p>
              <ul className="space-y-2">
                {[
                  "Rendement thermique > 85 %",
                  "2 à 3× moins de bois qu'un insert classique",
                  "Chaleur douce et rayonnante sur 12 à 24 heures",
                  "Repas préparés en commun dans le poêle Oxa-Libre",
                ].map(item => (
                  <li key={item} className="flex gap-2 text-sm text-[#4a4a4a]">
                    <span className="text-[#8b3a2a] font-bold flex-shrink-0">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <Image src={IMG_GIF} alt="Vidéo thermique poêle de masse" width={320} height={240}
                className="object-contain" unoptimized />
            </div>
          </div>
        </div>

        {/* ── Galerie ── */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 bg-[#c4613a] p-1">
          {PHOTOS.map((src, i) => (
            <div key={i} className="relative overflow-hidden aspect-square">
              <Image src={src} alt="" fill className="object-cover hover:scale-105 transition-transform duration-500" unoptimized />
            </div>
          ))}
        </div>

        {/* ── Porte ouverte + Dates ── */}
        <div className="bg-[#c4613a] py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <Image src={IMG_PORTE} alt="Journée nationale poêle de masse" width={380} height={228}
              className="w-full max-w-[380px] object-contain" unoptimized />
            <div className="bg-white/95 p-8">
              <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl mb-6">
                Prochaines dates
              </h2>
              {[
                { d: 'Mars 2026', s: 'complet' },
                { d: 'Juin 2026', s: 'ouvert' },
                { d: 'Octobre 2026', s: 'ouvert' },
              ].map(({ d, s }) => (
                <div key={d} className="flex items-center justify-between border-b border-[#f0e8d8] py-2">
                  <span className="font-raleway font-bold text-sm text-[#3d1a0e]">{d}</span>
                  <span className={`font-raleway font-bold text-[9px] tracking-[0.15em] uppercase px-2 py-1 ${
                    s === 'complet' ? 'bg-red-100 text-red-700' : 'bg-[#4a6741] text-white'
                  }`}>{s === 'complet' ? 'Complet' : 'Ouvert'}</span>
                </div>
              ))}
              <p className="text-xs text-[#4a4a4a] mt-4 mb-5">
                Durée 3 jours &nbsp;·&nbsp; Repas végétariens inclus &nbsp;·&nbsp; Tarif <strong>380 €</strong>
              </p>
              <Link href="/contact" className="btn-terracotta">Je m&apos;inscris</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
