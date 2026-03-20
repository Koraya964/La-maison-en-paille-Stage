'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Vue générale', href: '/dashboard', icon: '⊞' },
  { label: 'Actualités', href: '/dashboard/actualites', icon: '📰' },
  { label: 'Stages', href: '/dashboard/stages', icon: '📅' },
  { label: 'Inscriptions', href: '/dashboard/inscriptions', icon: '✉️' },
  { label: 'Réalisations', href: '/dashboard/realisations', icon: '🖼' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#3d2b1f] text-stone-300 flex flex-col">
      <div className="px-6 py-8 border-b border-stone-700">
        <Link href="/" className="text-[#c8a96e] font-serif text-lg">La Maison en Paille</Link>
        <p className="text-xs text-stone-500 mt-1 tracking-widest uppercase">Dashboard</p>
      </div>
      <nav className="flex-1 px-4 py-6">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mb-1 text-sm rounded transition-colors ${
                active
                  ? 'bg-[#8b6c47] text-white'
                  : 'hover:bg-[#2a1d15] text-stone-300'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-6 py-4 border-t border-stone-700">
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="text-xs text-stone-400 hover:text-white transition-colors tracking-widest uppercase">
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  )
}
