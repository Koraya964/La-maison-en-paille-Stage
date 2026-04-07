// app/api/inscriptions/[id]/route.js
import { getInscription, updateInscription, deleteInscription } from '@/lib/controllers/inscriptions'

export async function GET(request, context) {
  return getInscription(request, context)
}

export async function PUT(request, context) {
  return updateInscription(request, context)
}

export async function DELETE(request, context) {
  return deleteInscription(request, context)
}
