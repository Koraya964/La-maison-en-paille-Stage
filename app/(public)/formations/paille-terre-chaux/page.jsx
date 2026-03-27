import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Stage Paille, Terre & Chaux — 6 jours",
  description:
    "Stage 6 jours pour apprendre à construire, rénover et isoler avec de la paille, de la terre et de la chaux. André de Bouter, Saint-Simeux (16). 660 €.",
};

const IMG_BG =
  "https://static.wixstatic.com/media/3e33e8_c7ce8044bc594a609f7c72f370d79c9c~mv2.jpg/v1/fill/w_1240,h_1748,al_c,q_90,enc_avif,quality_auto/3e33e8_c7ce8044bc594a609f7c72f370d79c9c~mv2.jpg";
const IMG_BANDEAU =
  "https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg";

const PHOTOS = [
  "https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg",
  "https://static.wixstatic.com/media/457787_a913ed3d75f84f1fa4fe2cebe5ed6b5b~mv2_d_1704_2272_s_2.jpg/v1/fill/w_980,h_1307,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_a913ed3d75f84f1fa4fe2cebe5ed6b5b~mv2_d_1704_2272_s_2.jpg",
  "https://static.wixstatic.com/media/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg",
  "https://static.wixstatic.com/media/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg",
  "https://static.wixstatic.com/media/457787_8c46cb7badca4aebbe34442e21ffa08b~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_8c46cb7badca4aebbe34442e21ffa08b~mv2.jpg",
  "https://static.wixstatic.com/media/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg",
];

export default function PailleTerreChauxPage() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${IMG_BANDEAU})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#c8824a]/55 pointer-events-none" />

      <div className="relative z-10">
        {/* ── Hero ── */}
        <div className="relative overflow-hidden" style={{ maxHeight: "60vh" }}>
          <Image
            src={IMG_BG}
            alt="Paille Terre Chaux"
            width={1240}
            height={700}
            className="w-full object-cover"
            style={{ maxHeight: "60vh" }}
            unoptimized
          />
          <div className="absolute inset-0 bg-[#c8a040]/70 flex flex-col items-center justify-center text-center px-6">
            <p className="font-raleway font-bold text-[10px] tracking-[0.25em] uppercase text-white/80 mb-3">
              Stage 6 jours — 660 €
            </p>
            <h1
              className="font-raleway font-black text-white uppercase leading-tight"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                letterSpacing: "0.06em",
                textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }}
            >
              Paille, Terre &amp; Chaux
            </h1>
            <p
              className="font-raleway font-bold text-white uppercase mt-3"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              Construire / Rénover / Isoler / Décorer
            </p>
            <Link href="/inscription" className="btn-terracotta mt-6">
              Je m&apos;inscris
            </Link>
          </div>
        </div>

        {/* ── Intro ── */}
        <div className="bg-white/95 py-12 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-2xl mb-4">
              Les clés pour réaliser un projet durable, performant et
              confortable
            </h2>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">
              Ce stage pratique, que j&apos;anime depuis 25 ans, est conçu pour
              passer une semaine passionnante ensemble, vous permettant
              d&apos;acquérir les compréhensions et compétences nécessaires pour
              la conception et réalisation de votre projet.
            </p>
          </div>
        </div>

        {/* ── Galerie ── */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 bg-[#c4613a] p-1">
          {PHOTOS.map((src, i) => (
            <div key={i} className="relative overflow-hidden aspect-square">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* ── Contenu ── */}
        <div className="bg-white/95 py-14 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl mb-6">
                Contenu de la formation
              </h2>
              <ul className="space-y-3">
                {[
                  "Réalisation des murs en paille porteuse (Nebraska) et remplissages d'ossatures bois",
                  "Choix du système constructif et parements",
                  "Enduits terre : couche d'accroche, corps d'enduit et finitions",
                  "Cloisons : torchis, torchis allégé, pisé et adobes",
                  "Sols en béton de terre crue",
                  "Différents types de chaux et leurs applications",
                  "Peinture à l'argile ou à la chaux avec ou sans pigments",
                  "Physique du bâtiment : isolation, inertie, vapeur d'eau",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-[#4a4a4a] leading-relaxed"
                  >
                    <span className="text-[#8b3a2a] font-bold flex-shrink-0 mt-0.5">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.1em] text-base mb-4">
                  Dates 2026
                </h2>
                {[
                  "12 – 17 Avril",
                  "10 – 15 Mai",
                  "12 – 17 Juillet",
                  "16 – 21 Août",
                ].map((d) => (
                  <div
                    key={d}
                    className="flex items-center justify-between border-b border-[#f0e8d8] py-2"
                  >
                    <span className="font-raleway font-bold text-sm text-[#3d1a0e]">
                      {d} 2026
                    </span>
                    <span className="font-raleway font-bold text-[9px] tracking-[0.15em] uppercase text-white bg-[#4a6741] px-2 py-1">
                      Ouvert
                    </span>
                  </div>
                ))}
                <p className="text-xs text-[#4a4a4a] mt-3">
                  Horaires 9h–18h &nbsp;·&nbsp; Tarif <strong>660 €</strong>{" "}
                  &nbsp;·&nbsp; Formateur : André de Bouter
                </p>
              </div>
              {[
                {
                  t: "Pré-requis",
                  v: "Accessible à tous : particuliers et professionnels, bricoleurs et néophytes.",
                },
                { t: "Lieu", v: "21 rue des Chaumes — 16120 SAINT-SIMEUX" },
                {
                  t: "Hébergement",
                  v: "Terrain pour camper, dortoir, parking van. Arrivée possible la veille 19h–22h.",
                },
              ].map(({ t, v }) => (
                <div key={t}>
                  <h3 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.12em] text-xs mb-1">
                    {t}
                  </h3>
                  <p className="text-xs text-[#4a4a4a] leading-relaxed">{v}</p>
                </div>
              ))}
              <Link href="/contact" className="btn-terracotta inline-block">
                Je m&apos;inscris
              </Link>
            </div>
          </div>
        </div>

        {/* ── Autres formations ── */}
        <div className="bg-[#3d1a0e] py-10 px-6 text-center">
          <p className="font-raleway font-bold text-[10px] tracking-[0.2em] uppercase text-white/40 mb-5">
            Toutes les formations
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              ["Poêle de Masse", "/formations/poele-de-masse"],
              ["Photovoltaïque", "/formations/photovoltaique"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="font-raleway font-bold text-[10px] tracking-[0.15em] uppercase px-6 py-3 border border-[#c8a040] text-[#c8a040] hover:bg-[#c8a040] hover:text-[#3d1a0e] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
