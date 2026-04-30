import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { v4 as uuid } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    // upload.js est dans src/routes/ — ../public remonte dans src/public
    destination: join(__dirname, '../public/images/realisations'),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `${uuid()}${ext}`)
    },
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true)
        else cb(new Error('Fichier non supporté'))
    },
})

export const uploadImage = [
    upload.single('image'),
    (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' })
        const url = `${process.env.BACKEND_URL}/images/realisations/${req.file.filename}`
        res.json({ url })
    },
]