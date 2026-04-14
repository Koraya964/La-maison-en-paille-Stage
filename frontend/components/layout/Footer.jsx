import Link from "next/link";
import Image from "next/image";

const LOGO_FOOTER =
  "https://static.wixstatic.com/media/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png/v1/fill/w_29,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png";
const LOGO_ANNIV =
  "https://static.wixstatic.com/media/3e33e8_c1998929197146c49b8fdc1719f78436~mv2.png/v1/fill/w_383,h_119,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Anniversaire3_Anniversaire%20copie.png";
const LOGO_AFPMA =
  "https://static.wixstatic.com/media/3e33e8_2c25eef1b0b34913b8c40b83b01d4d7f~mv2.jpg/v1/fill/w_165,h_101,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/CduIZi0oWoT2IsfW_edited.jpg";

const GALLERY = [
  "https://static.wixstatic.com/media/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg",
  "https://static.wixstatic.com/media/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg",
  "https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg",
  "https://static.wixstatic.com/media/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg",
  "https://static.wixstatic.com/media/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg",
  "https://static.wixstatic.com/media/457787_50380cdfd5134a91b8cd9e64324f581a~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_50380cdfd5134a91b8cd9e64324f581a~mv2_d_3264_2176_s_2.jpg",
  "https://static.wixstatic.com/media/457787_13bc73f912324c7ebc9a8890e29d377f~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_13bc73f912324c7ebc9a8890e29d377f~mv2_d_3264_2176_s_2.jpg",
  "https://static.wixstatic.com/media/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg",
];

const LINKS = [
  { label: "Formations", href: "/formations/paille-terre-chaux" },
  { label: "André de Bouter", href: "/andre-de-bouter" },
  { label: "Vos réalisations", href: "/realisations" },
  { label: "S'inscrire", href: "/inscription" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer>
      {/* ── Bande photos ── */}
      <div className="flex overflow-hidden h-[90px]">
        {GALLERY.map((src, i) => (
          <div key={i} className="relative flex-1 min-w-[90px]">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover brightness-90"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* ── Liseré de séparation ── */}
      <div className="h-1 bg-[#3d1a0e]" />

      {/* ── Corps du footer ── */}
      <div className="bg-[#b85a35] px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Colonne 1 : identité + liens */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src={LOGO_FOOTER}
                alt="Logo"
                width={24}
                height={24}
                unoptimized
              />
              <span className="font-raleway font-bold text-[11px] tracking-[0.14em] uppercase text-white">
                La Maison en Paille
              </span>
            </div>
            <nav className="flex flex-col gap-1.5">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-raleway text-[10px] tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Colonne 2 : logo anniversaire (centré) */}
          <div className="flex items-center justify-center md:col-span-2">
            <Image
              src={LOGO_ANNIV}
              alt="25 ans Paille Terre Chaux · 10 ans Poêle de Masse"
              width={280}
              height={87}
              className="object-contain opacity-95"
              unoptimized
            />
          </div>

          {/* Colonne 3 : organisme + AFPMA */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <div>
              <p className="font-raleway font-bold text-[9px] tracking-[0.14em] uppercase text-white/90 mb-1">
                Organisme de formation
              </p>
              <p className="font-raleway text-[9px] text-white/60 leading-relaxed">
                N° 75160129316 — préfète de région Nouvelle-Aquitaine.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <Image
                src={LOGO_AFPMA}
                alt="AFPMA & RFCP"
                width={90}
                height={55}
                className="object-contain rounded-sm"
                unoptimized
              />
              <p className="font-raleway text-[9px] text-white/60 leading-relaxed">
                Membre de l&apos;AFPMA
                <br />
                et du RFCP
              </p>
            </div>
          </div>
        </div>

        {/* ── Barre basse ── */}
        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-raleway text-[9px] text-white/40 tracking-wider">
            © {new Date().getFullYear()} La Maison en Paille — Tous droits
            réservés
          </p>
          <Link
            href="/mentions-legales"
            className="font-raleway text-[9px] tracking-wider text-white/40 hover:text-white/80 underline underline-offset-2 transition-colors"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
