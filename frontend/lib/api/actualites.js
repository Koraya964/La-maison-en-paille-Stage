const API = process.env.NEXT_PUBLIC_API_URL;

// Public

// Liste des actualités publiées (revalidée toutes les 60s)
export async function fetchActualites() {
  const res = await fetch(`${API}/api/actualites`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Erreur fetchActualites');
  return res.json();
}

export async function fetchActualiteById(id) {
  const res = await fetch(`${API}/api/actualites/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Erreur fetchActualiteById');
  return res.json();
}

// Dashboard (routes protégées — cookie transmis)

// Toutes les actualités y compris brouillons
export async function fetchActualitesAdmin(cookieHeader) {
  const res = await fetch(`${API}/api/actualites/all`, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Erreur fetchActualitesAdmin');
  return res.json();
}

export async function createActualite(data, cookieHeader) {
  const res = await fetch(`${API}/api/actualites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur createActualite');
  return res.json();
}

export async function updateActualite(id, data, cookieHeader) {
  const res = await fetch(`${API}/api/actualites/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur updateActualite');
  return res.json();
}

export async function deleteActualite(id, cookieHeader) {
  const res = await fetch(`${API}/api/actualites/${id}`, {
    method: 'DELETE',
    headers: { Cookie: cookieHeader },
  });
  if (!res.ok) throw new Error('Erreur deleteActualite');
  return res.json();
}
