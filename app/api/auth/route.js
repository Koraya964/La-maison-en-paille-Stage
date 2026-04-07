// app/api/auth/route.js
import { login, logout } from '@/lib/controllers/auth'

export async function POST(request) {
  return login(request)
}

export async function DELETE() {
  return logout()
}
