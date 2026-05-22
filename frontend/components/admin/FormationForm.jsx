"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

//  UI helpers

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

function FieldLabel({ children, required }) {
  return (
    <span
      className="block text-[9px] tracking-[0.2em] uppercase font-bold mb-1.5"
      style={{ color: "#9a8070" }}
    >
      {children}
      {required && <span style={{ color: "#c06030" }}> *</span>}
    </span>
  );
}

const inputClass =
  "w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors";
const inputStyle = { borderColor: "#e2dbd0", color: "#3d1a0e" };
const focusIn = (e) => (e.target.style.borderColor = "#8b6c47");
const focusOut = (e) => (e.target.style.borderColor = "#e2dbd0");

//  Upload helper

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API}/api/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erreur lors de l'upload");
  const { url } = await res.json();
  return url;
}

//  ImageUploadZone

function ImageUploadZone({ value, onChange, label, hint }) {
  const fileRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState(null);

  async function processFile(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Fichier non supporté.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Fichier trop lourd (2 Mo max).");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
      setFileInfo({ name: file.name, size: file.size });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => processFile(e.target.files[0])}
        className="sr-only"
        tabIndex={-1}
      />

      {value ? (
        <div>
          <div
            className="relative rounded-xl overflow-hidden"
            style={{ border: "1px solid #e2dbd0" }}
          >
            <img
              src={value}
              alt="Aperçu"
              className="w-full object-cover"
              style={{ maxHeight: "180px" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-[9px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
              >
                {loading ? "Upload…" : "Changer"}
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setFileInfo(null);
                }}
                className="text-[9px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(220,38,38,0.7)",
                  color: "white",
                }}
              >
                Retirer
              </button>
            </div>
          </div>
          {fileInfo && (
            <div
              className="flex items-center justify-between mt-2 px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: "#f7f4ef" }}
            >
              <span
                className="text-[10px] truncate max-w-[200px]"
                style={{ color: "#9a8070" }}
              >
                {fileInfo.name}
              </span>
              <span className="text-[9px]" style={{ color: "#c8bfb0" }}>
                {formatFileSize(fileInfo.size)}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          className="rounded-xl transition-colors cursor-pointer"
          style={{
            border: `2px dashed ${drag ? "#8b6c47" : "#e2dbd0"}`,
            backgroundColor: drag ? "#fdf8f2" : "transparent",
            padding: "28px 20px",
          }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            processFile(e.dataTransfer.files[0]);
          }}
        >
          <div className="flex flex-col items-center gap-2 text-center pointer-events-none">
            {loading ? (
              <svg
                className="animate-spin"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="#e2dbd0"
                  strokeWidth="2"
                />
                <path
                  d="M10 2A8 8 0 0 1 18 10"
                  stroke="#8b6c47"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#f7f4ef" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2V10M8 2L5 5M8 2L11 5"
                    stroke={drag ? "#8b6c47" : "#c8bfb0"}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 11V13C2 13.6 2.4 14 3 14H13C13.6 14 14 13.6 14 13V11"
                    stroke={drag ? "#8b6c47" : "#c8bfb0"}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
            <div>
              <p
                className="text-xs font-bold"
                style={{ color: drag ? "#8b6c47" : "#9a8070" }}
              >
                {loading
                  ? "Upload en cours…"
                  : drag
                    ? "Déposez ici"
                    : "Cliquez ou glissez une image"}
              </p>
              {hint && (
                <p className="text-[10px] mt-0.5" style={{ color: "#c8bfb0" }}>
                  {hint}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-[10px] mt-1.5 text-red-500">{error}</p>}
    </div>
  );
}

//  GalerieEditor

function GalerieEditor({ photos, onChange }) {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFiles(files) {
    if (!files?.length) return;
    setLoading(true);
    setError(null);
    try {
      const urls = await Promise.all(
        Array.from(files)
          .slice(0, 10)
          .map((f) => uploadFile(f)),
      );
      // Utilise la valeur courante de photos via le setter fonctionnel
      onChange([...photos, ...urls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removePhoto(i) {
    onChange(photos.filter((_, idx) => idx !== i));
  }

  function movePhoto(i, dir) {
    const arr = [...photos];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange(arr);
  }

  return (
    <div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
        tabIndex={-1}
      />

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {photos.map((url, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden group"
              style={{ aspectRatio: "1", border: "1px solid #e2dbd0" }}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5"
                style={{ backgroundColor: "rgba(61,26,14,0.55)" }}
              >
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => movePhoto(i, -1)}
                    disabled={i === 0}
                    className="w-6 h-6 rounded-lg flex items-center justify-center disabled:opacity-20"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M4 7V1M1 4L4 1L7 4"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(220,38,38,0.7)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1 1L7 7M7 1L1 7"
                        stroke="white"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => movePhoto(i, 1)}
                    disabled={i === photos.length - 1}
                    className="w-6 h-6 rounded-lg flex items-center justify-center disabled:opacity-20"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M4 1V7M1 4L4 7L7 4"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <span className="text-[9px] text-white/60 font-bold self-end">
                    {i + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="rounded-xl cursor-pointer"
        style={{ border: "2px dashed #e2dbd0", padding: "20px" }}
        onClick={() => fileRef.current?.click()}
      >
        <div className="flex items-center justify-center gap-3 pointer-events-none">
          {loading ? (
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle cx="8" cy="8" r="6" stroke="#e2dbd0" strokeWidth="1.5" />
              <path
                d="M8 2A6 6 0 0 1 14 8"
                stroke="#8b6c47"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line
                x1="8"
                y1="2"
                x2="8"
                y2="14"
                stroke="#c8bfb0"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="2"
                y1="8"
                x2="14"
                y2="8"
                stroke="#c8bfb0"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
          <span className="text-xs" style={{ color: "#9a8070" }}>
            {loading
              ? "Upload en cours…"
              : "Ajouter des photos (plusieurs à la fois)"}
          </span>
        </div>
      </div>
      {error && <p className="text-[10px] mt-1.5 text-red-500">{error}</p>}
      {photos.length > 0 && (
        <p className="text-[10px] mt-2" style={{ color: "#c8bfb0" }}>
          {photos.length} photo{photos.length > 1 ? "s" : ""} · Survolez pour
          réordonner ou supprimer
        </p>
      )}
    </div>
  );
}

//  DeleteModal

function DeleteModal({ open, onConfirm, onCancel, loading, titre }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/30"
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
              Supprimer cette formation ?
            </p>
            <p className="text-sm text-stone-500 leading-relaxed">
              « {titre} » et tous ses stages seront définitivement supprimés.
            </p>
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

//  FormationForm

export default function FormationForm({ formation = null }) {
  const router = useRouter();
  const isEdit = !!formation;

  const parseProgramme = (p) => {
    if (!p) return [];
    if (Array.isArray(p)) return p;
    try {
      return JSON.parse(p);
    } catch {
      return [];
    }
  };

  const parseGalerie = (g) => {
    if (!g) return [];
    if (Array.isArray(g)) return g;
    try {
      return JSON.parse(g);
    } catch {
      return [];
    }
  };

  const [form, setForm] = useState({
    titre: formation?.titre || "",
    slug: formation?.slug || "",
    sous_titre: formation?.sous_titre || "",
    description: formation?.description || "",
    duree: formation?.duree || "",
    tarif: formation?.tarif || "",
    lieu: formation?.lieu || "",
    image_hero: formation?.image_hero || "",
    introduction: formation?.introduction || "",
    programme: parseProgramme(formation?.programme),
    galerie: parseGalerie(formation?.galerie),
  });

  const [slugManual, setSlugManual] = useState(isEdit);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [newItem, setNewItem] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleTitreChange(e) {
    const titre = e.target.value;
    setForm((prev) => ({
      ...prev,
      titre,
      ...(slugManual ? {} : { slug: toSlug(titre) }),
    }));
  }

  function addProgrammeItem() {
    if (!newItem.trim()) return;
    setForm((prev) => ({
      ...prev,
      programme: [...prev.programme, newItem.trim()],
    }));
    setNewItem("");
  }

  function removeProgrammeItem(i) {
    setForm((prev) => ({
      ...prev,
      programme: prev.programme.filter((_, idx) => idx !== i),
    }));
  }

  function moveProgrammeItem(i, dir) {
    const arr = [...form.programme];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setForm((prev) => ({ ...prev, programme: arr }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = isEdit
        ? `${API}/api/formations/admin/${formation.id}`
        : `${API}/api/formations/admin`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tarif: form.tarif === "" ? null : Number(form.tarif),
          programme: form.programme.length > 0 ? form.programme : null,
          galerie: form.galerie.length > 0 ? form.galerie : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur serveur");
      }
      router.push("/dashboard/formations");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/formations/admin/${formation.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      router.push("/dashboard/formations");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setShowDelete(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="flex-shrink-0"
            >
              <circle cx="7" cy="7" r="6" stroke="#dc2626" strokeWidth="1.2" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/*  Colonne gauche  */}
          <div className="flex flex-col gap-4">
            <SectionBlock label="Identité">
              <div className="flex flex-col gap-4">
                <div>
                  <FieldLabel required>Titre</FieldLabel>
                  <input
                    type="text"
                    name="titre"
                    value={form.titre}
                    onChange={handleTitreChange}
                    required
                    placeholder="Ex : Poêle de Masse"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
                <div>
                  <FieldLabel>Sous-titre</FieldLabel>
                  <input
                    type="text"
                    name="sous_titre"
                    value={form.sous_titre}
                    onChange={handleChange}
                    placeholder="Ex : 1 heure de feu = 24h de confort"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
                <div>
                  <FieldLabel required>Slug</FieldLabel>
                  <div className="relative">
                    <input
                      type="text"
                      name="slug"
                      value={form.slug}
                      onChange={(e) => {
                        setSlugManual(true);
                        handleChange(e);
                      }}
                      required
                      placeholder="poele-de-masse"
                      className={`${inputClass} font-mono`}
                      style={{ ...inputStyle, color: "#8b6c47" }}
                      onFocus={focusIn}
                      onBlur={focusOut}
                    />
                    {!slugManual && (
                      <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.12em] uppercase font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#f0ede6", color: "#c8bfb0" }}
                      >
                        Auto
                      </span>
                    )}
                  </div>
                  <p
                    className="text-[10px] mt-1.5"
                    style={{ color: "#c8bfb0" }}
                  >
                    /formations/
                    <span style={{ color: "#8b6c47" }}>
                      {form.slug || "..."}
                    </span>
                  </p>
                </div>
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Présentation de la formation, objectifs, public visé…"
                    className={`${inputClass} resize-none leading-relaxed`}
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
                <div>
                  <FieldLabel>Introduction</FieldLabel>
                  <textarea
                    name="introduction"
                    value={form.introduction}
                    onChange={handleChange}
                    rows={7}
                    placeholder="Texte long d'introduction — développez le sujet de la formation, le contexte, les bénéfices pour les stagiaires…"
                    className={`${inputClass} resize-none leading-relaxed`}
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                  <p
                    className="text-[10px] mt-1.5"
                    style={{ color: "#c8bfb0" }}
                  >
                    Affiché sur la page de la formation, avant le programme.
                  </p>
                </div>
              </div>
            </SectionBlock>

            <SectionBlock label="Programme">
              <div className="flex flex-col gap-2 mb-3">
                {form.programme.length === 0 ? (
                  <p className="text-xs py-2" style={{ color: "#c8bfb0" }}>
                    Aucun point pour l'instant.
                  </p>
                ) : (
                  form.programme.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                      style={{ backgroundColor: "#f7f4ef" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#8b6c47" }}
                      />
                      <span
                        className="flex-1 text-xs"
                        style={{ color: "#3d1a0e" }}
                      >
                        {item}
                      </span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => moveProgrammeItem(i, -1)}
                          disabled={i === 0}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-stone-200 disabled:opacity-20 transition-colors"
                        >
                          <svg
                            width="8"
                            height="6"
                            viewBox="0 0 8 6"
                            fill="none"
                          >
                            <path
                              d="M1 5L4 2L7 5"
                              stroke="#9a8070"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProgrammeItem(i, 1)}
                          disabled={i === form.programme.length - 1}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-stone-200 disabled:opacity-20 transition-colors"
                        >
                          <svg
                            width="8"
                            height="6"
                            viewBox="0 0 8 6"
                            fill="none"
                          >
                            <path
                              d="M1 1L4 4L7 1"
                              stroke="#9a8070"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProgrammeItem(i)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-red-100 transition-colors"
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M1 1L7 7M7 1L1 7"
                              stroke="#f87171"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addProgrammeItem();
                    }
                  }}
                  placeholder="Ajouter un point au programme…"
                  className={`${inputClass} flex-1`}
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
                <button
                  type="button"
                  onClick={addProgrammeItem}
                  className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border transition-colors hover:bg-stone-50"
                  style={{ borderColor: "#e2dbd0" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <line
                      x1="6"
                      y1="1"
                      x2="6"
                      y2="11"
                      stroke="#9a8070"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="6"
                      x2="11"
                      y2="6"
                      stroke="#9a8070"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </SectionBlock>
          </div>

          {/*  Colonne droite  */}
          <div className="flex flex-col gap-4">
            <SectionBlock label="Infos pratiques">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <FieldLabel>Durée</FieldLabel>
                  <input
                    type="text"
                    name="duree"
                    value={form.duree}
                    onChange={handleChange}
                    placeholder="3 jours"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
                <div>
                  <FieldLabel>Tarif (€)</FieldLabel>
                  <input
                    type="number"
                    name="tarif"
                    value={form.tarif}
                    onChange={handleChange}
                    min={0}
                    placeholder="380"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={focusIn}
                    onBlur={focusOut}
                  />
                </div>
              </div>
              <div>
                <FieldLabel>Lieu</FieldLabel>
                <input
                  type="text"
                  name="lieu"
                  value={form.lieu}
                  onChange={handleChange}
                  placeholder="21, rue des Chaumes — 16120 Saint-Simeux"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
            </SectionBlock>

            <SectionBlock label="Image hero">
              <ImageUploadZone
                value={form.image_hero}
                onChange={(url) =>
                  setForm((prev) => ({ ...prev, image_hero: url }))
                }
                label="Photo principale"
                hint="JPG, PNG, WebP · 2 Mo max · Affiché en fond pleine hauteur"
              />
            </SectionBlock>

            <SectionBlock label="Galerie photos">
              <GalerieEditor
                photos={form.galerie}
                onChange={(galerie) =>
                  setForm((prev) => ({ ...prev, galerie }))
                }
              />
            </SectionBlock>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase font-bold px-6 py-2.5 rounded-full text-white transition-colors disabled:opacity-50"
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
                      Enregistrement…
                    </>
                  ) : isEdit ? (
                    "Enregistrer"
                  ) : (
                    "Créer la formation"
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
              {isEdit && (
                <button
                  type="button"
                  onClick={() => setShowDelete(true)}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50"
                  style={{ color: "#f87171" }}
                >
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                    <path
                      d="M1 3.5H11M4.5 3.5V2.5H7.5V3.5M9.5 3.5V11C9.5 11.3 9.3 11.5 9 11.5H3C2.7 11.5 2.5 11.3 2.5 11V3.5H9.5Z"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Supprimer
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      <DeleteModal
        open={showDelete}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
        loading={deleting}
        titre={form.titre}
      />
    </>
  );
}
