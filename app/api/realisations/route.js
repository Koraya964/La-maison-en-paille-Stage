import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { saveImage, isValidImage } from '@/lib/uploadImage'

// GET /api/realisations
export async function GET() {
  try {
    const realisations = await query(
      'SELECT * FROM realisations ORDER BY ordre ASC, created_at DESC'
    )
    return NextResponse.json(realisations)
  } catch (error) {
    console.error('[GET /api/realisations]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST /api/realisations — upload + création (admin)
export async function POST(request) {
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
    console.error('[POST /api/realisations]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
