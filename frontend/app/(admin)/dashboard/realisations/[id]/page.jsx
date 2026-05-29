"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "poele_de_masse", label: "Poêle de masse" },
  { value: "paille", label: "Paille & Terre" },
  { value: "autre", label: "Autre" },
];

export default function EditRealisationPage({ params }) {
  const router = useRouter();
  const [realisation, setRealisation] = useState(null);
  const [form, setForm] = useState({
    titre: "",
    description: "",
    categorie: "autre",
    ordre: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/realisations/${params.id}`, {
      credentials: "include", // envoie le cookie auth pour valider le requireAuth
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Erreur ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setRealisation(data);
        setForm({
          titre: data.titre || "",
          description: data.description || "",
          categorie: data.categorie || "autre",
          ordre: data.ordre || 0,
          image_url: data.image_url || "",
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/realisations/${params.id}`, {
        method: "PUT",
        credentials: "include", // ← cookie auth
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      router.push("/dashboard/realisations");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Supprimer cette photo définitivement ?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/realisations/${params.id}`, {
        method: "DELETE",
        credentials: "include", // ← cookie auth
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      router.push("/dashboard/realisations");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  // ── États ──────────────────────────────────────────────

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-stone-400 animate-pulse">Chargement…</p>
      </div>
    );
  }

  if (error || !realisation) {
    return (
      <div className="p-8">
        <p className="text-red-500 text-sm">
          {error || "Réalisation introuvable."}
        </p>
        <button onClick={() => router.back()} className="mt-4 btn-outline">
          Retour
        </button>
      </div>
    );
  }

  // ── Rendu ──────────────────────────────────────────────

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-[#3d2b1f] mb-8">
        Modifier la photo
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-3xl">
        {/* Aperçu */}
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-500 font-bold mb-3">
            Aperçu
          </p>
          {realisation.image_url ? (
            <img
              src={realisation.image_url}
              alt={realisation.titre || ""}
              className="w-full h-64 object-cover border border-stone-200 rounded-lg"
            />
          ) : (
            <div className="h-64 bg-stone-100 rounded-lg flex items-center justify-center text-stone-400 text-sm">
              Pas d'image
            </div>
          )}
          <p className="text-xs text-stone-400 mt-2 break-all">
            {realisation.image_url}
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
              Titre
            </label>
            <input
              type="text"
              value={form.titre}
              onChange={(e) =>
                setForm((p) => ({ ...p, titre: e.target.value }))
              }
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] rounded"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              rows={3}
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] resize-none rounded"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
              Catégorie
            </label>
            <select
              value={form.categorie}
              onChange={(e) =>
                setForm((p) => ({ ...p, categorie: e.target.value }))
              }
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] bg-white rounded"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
              Ordre d'affichage
            </label>
            <input
              type="number"
              value={form.ordre}
              min={0}
              onChange={(e) =>
                setForm((p) => ({ ...p, ordre: Number(e.target.value) }))
              }
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] rounded"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? "Enregistrement…" : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-outline"
              >
                Annuler
              </button>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="text-xs tracking-widest uppercase font-bold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
