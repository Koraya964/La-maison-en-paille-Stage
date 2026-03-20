import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: {
    default: 'La Maison en Paille — Formations naturelles',
    template: '%s | La Maison en Paille',
  },
  description:
    'Formations en construction naturelle : Paille Terre Chaux, Poêle de masse, Photovoltaïque. Animées par André de Bouter depuis 25 ans. Charente (16).',
  metadataBase: new URL('https://www.lamaisonenpaille.com'),
  openGraph: {
    siteName: 'La Maison en Paille',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-stone-50 text-stone-800 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
