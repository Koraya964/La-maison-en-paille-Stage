import Image from "next/image";
import Link from "next/link";
import ClickableGallery from "@/components/public/ClickableGallery";

export const metadata = {
  title: "Pourquoi un poêle de masse ? | La Maison en Paille",
  description:
    "Comprendre le fonctionnement, les flambées, le confort et les atouts d'un poêle de masse : autonomie, rendement réel, chaleur douce et options personnalisables.",
};

const heroImage =
  "https://static.wixstatic.com/media/457787_f6badfbbd12f49488f331b78c8f46595~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_1400,h_1052,al_c,q_88,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_f6badfbbd12f49488f331b78c8f46595~mv2_d_3264_2448_s_4_2.jpg";

const thermalImage =
  "https://static.wixstatic.com/media/f4c673_9e107a544f7a4064a4a68de072001bac~mv2.gif";

const fonctionnementImages = [
  {
    src: "https://static.wixstatic.com/media/f4c673_d19b11dd12ff4f42ad1f563cb9a6387a~mv2.jpg/v1/fill/w_900,h_948,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4c673_d19b11dd12ff4f42ad1f563cb9a6387a~mv2.jpg",
    thumbnailSrc:
      "https://static.wixstatic.com/media/f4c673_d19b11dd12ff4f42ad1f563cb9a6387a~mv2.jpg/v1/fill/w_253,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4c673_d19b11dd12ff4f42ad1f563cb9a6387a~mv2.jpg",
    alt: "Schéma de fonctionnement d'un poêle de masse",
  },
  {
    src: "https://static.wixstatic.com/media/3e33e8_98f21650512a42f2b73247b8ccdadbb9~mv2.jpg/v1/fill/w_900,h_948,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_98f21650512a42f2b73247b8ccdadbb9~mv2.jpg",
    thumbnailSrc:
      "https://static.wixstatic.com/media/3e33e8_98f21650512a42f2b73247b8ccdadbb9~mv2.jpg/v1/fill/w_253,h_266,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_98f21650512a42f2b73247b8ccdadbb9~mv2.jpg",
    alt: "Structure d'un poêle de masse",
  },
  {
    src: "https://static.wixstatic.com/media/3e33e8_38f7e606a54f409b8df9c8b8e4a9e381~mv2.png/v1/fill/w_900,h_948,al_c,q_88,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_38f7e606a54f409b8df9c8b8e4a9e381~mv2.png",
    thumbnailSrc:
      "https://static.wixstatic.com/media/3e33e8_38f7e606a54f409b8df9c8b8e4a9e381~mv2.png/v1/fill/w_253,h_266,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_38f7e606a54f409b8df9c8b8e4a9e381~mv2.png",
    alt: "Circulation de la chaleur dans un poêle de masse",
  },
  {
    src: "https://static.wixstatic.com/media/3e33e8_ecc6fce692c845c1a92c36c8b59c2894~mv2.png/v1/fill/w_900,h_948,al_c,q_88,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_ecc6fce692c845c1a92c36c8b59c2894~mv2.png",
    thumbnailSrc:
      "https://static.wixstatic.com/media/3e33e8_ecc6fce692c845c1a92c36c8b59c2894~mv2.png/v1/fill/w_253,h_266,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_ecc6fce692c845c1a92c36c8b59c2894~mv2.png",
    alt: "Restitution lente de la chaleur d'un poêle de masse",
  },
];

const keyBenefits = [
  {
    eyebrow: "Autonomie",
    text: "Une seule flambée d'environ 1h30 par jour suffit souvent pour maintenir le confort sur 12 à 24 heures.",
  },
  {
    eyebrow: "Rendement réel",
    text: "Un feu vif, complet et propre permet d'atteindre un rendement réel d'environ 85 %, avec moins de pollution et moins de bois.",
  },
  {
    eyebrow: "Personnalisable",
    text: "Le poêle peut intégrer un banc chauffant, un four à pain ou même la production d'eau chaude selon votre projet.",
  },
  {
    eyebrow: "Plaisir d'usage",
    text: "Belles flammes, chaleur rayonnante, air moins surchauffé et sensation de confort beaucoup plus stable au quotidien.",
  },
];

const fonctionnementPoints = [
  "La combustion est très poussée grâce à une arrivée d'oxygène maîtrisée et à des flammes qui montent à 700 à 800 °C.",
  "Les gaz issus du bois sont mieux brûlés que dans un poêle ou un insert classique, ce qui réduit fortement les particules et la pollution.",
  "La chaleur des fumées et des braises est captée par une masse réfractaire lourde au lieu de partir dans le conduit.",
  "Les fumées sortent autour de 100 °C seulement, juste ce qu'il faut pour le tirage, alors qu'un insert reste beaucoup plus chaud et plus gaspilleur.",
];

