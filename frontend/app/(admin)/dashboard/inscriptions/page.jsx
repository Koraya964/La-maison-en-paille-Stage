import { cookies } from "next/headers";
import InscriptionTable from "@/components/admin/InscriptionTable";

export const metadata = { title: "Inscriptions" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getInscriptions() {
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API}/api/inscriptions`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
      // ← pas de credentials: 'include' côté serveur
    });

    if (!res.ok) {
      console.error("getInscriptions →", res.status, await res.text());
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("getInscriptions fetch échoué →", err);
    return [];
  }
}

export default async function DashboardInscriptionsPage() {
  const inscriptions = await getInscriptions();

  const enAttente = inscriptions.filter(
    (i) => i.statut === "en_attente",
  ).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#3d2b1f]">Inscriptions</h1>
          <p className="text-stone-500 mt-1">
            {inscriptions.length} inscription(s) — {enAttente} en attente de
            confirmation
          </p>
        </div>
      </div>

      {/* Résumé rapide */}
      {enAttente > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800 flex items-center gap-3">
          <span className="text-amber-500 text-lg">⚠</span>
          <span>
            <strong>{enAttente} inscription(s)</strong> en attente nécessitent
            votre attention.
          </span>
        </div>
      )}

      <InscriptionTable inscriptions={inscriptions} />
    </div>
  );
}
