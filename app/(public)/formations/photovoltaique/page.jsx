import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Stage Autonomie Photovoltaïque — 2 jours | La Maison en Paille",
  description:
    "Maîtrisez votre production d'énergie. Stage de 2 jours sur le photovoltaïque autonome avec Sébastien Deroo.",
};

const IMG_HERO =
  "https://static.wixstatic.com/media/3e33e8_31acae3ecc7d4c1ab32197337fb25806~mv2.jpg/v1/fill/w_604,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_31acae3ecc7d4c1ab32197337fb25806~mv2.jpg";

export default function PhotovoltaiquePage() {
  return (
    <div className="bg-[#F9F6F1] text-[#2D2D2D] font-sans selection:bg-[#E3A019] selection:text-white">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={IMG_HERO}
          alt="Panneaux photovoltaïques"
          fill
          className="object-cover brightness-[0.45]"
          priority
          unoptimized
        />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full">
            Énergie Durable & Résilience
          </span>
          <h1 className="font-raleway text-5xl md:text-7xl font-light text-white mb-6 leading-[1.1]">
            L&apos;Autonomie{" "}
            <span className="italic font-serif">Photovoltaïque</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Un stage technique de 2 jours pour concevoir, dimensionner et
            installer votre propre système solaire autonome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscription"
              className="px-8 py-4 bg-[#E3A019] hover:bg-[#C98A15] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Réserver ma place
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
              <h2 className="text-4xl font-bold text-[#1A2E35] mb-6">
                Au programme
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                De la théorie à la pratique, apprenez à devenir producteur de
                votre propre électricité, que vous soyez en site isolé ou
                raccordé au réseau.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Comprendre la physique du photovoltaïque",
                "Dimensionnement précis selon vos besoins réels",
                "Choix technologiques : panneaux, batteries, onduleurs",
                "Câblage, protection et mise en sécurité",
                "Gérer les priorités de charge et la domotique douce",
                "Études de cas et retours d'expérience concrets",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-6 h-6 rounded-full bg-[#E3A019]/20 flex items-center justify-center text-[#C98A15] flex-shrink-0 mt-1">
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

          {/* Colonne Droite : Fiche Technique */}
          <div className="bg-white rounded-[2rem] p-10 lg:p-14 shadow-xl border border-gray-100 self-start">
            <h3 className="text-2xl font-bold mb-8 text-[#1A2E35]">
              Fiche technique
            </h3>

            <div className="space-y-8">
              {[
                {
                  t: "Formateur",
                  v: "Sébastien Deroo, spécialiste en systèmes énergétiques résilients.",
                },
                {
                  t: "Public",
                  v: "Autoconstructeurs, curieux, projets de vie en site isolé ou hybride.",
                },
                {
                  t: "Lieu du stage",
                  v: "21, rue des Chaumes — 16120 Saint-Simeux (Charente)",
                },
                {
                  t: "Tarif & Dates",
                  v: "Nous consulter pour les prochaines sessions et tarifs personnalisés.",
                },
              ].map((item, i) => (
                <div key={i} className="group">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#E3A019] font-black mb-2">
                    {item.t}
                  </h4>
                  <p className="text-gray-700 leading-relaxed group-hover:text-black transition-colors">
                    {item.v}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-12 w-full py-5 bg-[#1A2E35] text-center text-white rounded-2xl font-bold hover:bg-[#253D46] transition-all inline-block shadow-lg shadow-black/5"
            >
              Demander un devis ou une date
            </Link>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION FORMATIONS ── */}
      <section className="bg-[#1A2E35] py-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3A019]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-white font-raleway text-2xl mb-10 font-light tracking-wide">
            Découvrez nos autres expertises
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {[
              {
                label: "Paille, Terre & Chaux",
                href: "/formations/paille-terre-chaux",
              },
              { label: "Poêle de Masse", href: "/formations/poele-de-masse" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group px-8 py-4 border border-white/20 text-white/80 rounded-xl hover:border-[#E3A019] hover:text-white transition-all flex items-center justify-center gap-3"
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
