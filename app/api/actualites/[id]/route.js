// app/api/actualites/[id]/route.js
import { getActualite, updateActualite, deleteActualite } from '@/lib/controllers/actualites'

export async function GET(request, context) {
  return getActualite(request, context)
}

export async function PUT(request, context) {
  return updateActualite(request, context)
}

export async function DELETE(request, context) {
  return deleteActualite(request, context)
}
