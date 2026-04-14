'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  { value: 'poele_de_masse', label: 'Poêle de masse' },
  { value: 'paille', label: 'Paille & Terre' },
  { value: 'autre', label: 'Autre' },
]

export default function EditRealisationPage({ params }) {
  const router = useRouter()
  const [realisation, setRealisation] = useState(null)
  const [form, setForm] = useState({ titre: '', description: '', categorie: 'autre', ordre: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/api/realisations/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setRealisation(data)
        setForm({
          titre: data.titre || '',
          description: data.description || '',
          categorie: data.categorie || 'autre',
          ordre: data.ordre || 0,
        })
      })
      .catch(() => setError('Impossible de charger la réalisation.'))
  }, [params.id])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/realisations/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      router.push('/dashboard/realisations')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Supprimer cette photo définitivement ?')) return
    setLoading(true)
    try {
      await fetch(`/api/realisations/${params.id}`, { method: 'DELETE' })
      router.push('/dashboard/realisations')
      router.refresh()
    } catch {
      setError('Erreur lors de la suppression.')
      setLoading(false)
    }
  }

  if (!realisation) {
    return (
      <div className="p-8">
        <p className="text-stone-400">{error || 'Chargement…'}</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-[#3d2b1f] mb-8">Modifier la photo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-3xl">
        {/* Aperçu */}
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-500 font-bold mb-3">Aperçu</p>
          {realisation.image_url ? (
            <img src={realisation.image_url} alt={realisation.titre || ''} className="w-full h-64 object-cover border border-stone-200" />
          ) : (
            <div className="h-64 bg-stone-100 flex items-center justify-center text-stone-400">Pas d'image</div>
          )}
          <p className="text-xs text-stone-400 mt-2">{realisation.image_url}</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
          )}
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">Titre</label>
            <input
              type="text"
              value={form.titre}
              onChange={(e) => setForm((p) => ({ ...p, titre: e.target.value }))}
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">Catégorie</label>
            <select
              value={form.categorie}
              onChange={(e) => setForm((p) => ({ ...p, categorie: e.target.value }))}
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">Ordre d'affichage</label>
            <input
              type="number"
              value={form.ordre}
              onChange={(e) => setForm((p) => ({ ...p, ordre: Number(e.target.value) }))}
              min={0}
              className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                {loading ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button type="button" onClick={() => router.back()} className="btn-outline">Annuler</button>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="text-xs tracking-widest uppercase font-bold text-red-500 hover:text-red-700 transition-colors"
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
