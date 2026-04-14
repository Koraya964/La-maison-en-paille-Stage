const API = process.env.NEXT_PUBLIC_API_URL;

// Appelé depuis le formulaire de login (Client Component)
export async function login(email, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method:      'POST',
    headers:     { 'Content-Type': 'application/json' },
    credentials: 'include', // indispensable pour que le cookie soit posé
    body:        JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Identifiants incorrects');
  }
  return res.json();
}

export async function logout() {
  await fetch(`${API}/api/auth/logout`, {
    method:      'POST',
    credentials: 'include',
  });
}
