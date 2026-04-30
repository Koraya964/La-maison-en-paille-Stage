"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

// ─── Constantes ───────────────────────────────────────────────────────────────

const STATUTS = [
  {
    value: "ouvert",
    label: "Ouvert",
    dot: "#15803d",
    activeBg: "#f0fdf4",
    activeBorder: "#15803d",
    activeText: "#15803d",
  },
  {
    value: "complet",
    label: "Complet",
    dot: "#dc2626",
    activeBg: "#fef2f2",
    activeBorder: "#dc2626",
    activeText: "#dc2626",
  },
  {
    value: "liste_attente",
    label: "Liste d'attente",
    dot: "#d97706",
    activeBg: "#fffbeb",
    activeBorder: "#d97706",
    activeText: "#d97706",
  },
  {
    value: "annule",
    label: "Annulé",
    dot: "#a8a29e",
    activeBg: "#f5f5f4",
    activeBorder: "#a8a29e",
    activeText: "#78716c",
  },
  {
    value: "termine",
    label: "Terminé",
    dot: "#a8a29e",
    activeBg: "#f5f5f4",
    activeBorder: "#d6d3d1",
    activeText: "#a8a29e",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function diffJours(debut, fin) {
  if (!debut || !fin) return null;
  const d = new Date(fin) - new Date(debut);
  if (d <= 0) return null;
  return Math.round(d / (1000 * 60 * 60 * 24)) + 1;
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

function Counter({ value, onChange, min = 0, max = 50 }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors hover:bg-stone-50 disabled:opacity-30"
        style={{ borderColor: "#e2dbd0" }}
      >
        <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
          <line
            x1="1"
            y1="1"
            x2="9"
            y2="1"
            stroke="#9a8070"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className="flex-1 text-center text-base font-black rounded-lg border py-1.5"
        style={{ borderColor: "#e2dbd0", color: "#3d1a0e", minWidth: "48px" }}
      >
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors hover:bg-stone-50 disabled:opacity-30"
        style={{ borderColor: "#e2dbd0" }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line
            x1="5"
            y1="1"
            x2="5"
            y2="9"
            stroke="#9a8070"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="1"
            y1="5"
            x2="9"
            y2="5"
            stroke="#9a8070"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

function DeleteModal({ open, onConfirm, onCancel, loading }) {
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
              Supprimer ce stage ?
            </p>
            <p className="text-sm text-stone-500 leading-relaxed">
              Les inscriptions associées seront également supprimées. Cette
              action est irréversible.
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
            className="text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Suppression…" : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Formulaire principal ─────────────────────────────────────────────────────

export default function StageForm({ stage = null }) {
  const router = useRouter();
  const isEdit = !!stage;

  // Formations chargées depuis la BDD
  const [formations, setFormations] = useState([]);
  const [formationsLoading, setFormationsLoading] = useState(true);

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
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch formations ───────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchFormations() {
      try {
        const res = await fetch(`${API}/api/formations/admin`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setFormations(data);
        }
      } catch {
        // Silencieux — la liste sera vide
      } finally {
        setFormationsLoading(false);
      }
    }
    fetchFormations();
  }, []);

  // Garde places_dispo <= places_total
  useEffect(() => {
    if (form.places_dispo > form.places_total) {
      setForm((prev) => ({ ...prev, places_dispo: prev.places_total }));
    }
  }, [form.places_total, form.places_dispo]);

  // Reset date_fin si date_debut devient >= date_fin
  useEffect(() => {
    if (form.date_debut && form.date_fin && form.date_fin <= form.date_debut) {
      setForm((prev) => ({ ...prev, date_fin: "" }));
    }
  }, [form.date_debut]);

  const duree = diffJours(form.date_debut, form.date_fin);
  const placesPct = Math.round(
    ((form.places_total - form.places_dispo) / form.places_total) * 100,
  );
  const barColor =
    form.places_dispo === 0
      ? "#dc2626"
      : form.places_dispo <= 3
        ? "#d97706"
        : "#15803d";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (form.date_fin && form.date_debut && form.date_fin <= form.date_debut) {
      setError("La date de fin doit être postérieure à la date de début.");
      setLoading(false);
      return;
    }

    try {
      const url = isEdit
        ? `${API}/api/stages/${stage.id}`
        : `${API}/api/stages`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
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
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/stages/${stage.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      router.push("/dashboard/stages");
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

        {/* ── Formation ── */}
        <SectionBlock label="Formation">
          {formationsLoading ? (
            <div
              className="flex items-center gap-2 py-4 px-2"
              style={{ color: "#c8bfb0" }}
            >
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="#e2dbd0"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 1.5A5.5 5.5 0 0 1 12.5 7"
                  stroke="#9a8070"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs">Chargement des formations…</span>
            </div>
          ) : formations.length === 0 ? (
            <p className="text-xs py-3 px-2" style={{ color: "#c8bfb0" }}>
              Aucune formation disponible.{" "}
              <a
                href="/dashboard/formations/nouvelle"
                className="underline"
                style={{ color: "#8b6c47" }}
              >
                Créer une formation
              </a>
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {formations.map((f) => {
                const active = Number(form.formation_id) === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, formation_id: f.id }))
                    }
                    className="w-full text-left rounded-xl border px-4 py-3 transition-all"
                    style={{
                      borderColor: active ? "#8b6c47" : "#e2dbd0",
                      borderWidth: active ? "2px" : "1px",
                      backgroundColor: active ? "#fdf8f2" : "white",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] tracking-[0.15em] uppercase font-bold"
                        style={{ color: active ? "#8b6c47" : "#c8bfb0" }}
                      >
                        {f.titre}
                      </span>
                      {active && (
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                        >
                          <path
                            d="M1 5L4.5 8.5L12 1"
                            stroke="#8b6c47"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      {f.duree && (
                        <span
                          className="text-[10px]"
                          style={{ color: active ? "#9a8070" : "#d6d3d1" }}
                        >
                          {f.duree}
                        </span>
                      )}
                      {f.tarif && (
                        <>
                          <span style={{ color: "#e2dbd0", fontSize: "10px" }}>
                            ·
                          </span>
                          <span
                            className="text-[10px]"
                            style={{ color: active ? "#9a8070" : "#d6d3d1" }}
                          >
                            {f.tarif} €
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </SectionBlock>

        {/* ── Dates ── */}
        <SectionBlock label="Dates">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <FieldLabel>Début *</FieldLabel>
              <input
                type="date"
                name="date_debut"
                value={form.date_debut}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, date_debut: e.target.value }))
                }
                required
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
              />
            </div>
            <div>
              <FieldLabel>Fin *</FieldLabel>
              <input
                type="date"
                name="date_fin"
                value={form.date_fin}
                min={form.date_debut || undefined}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, date_fin: e.target.value }))
                }
                required
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors"
                style={{ borderColor: "#e2dbd0", color: "#3d1a0e" }}
                onFocus={(e) => (e.target.style.borderColor = "#8b6c47")}
                onBlur={(e) => (e.target.style.borderColor = "#e2dbd0")}
              />
            </div>
          </div>
          {duree && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ backgroundColor: "#f7f4ef" }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle
                  cx="5.5"
                  cy="5.5"
                  r="4.5"
                  stroke="#c8bfb0"
                  strokeWidth="1"
                />
                <path
                  d="M5.5 3V5.5L7 7"
                  stroke="#c8bfb0"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              <span
                className="text-[10px]"
                style={{ color: "#9a8070", letterSpacing: "0.08em" }}
              >
                Durée calculée :{" "}
                <strong style={{ color: "#3d1a0e" }}>
                  {duree} jour{duree > 1 ? "s" : ""}
                </strong>
              </span>
            </div>
          )}
        </SectionBlock>

        {/* ── Places ── */}
        <SectionBlock label="Places">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <FieldLabel>Total</FieldLabel>
              <Counter
                value={Number(form.places_total)}
                onChange={(v) =>
                  setForm((prev) => ({ ...prev, places_total: v }))
                }
                min={1}
                max={50}
              />
            </div>
            <div>
              <FieldLabel>Disponibles</FieldLabel>
              <Counter
                value={Number(form.places_dispo)}
                onChange={(v) =>
                  setForm((prev) => ({ ...prev, places_dispo: v }))
                }
                min={0}
                max={Number(form.places_total)}
              />
            </div>
          </div>
          <div>
            <div
              className="h-[5px] rounded-full overflow-hidden"
              style={{ backgroundColor: "#ede8de" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${placesPct}%`, backgroundColor: barColor }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span
                className="text-[9px]"
                style={{ color: "#c8bfb0", letterSpacing: "0.1em" }}
              >
                {form.places_total - form.places_dispo} inscrit
                {form.places_total - form.places_dispo > 1 ? "s" : ""}
              </span>
              <span
                className="text-[9px]"
                style={{ color: "#c8bfb0", letterSpacing: "0.1em" }}
              >
                {form.places_total} places total
              </span>
            </div>
          </div>
        </SectionBlock>

        {/* ── Statut ── */}
        <SectionBlock label="Statut">
          <div className="flex flex-wrap gap-2">
            {STATUTS.map((s) => {
              const active = form.statut === s.value;
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, statut: s.value }))
                  }
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all text-[9px] tracking-[0.15em] uppercase font-bold"
                  style={{
                    borderColor: active ? s.activeBorder : "#e2dbd0",
                    borderWidth: active ? "2px" : "1px",
                    backgroundColor: active ? s.activeBg : "white",
                    color: active ? s.activeText : "#c8bfb0",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: active ? s.dot : "#d6d3d1" }}
                  />
                  {s.label}
                </button>
              );
            })}
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
                "Créer le stage"
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={loading}
              className="text-[10px] tracking-[0.18em] uppercase font-bold px-5 py-2.5 rounded-full border transition-colors disabled:opacity-50 hover:bg-stone-50"
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
      />
    </>
  );
}