const chaleurWays = [
  "Radiation : les infrarouges lointains chauffent très efficacement les murs, les cloisons et les meubles.",
  "Convection douce : l'air en contact avec le poêle monte modestement en température, sans surchauffe brutale.",
  "Conduction : un banc chauffant ou un appui contre le poêle offre un confort physique très direct.",
];

const quickLinks = [
  { label: "Porte ouverte", href: "/porte-ouverte-pdm" },
  { label: "Stage poêle de masse", href: "/formations/poele-de-masse" },
  { label: "Prendre contact", href: "/contact" },
  { label: "Vos réalisations", href: "/realisations" },
];

function InfoCard({ eyebrow, title, children, className = "" }) {
  return (
    <section
      className={`border border-[#d7c3ae] bg-[#faf3e8] p-6 shadow-[5px_5px_0_#2c1a10] md:p-7 ${className}`}
    >
      <p className="font-raleway text-[11px] uppercase tracking-[0.24em] text-[#9b5e41]">
        {eyebrow}
      </p>
      <h2 className="mt-2.5 font-serif text-[26px] leading-tight text-[#2c1a10] md:text-[30px]">
        {title}
      </h2>
      <div className="mt-4 font-raleway text-[14px] leading-7 text-[#5a4333] md:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function RessourcesPage() {
  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.045]"
        aria-hidden="true"
      >
        <filter id="grain-ressources">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-ressources)" />
      </svg>

      <section className="relative overflow-hidden bg-[#ede0ce] px-6 pb-20 pt-10 md:px-10 md:pt-16">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:gap-8">
            <div className="flex flex-col pt-1 lg:pt-2">
              <p className="font-raleway text-[11px] uppercase tracking-[0.28em] text-[#9b5e41]">
                Comprendre le fonctionnement
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.9] text-[#2c1a10] md:text-[68px]">
                Pourquoi un poêle de masse ?
              </h1>
              <p className="mt-4 max-w-2xl font-raleway text-base leading-7 text-[#594233] md:text-[18px]">
                Un poêle à bois réfractaire, conçu pour brûler fort pendant peu
                de temps, stocker l'énergie dans sa masse et restituer une
                chaleur douce pendant des heures.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-[56px] items-center justify-center border border-[#4a3428] bg-transparent px-7 py-3 font-raleway text-[11px] font-bold uppercase tracking-[0.2em] text-[#2c1a10] transition hover:bg-[#f5ebdf]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-14 grid max-w-2xl gap-3 sm:grid-cols-3">
                <div className="border border-[#d7c3ae] bg-[#faf3e8] px-4 py-4 shadow-[5px_5px_0_#2c1a10]">
                  <p className="font-raleway text-[10px] uppercase tracking-[0.18em] text-[#9b5e41]">
                    1 flambée
                  </p>
                  <p className="mt-2 font-serif text-[30px] leading-none text-[#2c1a10]">
                    1h30
                  </p>
                  <p className="mt-2 font-raleway text-[13px] leading-6 text-[#6a4d3d]">
                    souvent suffisante sur une journée normale
                  </p>
                </div>
                <div className="border border-[#d7c3ae] bg-[#faf3e8] px-4 py-4 shadow-[5px_5px_0_#2c1a10]">
                  <p className="font-raleway text-[10px] uppercase tracking-[0.18em] text-[#9b5e41]">
                    Rendement réel
                  </p>
                  <p className="mt-2 font-serif text-[30px] leading-none text-[#2c1a10]">
                    85%
                  </p>
                  <p className="mt-2 font-raleway text-[13px] leading-6 text-[#6a4d3d]">
                    avec un feu vif, propre et performant
                  </p>
                </div>
                <div className="border border-[#d7c3ae] bg-[#faf3e8] px-4 py-4 shadow-[5px_5px_0_#2c1a10]">
                  <p className="font-raleway text-[10px] uppercase tracking-[0.18em] text-[#9b5e41]">
                    Confort
                  </p>
                  <p className="mt-2 font-serif text-[30px] leading-none text-[#2c1a10]">
                    12-24h
                  </p>
                  <p className="mt-2 font-raleway text-[13px] leading-6 text-[#6a4d3d]">
                    de restitution douce et stable
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex h-full flex-col overflow-hidden border border-[#d8c4b1] bg-white p-3 shadow-[5px_5px_0_#2c1a10]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f8f1e8]">
                <Image
                  src={heroImage}
                  alt="Poêle de masse en situation réelle"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 430px"
                />
              </div>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {keyBenefits.map((benefit) => (
                  <div
                    key={benefit.eyebrow}
                    className="border border-[#d7c3ae] bg-[#faf3e8] p-4"
                  >
                    <p className="font-raleway text-[11px] uppercase tracking-[0.2em] text-[#9b5e41]">
                      {benefit.eyebrow}
                    </p>
                    <p className="mt-2 font-raleway text-[16px] font-semibold leading-[1.4] text-[#3b261a] md:text-[17px]">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid auto-rows-fr gap-4 lg:grid-cols-[1fr_1fr]">
            <InfoCard
              eyebrow="Fonctionnement"
              title="Un feu vif, puis une chaleur lente et durable"
            >
              <p>
                Le poêle de masse reprend la logique des anciens fours à pain :
                on fait une flambée puissante, on emmagasine cette énergie dans
                la masse, puis on profite d'une restitution progressive pendant
                12 à 24 heures.
              </p>
              <ul className="mt-4 space-y-2.5">
                {fonctionnementPoints.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[#cb664a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard
              eyebrow="Vue thermique"
              title="Voir la chaleur au lieu de seulement l'imaginer"
            >
              <div className="overflow-hidden border border-[#d7c3ae] bg-[#f5eadc] p-4 md:p-6">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#efe2d1]">
                  <Image
                    src={thermalImage}
                    alt="Vue thermique d'un poêle de masse"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <p className="mt-4 font-raleway text-[13px] leading-6 text-[#6a4d3d] md:text-[14px]">
                  La chaleur est absorbée par la masse puis redistribuée de
                  façon rayonnante, enveloppante et beaucoup plus stable qu'avec
                  un feu continu dans un insert.
                </p>
              </div>
            </InfoCard>
          </div>

          <div className="mt-6 grid auto-rows-fr gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <InfoCard
              eyebrow="Les flambées"
              title="Une logique très différente des poêles classiques"
            >
              <p>
                Un poêle de masse est dimensionné pour fonctionner toujours avec
                un feu vif. On évite ainsi les feux étouffés, peu efficaces et
                plus polluants, souvent rencontrés avec les inserts ou poêles
                classiques alimentés au compte-gouttes.
              </p>
              <p className="mt-4">
                Quand il fait doux, on espace les flambées ou on réduit le bois.
                Quand il fait très froid, une seconde flambée peut suffire.
                Cette souplesse permet de garder un haut rendement sans devoir
                surveiller le feu en permanence.
              </p>
              <p className="mt-4">
                En pratique, cela signifie moins de bois, moins de manutention,
                moins de pollution et un confort beaucoup plus régulier dans la
                maison.
              </p>
            </InfoCard>

            <InfoCard
              eyebrow="Le confort"
              title="Une chaleur qui change réellement la sensation de la maison"
            >
              <p>
                Le feu chauffe d'abord le poêle, puis le poêle chauffe la
                maison. Cette logique inverse la sensation habituelle d'un
                chauffage qui surchauffe l'air sans vraiment réchauffer les
                surfaces autour de vous.
              </p>
              <ul className="mt-4 space-y-2.5">
                {chaleurWays.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[#7d4b34]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Résultat : des murs moins froids, une sensation de confort plus
                profonde et une maison agréable du matin au soir, avec seulement
                quelques minutes d'attention pour lancer la flambée.
              </p>
            </InfoCard>
          </div>

          <section className="mt-6 border border-[#dbc8b7] bg-[#faf3e8] p-4 shadow-[5px_5px_0_#2c1a10] md:p-5">
            <div className="flex flex-col gap-2 border-b border-[#eadccf] pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-raleway text-[11px] uppercase tracking-[0.22em] text-[#9b5e41]">
                  Schémas et vues
                </p>
                <h2 className="mt-2 font-serif text-[26px] leading-tight text-[#3b261a] md:text-[30px]">
                  Comprendre visuellement le principe
                </h2>
              </div>
              <p className="max-w-xl font-raleway text-[13px] leading-6 text-[#6a4d3d] md:text-[14px]">
                Quelques visuels pour lire le trajet de la chaleur, la place de
                la masse et les options possibles comme le four ou l'eau chaude.
              </p>
            </div>

            <ClickableGallery images={fonctionnementImages} />
          </section>

          <div className="mt-6 border-l-[6px] border-[#cb664a] bg-[#2c1a10] px-6 py-6 text-white shadow-[5px_5px_0_#9b5e41] md:px-8 md:py-7">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="font-raleway text-[11px] uppercase tracking-[0.24em] text-white/60">
                  Aller plus loin
                </p>
                <h2 className="mt-2.5 font-serif text-[26px] leading-tight md:text-[30px]">
                  Voir le poêle, se former ou passer à l'action
                </h2>
                <p className="mt-3 max-w-2xl font-raleway text-[14px] leading-7 text-white/75 md:text-[15px]">
                  Si vous voulez découvrir le confort d'un poêle de masse en
                  vrai, approfondir le sujet ou envisager une construction, les
                  accès utiles sont regroupés ici.
                </p>
              </div>

              <div className="grid gap-3 self-center sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/porte-ouverte-pdm"
                  className="ui-btn ui-btn-ghost-on-dark"
                >
                  Voir la porte ouverte
                </Link>
                <Link
                  href="/formations/poele-de-masse"
                  className="ui-btn ui-btn-ghost-on-dark"
                >
                  Voir le stage poêle de masse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
