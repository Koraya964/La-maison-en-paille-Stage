import { query } from "@/lib/db";

export const metadata = {
  title: "Réalisations",
  description:
    "Galerie photo des constructions en paille, terre et chaux réalisées par les stagiaires et André de Bouter.",
};

async function getRealisations() {
  try {
    return await query(
      "SELECT * FROM realisations ORDER BY ordre ASC, created_at DESC",
    );
  } catch {
    return [
      {
        id: 1,
        titre: "Poêle de masse Oxa-Libre",
        description: "Construction lors du stage",
        image_url: null,
        categorie: "poele_de_masse",
      },
      {
        id: 2,
        titre: "Mur en paille porteuse",
        description: "Stage paille terre chaux",
        image_url: null,
        categorie: "paille",
      },
      {
        id: 3,
        titre: "Enduit terre finition",
        description: "Atelier enduits",
        image_url: null,
        categorie: "paille",
      },
    ];
  }
}

const categorieLabels = {
  poele_de_masse: "Poêle de masse",
  paille: "Paille & Terre",
  autre: "Autre",
};

export default async function RealisationsPage() {
  const realisations = await getRealisations();

  return (
    <>
      <section className="bg-[#f5f0e8] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#8b6c47] text-xs tracking-widest uppercase font-bold mb-4">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl text-[#3d2b1f]">Réalisations</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {realisations.map((r) => (
              <article
                key={r.id}
                className="group overflow-hidden border border-stone-100"
              >
                <div className="h-64 bg-stone-100 flex items-center justify-center text-stone-400 overflow-hidden">
                  {r.image_url ? (
                    <img
                      src={r.image_url}
                      alt={r.titre || "Réalisation"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="font-serif">Photo</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="inline-block bg-[#f5f0e8] text-[#8b6c47] text-xs tracking-wider uppercase px-2 py-1 mb-3">
                    {categorieLabels[r.categorie] || r.categorie}
                  </span>
                  {r.titre && (
                    <h2 className="font-serif text-lg text-[#3d2b1f]">
                      {r.titre}
                    </h2>
                  )}
                  {r.description && (
                    <p className="text-stone-500 text-sm mt-1">
                      {r.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
