"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Sous-composants ──────────────────────────────────────────────────────────

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

function TextInput({ name, value, onChange, placeholder, onFocus, onBlur }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
      style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
      onFocus={(e) => {
        e.target.style.borderColor = "#8b6c47";
        onFocus?.();
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#e2dbd0";
        onBlur?.();
      }}
    />
  );
}

// ─── Modal suppression ────────────────────────────────────────────────────────

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
              « {titre} » et tous ses stages associés seront définitivement
              supprimés.
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

// ─── Formulaire principal ─────────────────────────────────────────────────────

export default function FormationForm({ formation = null }) {
  const router = useRouter();
  const isEdit = !!formation;

  const [form, setForm] = useState({
    titre: formation?.titre || "",
    slug: formation?.slug || "",
    description: formation?.description || "",
    duree: formation?.duree || "",
    tarif: formation?.tarif || "",
    hebergement: formation?.hebergement ?? true,
    repas: formation?.repas ?? true,
  });

  const [slugManual, setSlugManual] = useState(isEdit);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleTitreChange(e) {
    const titre = e.target.value;
    setForm((prev) => ({
      ...prev,
      titre,
      // Auto-génère le slug tant que l'utilisateur n'a pas modifié manuellement
      ...(slugManual ? {} : { slug: toSlug(titre) }),
    }));
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
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

        {/* ── Identité ── */}
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
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
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
                  className="w-full border rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none transition-colors"
                  style={{ borderColor: "#e2dbd0", color: "#8b6c47" }}
                  onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
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
              <p className="text-[10px] mt-1.5" style={{ color: "#c8bfb0" }}>
                Utilisé dans l'URL : /formations/
                <span style={{ color: "#8b6c47" }}>{form.slug || "..."}</span>
              </p>
            </div>
            <div>
              <FieldLabel>Description</FieldLabel>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Présentation de la formation, objectifs, public visé…"
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors resize-none leading-relaxed"
                style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
              />
            </div>
          </div>
        </SectionBlock>

        {/* ── Informations pratiques ── */}
        <SectionBlock label="Informations pratiques">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Durée</FieldLabel>
              <input
                type="text"
                name="duree"
                value={form.duree}
                onChange={handleChange}
                placeholder="Ex : 3 jours"
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
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
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
              />
            </div>
          </div>
        </SectionBlock>

        {/* ── Actions ── */}
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
