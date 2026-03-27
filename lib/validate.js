export function validateStage(data) {
    const { formation_id, date_debut, date_fin, places_total } = data
    if (!formation_id || isNaN(Number(formation_id)))
        return { ok: false, error: 'formation_id invalide' }
    if (!date_debut || isNaN(Date.parse(date_debut)))
        return { ok: false, error: 'date_debut invalide' }
    if (!date_fin || isNaN(Date.parse(date_fin)))
        return { ok: false, error: 'date_fin invalide' }
    if (new Date(date_fin) <= new Date(date_debut))
        return { ok: false, error: 'date_fin doit être après date_debut' }
    return { ok: true }
}

export function validateInscription(data) {
    const { stage_id, nom, prenom, email } = data
    if (!stage_id || isNaN(Number(stage_id)))
        return { ok: false, error: 'stage_id invalide' }
    if (!nom?.trim() || nom.trim().length < 2)
        return { ok: false, error: 'Nom invalide' }
    if (!prenom?.trim() || prenom.trim().length < 2)
        return { ok: false, error: 'Prénom invalide' }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return { ok: false, error: 'Email invalide' }
    return { ok: true }
}

export function validateActualite(data) {
    const { titre, contenu } = data
    if (!titre?.trim() || titre.trim().length < 3)
        return { ok: false, error: 'Titre invalide' }
    if (!contenu?.trim() || contenu.trim().length < 10)
        return { ok: false, error: 'Contenu trop court' }
    return { ok: true }
}

export function validateAuth(data) {
    const { email, password } = data
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return { ok: false, error: 'Email invalide' }
    if (!password || password.length < 6)
        return { ok: false, error: 'Mot de passe invalide' }
    return { ok: true }
}