import Link from "next/link";

export const metadata = {
  title: "André de Bouter — Formateur",
  description:
    "André de Bouter anime des stages de construction naturelle depuis 25 ans. Paille, terre, chaux et poêle de masse à Saint-Simeux (Charente).",
};

export default function AndreDeBouter() {
  return (
    <>
      <section className="bg-[#3d2b1f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-[#c8a96e] text-xs tracking-widest uppercase font-bold mb-4">
            Le formateur
          </p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">
            André de Bouter
          </h1>
          <p className="text-stone-400 text-lg max-w-xl">
            Praticien et formateur en construction naturelle depuis plus de 25
            ans.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="bg-stone-200 h-96 flex items-center justify-center text-stone-400 font-serif text-lg">
                Photo André de Bouter
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-2 space-y-6 text-stone-600 leading-relaxed">
              <p>
                André de Bouter vit et travaille dans sa ferme de Charente,
                éco-rénovée avec les matériaux qu'il enseigne. Sa maison en
                paille, isolée et enduite de terre et de chaux, chauffée au
                poêle de masse Oxalis, est à la fois son lieu de vie et la
                démonstration vivante de ce qu'il transmet.
              </p>
              <p>
                Depuis plus de 25 ans, il anime des stages de construction
                naturelle — paille, terre, chaux, poêle de masse — pour des
                centaines de participants venus de toute la France et d'Europe.
              </p>
              <p>
                Son approche pédagogique repose sur la pratique et la
                transmission des compréhensions : comprendre pourquoi avant de
                savoir comment. Il accompagne chacun selon son projet, qu'il
                s'agisse d'une première rénovation ou d'un chantier
                d'autoconstruction ambitieux.
              </p>
              <p>
                André est membre de l'AFPMA (Association Française des
                Professionnels du Poêle de Masse) et du RFCP (Réseau Français de
                la Construction en Paille).
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/formations/paille-terre-chaux"
                  className="btn-primary"
                >
                  Voir les formations
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contacter André
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { chiffre: "25+", label: `années d'expérience` },
              { chiffre: "1000+", label: "stagiaires formés" },
              { chiffre: "3", label: "formations au programme" },
              { chiffre: "6 jours", label: "stage phare Paille Terre Chaux" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-serif text-4xl text-[#8b6c47] mb-2">
                  {item.chiffre}
                </p>
                <p className="text-xs tracking-widest uppercase text-stone-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
