// app/api/realisations/route.js
import { getRealisations, createRealisation } from '@/lib/controllers/realisations'

export async function GET() {
  return getRealisations()
}

export async function POST(request) {
  return createRealisation(request)
}
