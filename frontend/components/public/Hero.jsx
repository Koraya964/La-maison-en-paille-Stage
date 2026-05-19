"use client";

import Link from "next/link";
import { IMAGES } from "./constants";
import { useParallax, useScrolled } from "./hooks";

function StatPill({ value, label, delay }) {
  return (
    <div
      className="opacity-0 animate-fade-up flex flex-col items-center gap-0.5"
      style={{ animationDelay: delay }}
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
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "95svh" }}
      aria-label="Formations construction naturelle — La Maison en Paille"
    >
      {/* Image de fond */}
      <div
        className="absolute inset-0 opacity-0 animate-fade-in"
        style={{
          backgroundImage: `url(${IMAGES.bandeau})`,
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
          animationDelay: "0ms",
        }}
        aria-hidden="true"
      />

      {/* Overlay gradient chaud */}
      <div
        className="absolute inset-0 opacity-0 animate-fade-in"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(160deg, rgba(20,6,2,0.62) 0%, rgba(28,8,2,0.88) 100%)",
          animationDelay: "0ms",
        }}
      />

      {/* Grain texture */}
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
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 items-center opacity-0 animate-fade-in"
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
          className="opacity-0 animate-badge-in mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            animationDelay: "100ms",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
            aria-hidden="true"
          />
          <p className="font-raleway text-[9px] tracking-[0.3em] uppercase text-white/50">
            André de Bouter · 25 ans de transmission
          </p>
        </div>

        {/* H1 — "Formations" en surtitre discret, nom du site en grand */}
        <h1
          className="opacity-0 animate-fade-up flex flex-col items-center gap-4 mb-2"
          style={{ animationDelay: "200ms" }}
        >
          {/* Surtitre SEO — petit, discret */}
          <span
            className="font-raleway font-medium text-white/40 uppercase tracking-[0.45em]"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)" }}
          >
            Formations
          </span>

          {/* Nom du site — grand, chaleureux */}
          <span
            className="font-raleway font-black text-white uppercase leading-none"
            style={{
              fontSize: "clamp(3rem, 9vw, 5rem)",
              letterSpacing: "0.04em",
              textShadow: "0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            La Maison <span style={{ color: "#e8b86d" }}>en Paille</span>
          </span>
        </h1>

        {/* Année + lignes décoratives */}
        <div
          className="flex items-center gap-5 mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "350ms" }}
          aria-hidden="true"
        >
          <div
            className="opacity-0 animate-line-grow h-px flex-1 bg-white/15"
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
            className="opacity-0 animate-line-grow-right h-px flex-1 bg-white/15"
            style={{ animationDelay: "500ms", maxWidth: "80px" }}
          />
        </div>

        {/* Description */}
        <p
          className="opacity-0 animate-fade-up font-raleway text-white/55 mb-10 max-w-lg leading-relaxed"
          style={{
            animationDelay: "450ms",
            fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
          }}
        >
          <strong className="font-normal">
            Construction naturelle en Charente
          </strong>{" "}
          — <strong className="font-normal">paille</strong>,{" "}
          <strong className="font-normal">terre</strong>,{" "}
          <strong className="font-normal">chaux</strong>,{" "}
          <strong className="font-normal">poêle de masse</strong> et{" "}
          <strong className="font-normal">photovoltaïque</strong>.
        </p>

        {/* CTAs */}
        <div
          className="opacity-0 animate-fade-up flex flex-col sm:flex-row items-center gap-6 mb-14"
          style={{ animationDelay: "550ms" }}
        >
          <Link
            href="/inscription"
            className="relative font-raleway font-bold text-[10px] tracking-[0.28em] uppercase text-white/80 transition-colors duration-300 hover:text-white after:absolute after:bottom-[-3px] after:left-0 after:w-full after:h-px after:bg-white/60 after:scale-x-0 after:origin-left after:transition-transform after:duration-400 hover:after:scale-x-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            S&apos;inscrire à une formation
          </Link>
          <span className="text-white/15 hidden sm:block" aria-hidden="true">
            |
          </span>
          <Link
            href="#formations"
            className="font-raleway text-[10px] tracking-[0.28em] uppercase text-white/35 flex items-center gap-2 transition-colors duration-200 hover:text-white/70"
          >
            Découvrir
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
        <ul
          className="opacity-0 animate-fade-up flex items-center gap-10 sm:gap-16 list-none p-0 m-0 mb-12"
          style={{ animationDelay: "650ms" }}
          aria-label="Chiffres clés"
        >
          <div
            className="h-px w-8 bg-white/10 hidden sm:block"
            aria-hidden="true"
          />
          <li>
            <StatPill value="25 ans" label="d'expérience" delay="700ms" />
          </li>
          <div className="h-px w-px bg-white/10" aria-hidden="true" />
          <li>
            <StatPill value="3" label="formations" delay="750ms" />
          </li>
          <div className="h-px w-px bg-white/10" aria-hidden="true" />
          <li>
            <StatPill value="100%" label="satisfaction" delay="800ms" />
          </li>
          <div
            className="h-px w-8 bg-white/10 hidden sm:block"
            aria-hidden="true"
          />
        </ul>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 mt-6 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-white/15 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-white/40 animate-scroll-bar" />
        </div>
        <p className="font-raleway text-[8px] tracking-[0.25em] uppercase text-white/25">
          Défiler
        </p>
      </div>
    </section>
  );
}
