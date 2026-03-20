import Link from "next/link";

export const metadata = {
  title: "Stage Poêle de Masse — 3 jours",
  description:
    "Stage 3 jours pour apprendre à construire votre poêle de masse Oxa-Libre. 1h de feu = 24h de chaleur. Repas et hébergement inclus. André de Bouter, Charente (16). 380 €.",
  keywords: [
    "formation poêle de masse",
    "stage autoconstruction",
    "poêle de masse Oxa-Libre",
    "chauffage bois",
  ],
  openGraph: {
    title: "Stage Poêle de Masse — La Maison en Paille",
    description:
      "1 heure de feu = 24h de confort. Construisez votre poêle de masse en 3 jours.",
    type: "website",
  },
};

const dates2026 = [
  { dates: "Mars 2026", statut: "complet" },
  { dates: "Juin 2026", statut: "ouvert" },
  { dates: "Octobre 2026", statut: "ouvert" },
];

export default function PoeleDeMassePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-orange-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-orange-700 text-xs tracking-widest uppercase font-bold mb-4">
            Stage 3 jours — 380 €
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#3d2b1f] mb-4">
            Poêle de Masse
          </h1>
          <p className="text-xl text-stone-600 mb-2 font-light tracking-wide">
            1 heure de feu = 24 heures de confort
          </p>
          <p className="text-stone-600 max-w-2xl leading-relaxed mt-6">
            Les apports du stage vous permettent de construire ensuite votre
            propre poêle personnalisé. Optionnel : four à pain, production d'eau
            chaude, banc chauffé.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Je m'inscris
            </Link>
            <Link href="/ressources" className="btn-outline">
              Ressources poêle de masse
            </Link>
          </div>
        </div>
      </section>

      {/* Principe */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-orange-50 h-80 flex items-center justify-center text-stone-400 font-serif text-lg rounded">
              Photo / Vidéo thermique poêle de masse
            </div>
            <div>
              <h2 className="font-serif text-3xl text-[#3d2b1f] mb-6">
                Pourquoi un poêle de masse ?
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Le poêle de masse accumule la chaleur pendant la combustion,
                puis la restitue lentement sur 12 à 24 heures. Une seule flambée
                vive par jour suffit à chauffer confortablement votre maison.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Rendement thermique exceptionnel, consommation de bois réduite,
                confort radiant incomparable — le poêle de masse est la solution
                de chauffage la plus efficiente qui soit.
              </p>
              <ul className="space-y-2 text-sm text-stone-600 mt-6">
                {[
                  "Rendement thermique > 85 %",
                  `Consommation 2 à 3× moins de bois qu'un insert classique`,
                  "Chaleur douce et rayonnante",
                  "Optionnel : four, eau chaude sanitaire, banc chauffant",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[#c8a96e] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-[#3d2b1f] mb-12">
            Programme du stage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titre: "Théorie",
                items: [
                  "Principes de fonctionnement thermique",
                  "Les différents modèles de poêle de masse",
                  "Choix du système selon votre projet",
                  "Conception et dimensionnement",
                  "Matériaux réfractaires",
                ],
              },
              {
                titre: "Pratique",
                items: [
                  `Construction d'une banquette de poêle sur place`,
                  "Mise en œuvre des briques réfractaires",
                  "Enduits terre sur le poêle",
                  "Repas préparés en commun dans le poêle Oxa-Libre",
                  `Visite et retour d'expérience`,
                ],
              },
            ].map((section) => (
              <div key={section.titre} className="bg-white p-8 shadow-sm">
                <h3 className="font-serif text-xl text-orange-700 mb-6 pb-4 border-b border-stone-100">
                  {section.titre}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-stone-600"
                    >
                      <span className="text-orange-400 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dates */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-[#3d2b1f] mb-8">
            Prochaines dates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {dates2026.map((d) => (
              <div key={d.dates} className="border border-stone-200 p-6">
                <p className="font-serif text-lg text-[#3d2b1f] mb-2">
                  {d.dates}
                </p>
                <span
                  className={`inline-block text-xs tracking-wider uppercase px-2 py-1 ${
                    d.statut === "complet"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {d.statut === "complet" ? "Complet" : "Places disponibles"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-500">
            <span>⏱ Durée : 3 jours</span>
            <span>🍽 Repas végétariens inclus</span>
            <span>💶 Tarif : 380 €</span>
          </div>
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Je m'inscris à ce stage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
