import { query } from "@/lib/db";
import InscriptionTable from "@/frontend/components/admin/InscriptionTable";

export const metadata = { title: "Inscriptions" };

async function getInscriptions() {
  try {
    return await query(`
      SELECT i.*, s.date_debut, s.date_fin, f.titre as formation_titre
      FROM inscriptions i
      JOIN stages s ON i.stage_id = s.id
      JOIN formations f ON s.formation_id = f.id
      ORDER BY i.created_at DESC
    `);
  } catch {
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
