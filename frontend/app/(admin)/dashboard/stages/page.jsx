import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import { cookies } from "next/headers";
import { fetchStagesAdmin } from "@/lib/api/stages";

export const metadata = { title: "Stages" };

const statutColors = {
  ouvert: "bg-green-100 text-green-700",
  complet: "bg-red-100 text-red-700",
  liste_attente: "bg-amber-100 text-amber-700",
  annule: "bg-stone-100 text-stone-500",
  termine: "bg-gray-100 text-stone-500",
};

const statutLabels = {
  ouvert: "Ouvert",
  complet: "Complet",
  liste_attente: "Liste d'attente",
  annule: "Annulé",
  termine: "Terminé",
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function DashboardStagesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";

  let stages = [];
  try {
    stages = await fetchStagesAdmin(cookieHeader);
  } catch {
    stages = [];
  }

  return (
    <AuthGuard>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#3d2b1f]">Stages</h1>
            <p className="text-stone-500 mt-1">
              {stages.length} session(s) programmée(s)
            </p>
          </div>
          <Link href="/dashboard/stages/nouveau" className="btn-primary">
            + Nouveau stage
          </Link>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
          {stages.length === 0 ? (
            <div className="p-16 text-center text-stone-400 font-serif text-lg">
              Aucun stage programmé.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                    Formation
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                    Places
                  </th>
                  <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-right text-xs tracking-widest uppercase text-stone-500 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {stages.map((stage) => (
                  <tr
                    key={stage.id}
                    className="hover:bg-stone-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[#3d2b1f]">
                      {stage.formation_titre}
                    </td>
                    <td className="px-6 py-4 text-stone-500">
                      {formatDate(stage.date_debut)} →{" "}
                      {formatDate(stage.date_fin)}
                    </td>
                    <td className="px-6 py-4 text-stone-500">
                      {stage.places_dispo} / {stage.places_total}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-xs tracking-wider uppercase px-2 py-1 ${statutColors[stage.statut]}`}
                      >
                        {statutLabels[stage.statut]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/stages/${stage.id}`}
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
    </AuthGuard>
  );
}
