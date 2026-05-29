import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "André de Bouter — Formateur | La Maison en Paille",
  description:
    "André de Bouter anime des stages de construction naturelle depuis 25 ans. Paille, terre, chaux et poêle de masse à Saint-Simeux (Charente).",
};

const portraitImage =
  "https://static.wixstatic.com/media/3e33e8_89704475eb22418a9ce29fac9ee5d9a5~mv2.jpg/v1/crop/x_0,y_3,w_1200,h_875/fill/w_900,h_656,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Andre_coupe-bd.jpg";

const logosImage =
  "https://static.wixstatic.com/media/f4c673_98c827703b1246fdbab9610f4d94253f~mv2.jpg/v1/crop/x_359,y_87,w_320,h_194/fill/w_435,h_272,al_c,lg_1,q_80,enc_avif,quality_auto/f4c673_98c827703b1246fdbab9610f4d94253f~mv2.jpg";

const experienceFacts = [
  "2500 professionnels et particuliers formés",
  "15000 livres entre vos mains",
];

const engagedItems = [
  "Formateur : PAILLE, TERRE & CHAUX - depuis 2001",
  "Formateur : POÊLE DE MASSE Open Source - depuis 2004",
  "Création du 1er site web francophone sur la construction en paille et le poêle de masse - 2000",
  "Auteur / éditeur de 3 ouvrages sur la construction paille et les enduits terre",
  "Initié la création du RFCP - 2006, Réseau Français de la Construction Paille",
  "Participation à l'écriture des Règles professionnelles de la construction en paille - 2012",
  "Membre de l'AFPMA - 2015, Association Française Poêle Maçonné Artisanal",
];

const passionItems = [
  "la construction paille",
  "le poêle de masse : chauffage / cuisine / eau chaude",
  "la terre crue : enduits, murs, sols, peintures et sculptures",
  "la chaux : enduits, peintures, fresco",
];

const autodidactItems = [
  "Formé en France, Pays-Bas, États-Unis, Canada, Allemagne, Autriche, Inde, Slovaquie et Maroc",
  "Expérience concrète de mes réalisations : construction en bottes de paille, enduits, poêles de masse, rénovation et décoration",
  "Littérature et apprentissages en français, anglais, allemand et néerlandais",
];

const keywords = [
  "Beauté",
  "Technique",
  "Santé",
  "Efficacité",
  "Écologie",
  "Éthique",
  "Confort",
  "Abordable",
  "Plaisir",
  "Solide",
  "Respect",
  "Social",
  "Partage",
];

const quickLinks = [
  { label: "Pourquoi un poêle de masse ?", href: "/ressources" },
  { label: "Vos réalisations", href: "/realisations" },
  { label: "Livres", href: "/livres" },
];

const expertiseTags = [
  "Construction paille",
  "Poêle de masse",
  "Terre crue",
  "Chaux",
];

