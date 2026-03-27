'use client'

import { useState, useEffect } from 'react'

const FORMATIONS = [
  { id: 1, slug: 'paille-terre-chaux', titre: 'Paille, Terre & Chaux',    duree: '6 jours', tarif: '660 €' },
  { id: 2, slug: 'poele-de-masse',     titre: 'Poêle de Masse',           duree: '3 jours', tarif: '380 €' },
  { id: 3, slug: 'photovoltaique',     titre: 'Autonomie Photovoltaïque', duree: '2 jours', tarif: 'Nous contacter' },
]

const STATUT_LABELS = {
  ouvert:        { label: 'Places disponibles', cls: 'bg-green-100 text-green-700' },
  complet:       { label: 'Complet',            cls: 'bg-red-100 text-red-600' },
  liste_attente: { label: "Liste d'attente",    cls: 'bg-amber-100 text-amber-700' },
  annule:        { label: 'Annulé',             cls: 'bg-stone-100 text-stone-500' },
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export default function InscriptionForm({ preselectedFormationId = null }) {
  // ── State ──
  const [step,           setStep]           = useState(1)   // 1 = choix stage, 2 = coordonnées, 3 = succès
  const [formationId,    setFormationId]    = useState(preselectedFormationId)
  const [stages,         setStages]         = useState([])
  const [loadingStages,  setLoadingStages]  = useState(false)
  const [selectedStage,  setSelectedStage]  = useState(null)
  const [form,           setForm]           = useState({ prenom: '', nom: '', email: '', telephone: '', message: '' })
  const [errors,         setErrors]         = useState({})
  const [submitting,     setSubmitting]     = useState(false)
  const [serverError,    setServerError]    = useState(null)

  // ── Charger les stages quand une formation est sélectionnée ──
  useEffect(() => {
    if (!formationId) { setStages([]); setSelectedStage(null); return }
    setLoadingStages(true)
    setSelectedStage(null)
    fetch(`/api/stages?formation_id=${formationId}`)
      .then(r => r.json())
      .then(data => setStages(Array.isArray(data) ? data : []))
      .catch(() => setStages([]))
      .finally(() => setLoadingStages(false))
  }, [formationId])

  // ── Validation côté client ──
  function validateForm() {
    const e = {}
    if (!form.prenom.trim() || form.prenom.trim().length < 2)  e.prenom    = 'Prénom requis (2 caractères min)'
    if (!form.nom.trim()    || form.nom.trim().length < 2)     e.nom       = 'Nom requis (2 caractères min)'
    if (!form.email.trim()  || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (form.telephone && !/^[\d\s\+\-\(\)\.]{6,20}$/.test(form.telephone))    e.telephone = 'Numéro invalide'
    if (form.message && form.message.length > 2000)                             e.message   = '2000 caractères max'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return
    setSubmitting(true)
    setServerError(null)
    try {
      const res  = await fetch('/api/inscriptions', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ stage_id: selectedStage.id, ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur serveur')
      setStep(3)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const formation = FORMATIONS.find(f => f.id === Number(formationId))

  // ── Étape 3 : Succès ──
  if (step === 3) {
    return (
      <div className="bg-white p-10 text-center shadow-lg max-w-lg mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl mb-4">
          Demande envoyée !
        </h2>
        <p className="text-sm text-[#4a4a4a] leading-relaxed mb-2">
          Merci <strong>{form.prenom}</strong>, votre demande d&apos;inscription au stage
          <strong> {formation?.titre}</strong> a bien été reçue.
        </p>
        <p className="text-sm text-[#4a4a4a] leading-relaxed mb-8">
          Vous recevrez un email de confirmation à <strong>{form.email}</strong>.
          André vous contactera prochainement pour valider votre participation.
        </p>
        <div className="text-xs text-[#4a4a4a] bg-[#f5f0e6] p-4 text-left">
          <p className="font-raleway font-bold text-[#3d1a0e] uppercase tracking-wider mb-2">Récapitulatif</p>
          <p><strong>Formation :</strong> {formation?.titre}</p>
          <p><strong>Dates :</strong> {formatDate(selectedStage?.date_debut)} → {formatDate(selectedStage?.date_fin)}</p>
          <p><strong>Contact :</strong> 05 45 66 27 68 · contact@lamaisonenpaille.com</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-lg max-w-2xl mx-auto">
      {/* ── En-tête avec progression ── */}
      <div className="bg-[#3d1a0e] px-8 py-5">
        <div className="flex items-center justify-between">
          {[['1', 'Choisir un stage'], ['2', 'Mes coordonnées']].map(([n, label], i) => {
            const active  = step === i + 1
            const done    = step > i + 1
            return (
              <div key={n} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-raleway font-black ${
                  done   ? 'bg-[#c8a040] text-[#3d1a0e]' :
                  active ? 'bg-white text-[#3d1a0e]' :
                           'bg-white/20 text-white/50'
                }`}>
                  {done ? '✓' : n}
                </div>
                <span className={`font-raleway font-bold text-[10px] tracking-[0.15em] uppercase ${
                  active ? 'text-white' : done ? 'text-[#c8a040]' : 'text-white/40'
                }`}>{label}</span>
              </div>
            )
          })}
          <div className="flex-1 h-px bg-white/20 mx-4" />
        </div>
      </div>

      <div className="p-8">
        {/* ════════════════════════════════
            ÉTAPE 1 — Choisir le stage
        ════════════════════════════════ */}
        {step === 1 && (
          <div className="space-y-8">
            {/* Sélecteur formation */}
            <div>
              <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-3">
                Formation *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {FORMATIONS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormationId(f.id)}
                    className={`text-left p-4 border-2 transition-all ${
                      Number(formationId) === f.id
                        ? 'border-[#8b3a2a] bg-[#fff8f6]'
                        : 'border-stone-200 hover:border-[#c8a040]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.06em] text-sm">
                          {f.titre}
                        </p>
                        <p className="font-raleway text-[10px] tracking-wider uppercase text-[#8b3a2a] mt-0.5">
                          {f.duree}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-raleway font-black text-[#c8a040] text-sm">{f.tarif}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          Number(formationId) === f.id
                            ? 'border-[#8b3a2a] bg-[#8b3a2a]'
                            : 'border-stone-300'
                        }`}>
                          {Number(formationId) === f.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sélecteur date */}
            {formationId && (
              <div>
                <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-3">
                  Date du stage *
                </label>
                {loadingStages ? (
                  <div className="flex items-center gap-3 py-4 text-[#4a4a4a] text-sm">
                    <Spinner /> Chargement des dates…
                  </div>
                ) : stages.length === 0 ? (
                  <p className="text-sm text-[#4a4a4a] py-3 border border-stone-200 px-4">
                    Aucune date disponible pour le moment.
                    <a href="mailto:contact@lamaisonenpaille.com" className="ml-2 text-[#8b3a2a] underline">
                      Contactez-nous
                    </a>
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stages.map((s) => {
                      const statut  = STATUT_LABELS[s.statut] || STATUT_LABELS.ouvert
                      const dispo   = s.statut === 'ouvert'
                      const checked = selectedStage?.id === s.id
                      return (
                        <button
                          key={s.id}
                          type="button"
                          disabled={!dispo}
                          onClick={() => dispo && setSelectedStage(s)}
                          className={`w-full text-left p-4 border-2 transition-all flex items-center justify-between ${
                            !dispo  ? 'border-stone-100 bg-stone-50 opacity-60 cursor-not-allowed' :
                            checked ? 'border-[#8b3a2a] bg-[#fff8f6]' :
                                      'border-stone-200 hover:border-[#c8a040]'
                          }`}
                        >
                          <div>
                            <p className="font-raleway font-bold text-sm text-[#3d1a0e]">
                              {formatDate(s.date_debut)} → {formatDate(s.date_fin)}
                            </p>
                            <p className="text-xs text-[#4a4a4a] mt-0.5">
                              {s.places_dispo} place{s.places_dispo > 1 ? 's' : ''} restante{s.places_dispo > 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`font-raleway font-bold text-[9px] tracking-[0.12em] uppercase px-2 py-1 ${statut.cls}`}>
                              {statut.label}
                            </span>
                            {dispo && (
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                checked ? 'border-[#8b3a2a] bg-[#8b3a2a]' : 'border-stone-300'
                              }`}>
                                {checked && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Bouton suivant */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!selectedStage}
                className="btn-terracotta disabled:opacity-40 disabled:cursor-not-allowed w-full text-center"
              >
                Continuer →
              </button>
              {!formationId && (
                <p className="text-xs text-[#4a4a4a] text-center mt-3">Sélectionnez une formation pour voir les dates</p>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════
            ÉTAPE 2 — Coordonnées
        ════════════════════════════════ */}
        {step === 2 && (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Récap stage choisi */}
            <div className="bg-[#f5f0e6] p-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#8b3a2a] mb-1">Stage sélectionné</p>
                <p className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.05em] text-sm">{formation?.titre}</p>
                <p className="text-xs text-[#4a4a4a] mt-0.5">
                  {formatDate(selectedStage?.date_debut)} → {formatDate(selectedStage?.date_fin)}
                  &nbsp;·&nbsp; {formation?.tarif}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-raleway font-bold text-[10px] tracking-[0.12em] uppercase text-[#8b3a2a] hover:text-[#3d1a0e] transition-colors flex-shrink-0"
              >
                Modifier
              </button>
            </div>

            {/* Erreur serveur */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {serverError}
              </div>
            )}

            {/* Prénom + Nom */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'prenom', label: 'Prénom *',       placeholder: 'Votre prénom' },
                { name: 'nom',    label: 'Nom *',           placeholder: 'Votre nom' },
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
                      errors[name] ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#8b3a2a]'
                    }`}
                  />
                  {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}
            </div>

            {/* Email */}
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
                  errors.email ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#8b3a2a]'
                }`}
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
                Téléphone <span className="text-stone-400 normal-case tracking-normal">(optionnel)</span>
              </label>
              <input
                type="tel"
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="06 12 34 56 78"
                className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors ${
                  errors.telephone ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#8b3a2a]'
                }`}
              />
              {errors.telephone && <p className="text-red-600 text-xs mt-1">{errors.telephone}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-2">
                Message / Questions <span className="text-stone-400 normal-case tracking-normal">(optionnel)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Votre projet, vos questions…"
                className={`w-full border px-4 py-3 text-sm focus:outline-none resize-none transition-colors ${
                  errors.message ? 'border-red-400 bg-red-50' : 'border-stone-200 focus:border-[#8b3a2a]'
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.message
                  ? <p className="text-red-600 text-xs">{errors.message}</p>
                  : <span />
                }
                <p className="text-xs text-stone-400">{form.message.length}/2000</p>
              </div>
            </div>

            {/* Mention paiement */}
            <div className="bg-[#f5f0e6] p-4 text-xs text-[#4a4a4a] leading-relaxed">
              <p className="font-raleway font-bold text-[10px] tracking-[0.1em] uppercase text-[#3d1a0e] mb-1">Paiement</p>
              Par chèque (France) ou virement (étranger) — Acompte 30 % à l&apos;inscription, solde 70 % avant le stage.
            </div>

            {/* Boutons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
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
                {submitting ? 'Envoi en cours…' : "Envoyer ma demande d'inscription"}
              </button>
            </div>

            <p className="text-xs text-stone-400 text-center">
              Vous recevrez un email de confirmation et une convention de participation.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
