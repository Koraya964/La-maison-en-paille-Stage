"use client";

import Link from "next/link";
import { IMAGES, BRUN } from "./constants";
import { useParallax, useScrolled } from "./hooks";

// Ligne décorative animée
function HeroLine({ delay = 0 }) {
  return (
    <div
      className="h-px bg-white/20 hero-reveal"
      style={{ animationDelay: `${delay}ms`, width: "3rem" }}
    />
  );
}

// Badge flottant stat
function StatPill({ value, label, delay }) {
  return (
    <div
      className="hero-reveal flex flex-col items-center gap-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className="font-raleway font-black text-white"
        style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1 }}
      >
        {value}
      </span>
      <span className="font-raleway text-[8px] tracking-[0.22em] uppercase text-white/40">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const heroRef = useParallax();
  const scrolled = useScrolled(60);

  return (
    <>
      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes heroBadge {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        .hero-reveal {
          opacity: 0;
          animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-fade {
          opacity: 0;
          animation: heroFadeIn 1.2s ease forwards;
        }
        .hero-badge {
          opacity: 0;
          animation: heroBadge 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-divider {
          transform-origin: left;
          transform: scaleX(0);
          opacity: 0;
          animation: lineGrow 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100svh",
          backgroundImage: `url(${IMAGES.bandeau})`,
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
        aria-label="Formations 2026 — La Maison en Paille"
      >
        {/* Overlay gradient multicouche */}
        <div
          className="absolute inset-0 hero-fade"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(160deg, rgba(20,6,2,0.65) 0%, rgba(28,8,2,0.9) 100%)",
            animationDelay: "0ms",
          }}
        />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.35,
          }}
        />

        {/* Ligne décorative gauche */}
        <div
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 items-center hero-fade"
          style={{ animationDelay: "800ms" }}
          aria-hidden="true"
        >
          <div className="w-px h-24 bg-white/10" />
          <p
            className="font-raleway text-[8px] tracking-[0.35em] uppercase text-white/20"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Charente · France
          </p>
          <div className="w-px h-24 bg-white/10" />
        </div>

        {/* Contenu central */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center max-w-4xl">
          {/* Badge top */}
          <div
            className="hero-badge mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full"
            style={{
              animationDelay: "100ms",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-raleway text-[9px] tracking-[0.3em] uppercase text-white/50">
              André de Bouter · 25 ans de transmission
            </p>
          </div>

          {/* Titre principal */}
          <div className="overflow-hidden mb-2">
            <h1
              className="hero-reveal font-raleway font-black text-white uppercase"
              style={{
                animationDelay: "200ms",
                fontSize: "clamp(3.2rem, 10vw, 7.5rem)",
                letterSpacing: "0.04em",
                lineHeight: 0.95,
                textShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              Forma<span style={{ color: "#e8b86d" }}>tions</span>
            </h1>
          </div>

          {/* Année avec ligne décorative */}
          <div
            className="flex items-center gap-5 mb-10 hero-reveal"
            style={{ animationDelay: "350ms" }}
          >
            <div
              className="hero-divider h-px flex-1 bg-white/15"
              style={{ animationDelay: "500ms", maxWidth: "80px" }}
            />
            <span
              className="font-raleway font-black text-white/20 uppercase"
              style={{
                fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                letterSpacing: "0.45em",
              }}
            >
              2026
            </span>
            <div
              className="hero-divider h-px flex-1 bg-white/15"
              style={{
                animationDelay: "500ms",
                transformOrigin: "right",
                maxWidth: "80px",
              }}
            />
          </div>

          {/* Description */}
          <p
            className="hero-reveal font-raleway text-white/55 mb-10 max-w-lg leading-relaxed"
            style={{
              animationDelay: "450ms",
              fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
            }}
          >
            Construction naturelle en Charente — paille, terre, chaux, poêle de
            masse et photovoltaïque.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center gap-4 mb-14 hero-reveal"
            style={{ animationDelay: "550ms" }}
          >
            <Link
              href="/inscription"
              className="font-raleway font-bold text-[10px] tracking-[0.18em] uppercase px-8 py-3.5 rounded-full text-white transition-all duration-300 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(4px)",
              }}
            >
              S&apos;inscrire à une formation
            </Link>
            <Link
              href="#formations"
              className="font-raleway text-[10px] tracking-[0.18em] uppercase text-white/40 hover:text-white/70 transition-colors duration-200 flex items-center gap-2"
            >
              Voir les formations
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1 L6 6 L11 1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="hero-reveal flex items-center gap-10 sm:gap-16"
            style={{ animationDelay: "650ms" }}
          >
            <div className="h-px w-8 bg-white/10 hidden sm:block" />
            <StatPill value="25 ans" label="d'expérience" delay={700} />
            <div className="h-px w-px bg-white/10" />
            <StatPill value="3" label="formations" delay={750} />
            <div className="h-px w-px bg-white/10" />
            <StatPill value="100%" label="satisfaction" delay={800} />
            <div className="h-px w-8 bg-white/10 hidden sm:block" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-hidden="true"
        >
          <div className="w-px h-10 bg-white/15 relative overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 h-1/2 bg-white/40"
              style={{
                animation: "heroReveal 1.5s ease-in-out infinite alternate",
              }}
            />
          </div>
          <p className="font-raleway text-[8px] tracking-[0.25em] uppercase text-white/25">
            Défiler
          </p>
        </div>
      </section>
    </>
  );
}
