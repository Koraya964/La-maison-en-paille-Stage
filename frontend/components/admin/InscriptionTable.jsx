'use client'

import { useState } from 'react'

const statutColors = {
  en_attente: 'bg-amber-100 text-amber-700',
  confirmee: 'bg-green-100 text-green-700',
  annulee: 'bg-red-100 text-red-600',
}

const statutLabels = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  annulee: 'Annulée',
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function InscriptionTable({ inscriptions: initialInscriptions }) {
  const [inscriptions, setInscriptions] = useState(initialInscriptions)
  const [updating, setUpdating] = useState(null)
  const [selected, setSelected] = useState(null)

  async function updateStatut(id, statut) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/inscriptions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut }),
      })
      if (res.ok) {
        setInscriptions((prev) =>
          prev.map((i) => (i.id === id ? { ...i, statut } : i))
        )
      }
    } finally {
      setUpdating(null)
    }
  }

  return (
    <>
      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        {inscriptions.length === 0 ? (
          <div className="p-16 text-center text-stone-400 font-serif text-lg">
            Aucune inscription pour le moment.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">Stagiaire</th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">Formation</th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">Date stage</th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">Reçu le</th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">Statut</th>
                <th className="px-6 py-4 text-right text-xs tracking-widest uppercase text-stone-500 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {inscriptions.map((i) => (
                <tr key={i.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#3d2b1f]">{i.prenom} {i.nom}</p>
                    <a href={`mailto:${i.email}`} className="text-xs text-stone-400 hover:text-[#8b6c47]">{i.email}</a>
                    {i.telephone && <p className="text-xs text-stone-400">{i.telephone}</p>}
                  </td>
                  <td className="px-6 py-4 text-stone-600">{i.formation_titre}</td>
                  <td className="px-6 py-4 text-stone-500 text-xs">
                    {formatDate(i.date_debut)}<br />→ {formatDate(i.date_fin)}
                  </td>
                  <td className="px-6 py-4 text-stone-500 text-xs">{formatDate(i.created_at)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs tracking-wider uppercase px-2 py-1 ${statutColors[i.statut]}`}>
                      {statutLabels[i.statut]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelected(selected?.id === i.id ? null : i)}
                        className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
                      >
                        Détail
                      </button>
                      {i.statut === 'en_attente' && (
                        <button
                          onClick={() => updateStatut(i.id, 'confirmee')}
                          disabled={updating === i.id}
                          className="text-xs tracking-widest uppercase font-bold text-green-600 hover:text-green-800 transition-colors disabled:opacity-50"
                        >
                          Confirmer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Panneau détail */}
      {selected && (
        <div className="mt-6 bg-white border border-stone-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-serif text-xl text-[#3d2b1f]">
              {selected.prenom} {selected.nom}
            </h3>
            <button onClick={() => setSelected(null)} className="text-stone-400 hover:text-stone-600 text-lg">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">E-mail</p>
              <a href={`mailto:${selected.email}`} className="text-[#8b6c47]">{selected.email}</a>
            </div>
            {selected.telephone && (
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">Téléphone</p>
                <p>{selected.telephone}</p>
              </div>
            )}
            {selected.message && (
              <div className="col-span-2">
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">Message</p>
                <p className="text-stone-600 bg-stone-50 p-3">{selected.message}</p>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-6">
            {selected.statut !== 'confirmee' && (
              <button
                onClick={() => { updateStatut(selected.id, 'confirmee'); setSelected(null) }}
                className="btn-primary text-sm"
              >
                Confirmer l'inscription
              </button>
            )}
            {selected.statut !== 'annulee' && (
              <button
                onClick={() => { updateStatut(selected.id, 'annulee'); setSelected(null) }}
                className="text-xs tracking-widest uppercase font-bold text-red-500 hover:text-red-700 transition-colors"
              >
                Annuler l'inscription
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
