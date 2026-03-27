import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title:
    "La Maison en Paille — Formations : Paille Terre Chaux / Poêle de masse",
  description:
    "Formations en construction naturelle animées par André de Bouter depuis 25 ans. Paille Terre Chaux, Poêle de masse, Photovoltaïque. Charente (16).",
};

// Images Wixstatic extraites du site réel
const IMG_PAILLE =
  "https://static.wixstatic.com/media/3e33e8_c7ce8044bc594a609f7c72f370d79c9c~mv2.jpg/v1/crop/x_59,y_0,w_1122,h_1748/fill/w_314,h_413,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fonds3.jpg";
const IMG_TERRE =
  "https://static.wixstatic.com/media/3e33e8_d95d5a776364461ab0e8f33345cb57f1~mv2.jpg/v1/crop/x_59,y_0,w_1122,h_1748/fill/w_309,h_413,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fonds2.jpg";
const IMG_BANDEAU =
  "https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg";
const IMG_PORTE =
  "https://static.wixstatic.com/media/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png/v1/fill/w_475,h_285,al_c,q_85,enc_avif,quality_auto/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png";
const IMG_GIF =
  "https://static.wixstatic.com/media/f4c673_9e107a544f7a4064a4a68de072001bac~mv2.gif";

// Les 3 cartes formations — couleurs exactes des screenshots
const FORMATIONS = [
  {
    slug: "paille-terre-chaux",
    titre: "Paille,\nTerre\n& Chaux",
    sousTitre: "Construire / Rénover /\nIsoler / Décorer",
    duree: "Stage 6 jours",
    desc: "Apprenez les clés pour réaliser votre projet durable, performant et confortable.",
    img: IMG_PAILLE,
    // Couleur de fond de la partie haute de la carte (screenshot : jaune doré)
    cardBg: "#c8a040",
  },
  {
    slug: "poele-de-masse",
    titre: "Poêle\nde Masse",
    sousTitre: "1 heure de feu =\n24h de confort",
    duree: "Stage 3 jours",
    desc: "Les apports du stage vous permettent de construire ensuite votre poêle personnalisé. Optionnel : four, eau chaude, banc chauffé.",
    img: IMG_TERRE,
    cardBg: "#c06030",
  },
  {
    slug: "photovoltaique",
    titre: "Autonomie\nPhotovoltaïque",
    sousTitre: "Par Sébastien Deroo\nÊtre plus autonome en énergie",
    duree: "Stage 2 jours",
    desc: "Pour toute personne désirant être davantage autonome, résiliente et économe dans sa consommation d'énergie.",
    img: null,
    cardBg: "#6a8e9a",
  },
];

export default function HomePage() {
  return (
    // Fond principal : grande texture paille via l'image du site
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${IMG_BANDEAU})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay très léger pour lisibilité */}
      <div className="absolute inset-0 bg-[#c8824a]/60 pointer-events-none" />

      <div className="relative z-10">
        {/* ── Bandeau newsletter ── */}
        <div className="bg-white/95 py-3 px-6 flex items-center justify-end gap-4 max-w-[500px] mx-auto mt-6 rounded-xl">
          <p className="font-raleway text-sm text-[#3d1a0e]">
            Restons en contact avec les <strong>Nouv&apos;d&apos;André</strong>
          </p>
          <Link href="/contact" className="btn-newsletter">
            Je m&apos;abonne
          </Link>
        </div>

        {/* ── Titre FORMATIONS 2026 ── */}
        <div className="text-center py-10">
          <div className="flex items-center justify-center gap-4">
            <div className="flex-1 max-w-[120px] h-px bg-white/60" />
            <h1
              className="font-raleway font-black text-white tracking-[0.12em] uppercase"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              Formations &nbsp; 2026
            </h1>
            <div className="flex-1 max-w-[120px] h-px bg-white/60" />
          </div>
        </div>

        {/* ── Grille 3 formations ── */}
        <div className="max-w-5xl mx-auto px-6 pb-10 grid grid-cols-1 md:grid-cols-3 gap-5 ">
          {FORMATIONS.map((f) => (
            <Link
              key={f.slug}
              href={`/formations/${f.slug}`}
              className="group flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow hover:translate-y-1   duration-300 rounded-xl"
            >
              {/* Partie haute colorée : image OU fond couleur + texte titre */}
              <div
                className="relative flex flex-col items-center justify-center text-center px-5 py-8 min-h-[260px]"
                style={{ backgroundColor: f.cardBg }}
              >
                {/* Image de fond de la carte */}
                {f.img && (
                  <Image
                    src={f.img}
                    alt={f.titre}
                    fill
                    className="object-cover opacity-80"
                    unoptimized
                  />
                )}
                {/* Overlay pour lisibilité du texte */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: `${f.cardBg}99` }}
                />

                {/* Titres sur la carte */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <h2
                    className="font-raleway font-black text-white uppercase leading-tight "
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      letterSpacing: "0.04em",
                      textShadow: "0 2px 6px rgba(0,0,0,0.4)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {f.titre}
                  </h2>
                  <p
                    className="font-raleway font-bold text-white uppercase"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      whiteSpace: "pre-line",
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {f.sousTitre}
                  </p>
                  {/* Bouton terracotta arrondi */}
                  <span className="btn-terracotta mt-2">{f.duree}</span>
                </div>
              </div>

              {/* Partie basse blanche : description */}
              <div className="bg-white px-5 py-5 flex-1">
                <p className="text-center text-sm text-[#4a4a4a] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Texte central ── */}
        <div className="max-w-3xl mx-auto px-6 pb-14 text-center">
          <p
            className="text-white text-sm leading-relaxed"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Vous souhaitez vous former pour pouvoir concrétiser votre projet ?
            Vous voulez vous assurer de réaliser votre rêve dans de bonnes
            conditions ? Je vous transmets les clés de compréhension et le
            savoir faire pour réaliser vos projets avec confiance et plaisir.
          </p>
        </div>

        {/* ── Section Porte Ouverte — fond terracotta ── */}
        <div className="bg-[#c4613a] py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Image journée nationale */}
            <div className="flex justify-center">
              <Image
                src={IMG_PORTE}
                alt="Journée nationale du Poêle de Masse — Porte ouverte 14 mars 2026"
                width={380}
                height={228}
                className="object-contain w-full max-w-[380px]"
                unoptimized
              />
            </div>

            {/* Texte porte ouverte */}
            <div className="text-center">
              <h2
                className="font-raleway font-black text-white uppercase underline underline-offset-4 decoration-2"
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  letterSpacing: "0.06em",
                }}
              >
                Porte
                <br />
                Ouverte
              </h2>
              <p className="text-white text-sm leading-relaxed mt-4">
                Venez découvrir le confort du poêle de masse auto-construit.
              </p>
              <p className="text-white text-sm mt-3">
                Samedi 14 mars
                <br />
                <span className="underline underline-offset-2">
                  Sur réservation
                </span>
                <br />
                (places limitées)
              </p>
            </div>

            {/* GIF thermique */}
            <div className="flex justify-center">
              <Image
                src={IMG_GIF}
                alt="Vidéo thermique poêle de masse"
                width={280}
                height={210}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
