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
  // plus de useState local — tout vient du hook
  const {
    form,
    errors,
    submitting,
    serverError,
    handleChange,
    submit,
    isEntreprise,
    setIsEntreprise,
  } = inscription;

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
            {formatDate(selectedStage?.date_fin)}&nbsp;·&nbsp;{formation?.tarif}
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
              className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors[name] ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
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
          className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.email ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* ── Téléphone ── */}
      <div>
        <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
          Téléphone *
        </label>
        <input
          type="tel"
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          placeholder="06 12 34 56 78"
          className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.telephone ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
        />
        {errors.telephone && (
          <p className="text-red-600 text-xs mt-1">{errors.telephone}</p>
        )}
      </div>

      {/* ── Adresse + Code Postal ── */}
      <div>
        <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
          Adresse *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            placeholder="Votre adresse"
            className={`w-2/3 border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.adresse ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
          />
          <input
            type="text"
            name="cedex"
            value={form.cedex}
            onChange={handleChange}
            placeholder="Code postal"
            className={`w-1/3 border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.cedex ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
          />
        </div>
        {errors.adresse && (
          <p className="text-red-600 text-xs mt-1">{errors.adresse}</p>
        )}
        {errors.cedex && (
          <p className="text-red-600 text-xs mt-1">{errors.cedex}</p>
        )}
      </div>

      {/* ── Ville ── */}
      <div>
        <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
          Ville *
        </label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Paris"
          className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.city ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
        />
        {errors.city && (
          <p className="text-red-600 text-xs mt-1">{errors.city}</p>
        )}
      </div>

      {/* ── Section entreprise ── */}
      <div className="bg-[#3d1a0e] p-4">
        <p className="font-bold text-[12px] tracking-[0.1em] uppercase text-white mb-1">
          Pour les Entreprises
        </p>
      </div>

      {/* ── Toggle entreprise ── */}
      <div
        onClick={() => setIsEntreprise((p) => !p)}
        className="flex items-center justify-between px-4 py-3 border border-stone-200 rounded-lg bg-stone-50 cursor-pointer select-none"
      >
        <div>
          <p className="text-sm font-medium text-[#3d1a0e]">
            Inscrire au nom d'une entreprise
          </p>
          <p className="text-xs text-stone-500">
            Renseigner les coordonnées professionnelles
          </p>
        </div>
        <div
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isEntreprise ? "bg-[#3d1a0e]" : "bg-stone-300"}`}
        >
          <div
            className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-200 ${isEntreprise ? "translate-x-5" : ""}`}
          />
        </div>
      </div>

      {/* ── Bloc entreprise (conditionnel) ── */}
      {isEntreprise && (
        <div className="border border-stone-200 rounded-lg p-4 space-y-4">
          <p className="text-[10px] tracking-widest uppercase text-stone-400 border-b border-stone-100 pb-2">
            Informations entreprise
          </p>

          {/* ── Nom entreprise ── */}
          <div>
            <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
              Nom de l'entreprise *
            </label>
            <input
              type="text"
              name="entreprise_name"
              value={form.entreprise_name}
              onChange={handleChange}
              placeholder="Nom de l'entreprise"
              className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.entreprise_name ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
            />
            {errors.entreprise_name && (
              <p className="text-red-600 text-xs mt-1">
                {errors.entreprise_name}
              </p>
            )}
          </div>

          {/* ── Email entreprise ── */}
          <div>
            <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
              Email de l'entreprise *
            </label>
            <input
              type="email"
              name="entreprise_email"
              value={form.entreprise_email}
              onChange={handleChange}
              placeholder="entreprise@email.com"
              className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.entreprise_email ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
            />
            {errors.entreprise_email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.entreprise_email}
              </p>
            )}
          </div>

          {/* ── SIRET ── */}
          <div>
            <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
              SIRET *
            </label>
            <input
              type="text"
              name="siret"
              value={form.siret}
              onChange={handleChange}
              placeholder="14 chiffres"
              className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.siret ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
            />
            {errors.siret && (
              <p className="text-red-600 text-xs mt-1">{errors.siret}</p>
            )}
          </div>

          {/* ── Téléphone entreprise ── */}
          <div>
            <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
              Téléphone *
            </label>
            <input
              type="tel"
              name="entreprise_telephone"
              value={form.entreprise_telephone}
              onChange={handleChange}
              placeholder="06 12 34 56 78"
              className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.entreprise_telephone ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
            />
            {errors.entreprise_telephone && (
              <p className="text-red-600 text-xs mt-1">
                {errors.entreprise_telephone}
              </p>
            )}
          </div>

          {/* ── Adresse entreprise + Code postal ── */}
          <div>
            <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
              Adresse *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="entreprise_adress"
                value={form.entreprise_adress}
                onChange={handleChange}
                placeholder="Adresse de l'entreprise"
                className={`w-2/3 border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.entreprise_adress ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
              />
              <input
                type="text"
                name="entreprise_cedex"
                value={form.entreprise_cedex}
                onChange={handleChange}
                placeholder="Code postal"
                className={`w-1/3 border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.entreprise_cedex ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
              />
            </div>
            {errors.entreprise_adress && (
              <p className="text-red-600 text-xs mt-1">
                {errors.entreprise_adress}
              </p>
            )}
            {errors.entreprise_cedex && (
              <p className="text-red-600 text-xs mt-1">
                {errors.entreprise_cedex}
              </p>
            )}
          </div>

          {/* ── Ville entreprise ── */}
          <div>
            <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
              Ville *
            </label>
            <input
              type="text"
              name="entreprise_city"
              value={form.entreprise_city}
              onChange={handleChange}
              placeholder="Paris"
              className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${errors.entreprise_city ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
            />
            {errors.entreprise_city && (
              <p className="text-red-600 text-xs mt-1">
                {errors.entreprise_city}
              </p>
            )}
          </div>
        </div>
      )}

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
          className={`w-full border px-4 py-3 text-sm focus:outline-none resize-none transition-colors ${errors.message ? "border-red-400 bg-red-50" : "border-stone-200 focus:border-[#8b3a2a]"}`}
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
