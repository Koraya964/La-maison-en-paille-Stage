import Link from 'next/link'
import Image from 'next/image'

// Images extraites des screenshots
const LOGO_FOOTER  = 'https://static.wixstatic.com/media/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png/v1/fill/w_29,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png'
const LOGO_ANNIV   = 'https://static.wixstatic.com/media/3e33e8_c1998929197146c49b8fdc1719f78436~mv2.png/v1/fill/w_383,h_119,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Anniversaire3_Anniversaire%20copie.png'
const LOGO_AFPMA   = 'https://static.wixstatic.com/media/3e33e8_2c25eef1b0b34913b8c40b83b01d4d7f~mv2.jpg/v1/fill/w_165,h_101,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/CduIZi0oWoT2IsfW_edited.jpg'

// Galerie bande photos (screenshots image 2)
const GALLERY = [
  'https://static.wixstatic.com/media/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg',
  'https://static.wixstatic.com/media/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg',
  'https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg',
  'https://static.wixstatic.com/media/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg',
  'https://static.wixstatic.com/media/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg',
  'https://static.wixstatic.com/media/457787_50380cdfd5134a91b8cd9e64324f581a~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_50380cdfd5134a91b8cd9e64324f581a~mv2_d_3264_2176_s_2.jpg',
  'https://static.wixstatic.com/media/457787_13bc73f912324c7ebc9a8890e29d377f~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_13bc73f912324c7ebc9a8890e29d377f~mv2_d_3264_2176_s_2.jpg',
  'https://static.wixstatic.com/media/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg',
]

export default function Footer() {
  return (
    <footer>
      {/* ── Bande photos horizontale ── */}
      <div className="flex overflow-hidden" style={{ height: '120px' }}>
        {GALLERY.map((src, i) => (
          <div key={i} className="relative flex-1 min-w-[120px]">
            <Image src={src} alt="" fill className="object-cover" unoptimized />
          </div>
        ))}
      </div>

      {/* ── Footer principal terracotta ── */}
      <div className="bg-[#c4613a] px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Colonne 1 : identité */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image src={LOGO_FOOTER} alt="Logo" width={29} height={29} unoptimized />
              <span className="font-raleway font-bold text-[11px] tracking-[0.12em] uppercase text-white">
                La Maison en Paille
              </span>
            </div>
            <p className="font-raleway text-[10px] text-white/70 tracking-wider">
              © Tous droits réservés 2026
            </p>
            <Link href="/mentions-legales"
              className="font-raleway text-[10px] tracking-wider text-white/60 hover:text-white underline underline-offset-2">
              Mentions légales
            </Link>
          </div>

          {/* Colonne 2 : logo anniversaire */}
          <div className="flex flex-col items-center gap-4">
            <Image src={LOGO_ANNIV} alt="André de Bouter fête ses formations — 25 ans Paille Terre Chaux / 10 ans Poêle de Masse"
              width={320} height={100} className="object-contain" unoptimized />
          </div>

          {/* Colonne 3 : organisme + AFPMA */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-raleway font-bold text-[10px] tracking-[0.1em] uppercase text-white mb-1">
                Organisme de formation.
              </p>
              <p className="font-raleway text-[10px] text-white/70 leading-relaxed">
                Déclaration d&apos;activité enregistrée sous le n° 75160129316
                auprès de la préfète de région Nouvelle-Aquitaine.
              </p>
            </div>
            <div>
              <p className="font-raleway text-[10px] text-white/60 mb-2">
                Membre de l&apos;AFPMA et du RFCP
              </p>
              <Image src={LOGO_AFPMA} alt="AFPMA & RFCP" width={130} height={80}
                className="object-contain" unoptimized />
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
