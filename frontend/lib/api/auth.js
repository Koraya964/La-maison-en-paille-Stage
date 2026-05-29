const API = process.env.NEXT_PUBLIC_API_URL;

export async function login(email, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Identifiants incorrects');
  }
  const data = await res.json();
  if (data.token) localStorage.setItem('auth_token', data.token);
  return data;
}

export async function logout() {
  localStorage.removeItem('auth_token');
  await fetch(`${API}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}
