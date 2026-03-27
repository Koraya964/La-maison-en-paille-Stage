export const FORMATIONS = [
    { id: 1, slug: 'paille-terre-chaux', titre: 'Paille, Terre & Chaux', duree: '6 jours', tarif: '660 €' },
    { id: 2, slug: 'poele-de-masse', titre: 'Poêle de Masse', duree: '3 jours', tarif: '380 €' },
    { id: 3, slug: 'photovoltaique', titre: 'Autonomie Photovoltaïque', duree: '2 jours', tarif: 'Nous contacter' },
]

export const STATUT_LABELS = {
    ouvert: { label: 'Places disponibles', cls: 'bg-green-100 text-green-700' },
    complet: { label: 'Complet', cls: 'bg-red-100 text-red-600' },
    liste_attente: { label: "Liste d'attente", cls: 'bg-amber-100 text-amber-700' },
    annule: { label: 'Annulé', cls: 'bg-stone-100 text-stone-500' },
}

export function formatDate(d) {
    return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}