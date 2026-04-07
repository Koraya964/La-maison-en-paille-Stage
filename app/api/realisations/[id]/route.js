// app/api/realisations/[id]/route.js
import { getRealisation, updateRealisation, deleteRealisation } from '@/lib/controllers/realisations'

export async function GET(request, context) {
  return getRealisation(request, context)
}

export async function PUT(request, context) {
  return updateRealisation(request, context)
}

export async function DELETE(request, context) {
  return deleteRealisation(request, context)
}
