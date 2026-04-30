"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

// ─── Constantes ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    value: "poele_de_masse",
    label: "Poêle de masse",
    dot: "#c06030",
    accent: "#8f3e18",
    imgFallback: "#c8956c",
    desc: "Constructions de poêles Oxa-Libre — chauffage rayonnant, autonomie énergétique.",
  },
  {
    value: "paille",
    label: "Paille & Terre",
    dot: "#8aab7a",
    accent: "#4a7a4a",
    imgFallback: "#9aab8a",
    desc: "Murs en paille porteuse, enduits terre et chaux, isolation naturelle.",
  },
  {
    value: "autre",
    label: "Autres chantiers",
    dot: "#a8a29e",
    accent: "#78716c",
    imgFallback: "#b0a898",
    desc: "Constructions et rénovations diverses autour des matériaux naturels.",
  },
];

function categorieConfig(value) {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[2];
}

// Lightbox

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  // Bloquer le scroll du body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!photo) return null;

  const cat = categorieConfig(photo.categorie);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      style={{ backgroundColor: "rgba(20,8,4,0.93)" }}
      onClick={onClose}
    >
      {/* Contenu — stopper la propagation pour ne pas fermer au clic sur l'image */}
      <div
        className="relative flex flex-col items-center w-full h-full px-4 py-6 md:px-16 md:py-10"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 text-[9px] tracking-[0.18em] border uppercase font-bold px-3 py-2 rounded-full transition-colors text-white border-white hover:text-slate-500 hover:border-slate-500"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Fermer
        </button>

        {/* Compteur */}
        <div className="text-[9px] tracking-[0.2em] uppercase font-bold mb-4 text-white">
          {index + 1} / {photos.length}
        </div>

        {/* Image + navigation */}
        <div className="relative flex items-center justify-center w-full flex-1 min-h-0 gap-4">
          {/* Précédent */}
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all disabled:opacity-20"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path
                d="M13 6H1M1 6L6 1M1 6L6 11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center min-w-0 min-h-0">
            <img
              src={photo.image_url}
              alt={photo.titre || "Réalisation"}
              className="max-w-full max-h-full object-contain rounded-xl"
              style={{ maxHeight: "calc(100vh - 220px)" }}
            />
          </div>

          {/* Suivant */}
          <button
            onClick={onNext}
            disabled={index === photos.length - 1}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all disabled:opacity-20"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
            }}
          >
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path
                d="M1 6H13M13 6L8 1M13 6L8 11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Infos photo */}
        <div className="mt-5 text-center">
          {photo.titre && (
            <p className="font-bold text-base mb-1" style={{ color: "white" }}>
              {photo.titre}
            </p>
          )}
          {photo.description && (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {photo.description}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: cat.dot }}
            />
            <span
              className="text-[9px] tracking-[0.15em] uppercase font-bold"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {cat.label}
            </span>
          </div>
        </div>

        {/* Miniatures */}
        {photos.length > 1 && (
          <div
            className="flex gap-2 mt-5 overflow-x-auto pb-1"
            style={{ maxWidth: "100%" }}
          >
            {photos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  // On passe par un hack : recalcule l'index depuis le parent
                  const diff = i - index;
                  if (diff > 0) for (let j = 0; j < diff; j++) onNext();
                  else for (let j = 0; j < Math.abs(diff); j++) onPrev();
                }}
                className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
                style={{
                  width: "48px",
                  height: "48px",
                  border:
                    i === index
                      ? `2px solid ${cat.dot}`
                      : "2px solid transparent",
                  opacity: i === index ? 1 : 0.4,
                }}
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card catégorie ───────────────────────────────────────────────────────────

function CategorieCard({ cat, count, active, firstImage, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden text-left transition-all duration-300 focus:outline-none"
      style={{
        borderRadius: "20px",
        border: active ? `2px solid ${cat.dot}` : "1px solid #e2dbd0",
        transform: active ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div
        className="w-full"
        style={{
          aspectRatio: "4/3",
          backgroundColor: cat.imgFallback,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {firstImage && (
          <img
            src="https://static.wixstatic.com/media/457787_f6badfbbd12f49488f331b78c8f46595~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_604,h_319,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_f6badfbbd12f49488f331b78c8f46595~mv2_d_3264_2448_s_4_2.jpg"
            alt={cat.label}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: active ? "scale(1.05)" : "scale(1)" }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: active
              ? "linear-gradient(to top, rgba(61,26,14,0.92) 0%, rgba(61,26,14,0.3) 60%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: active ? cat.dot : "rgba(255,255,255,0.5)",
              }}
            />
            <span
              className="text-[9px] tracking-[0.2em] uppercase font-bold"
              style={{ color: active ? cat.dot : "rgba(255,255,255,0.6)" }}
            >
              {count} réalisation{count > 1 ? "s" : ""}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "white",
              lineHeight: 1.2,
              marginBottom: "6px",
            }}
          >
            {cat.label}
          </h2>
          {active && (
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: "220px" }}
            >
              {cat.desc}
            </p>
          )}
        </div>
        {active && (
          <div
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ backgroundColor: cat.dot }}
          >
            <svg width="9" height="8" viewBox="0 0 9 8" fill="none">
              <path
                d="M1 4L3.5 6.5L8 1"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[9px] tracking-[0.15em] uppercase font-bold text-white">
              Sélectionné
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Card photo ───────────────────────────────────────────────────────────────

function PhotoCard({ r, onClick }) {
  const cat = categorieConfig(r.categorie);
  return (
    <article
      className="group overflow-hidden bg-white cursor-pointer"
      style={{ borderRadius: "14px", border: "1px solid #e2dbd0" }}
      onClick={onClick}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3", backgroundColor: cat.imgFallback }}
      >
        {r.image_url ? (
          <>
            <img
              src={r.image_url}
              alt={r.titre || "Réalisation"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay loupe au survol */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ backgroundColor: "rgba(61,26,14,0.45)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="7"
                    cy="7"
                    r="5"
                    stroke="white"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M11 11L14 14"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 4.5V9.5M4.5 7H9.5"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              opacity="0.3"
            >
              <rect
                x="2"
                y="5"
                width="24"
                height="18"
                rx="3"
                stroke="white"
                strokeWidth="1.5"
              />
              <circle cx="9" cy="12" r="2.5" fill="white" />
              <path
                d="M2 20l7-7 5 5 4-4 8 8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      {(r.titre || r.description) && (
        <div className="px-4 py-3" style={{ borderTop: "1px solid #f0ede6" }}>
          {r.titre && (
            <p
              className="text-sm font-bold truncate"
              style={{ color: "#3d1a0e" }}
            >
              {r.titre}
            </p>
          )}
          {r.description && (
            <p
              className="text-xs mt-0.5 line-clamp-2 leading-relaxed"
              style={{ color: "#9a8070" }}
            >
              {r.description}
            </p>
          )}
        </div>
      )}
    </article>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function RealisationsClient({ realisations }) {
  const [activeCategorie, setActiveCategorie] = useState("poele_de_masse");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const firstImages = useMemo(() => {
    const map = {};
    CATEGORIES.forEach((cat) => {
      const first = realisations.find(
        (r) => r.categorie === cat.value && r.image_url,
      );
      map[cat.value] = first?.image_url ?? null;
    });
    return map;
  }, [realisations]);

  const counts = useMemo(() => {
    const map = {};
    CATEGORIES.forEach((cat) => {
      map[cat.value] = realisations.filter(
        (r) => r.categorie === cat.value,
      ).length;
    });
    return map;
  }, [realisations]);

  const filtered = useMemo(
    () => realisations.filter((r) => r.categorie === activeCategorie),
    [realisations, activeCategorie],
  );

  // Reset lightbox quand on change de catégorie
  const handleCategorie = (value) => {
    setActiveCategorie(value);
    setLightboxIndex(null);
  };

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i < filtered.length - 1 ? i + 1 : i));
  }, [filtered.length]);

  const activeCat = categorieConfig(activeCategorie);

  return (
    <div style={{ backgroundColor: "#ede8de", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#3d1a0e", padding: "56px 32px 48px" }}
      >
        <div className="relative max-w-5xl mx-auto">
          <p
            className="text-[9px] tracking-[0.3em] uppercase font-bold mb-3"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Portfolio · Constructions naturelles
          </p>
          <h1
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "white",
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Réalisations
          </h1>
          <p
            className="text-sm leading-relaxed max-w-lg"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Constructions réalisées par André et ses stagiaires — poêles de
            masse, maisons en paille, enduits terre et chaux.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* ── Cards catégories ── */}
        <div className="mb-12">
          <p
            className="text-[9px] tracking-[0.22em] uppercase font-bold mb-5"
            style={{ color: "#c8bfb0" }}
          >
            Choisir une catégorie
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <CategorieCard
                key={cat.value}
                cat={cat}
                count={counts[cat.value]}
                active={activeCategorie === cat.value}
                firstImage={firstImages[cat.value]}
                onClick={() => handleCategorie(cat.value)}
              />
            ))}
          </div>
        </div>

        {/* ── Grille filtrée ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: activeCat.dot }}
            />
            <h2
              style={{
                fontFamily: "'Fredericka the Great', serif",
                fontSize: "1.4rem",
                color: "#3d1a0e",
                fontWeight: 400,
              }}
            >
              {activeCat.label}
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#e2dbd0" }}
            />
            <span
              className="text-[9px] tracking-[0.15em] uppercase font-bold"
              style={{ color: "#c8bfb0" }}
            >
              {filtered.length} photo{filtered.length > 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div
              className="py-20 text-center rounded-2xl border border-dashed"
              style={{ borderColor: "#e2dbd0" }}
            >
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.1rem",
                  color: "#c8bfb0",
                }}
              >
                Aucune réalisation dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((r, i) => (
                <PhotoCard
                  key={r.id}
                  r={r}
                  onClick={() => r.image_url && setLightboxIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
