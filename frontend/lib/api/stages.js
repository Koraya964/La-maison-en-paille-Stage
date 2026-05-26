const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchStages(formationId = null) {
  const url = formationId
    ? `${API}/api/stages?formation_id=${formationId}`
    : `${API}/api/stages`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Erreur fetchStages');
  return res.json();
}

export async function fetchStageById(id) {
  const res = await fetch(`${API}/api/stages/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Erreur fetchStageById');
  return res.json();
}

export async function fetchStagesAdmin(cookieHeader) {
  const res = await fetch(`${API}/api/stages/all`, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Erreur fetchStagesAdmin');
  return res.json();
}

export async function createStage(data, cookieHeader) {
  const res = await fetch(`${API}/api/stages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur createStage');
  return res.json();
}

export async function updateStage(id, data, cookieHeader) {
  const res = await fetch(`${API}/api/stages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur updateStage');
  return res.json();
}

export async function deleteStage(id, cookieHeader) {
  const res = await fetch(`${API}/api/stages/${id}`, {
    method: 'DELETE',
    headers: { Cookie: cookieHeader },
  });
  if (!res.ok) throw new Error('Erreur deleteStage');
  return res.json();
}

export async function fetchFormationsWithStages() {
  const res = await fetch(`${API}/api/stages/formations`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Erreur fetchFormationsAvecStages');
  return res.json();
}