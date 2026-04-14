const API = process.env.NEXT_PUBLIC_API_URL;

// Public 

// Formulaire d'inscription (appelé depuis un Client Component)
export async function createInscription(data) {
  const res = await fetch(`${API}/api/inscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erreur inscription');
  }
  return res.json();
}

// Dashboard 

export async function fetchInscriptions(cookieHeader) {
  const res = await fetch(`${API}/api/inscriptions`, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Erreur fetchInscriptions');
  return res.json();
}

export async function fetchInscriptionById(id, cookieHeader) {
  const res = await fetch(`${API}/api/inscriptions/${id}`, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Erreur fetchInscriptionById');
  return res.json();
}

// Changer le statut : 'en_attente' | 'confirmee' | 'annulee'
export async function updateInscription(id, statut, cookieHeader) {
  const res = await fetch(`${API}/api/inscriptions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify({ statut }),
  });
  if (!res.ok) throw new Error('Erreur updateInscription');
  return res.json();
}

export async function deleteInscription(id, cookieHeader) {
  const res = await fetch(`${API}/api/inscriptions/${id}`, {
    method: 'DELETE',
    headers: { Cookie: cookieHeader },
  });
  if (!res.ok) throw new Error('Erreur deleteInscription');
  return res.json();
}
