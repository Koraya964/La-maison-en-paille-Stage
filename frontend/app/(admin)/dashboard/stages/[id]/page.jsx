import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import StageForm from "@/frontend/components/admin/StageForm";

export const metadata = { title: "Modifier un stage" };

async function getStage(id) {
  try {
    const rows = await query(
      `
      SELECT s.*, f.titre as formation_titre
      FROM stages s JOIN formations f ON s.formation_id = f.id
      WHERE s.id = ?
    `,
      [id],
    );
    return rows[0] || null;
  } catch {
    return null;
  }
}

export default async function EditStagePage({ params }) {
  const stage = await getStage(params.id);
  if (!stage) notFound();

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-[#3d2b1f] mb-2">
        Modifier le stage
      </h1>
      <p className="text-stone-500 mb-8 text-sm">{stage.formation_titre}</p>
      <StageForm stage={stage} />
    </div>
  );
}
