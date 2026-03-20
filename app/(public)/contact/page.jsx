export const metadata = {
  title: "Contact & Inscription",
  description:
    "Contactez André de Bouter pour vous inscrire aux formations ou poser des questions. La Maison en Paille, 16120 Saint-Simeux (Charente).",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#f5f0e8] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-[#8b6c47] text-xs tracking-widest uppercase font-bold mb-4">
            Infos pratiques
          </p>
          <h1 className="font-serif text-5xl text-[#3d2b1f] mb-6">
            Contact &amp; Lieu
          </h1>
          <p className="text-stone-600 max-w-xl leading-relaxed">
            Les formations se déroulent dans une ancienne ferme à cognac,
            éco-rénovée, à 14 km à l'ouest d'Angoulême.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Informations */}
            <div className="space-y-10">
              <div>
                <h2 className="font-serif text-2xl text-[#3d2b1f] mb-4">
                  André de Bouter
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed mb-2">
                  <a
                    href="tel:0545662768"
                    className="hover:text-[#8b6c47] transition-colors font-medium"
                  >
                    05 45 66 27 68
                  </a>
                </p>
                <p className="text-stone-600 text-sm">
                  <a
                    href="mailto:contact@lamaisonenpaille.com"
                    className="hover:text-[#8b6c47] transition-colors font-medium"
                  >
                    contact@lamaisonenpaille.com
                  </a>
                </p>
                <p className="text-stone-600 text-sm mt-4">
                  La Maison en Paille
                  <br />
                  21, rue des Chaumes — Les Pellières
                  <br />
                  16120 MOSNAC - SAINT-SIMEUX
                </p>
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#3d2b1f] mb-4">
                  Pour s'inscrire
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  Envoyez un e-mail à{" "}
                  <a
                    href="mailto:contact@lamaisonenpaille.com?subject=INSCRIPTION"
                    className="text-[#8b6c47] underline"
                  >
                    contact@lamaisonenpaille.com
                  </a>{" "}
                  avec :
                </p>
                <ul className="space-y-1 text-sm text-stone-600 list-disc list-inside">
                  <li>L'intitulé de la formation souhaitée</li>
                  <li>La date choisie</li>
                  <li>Prénom, nom, adresse, téléphone</li>
                </ul>
                <p className="text-stone-600 text-sm mt-4">
                  Vous recevrez en retour une convention de participation.
                </p>
                <div className="mt-4 p-4 bg-[#f5f0e8] text-sm text-stone-600">
                  <strong className="text-[#3d2b1f]">Paiement :</strong> Par
                  chèque (France) ou virement (étranger).
                  <br />
                  Acompte 30 % — solde 70 %.
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#3d2b1f] mb-4">
                  Pour venir
                </h3>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li>
                    {" "}
                    TGV/OUIGO jusqu'à Angoulême, puis RER vers
                    Châteauneuf-sur-Charente
                  </li>
                  <li> Aéroports à Bordeaux, Poitiers et La Rochelle</li>
                  <li>
                    {" "}
                    Covoiturage organisé avec les autres stagiaires (env. 2
                    semaines avant)
                  </li>
                  <li> Bus low cost et BlaBlaCar</li>
                </ul>
              </div>
            </div>

            {/* Formulaire newsletter + carte */}
            <div className="space-y-8">
              <div className="bg-[#3d2b1f] text-white p-8">
                <h3 className="font-serif text-2xl text-[#c8a96e] mb-2">
                  Les Nouv'd'André
                </h3>
                <p className="text-stone-400 text-sm mb-6">
                  Abonnez-vous pour recevoir les nouvelles dates de stage et
                  actualités.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    className="w-full bg-[#2a1d15] border border-stone-600 text-white text-sm px-4 py-3 placeholder-stone-500 focus:outline-none focus:border-[#c8a96e]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#8b6c47] text-white text-xs tracking-widest uppercase py-3 font-bold hover:bg-[#c8a96e] hover:text-[#3d2b1f] transition-colors"
                  >
                    Je m'abonne
                  </button>
                </form>
              </div>

              <div className="bg-stone-100 h-72 flex items-center justify-center text-stone-400 font-serif">
                Carte Google Maps — 16120 Saint-Simeux
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#3d2b1f] mb-4">
                  Hébergement & Repas
                </h3>
                <div className="space-y-3 text-sm text-stone-600">
                  <p>Terrain pour camper — parking van/camping-car</p>
                  <p> Dortoir — salles de bain disponibles</p>
                  <p> Petite cuisine d'été à disposition</p>
                  <p> Possibilité d'arriver la veille entre 19h et 22h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
