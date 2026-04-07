// app/api/actualites/route.js
import { getActualites, createActualite } from '@/lib/controllers/actualites'

export async function GET(request) {
  return getActualites(request)
}

export async function POST(request) {
  return createActualite(request)
}
