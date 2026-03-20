import Link from 'next/link'
import { query } from '@/lib/db'

export const metadata = { title: 'Vue générale' }

async function getStats() {
  try {
    const [inscriptions] = await query('SELECT COUNT(*) as count FROM inscriptions WHERE statut = "en_attente"')
    const [stages] = await query('SELECT COUNT(*) as count FROM stages WHERE statut = "ouvert"')
    const [actualites] = await query('SELECT COUNT(*) as count FROM actualites')
    const [realisations] = await query('SELECT COUNT(*) as count FROM realisations')
    return {
      inscriptionsEnAttente: inscriptions.count,
      stagesOuverts: stages.count,
      actualites: actualites.count,
      realisations: realisations.count,
    }
  } catch {
    return { inscriptionsEnAttente: 0, stagesOuverts: 0, actualites: 0, realisations: 0 }
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { titre: 'Inscriptions en attente', valeur: stats.inscriptionsEnAttente, href: '/dashboard/inscriptions', couleur: 'bg-amber-50 border-amber-200', accent: 'text-amber-700' },
    { titre: 'Stages ouverts', valeur: stats.stagesOuverts, href: '/dashboard/stages', couleur: 'bg-green-50 border-green-200', accent: 'text-green-700' },
    { titre: 'Actualités', valeur: stats.actualites, href: '/dashboard/actualites', couleur: 'bg-blue-50 border-blue-200', accent: 'text-blue-700' },
    { titre: 'Photos galerie', valeur: stats.realisations, href: '/dashboard/realisations', couleur: 'bg-purple-50 border-purple-200', accent: 'text-purple-700' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#3d2b1f]">Bonjour André 👋</h1>
        <p className="text-stone-500 mt-1">Voici un résumé de votre site.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Link key={card.titre} href={card.href} className={`p-6 border rounded-lg ${card.couleur} hover:shadow-md transition-shadow`}>
            <p className="text-sm text-stone-500 mb-2">{card.titre}</p>
            <p className={`font-serif text-4xl ${card.accent}`}>{card.valeur}</p>
          </Link>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <h2 className="font-serif text-xl text-[#3d2b1f] mb-5">Actions rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/actualites/nouvelle" className="btn-primary text-sm">+ Nouvelle actualité</Link>
          <Link href="/dashboard/stages/nouveau" className="btn-primary text-sm">+ Nouveau stage</Link>
          <Link href="/dashboard/realisations/nouvelle" className="btn-primary text-sm">+ Uploader une photo</Link>
          <Link href="/dashboard/inscriptions" className="btn-outline text-sm">Voir les inscriptions</Link>
        </div>
      </div>
    </div>
  )
}
