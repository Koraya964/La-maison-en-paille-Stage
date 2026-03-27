"use client";

import { formatDate } from "./constants";

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4 inline-block"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function StepCoordonnees({
  formation,
  selectedStage,
  inscription,
  onBack,
}) {
  const { form, errors, submitting, serverError, handleChange, submit } =
    inscription;

  function handleSubmit(e) {
    e.preventDefault();
    submit(selectedStage.id);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* ── Récap stage choisi ── */}
      <div className="bg-[#f5f0e6] p-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#8b3a2a] mb-1">
            Stage sélectionné
          </p>
          <p className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.05em] text-sm">
            {formation?.titre}
          </p>
          <p className="text-xs text-[#4a4a4a] mt-0.5">
            {formatDate(selectedStage?.date_debut)} →{" "}
            {formatDate(selectedStage?.date_fin)}
            &nbsp;·&nbsp;{formation?.tarif}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="font-raleway font-bold text-[10px] tracking-[0.12em] uppercase text-[#8b3a2a] hover:text-[#3d1a0e] transition-colors flex-shrink-0"
        >
          Modifier
        </button>
      </div>

      {/* ── Erreur serveur ── */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* ── Prénom + Nom ── */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "prenom", label: "Prénom *", placeholder: "Votre prénom" },
          { name: "nom", label: "Nom *", placeholder: "Votre nom" },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${
                errors[name]
                  ? "border-red-400 bg-red-50"
                  : "border-stone-200 focus:border-[#8b3a2a]"
              }`}
            />
            {errors[name] && (
              <p className="text-red-600 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── Email ── */}
      <div>
        <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${
            errors.email
              ? "border-red-400 bg-red-50"
              : "border-stone-200 focus:border-[#8b3a2a]"
          }`}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* ── Téléphone ── */}
      <div>
        <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
          Téléphone{" "}
          <span className="text-stone-400 normal-case tracking-normal font-normal">
            (optionnel)
          </span>
        </label>
        <input
          type="tel"
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          placeholder="06 12 34 56 78"
          className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${
            errors.telephone
              ? "border-red-400 bg-red-50"
              : "border-stone-200 focus:border-[#8b3a2a]"
          }`}
        />
        {errors.telephone && (
          <p className="text-red-600 text-xs mt-1">{errors.telephone}</p>
        )}
      </div>

      {/* ── Message ── */}
      <div>
        <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
          Message / Questions{" "}
          <span className="text-stone-400 normal-case tracking-normal font-normal">
            (optionnel)
          </span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Votre projet, vos questions…"
          className={`w-full border px-4 py-3 text-sm focus:outline-none resize-none transition-colors ${
            errors.message
              ? "border-red-400 bg-red-50"
              : "border-stone-200 focus:border-[#8b3a2a]"
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p className="text-red-600 text-xs">{errors.message}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-stone-400">{form.message.length}/2000</p>
        </div>
      </div>

      {/* ── Mention paiement ── */}
      <div className="bg-[#f5f0e6] p-4 text-xs text-[#4a4a4a] leading-relaxed">
        <p className="font-raleway font-bold text-[10px] tracking-[0.1em] uppercase text-[#3d1a0e] mb-1">
          Paiement
        </p>
        Par chèque (France) ou virement (étranger) — Acompte 30&nbsp;% à
        l&apos;inscription, solde 70&nbsp;% avant le stage.
      </div>

      {/* ── Boutons ── */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="font-raleway font-bold text-[10px] tracking-[0.15em] uppercase px-5 py-3 border-2 border-stone-300 text-stone-600 hover:border-[#3d1a0e] transition-colors"
        >
          ← Retour
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="btn-terracotta flex-1 text-center flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting && <Spinner />}
          {submitting ? "Envoi en cours…" : "Envoyer ma demande d'inscription"}
        </button>
      </div>

      <p className="text-xs text-stone-400 text-center">
        Vous recevrez un email de confirmation et une convention de
        participation.
      </p>
    </form>
  );
}
