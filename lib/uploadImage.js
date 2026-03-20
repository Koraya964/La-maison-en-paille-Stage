import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

/**
 * Sauvegarde un fichier image uploadé dans /public/images/<dossier>/
 * @param {File}   file    - L'objet File issu du FormData
 * @param {string} dossier - Sous-dossier de destination (ex: 'realisations')
 * @returns {Promise<string>} L'URL publique du fichier (ex: /images/realisations/photo.jpg)
 */
export async function saveImage(file, dossier = 'realisations') {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Générer un nom de fichier unique
  const timestamp = Date.now()
  const ext = path.extname(file.name).toLowerCase() || '.jpg'
  const filename = `${timestamp}${ext}`

  // Créer le dossier si besoin
  const uploadDir = path.join(process.cwd(), 'public', 'images', dossier)
  await mkdir(uploadDir, { recursive: true })

  // Écrire le fichier
  const filepath = path.join(uploadDir, filename)
  await writeFile(filepath, buffer)

  // Retourner l'URL publique
  return `/images/${dossier}/${filename}`
}

/**
 * Vérifie qu'un fichier est bien une image et ne dépasse pas 5 Mo.
 * @param {File} file
 * @returns {boolean}
 */
export function isValidImage(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 5 * 1024 * 1024 // 5 Mo

  return allowedTypes.includes(file.type) && file.size <= maxSize
}
