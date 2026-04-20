import { notFound } from "next/navigation";
import NewsForm from "@/components/admin/NewsForm";

export const metadata = { title: "Modifier une actualité" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getActualite(id) {
  try {
    const res = await fetch(`${API}/api/actualites/${id}`, {
      credentials: "include",
      cache: "no-store",
    });
    return res.ok ? res.json() : null;
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
