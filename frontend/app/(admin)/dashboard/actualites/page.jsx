import Link from "next/link";
import { cookies } from "next/headers";
import { fetchActualitesAdmin } from "@/lib/api/actualites";

export const metadata = { title: "Actualités" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getActualites() {
  try {
    const cookieHeader = cookies().toString();
    return await fetchActualitesAdmin(cookieHeader);
  } catch {
    return [];
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardActualitesPage() {
  const actualites = await getActualites();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#3d2b1f]">Actualités</h1>
          <p className="text-stone-500 mt-1">{actualites.length} article(s)</p>
        </div>
        <Link href="/dashboard/actualites/nouvelle" className="btn-primary">
          + Nouvelle actualité
        </Link>
      </div>

      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        {actualites.length === 0 ? (
          <div className="p-16 text-center text-stone-400 font-serif text-lg">
            Aucune actualité pour le moment.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Titre
                </th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {actualites.map((news) => (
                <tr
                  key={news.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#3d2b1f] truncate max-w-xs">
                      {news.titre}
                    </p>
                    <p className="text-stone-400 text-xs mt-0.5 truncate max-w-xs">
                      {news.contenu?.slice(0, 80)}…
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block text-xs tracking-wider uppercase px-2 py-1 ${
                        news.publie
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {news.publie ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-500">
                    {formatDate(news.created_at)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/actualites/${news.id}`}
                      className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
                    >
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
