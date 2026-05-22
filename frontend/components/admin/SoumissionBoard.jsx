"use client";
// components/admin/SoumissionsBoard.jsx

import { useState } from "react";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL;

const CATEGORIE_LABELS = {
  poele_de_masse: "Poêle de masse",
  paille: "Paille",
  autre: "Autre",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Carte soumission ──
function SoumissionCard({ soumission, onRemove }) {
  const [loading, setLoading] = useState(false);

  async function handleAction(action) {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/soumissions/${soumission.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        console.error("Erreur modération →", res.status, await res.text());
        return;
      }
      // Disparaît du board dans les deux cas
      onRemove(soumission.id);
    } catch (err) {
      console.error("Fetch échoué →", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Supprimer définitivement cette soumission ?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/soumissions/${soumission.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Erreur suppression →", res.status, await res.text());
        return;
      }
      onRemove(soumission.id);
    } catch (err) {
      console.error("Fetch échoué →", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="bg-white rounded-xl border overflow-hidden flex flex-col"
      style={{ borderColor: "#e2dbd0" }}
    >
      {/* Photo */}
      <div className="relative aspect-video bg-stone-100">
        <Image
          src={soumission.image_url}
          alt={soumission.titre || `Photo de ${soumission.nom}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase font-bold"
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {CATEGORIE_LABELS[soumission.categorie] || soumission.categorie}
        </div>
      </div>

      {/* Infos */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          {soumission.titre && (
            <p
              className="text-sm font-bold mb-0.5"
              style={{ color: "#3d1a0e" }}
            >
              {soumission.titre}
            </p>
          )}
          <p className="text-[11px]" style={{ color: "#9a8070" }}>
            {soumission.nom} · {soumission.email}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "#c8bfb0" }}>
            {formatDate(soumission.created_at)}
          </p>
          {soumission.description && (
            <p
              className="text-xs mt-2 leading-relaxed line-clamp-2"
              style={{ color: "#9a8070" }}
            >
              {soumission.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => handleAction("approuver")}
            disabled={loading}
            className="flex-1 py-2 text-[9px] tracking-[0.15em] uppercase font-bold text-white rounded-lg transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "#8aab7a" }}
          >
            ✓ Approuver
          </button>
          <button
            onClick={() => handleAction("rejeter")}
            disabled={loading}
            className="flex-1 py-2 text-[9px] tracking-[0.15em] uppercase font-bold rounded-lg transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "#f5f0e8", color: "#9a8070" }}
          >
            ✕ Rejeter
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-3 py-2 text-[9px] tracking-[0.15em] uppercase font-bold rounded-lg transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "#f5f0e8", color: "#c8bfb0" }}
            title="Supprimer définitivement"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Board principal ──
export default function SoumissionsBoard({ enAttente: initial }) {
  const [soumissions, setSoumissions] = useState(initial);

  function handleRemove(id) {
    setSoumissions((prev) => prev.filter((s) => s.id !== id));
  }

  if (soumissions.length === 0) {
    return (
      <div
        className="py-24 text-center rounded-2xl border border-dashed"
        style={{ borderColor: "#e2dbd0" }}
      >
        <p className="font-serif text-xl mb-2" style={{ color: "#c8bfb0" }}>
          Aucune soumission en attente.
        </p>
        <p className="text-sm" style={{ color: "#d6d3d1" }}>
          Les photos envoyées par vos clients apparaîtront ici.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {soumissions.map((s) => (
        <SoumissionCard key={s.id} soumission={s} onRemove={handleRemove} />
      ))}
    </div>
  );
}
