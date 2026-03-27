import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Stage Autonomie Photovoltaïque — 2 jours | La Maison en Paille",
  description:
    "Stage 2 jours pour être plus autonome en énergie. Par Sébastien Deroo. Saint-Simeux, Charente (16).",
};

const IMG_BANDEAU =
  "https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg";

export default function PhotovoltaiquePage() {
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
        {/* Hero */}
        <div className="bg-[#6a8e9a]/90 py-20 px-6 text-center">
          <p className="font-raleway font-bold text-[10px] tracking-[0.25em] uppercase text-white/80 mb-3">
            Stage 2 jours — Par Sébastien Deroo
          </p>
          <h1
            className="font-raleway font-black text-white uppercase leading-tight"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "0.06em",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            Autonomie
            <br />
            Photovoltaïque
          </h1>
          <p
            className="font-raleway font-bold text-white uppercase mt-3"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
          >
            Être plus autonome en énergie
          </p>
          <Link
            href="/inscription"
            className="btn-terracotta mt-6 inline-block"
          >
            Je m&apos;inscris
          </Link>
        </div>

        {/* Contenu */}
        <div className="bg-white/95 py-14 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl mb-6">
                Contenu du stage
              </h2>
              <ul className="space-y-3">
                {[
                  "Comprendre le fonctionnement d'une installation photovoltaïque autonome",
                  "Dimensionner l'installation selon vos besoins réels",
                  "Choisir les bons composants (panneaux, batteries, onduleurs)",
                  "Gérer la consommation et les priorités de charge",
                  "Sécurité électrique et bonnes pratiques",
                  "Retours d'expérience et cas concrets",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-[#4a4a4a] leading-relaxed"
                  >
                    <span className="text-[#8b3a2a] font-bold flex-shrink-0">
                      —
                    </span>{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              {[
                {
                  t: "Formateur",
                  v: `Sébastien Deroo, praticien de l'autonomie énergétique.`,
                },
                {
                  t: "Public visé",
                  v: "Particuliers souhaitant une installation hors réseau ou hybride, auto-constructeurs.",
                },
                {
                  t: "Lieu",
                  v: "21, rue des Chaumes — 16120 Saint-Simeux (Charente)",
                },
                { t: "Tarif", v: "Nous contacter pour les dates et tarifs." },
              ].map(({ t, v }) => (
                <div key={t} className="border-b border-[#f0e8d8] pb-4">
                  <h3 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.12em] text-xs mb-1">
                    {t}
                  </h3>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed">{v}</p>
                </div>
              ))}
              <Link
                href="/contact"
                className="btn-terracotta inline-block mt-2"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>

        {/* Autres formations */}
        <div className="bg-[#3d1a0e] py-10 px-6 text-center">
          <p className="font-raleway font-bold text-[10px] tracking-[0.2em] uppercase text-white/40 mb-5">
            Toutes les formations
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              ["Paille, Terre & Chaux", "/formations/paille-terre-chaux"],
              ["Poêle de Masse", "/formations/poele-de-masse"],
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
