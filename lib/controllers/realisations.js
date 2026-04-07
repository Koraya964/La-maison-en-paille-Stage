// lib/controllers/realisations.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { saveImage, isValidImage } from '@/lib/uploadImage'

// ---------------------------------------------------------------------------
// GET /api/realisations
// ---------------------------------------------------------------------------
export async function getRealisations() {
  try {
    const realisations = await query(
      'SELECT * FROM realisations ORDER BY ordre ASC, created_at DESC'
    )
    return NextResponse.json(realisations)
  } catch (error) {
    console.error('[getRealisations]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// POST /api/realisations
// ---------------------------------------------------------------------------
export async function createRealisation(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('image')
    const titre = formData.get('titre')
    const description = formData.get('description')
    const categorie = formData.get('categorie') || 'autre'

    if (!file || file.size === 0) {
      return NextResponse.json({ error: 'Image requise' }, { status: 400 })
    }

    if (!isValidImage(file)) {
      return NextResponse.json(
        { error: 'Format invalide ou fichier trop lourd (5 Mo max)' },
        { status: 400 }
      )
    }

    const imageUrl = await saveImage(file, 'realisations')

    const result = await query(
      'INSERT INTO realisations (titre, description, image_url, categorie) VALUES (?, ?, ?, ?)',
      [titre || null, description || null, imageUrl, categorie]
    )

    return NextResponse.json({ id: result.insertId, image_url: imageUrl, success: true }, { status: 201 })
  } catch (error) {
    console.error('[createRealisation]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// GET /api/realisations/[id]
// ---------------------------------------------------------------------------
export async function getRealisation(request, { params }) {
  try {
    const rows = await query('SELECT * FROM realisations WHERE id = ?', [params.id])
    if (!rows.length) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('[getRealisation]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// PUT /api/realisations/[id]
// ---------------------------------------------------------------------------
export async function updateRealisation(request, { params }) {
  try {
    const { titre, description, categorie, ordre } = await request.json()

    await query(
      'UPDATE realisations SET titre = ?, description = ?, categorie = ?, ordre = ? WHERE id = ?',
      [titre || null, description || null, categorie || 'autre', ordre || 0, params.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[updateRealisation]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/realisations/[id]
// ---------------------------------------------------------------------------
export async function deleteRealisation(request, { params }) {
  try {
    // TODO : supprimer aussi le fichier image du disque via deleteImage(image_url)
    await query('DELETE FROM realisations WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[deleteRealisation]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
