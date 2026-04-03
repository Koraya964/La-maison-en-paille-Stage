import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Contact & Infos Pratiques | La Maison en Paille",
  description:
    "Organisez votre venue à La Maison en Paille. Contact, inscription, accès et hébergement à Saint-Simeux.",
};

const PHOTOS = [
  "https://static.wixstatic.com/media/3e33e8_f0f5b901bea9439487bf7b84d6a712ed~mv2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_f0f5b901bea9439487bf7b84d6a712ed~mv2.jpg",
  "https://static.wixstatic.com/media/3e33e8_36c9045251444c15bf03aa3b07179c76~mv2.jpg/v1/fill/w_980,h_735,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_36c9045251444c15bf03aa3b07179c76~mv2.jpg",
  "https://static.wixstatic.com/media/3e33e8_93c532e152394bfa957776efc0029fac~mv2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_93c532e152394bfa957776efc0029fac~mv2.jpg",
];

export default function ContactPage() {
  return (
    <div className="bg-[#F9F6F1] text-[#2D2D2D] font-sans selection:bg-[#BC8A5F] selection:text-white">
      {/* ── HEADER SIMPLE ── */}
      <section className="bg-[#3D1A0E] pt-24 pb-16 px-6 text-center">
        <h1 className="font-raleway text-4xl md:text-5xl font-light text-white mb-4">
          Contact <span className="italic font-serif">&</span> Accès
        </h1>
        <p className="text-white/60 max-w-xl mx-auto font-light">
          Tout ce qu&apos;il faut savoir pour préparer votre venue et rejoindre
          l&apos;aventure de l&apos;autoconstruction.
        </p>
      </section>

      {/* ── GALERIE LIEU ── */}
      <section className="px-4 -mt-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg border-4 border-white"
            >
              <Image
                src={src}
                alt={`Lieu de formation ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* COLONNE GAUCHE : COORDONNÉES & INSCRIPTION (5/12) */}
          <div className="lg:col-span-5 space-y-10">
            {/* Carte Contact Direct */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#BC8A5F]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-2xl font-bold text-[#3D1A0E] mb-6">
                Nous joindre
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F9F6F1] flex items-center justify-center text-[#BC8A5F]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#BC8A5F] mb-1">
                      Téléphone
                    </p>
                    <a
                      href="tel:0545662768"
                      className="text-lg font-medium hover:text-[#BC8A5F] transition-colors"
                    >
                      05 45 66 27 68
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F9F6F1] flex items-center justify-center text-[#BC8A5F]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#BC8A5F] mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:contact@lamaisonenpaille.com"
                      className="text-lg font-medium hover:text-[#BC8A5F] transition-colors break-all"
                    >
                      contact@lamaisonenpaille.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F9F6F1] flex items-center justify-center text-[#BC8A5F]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#BC8A5F] mb-1">
                      Adresse
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      La Maison en Paille
                      <br />
                      21, rue des Chaumes — Les Pellières
                      <br />
                      16120 SAINT-SIMEUX
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inscription Box */}
            <div className="bg-[#BC8A5F] p-8 rounded-[2rem] text-white">
              <h3 className="text-xl font-bold mb-4">Prêt à vous inscrire ?</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Envoyez-nous un email précisant l&apos;intitulé de la formation,
                la date choisie et vos coordonnées complètes.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:contact@lamaisonenpaille.com?subject=INSCRIPTION"
                  className="block w-full py-4 bg-[#3D1A0E] text-center rounded-xl font-bold hover:bg-black transition-all"
                >
                  S&apos;inscrire par email
                </a>
                <p className="text-[10px] text-center uppercase tracking-widest opacity-60">
                  Acompte de 30% à la réservation
                </p>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : INFOS PRATIQUES (7/12) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Comment venir */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-4 text-[#3D1A0E]">
                Comment venir ?
              </h3>
              <ul className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <li className="flex gap-3 font-medium text-gray-800">
                  <span className="text-[#BC8A5F] font-bold">—</span> TGV/OUIGO
                  Angoulême + TER Châteauneuf
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold">—</span> Aéroports
                  Bordeaux ou Poitiers
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold">—</span>{" "}
                  Covoiturage stagiaires (mis en lien)
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold">—</span> Bus
                  low-cost jusqu&apos;à Angoulême
                </li>
              </ul>
            </div>

            {/* Hébergement */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-4 text-[#3D1A0E]">
                Dormir sur place
              </h3>
              <ul className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <li className="flex gap-3 font-medium text-gray-800">
                  <span className="text-[#BC8A5F] font-bold">—</span> Terrain de
                  camping gratuit
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold">—</span> Parking
                  pour vans & campers
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold">—</span> Dortoir
                  avec deux salles de bain
                </li>
                <li className="flex gap-3 italic">
                  <span className="text-[#BC8A5F] font-bold">—</span> Arrivée
                  possible la veille (19h-22h)
                </li>
              </ul>
            </div>

            {/* Repas */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 md:col-span-2">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m9-2.333a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v2.667a3 3 0 01-3 3h-4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-4 text-[#3D1A0E]">
                Repas & Vie commune
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">
                    Stage Poêle de masse :
                  </strong>{" "}
                  Les repas sont préparés ensemble dans le poêle Oxa-Libre
                  (végétariens). Une expérience conviviale au cœur du stage.
                </p>
                <p>
                  <strong className="text-gray-800">Autres stages :</strong> Une
                  cuisine d&apos;été toute équipée est à votre entière
                  disposition pour préparer vos repas en autonomie.
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2 mt-6">
              <div className="bg-[#3D1A0E] p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute left-0 bottom-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Les Nouv&apos;d&apos;André
                  </h3>
                  <p className="text-white/60 text-sm">
                    Recevez les prochaines dates de formation et les actualités
                    du lieu.
                  </p>
                </div>
                <form className="flex-1 w-full flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Votre adresse e-mail"
                    className="flex-1 bg-white/10 border border-white/20 text-white text-sm px-6 py-4 rounded-xl placeholder-white/30 focus:outline-none focus:border-[#BC8A5F] focus:ring-1 focus:ring-[#BC8A5F]"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#BC8A5F] text-white font-bold rounded-xl hover:bg-[#A6754D] transition-all whitespace-nowrap active:scale-95"
                  >
                    S&apos;abonner
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER SIMPLE ── */}
      <footer className="py-10 border-t border-gray-200 text-center">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-[#BC8A5F] transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </footer>
    </div>
  );
}