export default function AndreDeBouterPage() {
  return (
    <>
      {/* Grain overlay — donne un aspect papier/matière à toute la page */}
      <svg
        className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.045]"
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <section className="bg-[#ede0ce] px-6 pb-20 pt-10 md:px-10 md:pt-16">
        <div className="mx-auto max-w-6xl">
          {/* ── HERO ── */}
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">
            <div className="flex flex-col justify-center">
              <p className="font-raleway text-[10px] font-semibold uppercase tracking-[0.34em] text-[#9b5e41]">
                Formateur · Auteur · Éditeur
              </p>
              <h1 className="mt-5 font-serif text-5xl italic leading-[0.9] text-[#2c1a10] md:text-[68px]">
                André
                <br />
                de Bouter
              </h1>
              <div className="mt-5 h-[3px] w-20 bg-[#cb664a]" />
              <p className="mt-5 max-w-xl font-raleway text-[16px] leading-7 text-[#4e3323] md:text-[17px]">
                Vous aide à la concrétisation de votre projet.
              </p>

              {/* Tags expertise — solides, pas transparents */}
              <div className="mt-6 flex flex-wrap gap-2">
                {expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#2c1a10] px-3 py-1.5 font-raleway text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f0e4d4]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Liens rapides — style éditorial, soulignés */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-[#cb664a] pb-0.5 font-raleway text-[10px] uppercase tracking-[0.14em] text-[#7c432b] transition-colors hover:border-[#2c1a10] hover:text-[#2c1a10]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Portrait — ombre décalée style tampon */}
            <div className="relative self-start">
              <div className="relative bg-white p-3 shadow-[5px_5px_0_#2c1a10]">
                <div className="relative aspect-[9/5.9] overflow-hidden">
                  <Image
                    src={portraitImage}
                    alt="Portrait d'André de Bouter"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                    priority
                  />
                </div>
                <div className="grid gap-2 pt-3 sm:grid-cols-2">
                  {experienceFacts.map((fact) => (
                    <div key={fact} className="bg-[#ede0ce] p-3.5">
                      <p className="font-raleway text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9b5e41]">
                        25 ans d'expérience
                      </p>
                      <p className="mt-2 font-serif text-[22px] leading-tight text-[#2c1a10]">
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── CARDS GRID ── chaque card a son propre caractère */}
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {/* Card 1 : Engagé — fond sombre, ombre terracotta */}
            <div className="bg-[#2c1a10] p-7 shadow-[5px_5px_0_#9b5e41] md:p-8">
              <p className="font-raleway text-[10px] font-semibold uppercase tracking-[0.3em] text-[#cb664a]">
                Engagé
              </p>
              <h2 className="mt-3 font-serif text-[26px] italic leading-tight text-white md:text-[30px]">
                Un parcours construit sur la durée
              </h2>
              <ul className="mt-6 space-y-3">
                {engagedItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 flex-none bg-[#cb664a]" />
                    <span className="font-raleway text-[13px] leading-6 text-white/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 : Passionné — plein terracotta */}
            <div className="bg-[#cb664a] p-7 shadow-[5px_5px_0_#2c1a10] md:p-8">
              <p className="font-raleway text-[10px] font-semibold uppercase tracking-[0.3em] text-white/65">
                Passionné
              </p>
              <h2 className="mt-3 font-serif text-[26px] italic leading-tight text-white md:text-[30px]">
                Transmettre des techniques efficaces et abordables
              </h2>
              <p className="mt-4 font-raleway text-[13px] leading-6 text-white/85">
                D'apprendre, tester et transmettre des techniques efficaces,
                confortables et abordables que sont :
              </p>
              <ul className="mt-4 space-y-3">
                {passionItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 flex-none bg-white" />
                    <span className="font-raleway text-[13px] leading-6 text-white">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 : Mots clés — parchemin avec bordure encadrée, légèrement inclinée */}
            <div className="rotate-[-0.4deg] border-2 border-[#2c1a10] bg-[#f5e9d8] p-7 shadow-[5px_5px_0_#2c1a10] md:p-8">
              <p className="font-raleway text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9b5e41]">
                Mots clés
              </p>
              <h2 className="mt-3 font-serif text-[26px] italic leading-tight text-[#2c1a10] md:text-[30px]">
                Une ligne de conduite claire
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {keywords.map((word) => (
                  <span
                    key={word}
                    className="border border-[#2c1a10] px-3 py-1.5 font-raleway text-[10px] uppercase tracking-[0.16em] text-[#2c1a10]"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 4 : Autodidacte — bordure gauche épaisse, fond naturel */}
            <div className="border-l-[5px] border-[#cb664a] bg-[#faf3e8] p-7 pl-6 shadow-[5px_5px_0_#2c1a10] md:p-8 md:pl-7">
              <p className="font-raleway text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9b5e41]">
                Autodidacte
              </p>
              <h2 className="mt-3 font-serif text-[26px] italic leading-tight text-[#2c1a10] md:text-[30px]">
                Une pratique nourrie par le terrain et l'apprentissage
              </h2>
              <ul className="mt-5 space-y-3">
                {autodidactItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 flex-none bg-[#cb664a]" />
                    <span className="font-raleway text-[13px] leading-6 text-[#4a3222]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border border-[#c9b49a] bg-[#ede0ce] p-2">
                <div className="relative aspect-[435/272] overflow-hidden">
                  <Image
                    src={logosImage}
                    alt="Logos et références de formation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA — ombre décalée, terracotta */}
          <div className="mt-8 bg-[#cb664a] px-7 py-8 shadow-[5px_5px_0_#2c1a10] md:px-9 md:py-9">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="font-raleway text-[10px] font-semibold uppercase tracking-[0.3em] text-white/65">
                  Aller plus loin
                </p>
                <h2 className="mt-3 font-serif text-[26px] italic leading-tight text-white md:text-[30px]">
                  Accéder directement aux contenus liés à André
                </h2>
                <p className="mt-3 max-w-2xl font-raleway text-[13px] leading-7 text-white/85">
                  Porte ouverte, poêle de masse, réalisations et livres : les
                  accès utiles sont regroupés ici pour aller à l'essentiel.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex w-full items-center justify-center border border-white/45 bg-[linear-gradient(90deg,#6b3a2a_0%,#5f3125_48%,#774126_100%)] px-5 py-4 text-center font-raleway text-[11px] font-bold uppercase tracking-[0.2em] text-white transition duration-200 hover:brightness-110"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
