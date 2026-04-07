// app/api/stages/[id]/route.js
import { getStage, updateStage, deleteStage } from '@/lib/controllers/stages'

export async function GET(request, context) {
  return getStage(request, context)
}

export async function PUT(request, context) {
  return updateStage(request, context)
}

export async function DELETE(request, context) {
  return deleteStage(request, context)
}
