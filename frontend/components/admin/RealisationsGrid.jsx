"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

//  Constantes

const categorieConfig = {
  poele_de_masse: { label: "Poêle de masse", dot: "#c06030" },
  paille: { label: "Paille", dot: "#8aab7a" },
  autre: { label: "Autre", dot: "#a8a29e" },
};

const CATEGORIES = Object.keys(categorieConfig);

//  Modal suppression

function DeleteModal({ photo, onConfirm, onCancel, loading }) {
  if (!photo) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white w-full max-w-sm rounded-xl border border-stone-200 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none">
              <path
                d="M1 4H14M5 4V3H10V4M12 4V13C12 13.6 11.6 14 11 14H4C3.4 14 3 13.6 3 13V4H12Z"
                stroke="#dc2626"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#3d1a0e] mb-1">
              Supprimer cette photo ?
            </p>
            {photo.titre && (
              <p className="text-sm text-stone-500">
                « {photo.titre} » sera définitivement supprimée.
              </p>
            )}
            {!photo.titre && (
              <p className="text-sm text-stone-500">
                Cette photo sera définitivement supprimée.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin"
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
              >
                <circle
                  cx="5.5"
                  cy="5.5"
                  r="4"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.4"
                />
                <path
                  d="M5.5 1.5A4 4 0 0 1 9.5 5.5"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            )}
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

//  Carte photo ──

function PhotoCard({ r, onDeleteClick }) {
  const cat = categorieConfig[r.categorie] ?? categorieConfig.autre;

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border bg-white"
      style={{ borderColor: "#e2dbd0" }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        {r.image_url ? (
          <img
            src={r.image_url}
            alt={r.titre || "Réalisation"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect
                x="2"
                y="5"
                width="24"
                height="18"
                rx="3"
                stroke="#d6d3d1"
                strokeWidth="1.5"
              />
              <circle cx="9" cy="12" r="2.5" fill="#d6d3d1" />
              <path
                d="M2 20l7-7 5 5 4-4 8 8"
                stroke="#d6d3d1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Badge catégorie */}
        <div
          className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: cat.dot }}
          />
          <span className="text-[9px] font-bold tracking-[0.12em] uppercase text-white/85">
            {cat.label}
          </span>
        </div>

        {/* Overlay survol avec deux actions */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ backgroundColor: "rgba(61,26,14,0.55)" }}
        >
          <Link
            href={`/dashboard/realisations/${r.id}`}
            className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase font-bold px-3.5 py-2 rounded-full bg-white text-[#3d1a0e] hover:bg-stone-100 transition-colors"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M7.5 1.5L9.5 3.5M1 10H3L9 4L7 2L1 8V10Z"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Modifier
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDeleteClick(r);
            }}
            className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase font-bold px-3.5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
              <path
                d="M1 3H10M3.5 3V2H7.5V3M8.5 3V10C8.5 10.3 8.3 10.5 8 10.5H3C2.7 10.5 2.5 10.3 2.5 10V3H8.5Z"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Supprimer
          </button>
        </div>
      </div>

      {/* Titre */}
      <div className="px-3 py-2.5" style={{ borderTop: "1px solid #f0ede6" }}>
        {r.titre ? (
          <p
            className="text-xs font-bold truncate"
            style={{ color: "#3d1a0e" }}
          >
            {r.titre}
          </p>
        ) : (
          <p className="text-xs italic" style={{ color: "#c8bfb0" }}>
            Sans titre
          </p>
        )}
        {r.description && (
          <p
            className="text-[10px] truncate mt-0.5"
            style={{ color: "#9a8070" }}
          >
            {r.description}
          </p>
        )}
      </div>
    </div>
  );
}

//  Composant principal

export default function RealisationsGrid({
  realisations: initialRealisations,
}) {
  const [realisations, setRealisations] = useState(initialRealisations);
  const [filterCat, setFilterCat] = useState("toutes");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    if (filterCat === "toutes") return realisations;
    return realisations.filter((r) => r.categorie === filterCat);
  }, [realisations, filterCat]);

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/realisations/${toDelete.id}`,
        { method: "DELETE", credentials: "include" },
      );
      if (res.ok) {
        setRealisations((prev) => prev.filter((r) => r.id !== toDelete.id));
      }
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  }

  return (
    <>
      {/* ── Filtres ── */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {["toutes", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilterCat(c)}
            className="flex items-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-bold px-3.5 py-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: filterCat === c ? "#3d1a0e" : "white",
              color: filterCat === c ? "white" : "#9a8070",
              border: filterCat === c ? "none" : "1px solid #e2dbd0",
            }}
          >
            {c !== "toutes" && (
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    filterCat === c
                      ? "rgba(255,255,255,0.6)"
                      : categorieConfig[c]?.dot,
                }}
              />
            )}
            {c === "toutes" ? "Toutes" : categorieConfig[c]?.label}
          </button>
        ))}
        <span
          className="ml-auto text-[9px] tracking-[0.15em] uppercase font-bold"
          style={{ color: "#c8bfb0" }}
        >
          {filtered.length} photo{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grille ── */}
      {filtered.length === 0 ? (
        <div
          className="py-20 text-center rounded-2xl border border-dashed"
          style={{ borderColor: "#e2dbd0" }}
        >
          <p className="font-serif text-lg" style={{ color: "#c8bfb0" }}>
            Aucune photo dans cette catégorie.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <PhotoCard key={r.id} r={r} onDeleteClick={setToDelete} />
          ))}
        </div>
      )}

      {/* ── Modal suppression ── */}
      <DeleteModal
        photo={toDelete}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
        loading={deleting}
      />
    </>
  );
}
