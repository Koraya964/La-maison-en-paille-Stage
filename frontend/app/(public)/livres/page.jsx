import BookCarousel from "@/components/public/BookCarousel";

export const metadata = {
  title: "Livres | La Maison en Paille",
  description:
    "Les livres écrits et édités par André de Bouter sur la construction en paille, les enduits terre et chaux.",
};

const pagesBatir = [
  {
    src: "https://www.librairie-permaculturelle.fr/20653-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Bâtir en Paille – page 1",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20654-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Bâtir en Paille – page 2",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20655-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Bâtir en Paille – page 3",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20656-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Bâtir en Paille – page 4",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20657-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Bâtir en Paille – page 5",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20658-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Bâtir en Paille – page 6",
  },
];

const pagesConcevoir = [
  {
    src: "https://www.librairie-permaculturelle.fr/20659-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Concevoir des bâtiments en bottes de paille – page 1",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20660-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Concevoir des bâtiments en bottes de paille – page 2",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20661-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Concevoir des bâtiments en bottes de paille – page 3",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20662-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Concevoir des bâtiments en bottes de paille – page 4",
  },
  {
    src: "https://www.librairie-permaculturelle.fr/20663-large_default/livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.jpg",
    alt: "Concevoir des bâtiments en bottes de paille – page 5",
  },
];

export default function LivresPage() {
  return (
    <section className="relative overflow-hidden bg-[#f4eadf] px-6 py-8 md:px-10 md:py-12">
      {/* Grain overlay — texture papier */}
      <svg
        className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.045]"
        aria-hidden="true"
      >
        <filter id="grain-livres">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-livres)" />
      </svg>
      <div className="absolute inset-x-0 top-0 h-[320px] bg-[radial-gradient(circle_at_top_left,_rgba(201,102,74,0.24),_transparent_50%),radial-gradient(circle_at_top_right,_rgba(98,58,39,0.18),_transparent_42%)]" />

      <div className="relative mx-auto max-w-6xl">
        <p className="font-raleway text-[11px] uppercase tracking-[0.28em] text-[#9b5e41]">
          Publications d'André de Bouter
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.9] text-[#352116] md:text-[68px]">
          Livres
        </h1>
        <p className="mt-4 max-w-2xl font-raleway text-base leading-7 text-[#594233]">
          <span>Disponibles chez la </span>
          <a
            href="https://www.librairie-permaculturelle.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#7c432b]"
          >
            Librairie PERMA Culturelle
          </a>
          <span>, LA Maison d'édition en permaculture.</span>
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Livre 1 */}
          <div className="h-full overflow-hidden rounded-[22px] border-2 border-[#3b261a] bg-[#f7efe3] p-4 shadow-[4px_4px_0_#3b261a] md:p-5">
            <BookCarousel images={pagesBatir} />
            <div className="mt-4 flex flex-1 flex-col">
              <h2 className="min-h-[130px] font-serif text-[40px] leading-[1.04] text-[#2d1c12]">
                Bâtir en Paille
              </h2>
              <p className="mt-1 font-raleway text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a15f3f]">
                Guide pratique de la construction en bottes de paille
              </p>
              <p className="mt-3 font-raleway text-[14px] leading-8 text-[#4a3428]">
                Concret, pragmatique et pédagogique. Une bonne entrée en matière
                des diverses techniques de construction en paille, enduits terre
                et chaux.
              </p>
              <a
                href="https://www.librairie-permaculturelle.fr/construction/2717-livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center self-start bg-[#2d1c12] px-6 py-2.5 font-raleway text-[9px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#20140d]"
              >
                Commander
              </a>
            </div>
          </div>

          {/* Livre 2 */}
          <div className="h-full overflow-hidden rounded-[22px] border-2 border-[#3b261a] bg-[#f7efe3] p-4 shadow-[4px_4px_0_#3b261a] md:p-5">
            <BookCarousel images={pagesConcevoir} />
            <div className="mt-4 flex flex-1 flex-col">
              <h2 className="min-h-[130px] font-serif text-[40px] leading-[1.04] text-[#2d1c12]">
                Concevoir des bâtiments en bottes de paille
              </h2>
              <p className="mt-1 font-raleway text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a15f3f]">
                La seule édition scientifique mondiale du domaine
              </p>
              <p className="mt-3 font-raleway text-[14px] leading-8 text-[#4a3428]">
                Pour ceux qui veulent comprendre la matière en profondeur plutôt
                que de simplement suivre des règles. Une référence
                incontournable.
              </p>
              <a
                href="https://www.librairie-permaculturelle.fr/construction/2718-livre-batir-en-paille-guide-pratique-de-la-construction-en-bottes-de-paille-andre-de-bouter.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center self-start bg-[#2d1c12] px-6 py-2.5 font-raleway text-[9px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#20140d]"
              >
                Commander
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
