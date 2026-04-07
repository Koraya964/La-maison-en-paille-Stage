// app/api/stages/route.js
import { getStages, createStage } from '@/lib/controllers/stages'

export async function GET(request) {
  return getStages(request)
}

export async function POST(request) {
  return createStage(request)
}
