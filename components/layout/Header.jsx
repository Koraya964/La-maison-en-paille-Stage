'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  {
    label: 'Formations',
    children: [
      { label: 'Paille, Terre & Chaux', href: '/formations/paille-terre-chaux' },
      { label: 'Poêle de masse', href: '/formations/poele-de-masse' },
      { label: 'Photovoltaïque', href: '/formations/photovoltaique' },
    ],
  },
  {
    label: 'Ressources',
    children: [
      { label: 'Actualités', href: '/actualites' },
      { label: 'Réalisations', href: '/realisations' },
      { label: 'Ressources', href: '/ressources' },
    ],
  },
  { label: 'André de Bouter', href: '/andre-de-bouter' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  return (
    <header className="sticky top-0 z-50 bg-[#f5f0e8] border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* Placeholder logo — remplacer par next/image avec le vrai logo */}
            <div className="w-14 h-14 bg-[#8b6c47] rounded-full flex items-center justify-center">
              <span className="text-white font-serif text-xs text-center leading-tight px-1">MP</span>
            </div>
            <span className="font-serif text-[#3d2b1f] text-sm uppercase tracking-wider hidden sm:block">
              La Maison<br />en Paille
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-xs tracking-widest uppercase text-stone-600 hover:text-[#8b6c47] transition-colors font-bold flex items-center gap-1">
                    {item.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border border-stone-100 min-w-48 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-3 text-xs tracking-wider uppercase text-stone-600 hover:bg-[#f5f0e8] hover:text-[#8b6c47] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs tracking-widest uppercase text-stone-600 hover:text-[#8b6c47] transition-colors font-bold"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-block bg-[#8b6c47] text-white text-xs tracking-widest uppercase px-5 py-2 font-bold hover:bg-[#3d2b1f] transition-colors"
          >
            Je m'inscris
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-stone-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="text-xs tracking-widest uppercase text-stone-400 font-bold px-2 py-2 mt-2">
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-stone-600 hover:text-[#8b6c47]"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-2 py-2 text-xs tracking-widest uppercase font-bold text-stone-600 hover:text-[#8b6c47]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="mt-4 block text-center bg-[#8b6c47] text-white text-xs tracking-widest uppercase px-5 py-3 font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Je m'inscris
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
