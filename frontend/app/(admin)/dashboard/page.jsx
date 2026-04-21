import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import { cookies } from "next/headers";

export const metadata = { title: "Vue générale" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getStats() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Cookie: `auth_token=${token}` }),
  };

  try {
    const [inscriptions, stages, actualites, realisations] = await Promise.all([
      fetch(`${API}/api/inscriptions`, { headers, cache: "no-store" }).then(
        (r) => r.json(),
      ),
      fetch(`${API}/api/stages/all`, { headers, cache: "no-store" }).then((r) =>
        r.json(),
      ),
      fetch(`${API}/api/actualites/all`, { headers, cache: "no-store" }).then(
        (r) => r.json(),
      ),
      fetch(`${API}/api/realisations`, { headers, cache: "no-store" }).then(
        (r) => r.json(),
      ),
    ]);

    return {
      inscriptionsEnAttente: inscriptions.filter(
        (i) => i.statut === "en_attente",
      ).length,
      stagesOuverts: stages.filter((s) => s.statut === "ouvert").length,
      actualites: actualites.length,
      realisations: realisations.length,
    };
  } catch {
    return {
      inscriptionsEnAttente: 0,
      stagesOuverts: 0,
      actualites: 0,
      realisations: 0,
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    {
      titre: "Inscriptions en attente",
      valeur: stats.inscriptionsEnAttente,
      href: "/dashboard/inscriptions",
      couleur: "bg-amber-50 border-amber-200",
      accent: "text-amber-700",
    },
    {
      titre: "Stages ouverts",
      valeur: stats.stagesOuverts,
      href: "/dashboard/stages",
      couleur: "bg-green-50 border-green-200",
      accent: "text-green-700",
    },
    {
      titre: "Actualités",
      valeur: stats.actualites,
      href: "/dashboard/actualites",
      couleur: "bg-blue-50 border-blue-200",
      accent: "text-blue-700",
    },
    {
      titre: "Photos galerie",
      valeur: stats.realisations,
      href: "/dashboard/realisations",
      couleur: "bg-purple-50 border-purple-200",
      accent: "text-purple-700",
    },
  ];

  return (
    <AuthGuard>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-[#3d2b1f]">Bonjour André</h1>
          <p className="text-stone-500 mt-1">Voici un résumé de votre site.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card) => (
            <Link
              key={card.titre}
              href={card.href}
              className={`p-6 border rounded-lg ${card.couleur} hover:shadow-md transition-shadow`}
            >
              <p className="text-sm text-stone-500 mb-2">{card.titre}</p>
              <p className={`font-serif text-4xl ${card.accent}`}>
                {card.valeur}
              </p>
            </Link>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <h2 className="font-serif text-xl text-[#3d2b1f] mb-5">
            Actions rapides
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/actualites/nouvelle"
              className="btn-primary text-sm"
            >
              + Nouvelle actualité
            </Link>
            <Link
              href="/dashboard/stages/nouveau"
              className="btn-primary text-sm"
            >
              + Nouveau stage
            </Link>
            <Link
              href="/dashboard/realisations/nouvelle"
              className="btn-primary text-sm"
            >
              + Uploader une photo
            </Link>
            <Link
              href="/dashboard/inscriptions"
              className="btn-outline text-sm"
            >
              Voir les inscriptions
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
