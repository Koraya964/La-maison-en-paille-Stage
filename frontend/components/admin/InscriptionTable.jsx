"use client";

import { useState, useMemo, useEffect, useRef } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

//  Constantes

const statutColors = {
  en_attente: { bg: "bg-amber-100", text: "text-amber-700", dot: "#d97706" },
  confirmee: { bg: "bg-green-100", text: "text-green-700", dot: "#15803d" },
  annulee: { bg: "bg-red-100", text: "text-red-600", dot: "#dc2626" },
  liste_attente: { bg: "bg-blue-100", text: "text-blue-700", dot: "#1d4ed8" },
};

const statutLabels = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  annulee: "Annulée",
  liste_attente: "Liste d'attente",
};

const STATUTS = Object.keys(statutLabels);

//  Helpers

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateCourt(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

function buildMailtoHref(inscription) {
  const sujet = encodeURIComponent(
    `Votre inscription — ${inscription.formation_titre}`,
  );
  const corps = encodeURIComponent(
    `Bonjour ${inscription.prenom},\n\nSuite à votre inscription au stage "${inscription.formation_titre}"...\n\nBien cordialement,\nAndré de Bouter`,
  );
  return `mailto:${inscription.email}?subject=${sujet}&body=${corps}`;
}

//  Toast

function Toast({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 pointer-events-auto ${t.type === "success" ? "bg-[#3d2b1f] text-white" : "bg-red-600 text-white"}`}
        >
          {t.type === "success" ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7L5.5 10.5L12 3.5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2L12 12M12 2L2 12"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
          {t.message}
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  function push(message, type = "success") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3000,
    );
  }
  return { toasts, push };
}

//  StatutBadge

function StatutBadge({ statut, size = "md" }) {
  const c = statutColors[statut] || statutColors.en_attente;
  const padding =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${padding} rounded-full tracking-wider uppercase font-bold ${c.bg} ${c.text}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: c.dot }}
      />
      {statutLabels[statut]}
    </span>
  );
}

//  Custom Dropdown

function StatutDropdown({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        className="flex items-center gap-2 text-xs border border-stone-200 px-2.5 py-1.5 rounded-md bg-white hover:border-stone-300 transition-colors disabled:opacity-50 focus:outline-none focus:border-[#8b6c47]"
      >
        <span className="text-stone-600">{statutLabels[value]}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="#9ca3af"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-30 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden w-44">
          {STATUTS.map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-xs flex items-center gap-2.5 hover:bg-stone-50 transition-colors ${s === value ? "bg-stone-50 font-bold" : ""}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: statutColors[s]?.dot }}
              />
              <span
                className={`tracking-wide uppercase ${s === value ? "text-[#3d2b1f]" : "text-stone-500"}`}
              >
                {statutLabels[s]}
              </span>
              {s === value && (
                <svg
                  className="ml-auto"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="#3d2b1f"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

//  Confirmation Modal

function ConfirmModal({ pending, onConfirm, onCancel }) {
  if (!pending) return null;
  const { inscription, newStatut } = pending;
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
          <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 5.5V8.5M8 10.5V11M2.5 13.5H13.5L8 2.5L2.5 13.5Z"
                stroke="#B45309"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#3d2b1f] mb-1">
              Changer le statut
            </p>
            <p className="text-sm text-stone-500 leading-relaxed">
              Passer{" "}
              <span className="font-medium text-stone-700">
                {inscription.prenom} {inscription.nom}
              </span>{" "}
              de <StatutBadge statut={inscription.statut} size="sm" /> à{" "}
              <StatutBadge statut={newStatut} size="sm" /> ?
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-md border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-md bg-[#3d2b1f] text-white hover:bg-[#5a3e2b] transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

//  Detail Modal

function InscriptionModal({
  inscription,
  onClose,
  onAskConfirm,
  updating,
  onSaveAdmin,
}) {
  if (!inscription) return null;

  // State local pour les champs admin
  const [convention, setConvention] = useState(
    inscription.numero_convention || "",
  );
  const [note, setNote] = useState(inscription.note_admin || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Reset quand l'inscription change
  useEffect(() => {
    setConvention(inscription.numero_convention || "");
    setNote(inscription.note_admin || "");
    setSaved(false);
  }, [inscription.id]);

  async function handleSaveAdmin() {
    setSaving(true);
    setSaved(false);
    await onSaveAdmin(inscription.id, {
      numero_convention: convention,
      note_admin: note,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputClass =
    "w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors";
  const inputStyle = { borderColor: "#e2dbd0", color: "#3d1a0e" };
  const focusIn = (e) => (e.target.style.borderColor = "#8b6c47");
  const focusOut = (e) => (e.target.style.borderColor = "#e2dbd0");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-xl text-[#3d2b1f]">
              {inscription.prenom} {inscription.nom}
            </h3>
            <p className="text-stone-400 text-sm mt-0.5">
              {inscription.formation_titre}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-xl leading-none ml-4"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Infos contact */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                E-mail
              </p>
              <a
                href={`mailto:${inscription.email}`}
                className="text-[#8b6c47] hover:underline break-all"
              >
                {inscription.email}
              </a>
            </div>
            {inscription.telephone && (
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  Téléphone
                </p>
                <p className="text-stone-600">{inscription.telephone}</p>
              </div>
            )}
            {inscription.adresse && (
              <div className="col-span-2">
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  Adresse
                </p>
                <p className="text-stone-600">
                  {inscription.adresse}
                  <br />
                  {inscription.cedex} {inscription.city}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                Date du stage
              </p>
              <p className="text-stone-600">
                {formatDate(inscription.date_debut)} →{" "}
                {formatDate(inscription.date_fin)}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                Reçu le
              </p>
              <p className="text-stone-600">
                {formatDate(inscription.created_at)}
              </p>
            </div>
          </div>

          {/* Entreprise */}
          {inscription.is_entreprise && (
            <div className="border-t border-stone-100 pt-5">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
                Entreprise
              </p>
              <div className="grid grid-cols-2 gap-4">
                {inscription.entreprise_name && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Raison sociale
                    </p>
                    <p className="text-stone-700 font-medium">
                      {inscription.entreprise_name}
                    </p>
                  </div>
                )}
                {inscription.entreprise_quality && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Qualité
                    </p>
                    <p className="text-stone-600">
                      {inscription.entreprise_quality}
                    </p>
                  </div>
                )}
                {inscription.siret && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      SIRET
                    </p>
                    <p className="text-stone-600 font-mono text-xs">
                      {inscription.siret}
                    </p>
                  </div>
                )}
                {inscription.entreprise_telephone && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Téléphone
                    </p>
                    <p className="text-stone-600">
                      {inscription.entreprise_telephone}
                    </p>
                  </div>
                )}
                {inscription.entreprise_adress && (
                  <div className="col-span-2">
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Adresse
                    </p>
                    <p className="text-stone-600">
                      {inscription.entreprise_adress}
                      <br />
                      {inscription.entreprise_cedex}{" "}
                      {inscription.entreprise_city}
                    </p>
                  </div>
                )}
                {inscription.entreprise_email && (
                  <div className="col-span-2">
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      E-mail
                    </p>
                    <a
                      href={`mailto:${inscription.entreprise_email}`}
                      className="text-[#8b6c47] hover:underline"
                    >
                      {inscription.entreprise_email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          {inscription.message && (
            <div className="border-t border-stone-100 pt-5">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                Message
              </p>
              <p className="text-stone-600 bg-stone-50 p-3 rounded-lg leading-relaxed">
                {inscription.message}
              </p>
            </div>
          )}

          {/*  Champs admin  */}
          <div className="border-t border-stone-100 pt-5">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">
              Notes internes
            </p>
            <div className="flex flex-col gap-3">
              {/* Numéro de convention */}
              <div>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase font-bold mb-1.5"
                  style={{ color: "#9a8070" }}
                >
                  Numéro de convention
                </p>
                <input
                  type="text"
                  value={convention}
                  onChange={(e) => {
                    setConvention(e.target.value);
                    setSaved(false);
                  }}
                  placeholder="Ex : CONV-2024-001"
                  className={inputClass}
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              {/* Note admin */}
              <div>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase font-bold mb-1.5"
                  style={{ color: "#9a8070" }}
                >
                  Note
                </p>
                <textarea
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    setSaved(false);
                  }}
                  rows={3}
                  placeholder="Notes privées sur cette inscription…"
                  className={`${inputClass} resize-none leading-relaxed`}
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              {/* Bouton sauvegarder */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveAdmin}
                  disabled={saving}
                  className="flex items-center gap-2 text-[9px] tracking-[0.15em] uppercase font-bold px-4 py-2 rounded-full text-white transition-colors disabled:opacity-50"
                  style={{ backgroundColor: "#3d2b1f" }}
                >
                  {saving ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <circle
                          cx="5"
                          cy="5"
                          r="3.5"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M5 1.5A3.5 3.5 0 0 1 8.5 5"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Enregistrement…
                    </>
                  ) : (
                    "Enregistrer"
                  )}
                </button>
                {saved && (
                  <span
                    className="flex items-center gap-1.5 text-[9px] tracking-[0.12em] uppercase font-bold"
                    style={{ color: "#15803d" }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#15803d"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Sauvegardé
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Statut */}
          <div className="border-t border-stone-100 pt-4">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
              Statut
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUTS.map((s) => (
                <button
                  key={s}
                  onClick={() => onAskConfirm(inscription, s)}
                  disabled={
                    updating === inscription.id || inscription.statut === s
                  }
                  className={`text-xs tracking-widest uppercase font-bold px-3 py-2 rounded-md transition-colors disabled:opacity-50
                    ${inscription.statut === s ? `${statutColors[s].bg} ${statutColors[s].text} cursor-default` : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}
                >
                  {statutLabels[s]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-100 flex items-center justify-between gap-3 bg-stone-50 rounded-b-xl">
          <p className="text-xs text-stone-400">Actions rapides</p>
          <div className="flex items-center gap-2">
            <a
              href={buildMailtoHref(inscription)}
              className="flex items-center gap-1.5 text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors px-3 py-2 rounded-md hover:bg-stone-100"
            >
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="12"
                  height="10"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M1 1.5L6.5 6L12 1.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              Répondre
            </a>
            <button
              onClick={onClose}
              className="text-xs tracking-widest uppercase font-bold px-3 py-2 rounded-md bg-[#3d2b1f] text-white hover:bg-[#5a3e2b] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//  Filtres & tri

function SortIcon({ active, dir }) {
  return (
    <span
      className={`inline-flex flex-col gap-[2px] ml-1 ${active ? "opacity-100" : "opacity-30"}`}
    >
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path
          d="M1 4L4 1L7 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={active && dir === "asc" ? 1 : 0.4}
        />
      </svg>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path
          d="M1 1L4 4L7 1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={active && dir === "desc" ? 1 : 0.4}
        />
      </svg>
    </span>
  );
}

//  Card mobile

function InscriptionCard({ inscription: i, onSelect, onAskConfirm, updating }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-[#3d2b1f]">
            {i.prenom} {i.nom}
          </p>
          <p className="text-xs text-stone-500 mt-0.5">{i.formation_titre}</p>
        </div>
        <StatutBadge statut={i.statut} size="sm" />
      </div>
      <div className="flex items-center gap-2 text-xs text-stone-400">
        <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
          <rect
            x="0.5"
            y="1.5"
            width="10"
            height="10"
            rx="1.5"
            stroke="#9ca3af"
            strokeWidth="1"
          />
          <line
            x1="3"
            y1="0"
            x2="3"
            y2="3"
            stroke="#9ca3af"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="3"
            stroke="#9ca3af"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        {formatDateCourt(i.date_debut)} → {formatDateCourt(i.date_fin)}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-stone-100">
        <StatutDropdown
          value={i.statut}
          onChange={(s) => onAskConfirm(i, s)}
          disabled={updating === i.id}
        />
        <button
          onClick={() => onSelect(i)}
          className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
        >
          Détail
        </button>
      </div>
    </div>
  );
}

//  Table principale

export default function InscriptionTable({
  inscriptions: initialInscriptions,
}) {
  const [inscriptions, setInscriptions] = useState(initialInscriptions);
  const [updating, setUpdating] = useState(null);
  const [selected, setSelected] = useState(null);
  const [pending, setPending] = useState(null);
  const [filterStatut, setFilterStatut] = useState("tous");
  const [filterFormation, setFilterFormation] = useState("toutes");
  const [sortBy, setSortBy] = useState("date_debut");
  const [sortDir, setSortDir] = useState("asc");
  const { toasts, push } = useToast();

  const formations = useMemo(() => {
    const set = new Set(inscriptions.map((i) => i.formation_titre));
    return [...set];
  }, [inscriptions]);

  const filtered = useMemo(() => {
    let list = [...inscriptions];
    if (filterStatut !== "tous")
      list = list.filter((i) => i.statut === filterStatut);
    if (filterFormation !== "toutes")
      list = list.filter((i) => i.formation_titre === filterFormation);
    list.sort((a, b) => {
      let va = a[sortBy],
        vb = b[sortBy];
      if (sortBy === "date_debut" || sortBy === "created_at") {
        va = new Date(va);
        vb = new Date(vb);
      } else {
        va = (va || "").toLowerCase();
        vb = (vb || "").toLowerCase();
      }
      return sortDir === "asc" ? (va > vb ? 1 : -1) : va < vb ? 1 : -1;
    });
    return list;
  }, [inscriptions, filterStatut, filterFormation, sortBy, sortDir]);

  function toggleSort(col) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  function askConfirm(inscription, newStatut) {
    if (inscription.statut === newStatut) return;
    setPending({ inscription, newStatut });
  }

  async function confirmUpdate() {
    if (!pending) return;
    const { inscription, newStatut } = pending;
    setPending(null);
    setUpdating(inscription.id);
    try {
      const res = await fetch(`${API}/api/inscriptions/${inscription.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statut: newStatut }),
      });
      if (res.ok) {
        setInscriptions((prev) =>
          prev.map((i) =>
            i.id === inscription.id ? { ...i, statut: newStatut } : i,
          ),
        );
        setSelected((prev) =>
          prev?.id === inscription.id ? { ...prev, statut: newStatut } : prev,
        );
        push(`Statut mis à jour — ${statutLabels[newStatut]}`, "success");
      } else {
        push("Erreur lors de la mise à jour", "error");
      }
    } catch {
      push("Erreur réseau — réessayez", "error");
    } finally {
      setUpdating(null);
    }
  }

  // Sauvegarde convention + note sans toucher au statut
  async function saveAdmin(id, { numero_convention, note_admin }) {
    try {
      const res = await fetch(`${API}/api/inscriptions/${id}/admin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ numero_convention, note_admin }),
      });
      if (res.ok) {
        setInscriptions((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, numero_convention, note_admin } : i,
          ),
        );
        setSelected((prev) =>
          prev?.id === id ? { ...prev, numero_convention, note_admin } : prev,
        );
        push("Notes sauvegardées", "success");
      } else {
        push("Erreur lors de la sauvegarde", "error");
      }
    } catch {
      push("Erreur réseau — réessayez", "error");
    }
  }

  const thClass =
    "px-5 py-3.5 text-left text-[10px] tracking-widest uppercase text-stone-500 font-bold select-none";
  const thBtn =
    "flex items-center gap-0.5 hover:text-stone-700 transition-colors cursor-pointer";

  return (
    <>
      {/*  Filtres  */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {["tous", ...STATUTS].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              className={`text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full transition-colors ${filterStatut === s ? "bg-[#3d2b1f] text-white" : "bg-white border border-stone-200 text-stone-500 hover:border-stone-300"}`}
            >
              {s === "tous" ? "Tous" : statutLabels[s]}
            </button>
          ))}
        </div>
        {formations.length > 1 && (
          <select
            value={filterFormation}
            onChange={(e) => setFilterFormation(e.target.value)}
            className="ml-auto text-xs border border-stone-200 rounded-md px-3 py-1.5 bg-white text-stone-600 focus:outline-none focus:border-[#8b6c47]"
          >
            <option value="toutes">Toutes les formations</option>
            {formations.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        )}
        <p className="text-xs text-stone-400 ml-auto">
          {filtered.length} inscription{filtered.length > 1 ? "s" : ""}
          {filtered.length !== inscriptions.length &&
            ` sur ${inscriptions.length}`}
        </p>
      </div>

      {/*  Vue mobile  */}
      <div className="flex flex-col gap-3 sm:hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-stone-400 font-serif">
            Aucun résultat.
          </div>
        ) : (
          filtered.map((i) => (
            <InscriptionCard
              key={i.id}
              inscription={i}
              onSelect={setSelected}
              onAskConfirm={askConfirm}
              updating={updating}
            />
          ))
        )}
      </div>

      {/*  Vue desktop  */}
      <div className="hidden sm:block bg-white border border-stone-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-stone-400 font-serif text-lg">
            Aucun résultat pour ces filtres.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className={thClass}>
                  <button className={thBtn} onClick={() => toggleSort("nom")}>
                    Stagiaire{" "}
                    <SortIcon active={sortBy === "nom"} dir={sortDir} />
                  </button>
                </th>
                <th className={thClass}>
                  <button
                    className={thBtn}
                    onClick={() => toggleSort("formation_titre")}
                  >
                    Formation{" "}
                    <SortIcon
                      active={sortBy === "formation_titre"}
                      dir={sortDir}
                    />
                  </button>
                </th>
                <th className={thClass}>
                  <button
                    className={thBtn}
                    onClick={() => toggleSort("date_debut")}
                  >
                    Date stage{" "}
                    <SortIcon active={sortBy === "date_debut"} dir={sortDir} />
                  </button>
                </th>
                <th className={thClass}>
                  <button
                    className={thBtn}
                    onClick={() => toggleSort("statut")}
                  >
                    Statut{" "}
                    <SortIcon active={sortBy === "statut"} dir={sortDir} />
                  </button>
                </th>
                <th className={`${thClass} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((i) => (
                <tr
                  key={i.id}
                  className="hover:bg-stone-50/70 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#3d2b1f]">
                      {i.prenom} {i.nom}
                    </p>
                    <a
                      href={`mailto:${i.email}`}
                      className="text-xs text-stone-400 hover:text-[#8b6c47] transition-colors opacity-0 group-hover:opacity-100"
                    >
                      {i.email}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-stone-600">
                    {i.formation_titre}
                  </td>
                  <td className="px-5 py-4 text-stone-500 text-xs whitespace-nowrap">
                    {formatDateCourt(i.date_debut)} →{" "}
                    {formatDateCourt(i.date_fin)}
                  </td>
                  <td className="px-5 py-4">
                    <StatutBadge statut={i.statut} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <StatutDropdown
                        value={i.statut}
                        onChange={(s) => askConfirm(i, s)}
                        disabled={updating === i.id}
                      />
                      <button
                        onClick={() => setSelected(i)}
                        className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
                      >
                        Détail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal
        pending={pending}
        onConfirm={confirmUpdate}
        onCancel={() => setPending(null)}
      />
      <InscriptionModal
        inscription={selected}
        onClose={() => setSelected(null)}
        onAskConfirm={askConfirm}
        updating={updating}
        onSaveAdmin={saveAdmin}
      />
      <Toast toasts={toasts} />
    </>
  );
}
