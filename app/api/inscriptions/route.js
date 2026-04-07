// app/api/inscriptions/route.js
import { createInscription } from '@/lib/controllers/inscriptions'

export async function POST(request) {
  return createInscription(request)
}
