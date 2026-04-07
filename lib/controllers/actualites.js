// lib/controllers/actualites.js
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// ---------------------------------------------------------------------------
// GET /api/actualites
// ---------------------------------------------------------------------------
export async function getActualites(request) {
  try {
    const { searchParams } = new URL(request.url)
    const showAll = searchParams.get('all') === 'true'

    const sql = showAll
      ? 'SELECT * FROM actualites ORDER BY created_at DESC'
      : 'SELECT * FROM actualites WHERE publie = TRUE ORDER BY created_at DESC'

    return NextResponse.json(await query(sql))
  } catch (error) {
    console.error('[getActualites]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// POST /api/actualites
// ---------------------------------------------------------------------------
export async function createActualite(request) {
  try {
    const { titre, contenu, image_url, publie } = await request.json()

    if (!titre || !contenu) {
      return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 })
    }

    const result = await query(
      'INSERT INTO actualites (titre, contenu, image_url, publie) VALUES (?, ?, ?, ?)',
      [titre, contenu, image_url || null, publie ? 1 : 0]
    )

    return NextResponse.json({ id: result.insertId, success: true }, { status: 201 })
  } catch (error) {
    console.error('[createActualite]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// GET /api/actualites/[id]
// ---------------------------------------------------------------------------
export async function getActualite(request, { params }) {
  try {
    const rows = await query('SELECT * FROM actualites WHERE id = ?', [params.id])
    if (!rows.length) {
      return NextResponse.json({ error: 'Actualité introuvable' }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('[getActualite]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// PUT /api/actualites/[id]
// ---------------------------------------------------------------------------
export async function updateActualite(request, { params }) {
  try {
    const { titre, contenu, image_url, publie } = await request.json()

    if (!titre || !contenu) {
      return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 })
    }

    await query(
      'UPDATE actualites SET titre = ?, contenu = ?, image_url = ?, publie = ?, updated_at = NOW() WHERE id = ?',
      [titre, contenu, image_url || null, publie ? 1 : 0, params.id]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[updateActualite]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/actualites/[id]
// ---------------------------------------------------------------------------
export async function deleteActualite(request, { params }) {
  try {
    await query('DELETE FROM actualites WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[deleteActualite]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
