import NewsForm from '@/components/admin/NewsForm'

export const metadata = { title: 'Nouvelle actualité' }

export default function NouvelleActualitePage() {
  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-[#3d2b1f] mb-8">Nouvelle actualité</h1>
      <NewsForm />
    </div>
  )
}
