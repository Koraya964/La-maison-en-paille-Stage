'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewsForm({ actualite = null }) {
  const router = useRouter()
  const isEdit = !!actualite

  const [form, setForm] = useState({
    titre: actualite?.titre || '',
    contenu: actualite?.contenu || '',
    image_url: actualite?.image_url || '',
    publie: actualite?.publie ?? false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = isEdit ? `/api/actualites/${actualite.id}` : '/api/actualites'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erreur serveur')
      }

      router.push('/dashboard/actualites')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Supprimer cette actualité ? Cette action est irréversible.')) return
    setLoading(true)

    try {
      const res = await fetch(`/api/actualites/${actualite.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erreur lors de la suppression')
      router.push('/dashboard/actualites')
      router.refresh()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Titre *
        </label>
        <input
          type="text"
          name="titre"
          value={form.titre}
          onChange={handleChange}
          required
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          placeholder="Titre de l'actualité"
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Contenu *
        </label>
        <textarea
          name="contenu"
          value={form.contenu}
          onChange={handleChange}
          required
          rows={10}
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] resize-y"
          placeholder="Contenu de l'actualité…"
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          URL de l'image (optionnel)
        </label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          placeholder="https://…"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="publie"
          id="publie"
          checked={form.publie}
          onChange={handleChange}
          className="w-4 h-4 accent-[#8b6c47]"
        />
        <label htmlFor="publie" className="text-sm text-stone-600">
          Publier sur le site public
        </label>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Enregistrement…' : isEdit ? 'Enregistrer les modifications' : 'Créer l\'actualité'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-outline"
          >
            Annuler
          </button>
        </div>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-xs tracking-widest uppercase font-bold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            Supprimer
          </button>
        )}
      </div>
    </form>
  )
}
