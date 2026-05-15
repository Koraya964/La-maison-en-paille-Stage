"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  {
    value: "poele_de_masse",
    label: "Poêle de masse",
    dot: "#c06030",
    activeBg: "#fdf8f2",
    activeBorder: "#c06030",
    activeText: "#c06030",
  },
  {
    value: "paille",
    label: "Paille & Terre",
    dot: "#8aab7a",
    activeBg: "#f2f8f2",
    activeBorder: "#8aab7a",
    activeText: "#4a7a4a",
  },
  {
    value: "autre",
    label: "Autre",
    dot: "#a8a29e",
    activeBg: "#f5f5f4",
    activeBorder: "#a8a29e",
    activeText: "#78716c",
  },
];

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function SectionBlock({ label, children }) {
  return (
    <div
      className="bg-white rounded-2xl border p-5"
      style={{ borderColor: "#e2dbd0" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-[9px] tracking-[0.22em] uppercase font-bold whitespace-nowrap"
          style={{ color: "#c8bfb0" }}
        >
          {label}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "#ede8de" }} />
      </div>
      {children}
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <span
      className="block text-[9px] tracking-[0.2em] uppercase font-bold mb-1.5"
      style={{ color: "#9a8070" }}
    >
      {children}
    </span>
  );
}

export default function PhotoUploader() {
  const router = useRouter();
  const fileRef = useRef(null);

  // Le fichier est stocké en state React — source de vérité unique
  // On ne dépend plus de fileRef.current.files au submit
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({
    titre: "",
    description: "",
    categorie: "poele_de_masse",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function processFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image (JPG, PNG, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Le fichier dépasse 2 Mo.");
      return;
    }
    setError(null);
    setSuccess(false);
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setFileInfo({ name: file.name, size: file.size });
  }

  function handleFile(e) {
    processFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function reset() {
    setSelectedFile(null);
    setPreview(null);
    setFileInfo(null);
    setForm({ titre: "", description: "", categorie: "poele_de_masse" });
    setError(null);
    setSuccess(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("1. Submit déclenché, selectedFile:", selectedFile);
    if (!selectedFile) {
      setError("Veuillez sélectionner une image.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      console.log("2. API URL:", API);

      const uploadData = new FormData();
      uploadData.append("image", selectedFile);
      console.log("3. Envoi vers:", `${API}/api/upload`);

      const uploadRes = await fetch(`${API}/api/upload`, {
        method: "POST",
        body: uploadData,
        credentials: "include",
      });
      console.log("4. Upload status:", uploadRes.status);

      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        throw new Error(data.error || "Erreur lors de l'upload de l'image");
      }
      const { url } = await uploadRes.json();
      console.log("5. URL reçue:", url);

      const res = await fetch(`${API}/api/realisations`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre: form.titre,
          description: form.description,
          categorie: form.categorie,
          image_url: url,
        }),
      });
      console.log("6. Réalisation status:", res.status);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur serveur");
      }

      setSuccess(true);
      reset();
      router.refresh();
    } catch (err) {
      console.error("ERREUR:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/*
        INPUT FILE hors de tout label et hors de la zone drop.
        Déclenché via fileRef.current.click().
        Pas de double-déclenchement possible.
      */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="sr-only"
        tabIndex={-1}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ── Colonne gauche ── */}
        <div className="flex flex-col gap-4">
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="flex-shrink-0"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="#dc2626"
                  strokeWidth="1.2"
                />
                <path
                  d="M7 4V7M7 9.5V10"
                  stroke="#dc2626"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="flex-shrink-0"
              >
                <path
                  d="M2 7L5.5 10.5L12 3.5"
                  stroke="#15803d"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Photo uploadée avec succès !
            </div>
          )}

          <SectionBlock label="Image *">
            {preview ? (
              <div>
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ border: "1px solid #e2dbd0" }}
                >
                  <img
                    src={preview}
                    alt="Aperçu"
                    className="w-full object-cover"
                    style={{ maxHeight: "280px" }}
                  />
                  {/* Bouton changer — click direct sur fileRef, pas via un label */}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-3 right-3 text-[9px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                    }}
                  >
                    Changer
                  </button>
                </div>
                {fileInfo && (
                  <div
                    className="flex items-center justify-between mt-2.5 px-3 py-2 rounded-lg"
                    style={{ backgroundColor: "#f7f4ef" }}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="11"
                          height="13"
                          rx="1.5"
                          stroke="#c8bfb0"
                          strokeWidth="1"
                        />
                        <path
                          d="M3 4h6M3 7h6M3 10h4"
                          stroke="#c8bfb0"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span
                        className="text-[10px] truncate max-w-[160px]"
                        style={{ color: "#9a8070" }}
                      >
                        {fileInfo.name}
                      </span>
                    </div>
                    <span className="text-[9px]" style={{ color: "#c8bfb0" }}>
                      {formatFileSize(fileInfo.size)}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Zone drop — div cliquable, pas un label */
              <div
                className="rounded-xl transition-colors cursor-pointer"
                style={{
                  border: `2px dashed ${dragging ? "#8b6c47" : "#e2dbd0"}`,
                  backgroundColor: dragging ? "#fdf8f2" : "transparent",
                  padding: "40px 20px",
                }}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-3 text-center pointer-events-none">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#f7f4ef" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M9 3V13M3 9h12"
                        stroke={dragging ? "#8b6c47" : "#c8bfb0"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm font-bold mb-1"
                      style={{ color: dragging ? "#8b6c47" : "#9a8070" }}
                    >
                      {dragging
                        ? "Déposez ici"
                        : "Cliquez ou glissez une image"}
                    </p>
                    <p className="text-[10px]" style={{ color: "#c8bfb0" }}>
                      JPG, PNG, WebP · 2 Mo max
                    </p>
                  </div>
                </div>
              </div>
            )}
          </SectionBlock>
        </div>

        {/* ── Colonne droite ── */}
        <div className="flex flex-col gap-4">
          <SectionBlock label="Informations">
            <div className="flex flex-col gap-4">
              <div>
                <FieldLabel>Titre</FieldLabel>
                <input
                  type="text"
                  name="titre"
                  value={form.titre}
                  onChange={handleChange}
                  placeholder="Ex : Poêle Oxa-Libre — Charente 2024"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
                  style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                  onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
                />
              </div>
              <div>
                <FieldLabel>Description</FieldLabel>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Quelques mots sur la réalisation…"
                  className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors resize-none leading-relaxed"
                  style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                  onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
                />
              </div>
            </div>
          </SectionBlock>

          <SectionBlock label="Catégorie">
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((c) => {
                const active = form.categorie === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, categorie: c.value }))
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
                    style={{
                      borderColor: active ? c.activeBorder : "#e2dbd0",
                      borderWidth: active ? "2px" : "1px",
                      backgroundColor: active ? c.activeBg : "white",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: active ? c.dot : "#d6d3d1" }}
                    />
                    <span
                      className="text-[10px] tracking-[0.12em] uppercase font-bold"
                      style={{ color: active ? c.activeText : "#c8bfb0" }}
                    >
                      {c.label}
                    </span>
                    {active && (
                      <svg
                        className="ml-auto"
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                      >
                        <path
                          d="M1 5L4.5 8.5L11 1"
                          stroke={c.activeBorder}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </SectionBlock>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="flex-1 flex items-center justify-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold px-6 py-2.5 rounded-full text-white transition-colors disabled:opacity-40"
              style={{ backgroundColor: "#3d1a0e" }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="4.5"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 1.5A4.5 4.5 0 0 1 10.5 6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Upload en cours…
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path
                      d="M5.5 1V7M5.5 1L3 3.5M5.5 1L8 3.5"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 8.5V9.5C1 10 1.5 10.5 2 10.5H9C9.5 10.5 10 10 10 9.5V8.5"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Uploader la photo
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="text-[10px] tracking-[0.18em] uppercase font-bold px-5 py-2.5 rounded-full border transition-colors hover:bg-stone-50 disabled:opacity-50"
              style={{ borderColor: "#e2dbd0", color: "#9a8070" }}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
