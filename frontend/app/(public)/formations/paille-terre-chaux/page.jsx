import Link from "next/link";
import Image from "next/image";
import { fetchStages } from "@/frontend/lib/api/stages";

export const metadata = {
  title: "Stage Paille, Terre & Chaux — 6 jours | La Maison en Paille",
  description:
    "Apprenez à bâtir sainement. Stage pratique de 6 jours sur la paille, la terre et la chaux avec André de Bouter.",
};

const IMG_HERO =
  "https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg";

const PHOTOS = [
  "https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg",
  "https://static.wixstatic.com/media/457787_a913ed3d75f84f1fa4fe2cebe5ed6b5b~mv2_d_1704_2272_s_2.jpg/v1/fill/w_980,h_1307,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_a913ed3d75f84f1fa4fe2cebe5ed6b5b~mv2_d_1704_2272_s_2.jpg",
  "https://static.wixstatic.com/media/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_052730f69e594a68afaecd1ffac6d383~mv2_d_4320_3240_s_4_2.jpg",
  "https://static.wixstatic.com/media/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg",
  "https://static.wixstatic.com/media/457787_8c46cb7badca4aebbe34442e21ffa08b~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_8c46cb7badca4aebbe34442e21ffa08b~mv2.jpg",
  "https://static.wixstatic.com/media/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg",
];

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

function StatutBadge({ statut, places }) {
  if (statut === "complet" || places === 0)
    return (
      <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
        Liste d&apos;attente
      </span>
    );
  if (places <= 3)
    return (
      <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
        {places} place{places > 1 ? "s" : ""}
      </span>
    );
  return (
    <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-green-100 text-green-700 rounded-full">
      {places} places
    </span>
  );
}

export default async function PailleTerreChauxPage() {
  const stages = await fetchStages(1); // formation_id = 1

  return (
    <div className="bg-[#F9F6F1] text-[#2D2D2D] font-sans selection:bg-[#BC8A5F] selection:text-white">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={IMG_HERO}
          alt="Mur en paille et terre"
          fill
          className="object-cover brightness-[0.4]"
          priority
          unoptimized
        />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full">
            Bioconstruction & Transmission
          </span>
          <h1 className="font-raleway text-5xl md:text-7xl font-light text-white mb-6 leading-[1.1]">
            Paille, Terre <span className="italic font-serif">&</span> Chaux
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Un stage immersif de 6 jours pour maîtriser les techniques de
            l&apos;habitat sain et durable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscription"
              className="px-8 py-4 bg-[#BC8A5F] hover:bg-[#A6754D] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Réserver ma place — 660€
            </Link>
            <a
              href="#programme"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold transition-all"
            >
              Voir le programme
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTENU & INFOS ── */}
      <section id="programme" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Colonne Gauche : Programme */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-[#3D1A0E] mb-6">
                Au programme
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Depuis 25 ans, ce stage pratique vous transmet les clés pour
                réaliser un projet durable, performant et confortable.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Paille porteuse (Nebraska) et ossature bois",
                "Systèmes constructifs et choix des parements",
                "Enduits terre : accroche, corps d'enduit et finitions",
                "Cloisons : torchis, pisé, adobes et torchis allégé",
                "Réalisation de sols en béton de terre crue",
                "Usage des chaux et leurs applications spécifiques",
                "Peintures naturelles à l'argile et à la chaux",
                "Physique du bâtiment : isolation, inertie et vapeur",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm transition-shadow"
                >
                  <div className="w-6 h-6 rounded-full bg-[#BC8A5F]/20 flex items-center justify-center text-[#A6754D] flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne Droite : Fiche Technique & Dates */}
          <div className="space-y-8 self-start sticky top-8">
            <div className="bg-white rounded-[2rem] p-10 lg:p-14 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#3D1A0E]">
                Dates 2026
              </h3>

              <div className="space-y-3 mb-10">
                {stages.length > 0 ? (
                  stages.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#BC8A5F]/30 hover:bg-[#BC8A5F]/5 transition-all"
                    >
                      <div>
                        <span className="font-medium text-gray-800">
                          {formatDate(s.date_debut)} → {formatDate(s.date_fin)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic py-4 text-center">
                    Dates à venir — nous contacter
                  </p>
                )}
              </div>

              <div className="space-y-8 border-t border-gray-100 pt-10">
                {[
                  {
                    t: "Formateur",
                    v: "André de Bouter, expert en bioconstruction.",
                  },
                  {
                    t: "Lieu",
                    v: "21, rue des Chaumes — 16120 Saint-Simeux (Charente)",
                  },
                  {
                    t: "Hébergement",
                    v: "Camping, dortoir ou parking van disponible sur place.",
                  },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#BC8A5F] font-black mb-2">
                      {item.t}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/inscription"
                className="mt-12 w-full py-5 bg-[#3D1A0E] text-center text-white rounded-2xl font-bold hover:bg-[#2D130B] transition-all inline-block shadow-lg"
              >
                Réserver ma session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIE ── */}
      <section className="bg-[#F2EDE4] py-20 px-6">
        <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-[#3D1A0E]">
              L&apos;expérience en images
            </h2>
            <p className="text-gray-500">
              Aperçu des chantiers et réalisations
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl shadow-sm group"
            >
              <Image
                src={src}
                alt={`Photo stage ${i}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── NAVIGATION FORMATIONS ── */}
      <section className="bg-[#3D1A0E] py-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#BC8A5F]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-white font-raleway text-2xl mb-10 font-light tracking-wide">
            Explorer d&apos;autres domaines d&apos;autonomie
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {[
              { label: "Poêle de Masse", href: "/formations/poele-de-masse" },
              { label: "Photovoltaïque", href: "/formations/photovoltaique" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group px-8 py-4 border border-white/20 text-white/80 rounded-xl hover:border-[#BC8A5F] hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <span className="font-medium tracking-wide">{link.label}</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
