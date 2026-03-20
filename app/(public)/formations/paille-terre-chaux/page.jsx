import Link from "next/link";

export const metadata = {
  title: "Stage Paille, Terre & Chaux — 6 jours",
  description:
    "Stage 6 jours pour apprendre à construire, rénover et isoler avec de la paille, de la terre et de la chaux. Avec André de Bouter à Saint-Simeux (16). 660 €.",
  keywords: [
    "formation paille terre chaux",
    "stage construction naturelle",
    "enduit terre",
    "autoconstruction",
  ],
  openGraph: {
    title: "Stage Paille, Terre & Chaux",
    description:
      "Apprenez à construire avec des matériaux naturels en 6 jours.",
    type: "website",
  },
};

const dates2026 = [
  { dates: "12 – 17 Avril 2026", statut: "ouvert" },
  { dates: "10 – 15 Mai 2026", statut: "ouvert" },
  { dates: "12 – 17 Juillet 2026", statut: "ouvert" },
  { dates: "16 – 21 Août 2026", statut: "ouvert" },
];

const programme = [
  {
    titre: "Paille",
    items: [
      "Réalisation de murs en paille porteuse (Nebraska)",
      "Remplissage de différentes ossatures bois : poteau-poutre, GREB, doubles et simples ossatures",
      "Pose des bottes à plat, sur champ et debout",
      "Bouchage des interstices",
    ],
  },
  {
    titre: "Terre locale / Argile",
    items: [
      `Couche d'accroche`,
      `Corps d'enduit`,
      "Enduits de finitions",
      "Cloisons : adobes, pisé, torchis, torchis allégé",
      "Sols : béton de terre crue, finition",
      `Peinture à l'argile`,
    ],
  },
  {
    titre: "Chaux",
    items: [
      "Comprendre les différents types de chaux",
      "Application : enduits, peinture, fresco",
      "Éviter les fissurations",
    ],
  },
];

export default function PailleTerreChauxPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-amber-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-[#8b6c47] text-xs tracking-widest uppercase font-bold mb-4">
            Stage 6 jours — 660 €
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#3d2b1f] mb-4">
            Paille, Terre
            <br />
            &amp; Chaux
          </h1>
          <p className="text-xl text-stone-600 mb-2 font-light tracking-wide">
            Construire · Rénover · Isoler · Décorer
          </p>
          <p className="text-stone-600 max-w-2xl leading-relaxed mt-6">
            Ce stage pratique, animé depuis 25 ans par André de Bouter, vous
            permet d'acquérir les compréhensions et compétences nécessaires pour
            concevoir et réaliser votre projet en matériaux naturels.
          </p>
          <Link href="/contact" className="btn-primary mt-8 inline-block">
            Je m'inscris
          </Link>
        </div>
      </section>

      {/* Dates */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-[#3d2b1f] mb-8">
            Dates 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dates2026.map((d) => (
              <div
                key={d.dates}
                className="border border-stone-200 p-6 hover:border-[#8b6c47] transition-colors"
              >
                <p className="font-serif text-lg text-[#3d2b1f] mb-2">
                  {d.dates}
                </p>
                <span className="inline-block bg-green-100 text-green-700 text-xs tracking-wider uppercase px-2 py-1">
                  Places disponibles
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-500">
            <span>⏱ Horaires : 9h – 18h</span>
            <span>👤 Formateur : André de Bouter</span>
            <span>💶 Tarif : 660 €</span>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-[#3d2b1f] mb-12">
            Contenu de la formation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programme.map((section) => (
              <div key={section.titre} className="bg-white p-8 shadow-sm">
                <h3 className="font-serif text-xl text-[#8b6c47] mb-6 pb-4 border-b border-stone-100">
                  {section.titre}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-stone-600"
                    >
                      <span className="text-[#c8a96e] mt-0.5 flex-shrink-0">
                        →
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#f5f0e8]">
              <h3 className="font-serif text-xl text-[#3d2b1f] mb-4">
                Pré-requis
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Accessible à tous : particuliers et professionnels, bricoleurs
                et néophytes. La lecture d'un livre sur la construction en
                paille avant le stage facilitera votre apprentissage.
              </p>
            </div>
            <div className="p-8 bg-[#f5f0e8]">
              <h3 className="font-serif text-xl text-[#3d2b1f] mb-4">Lieu</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Chez André de Bouter
                <br />
                21 rue des Chaumes
                <br />
                16120 SAINT-SIMEUX
              </p>
            </div>
            <div className="p-8 bg-[#f5f0e8]">
              <h3 className="font-serif text-xl text-[#3d2b1f] mb-4">
                Hébergement
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Terrain pour camper, parking van / camping-car, dortoir et
                petite cuisine d'été à votre disposition. Arrivée possible la
                veille entre 19h et 22h.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Je m'inscris à ce stage
            </Link>
          </div>
        </div>
      </section>

      {/* Autres formations */}
      <section className="py-16 bg-[#3d2b1f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl mb-8">Les autres formations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/formations/poele-de-masse"
              className="border border-[#c8a96e] text-[#c8a96e] text-xs tracking-widest uppercase px-6 py-3 font-bold hover:bg-[#c8a96e] hover:text-[#3d2b1f] transition-colors"
            >
              Poêle de masse
            </Link>
            <Link
              href="/formations/photovoltaique"
              className="border border-[#c8a96e] text-[#c8a96e] text-xs tracking-widest uppercase px-6 py-3 font-bold hover:bg-[#c8a96e] hover:text-[#3d2b1f] transition-colors"
            >
              Photovoltaïque
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
