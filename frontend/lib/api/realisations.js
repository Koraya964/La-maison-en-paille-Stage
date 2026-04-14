const API = process.env.NEXT_PUBLIC_API_URL;

//  Public 

export async function fetchRealisations() {
  const res = await fetch(`${API}/api/realisations`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Erreur fetchRealisations');
  return res.json();
}

export async function fetchRealisationById(id) {
  const res = await fetch(`${API}/api/realisations/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Erreur fetchRealisationById');
  return res.json();
}

//  Dashboard 

export async function createRealisation(data, cookieHeader) {
  const res = await fetch(`${API}/api/realisations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur createRealisation');
  return res.json();
}

export async function updateRealisation(id, data, cookieHeader) {
  const res = await fetch(`${API}/api/realisations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur updateRealisation');
  return res.json();
}

export async function deleteRealisation(id, cookieHeader) {
  const res = await fetch(`${API}/api/realisations/${id}`, {
    method: 'DELETE',
    headers: { Cookie: cookieHeader },
  });
  if (!res.ok) throw new Error('Erreur deleteRealisation');
  return res.json();
}
