import Link from "next/link";
// import { query } from '@/lib/db' à modfier, en cause : les changement d'archi

export const metadata = { title: "Réalisations" };

async function getRealisations() {
  try {
    return await query(
      "SELECT * FROM realisations ORDER BY ordre ASC, created_at DESC",
    );
  } catch {
    return [];
  }
}

export default async function DashboardRealisationsPage() {
  const realisations = await getRealisations();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#3d2b1f]">Réalisations</h1>
          <p className="text-stone-500 mt-1">{realisations.length} photo(s)</p>
        </div>
        <Link href="/dashboard/realisations/nouvelle" className="btn-primary">
          + Uploader une photo
        </Link>
      </div>

      {realisations.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-16 text-center text-stone-400 font-serif text-lg">
          Aucune photo pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {realisations.map((r) => (
            <Link
              key={r.id}
              href={`/dashboard/realisations/${r.id}`}
              className="group relative block"
            >
              <div className="aspect-square bg-stone-200 overflow-hidden">
                {r.image_url ? (
                  <img
                    src={r.image_url}
                    alt={r.titre || "Réalisation"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
                    Pas d'image
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-[#3d2b1f] opacity-0 group-hover:opacity-60 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs tracking-widest uppercase font-bold">
                  Modifier
                </span>
              </div>
              {r.titre && (
                <p className="text-xs text-stone-600 mt-1 truncate">
                  {r.titre}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
