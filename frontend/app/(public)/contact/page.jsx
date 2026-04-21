// app/(public)/contact/page.jsx
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

const IconPhone = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const IconMail = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const IconPin = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const IconTrain = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const IconHouse = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const IconFood = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

export default function ContactPage() {
  return (
    <div className="bg-[#F9F6F1] text-[#2D2D2D] font-sans selection:bg-[#BC8A5F] selection:text-white">
      {/* ── HERO + GALERIE ── */}
      <section className="bg-[#3D1A0E]">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 text-center">
          <p className="text-[#BC8A5F] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            Saint-Simeux, Charente
          </p>
          <h1 className="font-raleway text-4xl md:text-5xl font-light text-white mb-5 leading-tight">
            Venez nous rendre visite
          </h1>
          <p className="text-white/55 max-w-lg mx-auto text-base leading-relaxed font-light">
            Toutes les informations pour préparer votre venue, nous joindre, et
            vous inscrire à une formation.
          </p>
        </div>

        {/* Galerie — 3 photos en bande */}
        <div className="max-w-6xl mx-auto px-4 pb-0 grid grid-cols-3 gap-2">
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${i === 1 ? "aspect-[4/3]" : "aspect-[4/3]"}`}
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

      {/* ── BANDE COORDONNÉES ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <address className="not-italic flex items-center gap-4 md:flex-1 md:justify-center py-4 md:py-0">
              <span className="text-[#BC8A5F] flex-shrink-0">
                <IconPin />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Adresse
                </p>
                <p className="text-sm text-gray-700 leading-snug">
                  21, rue des Chaumes — Les Pellières
                  <br />
                  16120 Saint-Simeux
                </p>
              </div>
            </address>

            <div className="flex items-center gap-4 md:flex-1 md:justify-center py-4 md:py-0 md:px-8">
              <span className="text-[#BC8A5F] flex-shrink-0">
                <IconPhone />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Téléphone
                </p>
                <a
                  href="tel:0545662768"
                  className="text-sm font-semibold text-gray-800 hover:text-[#BC8A5F] transition-colors"
                >
                  05 45 66 27 68
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 md:flex-1 md:justify-center py-4 md:py-0 md:px-8">
              <span className="text-[#BC8A5F] flex-shrink-0">
                <IconMail />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Email
                </p>
                <a
                  href="mailto:contact@lamaisonenpaille.com"
                  className="text-sm font-semibold text-gray-800 hover:text-[#BC8A5F] transition-colors"
                >
                  contact@lamaisonenpaille.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-20 space-y-16">
        {/* ── INFOS PRATIQUES — 3 colonnes égales ── */}
        <section aria-labelledby="infos-pratiques">
          <h2
            id="infos-pratiques"
            className="font-raleway text-2xl font-light text-[#3D1A0E] mb-10 text-center"
          >
            Infos pratiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Venir */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="w-10 h-10 rounded-xl bg-[#FDF5EC] text-[#BC8A5F] flex items-center justify-center mb-5">
                <IconTrain />
              </div>
              <h3 className="font-raleway font-semibold text-[#3D1A0E] mb-4">
                Comment venir
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>TGV / OUIGO Angoulême + TER Châteauneuf</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>Aéroports Bordeaux ou Poitiers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>Bus low-cost jusqu&apos;à Angoulême</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>
                    Covoiturage entre stagiaires (mise en lien possible)
                  </span>
                </li>
              </ul>
            </div>

            {/* Dormir */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="w-10 h-10 rounded-xl bg-[#FDF5EC] text-[#BC8A5F] flex items-center justify-center mb-5">
                <IconHouse />
              </div>
              <h3 className="font-raleway font-semibold text-[#3D1A0E] mb-4">
                Dormir sur place
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>Terrain de camping gratuit</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>Parking pour vans et campers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>Dortoir avec deux salles de bain</span>
                </li>
                <li className="flex gap-3 text-gray-500 italic">
                  <span className="text-[#BC8A5F] font-bold flex-shrink-0 mt-0.5">
                    —
                  </span>
                  <span>Arrivée possible la veille (19h–22h)</span>
                </li>
              </ul>
            </div>

            {/* Repas */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="w-10 h-10 rounded-xl bg-[#FDF5EC] text-[#BC8A5F] flex items-center justify-center mb-5">
                <IconFood />
              </div>
              <h3 className="font-raleway font-semibold text-[#3D1A0E] mb-4">
                Repas & vie commune
              </h3>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-gray-800 block mb-1">
                    Stage Poêle de masse
                  </span>
                  Repas préparés ensemble dans le poêle Oxa-Libre (végétariens).
                  Une expérience conviviale au cœur du stage.
                </p>
                <p>
                  <span className="font-semibold text-gray-800 block mb-1">
                    Autres stages
                  </span>
                  Cuisine d&apos;été toute équipée à votre disposition, en
                  pleine autonomie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA INSCRIPTION ── */}
        <section aria-labelledby="inscription-cta">
          <div className="bg-[#3D1A0E] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Texte */}
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <p className="text-[#BC8A5F] text-xs tracking-[0.2em] uppercase font-semibold mb-3">
                  Prêt à vous lancer ?
                </p>
                <h2
                  id="inscription-cta"
                  className="font-raleway text-3xl font-light text-white mb-4 leading-snug"
                >
                  S&apos;inscrire à une formation
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                  Envoyez-nous un email avec l&apos;intitulé de la formation, la
                  date souhaitée et vos coordonnées. Un acompte de 30 % est
                  demandé à la réservation.
                </p>
              </div>

              {/* Actions */}
              <div className="bg-[#2a1208] p-10 md:p-14 flex flex-col justify-center gap-4">
                <a
                  href="mailto:contact@lamaisonenpaille.com?subject=INSCRIPTION"
                  className="flex items-center justify-between w-full px-6 py-4 bg-[#BC8A5F] text-[#3D1A0E] font-bold text-sm rounded-xl hover:bg-[#d4a06e] transition-colors"
                >
                  <span>S&apos;inscrire via le formulaire</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 16 16"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8h10m-4-4 4 4-4 4"
                    />
                  </svg>
                </a>
                <a
                  href="tel:0545662768"
                  className="flex items-center justify-between w-full px-6 py-4 bg-white/8 border border-white/15 text-white/80 text-sm rounded-xl hover:bg-white/12 transition-colors"
                >
                  <span>Appeler André</span>
                  <span className="text-white/50 font-mono text-xs">
                    05 45 66 27 68
                  </span>
                </a>
                <p className="text-white/30 text-xs text-center pt-1">
                  Réponse sous 48 h en semaine
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section aria-labelledby="newsletter">
          <div className="border border-gray-200 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <h2
                id="newsletter"
                className="font-raleway text-xl font-semibold text-[#3D1A0E] mb-1"
              >
                Les Nouv&apos;d&apos;André
              </h2>
              <p className="text-gray-500 text-sm">
                Prochaines dates de formation et actualités du lieu.
              </p>
            </div>
            <form className="flex-1 w-full flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Votre adresse e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Votre adresse e-mail"
                className="flex-1 bg-[#F9F6F1] border border-gray-200 text-gray-800 text-sm px-5 py-3.5 rounded-xl placeholder-gray-400 focus:outline-none focus:border-[#BC8A5F] focus:ring-1 focus:ring-[#BC8A5F] transition"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#3D1A0E] text-white text-sm font-semibold rounded-xl hover:bg-[#5a2b18] transition-colors whitespace-nowrap"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
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
