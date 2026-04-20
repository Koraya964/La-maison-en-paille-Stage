import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import AuthGuard from "@/components/admin/AuthGuard";
import StageForm from "@/components/admin/StageForm";
import { fetchInscriptionsByStage } from "@/lib/api/inscriptions";

export const metadata = { title: "Modifier un stage" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getStage(id, cookieHeader) {
  try {
    const res = await fetch(`${API}/api/stages/${id}`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function EditStagePage({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";

  const [stage, inscrits] = await Promise.all([
    getStage(params.id, cookieHeader),
    fetchInscriptionsByStage(params.id, cookieHeader).catch(() => []),
  ]);

  if (!stage) notFound();

  return (
    <AuthGuard>
      <div className="p-8">
        <h1 className="font-serif text-3xl text-[#3d2b1f] mb-2">
          Modifier le stage
        </h1>
        <p className="text-stone-500 mb-8 text-sm">{stage.formation_titre}</p>

        <StageForm stage={stage} />

        {/* Inscrits confirmés */}
        <div className="mt-10">
          <h2 className="font-serif text-xl text-[#3d2b1f] mb-4">
            Inscrits confirmés ({inscrits.length})
          </h2>

          {inscrits.length === 0 ? (
            <p className="text-stone-400 text-sm">
              Aucun inscrit confirmé pour ce stage.
            </p>
          ) : (
            <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                      Prénom
                    </th>
                    <th className="px-6 py-3 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                      Téléphone
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {inscrits.map((i, idx) => (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="px-6 py-3 font-medium text-[#3d2b1f]">
                        {i.nom}
                      </td>
                      <td className="px-6 py-3 text-stone-600">{i.prenom}</td>
                      <td className="px-6 py-3 text-stone-600">{i.email}</td>
                      <td className="px-6 py-3 text-stone-600">
                        {i.telephone || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
