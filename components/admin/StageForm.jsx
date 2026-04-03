"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FORMATIONS = [
  { id: 1, titre: "Paille, Terre & Chaux" },
  { id: 2, titre: "Poêle de Masse" },
  { id: 3, titre: "Autonomie Photovoltaïque" },
];

const STATUTS = [
  { value: "ouvert", label: "Ouvert" },
  { value: "complet", label: "Complet" },
  { value: "liste_attente", label: `Liste d'attente` },
  { value: "annule", label: "Annulé" },
];

export default function StageForm({ stage = null }) {
  const router = useRouter();
  const isEdit = !!stage;

  const [form, setForm] = useState({
    formation_id: stage?.formation_id || "",
    date_debut: stage?.date_debut?.slice(0, 10) || "",
    date_fin: stage?.date_fin?.slice(0, 10) || "",
    places_total: stage?.places_total || 10,
    places_dispo: stage?.places_dispo ?? stage?.places_total ?? 10,
    statut: stage?.statut || "ouvert",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEdit ? `/api/stages/${stage.id}` : "/api/stages";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          formation_id: Number(form.formation_id),
          places_total: Number(form.places_total),
          places_dispo: Number(form.places_dispo),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur serveur");
      }

      router.push("/dashboard/stages");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (
      !confirm(
        "Supprimer ce stage ? Les inscriptions associées seront également supprimées.",
      )
    )
      return;
    setLoading(true);

    try {
      const res = await fetch(`/api/stages/${stage.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      router.push("/dashboard/stages");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Formation *
        </label>
        <select
          name="formation_id"
          value={form.formation_id}
          onChange={handleChange}
          required
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] bg-white"
        >
          <option value="">— Choisir une formation —</option>
          {FORMATIONS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.titre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
            Date de début *
          </label>
          <input
            type="date"
            name="date_debut"
            value={form.date_debut}
            onChange={handleChange}
            required
            className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
            Date de fin *
          </label>
          <input
            type="date"
            name="date_fin"
            value={form.date_fin}
            onChange={handleChange}
            required
            className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
            Places totales
          </label>
          <input
            type="number"
            name="places_total"
            value={form.places_total}
            onChange={handleChange}
            min={1}
            max={50}
            className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
            Places disponibles
          </label>
          <input
            type="number"
            name="places_dispo"
            value={form.places_dispo}
            onChange={handleChange}
            min={0}
            max={form.places_total}
            className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Statut
        </label>
        <select
          name="statut"
          value={form.statut}
          onChange={handleChange}
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] bg-white"
        >
          {STATUTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading
              ? "Enregistrement…"
              : isEdit
                ? "Enregistrer"
                : "Créer le stage"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-outline"
          >
            Annuler
          </button>
        </div>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-xs tracking-widest uppercase font-bold text-red-500 hover:text-red-700 transition-colors"
          >
            Supprimer
          </button>
        )}
      </div>
    </form>
  );
}
