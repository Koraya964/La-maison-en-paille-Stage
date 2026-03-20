import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "La Maison en Paille — Formations construction naturelle",
  description:
    "Apprenez à construire, rénover et chauffer avec des matériaux naturels. Stages Paille Terre Chaux, Poêle de masse, Photovoltaïque animés par André de Bouter. Charente (16).",
};

const formations = [
  {
    slug: "paille-terre-chaux",
    titre: "Paille, Terre & Chaux",
    sousTitre: "Construire / Rénover / Isoler / Décorer",
    duree: "Stage 6 jours",
    tarif: "660 €",
    description:
      "Apprenez les clés pour réaliser votre projet durable, performant et confortable.",
    couleur: "bg-amber-100",
    accent: "#8b6c47",
  },
  {
    slug: "poele-de-masse",
    titre: "Poêle de Masse",
    sousTitre: "1 heure de feu = 24h de confort",
    duree: "Stage 3 jours",
    tarif: "380 €",
    description:
      "Les apports du stage vous permettent de construire ensuite votre poêle personnalisé. Optionnel : four, eau chaude, banc chauffé.",
    couleur: "bg-orange-100",
    accent: "#c8603e",
  },
  {
    slug: "photovoltaique",
    titre: "Autonomie Photovoltaïque",
    sousTitre: "Être plus autonome en énergie",
    duree: "Stage 2 jours",
    tarif: "Nous contacter",
    description: `Pour toute personne désirant être davantage autonome, résiliente et économe dans sa consommation d'énergie.`,
    couleur: "bg-yellow-50",
    accent: "#5a6e4a",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#3d2b1f] text-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f] via-[#5a3e2b] to-[#2a1d15] opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <p className="text-[#c8a96e] text-xs tracking-widest uppercase font-bold mb-6">
            Formations 2026 — Charente (16)
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8 max-w-3xl">
            Construisez avec
            <br />
            <span className="text-[#c8a96e]">la nature.</span>
          </h1>
          <p className="text-stone-300 text-lg max-w-xl leading-relaxed mb-10">
            Vous souhaitez construire, rénover ou vous chauffer autrement ?
            André de Bouter vous transmet les clés de compréhension et le
            savoir-faire pour réaliser vos projets avec confiance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#c8a96e] text-[#3d2b1f] text-xs tracking-widest uppercase px-8 py-4 font-bold hover:bg-white transition-colors"
            >
              Je m'inscris
            </Link>
            <Link
              href="/formations/paille-terre-chaux"
              className="inline-block border-2 border-stone-400 text-stone-200 text-xs tracking-widest uppercase px-8 py-4 font-bold hover:border-white hover:text-white transition-colors"
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="py-24 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#8b6c47] text-xs tracking-widest uppercase font-bold mb-4">
              Programme
            </p>
            <h2 className="font-serif text-4xl text-[#3d2b1f]">
              Formations 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formations.map((f) => (
              <article
                key={f.slug}
                className="bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image placeholder */}
                <div className={`${f.couleur} h-56 flex items-end p-6`}>
                  <span
                    className="inline-block text-xs tracking-widest uppercase font-bold px-3 py-1 text-white"
                    style={{ backgroundColor: f.accent }}
                  >
                    {f.duree}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl text-[#3d2b1f] mb-2">
                    {f.titre}
                  </h3>
                  <p className="text-xs tracking-widest uppercase text-[#8b6c47] font-bold mb-4">
                    {f.sousTitre}
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed flex-1">
                    {f.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-serif text-xl text-[#3d2b1f]">
                      {f.tarif}
                    </span>
                    <Link
                      href={`/formations/${f.slug}`}
                      className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors border-b-2 border-[#8b6c47] hover:border-[#3d2b1f] pb-0.5"
                    >
                      En savoir plus →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Encart André */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo placeholder */}
            <div className="bg-stone-200 h-96 flex items-center justify-center text-stone-400 font-serif text-lg">
              Photo André de Bouter
            </div>
            <div>
              <p className="text-[#8b6c47] text-xs tracking-widest uppercase font-bold mb-4">
                Le formateur
              </p>
              <h2 className="font-serif text-4xl text-[#3d2b1f] mb-6">
                André de Bouter
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Depuis 25 ans, André anime des stages de construction naturelle
                dans sa ferme éco-rénovée en Charente. Sa maison en paille,
                chauffée au poêle de masse, est à la fois le lieu de formation
                et la démonstration vivante de ce qu'il enseigne.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Son approche : vous transmettre des compréhensions solides et un
                savoir-faire pratique pour que vous puissiez réaliser vos
                projets avec confiance et plaisir.
              </p>
              <Link
                href="/andre-de-bouter"
                className="inline-block border-2 border-[#8b6c47] text-[#8b6c47] text-xs tracking-widest uppercase px-8 py-3 font-bold hover:bg-[#8b6c47] hover:text-white transition-colors"
              >
                Découvrir André
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lieu / Infos pratiques */}
      <section className="py-24 bg-[#3d2b1f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#c8a96e] text-xs tracking-widest uppercase font-bold mb-4">
              Pratique
            </p>
            <h2 className="font-serif text-4xl">Le lieu de formation</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "",
                titre: "Hébergement",
                texte:
                  "Terrain pour camper, parking van/camping-car, dortoir et petite cuisine d'été à votre disposition.",
              },
              {
                icon: "",
                titre: "Repas",
                texte:
                  "Pour le stage Poêle de masse, les repas végétariens sont préparés en commun et cuits dans le poêle Oxa-Libre.",
              },
              {
                icon: "",
                titre: "Adresse",
                texte:
                  "21, rue des Chaumes — Les Pellières, 16120 MOSNAC - SAINT-SIMEUX. À 14 km à l'ouest d'Angoulême.",
              },
            ].map((item) => (
              <div key={item.titre} className="border border-stone-600 p-8">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-serif text-xl text-[#c8a96e] mb-3">
                  {item.titre}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {item.texte}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block bg-[#c8a96e] text-[#3d2b1f] text-xs tracking-widest uppercase px-10 py-4 font-bold hover:bg-white transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
