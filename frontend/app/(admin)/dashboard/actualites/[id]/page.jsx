import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import NewsForm from "@/frontend/components/admin/NewsForm";

export const metadata = { title: "Modifier une actualité" };

async function getActualite(id) {
  try {
    const rows = await query("SELECT * FROM actualites WHERE id = ?", [id]);
    return rows[0] || null;
  } catch {
    return null;
  }
}

export default async function EditActualitePage({ params }) {
  const actualite = await getActualite(params.id);
  if (!actualite) notFound();

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-[#3d2b1f] mb-2">
        Modifier l'actualité
      </h1>
      <p className="text-stone-500 mb-8 text-sm">{actualite.titre}</p>
      <NewsForm actualite={actualite} />
    </div>
  );
}
