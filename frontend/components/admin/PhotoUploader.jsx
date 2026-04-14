'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = [
  { value: 'poele_de_masse', label: 'Poêle de masse' },
  { value: 'paille', label: 'Paille & Terre' },
  { value: 'autre', label: 'Autre' },
]

export default function PhotoUploader() {
  const router = useRouter()
  const fileRef = useRef(null)

  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({ titre: '', description: '', categorie: 'autre' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setSuccess(false)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const file = fileRef.current?.files[0]
    if (!file) { setError('Veuillez sélectionner une image.'); return }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('titre', form.titre)
      formData.append('description', form.description)
      formData.append('categorie', form.categorie)

      const res = await fetch('/api/realisations', { method: 'POST', body: formData })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erreur serveur')
      }

      setSuccess(true)
      setPreview(null)
      setForm({ titre: '', description: '', categorie: 'autre' })
      if (fileRef.current) fileRef.current.value = ''
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 text-sm">
          Photo uploadée avec succès !
        </div>
      )}

      {/* Zone de dépôt */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Image *
        </label>
        <label className="block border-2 border-dashed border-stone-300 hover:border-[#8b6c47] transition-colors cursor-pointer">
          {preview ? (
            <img src={preview} alt="Aperçu" className="w-full h-64 object-cover" />
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-stone-400 gap-2">
              <span className="text-4xl">📷</span>
              <span className="text-sm">Cliquez pour sélectionner une image</span>
              <span className="text-xs">JPG, PNG, WebP — 5 Mo max</span>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            className="sr-only"
            required
          />
        </label>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Titre (optionnel)
        </label>
        <input
          type="text"
          name="titre"
          value={form.titre}
          onChange={handleChange}
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          placeholder="Ex : Poêle de masse Oxa-Libre, Charente 2024"
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Description (optionnel)
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] resize-none"
          placeholder="Quelques mots sur la réalisation…"
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Catégorie
        </label>
        <select
          name="categorie"
          value={form.categorie}
          onChange={handleChange}
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47] bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? 'Upload en cours…' : 'Uploader la photo'}
      </button>
    </form>
  )
}
