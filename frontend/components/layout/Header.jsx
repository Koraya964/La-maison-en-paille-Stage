"use client";

import { useState, useRef, useEffect } from "react";
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
      { label: "André de Bouter", href: "/andre-de-bouter" },
      { label: "Porte ouverte : Poêle de masse", href: "/ressources" },
      { label: "Vos réalisations", href: "/realisations" },
      { label: "Livres", href: "/livres" },
    ],
  },
  { label: "Coordonnées", href: "/contact" },
];

function Dropdown({ item, onClose }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-2 bg-[#2a1208] border border-white/10 rounded-md shadow-2xl min-w-[220px] z-50"
      style={{ animation: "fadeDown 0.15s ease" }}
    >
      {item.children.map((child) => (
        <Link
          key={child.href}
          href={child.href}
          onClick={onClose}
          className="block px-5 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-colors tracking-wide"
        >
          {child.label}
        </Link>
      ))}
    </div>
  );
}

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Ferme si on clique dehors
  useEffect(() => {
    if (!open) return;
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="text-white/70 hover:text-white text-sm tracking-widest uppercase font-medium transition-colors py-1"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm tracking-widest uppercase font-medium transition-colors py-1 cursor-pointer"
      >
        {item.label}
        <svg
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && <Dropdown item={item} onClose={() => setOpen(false)} />}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  return (
    <>
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translate(-50%, -6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 400px; }
        }
        .mobile-submenu { animation: slideDown 0.2s ease; overflow: hidden; }
      `}</style>

      <header className="bg-[#3d1a0e] sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-[64px] gap-8">
          {/* Logo — discret et bien proportionné */}
          <Link href="/" className="flex-shrink-0" style={{ lineHeight: 0 }}>
            <Image
              src={LOGO}
              alt="La Maison en Paille"
              width={176}
              height={138}
              className="object-contain"
              style={{ width: "auto", height: "44px" }}
              unoptimized
            />
          </Link>

          {/* Séparateur */}
          <div className="hidden lg:block w-px h-6 bg-white/15 flex-shrink-0" />

          {/* Nav desktop */}
          <nav
            className="hidden lg:flex items-center gap-7 flex-1"
            aria-label="Navigation principale"
          >
            {nav.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>

          {/* CTA desktop */}
          <Link
            href="/inscription"
            className="hidden lg:inline-flex items-center px-4 py-2 text-xs tracking-widest uppercase font-semibold text-[#3d1a0e] bg-[#c8a96e] hover:bg-[#d4b87a] rounded transition-colors flex-shrink-0"
          >
            S'inscrire
          </Link>

          {/* Burger mobile */}
          <button
            className="lg:hidden ml-auto text-white/80 hover:text-white p-1 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Menu"
          >
            <svg
              className="w-5 h-5"
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

        {/* Menu mobile */}
        {mobileOpen && (
          <nav
            className="lg:hidden bg-[#2a1208] border-t border-white/10 px-5 py-3"
            aria-label="Navigation mobile"
          >
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="border-b border-white/5 last:border-0"
                >
                  <button
                    className="w-full flex items-center justify-between py-3.5 text-xs tracking-widest uppercase text-white/60 hover:text-white font-medium transition-colors"
                    onClick={() =>
                      setMobileExpanded((v) =>
                        v === item.label ? null : item.label,
                      )
                    }
                    aria-expanded={mobileExpanded === item.label}
                  >
                    {item.label}
                    <svg
                      className="w-3 h-3 transition-transform duration-200"
                      style={{
                        transform:
                          mobileExpanded === item.label
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="mobile-submenu pb-2 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2.5 text-sm text-white/60 hover:text-white transition-colors"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileExpanded(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={item.href}
                  className="border-b border-white/5 last:border-0"
                >
                  <Link
                    href={item.href}
                    className="block py-3.5 text-xs tracking-widest uppercase text-white/60 hover:text-white font-medium transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ),
            )}

            <div className="pt-4 pb-2">
              <Link
                href="/inscription"
                className="block text-center py-3 text-xs tracking-widest uppercase font-semibold text-[#3d1a0e] bg-[#c8a96e] hover:bg-[#d4b87a] rounded transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                S'inscrire
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
