"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LOGO =
  "https://static.wixstatic.com/media/3e33e8_e863ef51ae0a4110a5bddcbebff85137~mv2.png/v1/crop/x_0,y_18,w_518,h_417/fill/w_176,h_138,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo-web.png";

const nav = [
  {
    label: "Formations",
    children: [
      {
        label: "Paille, Terre & Chaux",
        href: "/formations/paille-terre-chaux",
      },
      { label: "Poêle de Masse", href: "/formations/poele-de-masse" },
      { label: "Photovoltaïque", href: "/formations/photovoltaique" },
    ],
  },
  {
    label: "Découvrir",
    children: [
      { label: "Porte ouverte : Poêle de masse", href: "/ressources" },
      { label: "Poêle de masse", href: "/ressources" },
      { label: "Vos réalisations", href: "/realisations" },
    ],
  },
  { label: "Livres", href: "/livres" },
  { label: "Blog", href: "/actualites" },
  { label: "André de Bouter", href: "/andre-de-bouter" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [openDrop, setOpenDrop] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#3d1a0e] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-[80px] gap-10">
        {/* Logo carré blanc */}
        <Link
          href="/"
          className="flex-shrink-0 bg-white p-2 block"
          style={{ lineHeight: 0 }}
        >
          <Image
            src={LOGO}
            alt="La Maison en Paille"
            width={100}
            height={80}
            className="object-contain"
            style={{ width: "auto", height: "64px" }}
            unoptimized
          />
        </Link>

        {/* Séparateur vertical */}
        <div className="hidden lg:block w-px h-10 bg-white/20" />

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDrop(item.label)}
                onMouseLeave={() => setOpenDrop(null)}
              >
                <button className="nav-link flex items-center gap-1.5">
                  {item.label}
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 6">
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                {openDrop === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-[#3d1a0e] border border-white/10 shadow-xl min-w-[240px] z-50">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block px-5 py-3 font-raleway font-700 text-[10px] tracking-[0.15em] uppercase text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Séparateurs nav style site */}
        <div className="hidden lg:flex items-center gap-0">
          {/* Les séparateurs | entre items nav sont dans le nav lui-même via CSS */}
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden ml-auto text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#3d1a0e] border-t border-white/10 px-6 py-4">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="mb-4">
                <p className="font-raleway font-800 text-[10px] tracking-[0.18em] uppercase text-white/40 mb-2">
                  {item.label}
                </p>
                {item.children.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="block py-2 font-raleway font-700 text-[10px] tracking-[0.15em] uppercase text-white/70 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block mb-3 font-raleway font-700 text-[10px] tracking-[0.18em] uppercase text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      )}
    </header>
  );
}
