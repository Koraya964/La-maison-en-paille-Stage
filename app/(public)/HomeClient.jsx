"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const IMG_PAILLE_REAL =
  "https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg";
const IMG_POELE_REAL =
  "https://static.wixstatic.com/media/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg";
const IMG_PHOTO_REAL =
  "https://static.wixstatic.com/media/3e33e8_31acae3ecc7d4c1ab32197337fb25806~mv2.jpg/v1/fill/w_980,h_608,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_31acae3ecc7d4c1ab32197337fb25806~mv2.jpg";
const IMG_BANDEAU =
  "https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg";
const IMG_PORTE =
  "https://static.wixstatic.com/media/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png/v1/fill/w_475,h_285,al_c,q_85,enc_avif,quality_auto/f4c673_bfb45c777c99497f897266941e875ff9~mv2.png";
const IMG_GIF =
  "https://static.wixstatic.com/media/f4c673_9e107a544f7a4064a4a68de072001bac~mv2.gif";
const LOGO_FOOTER =
  "https://static.wixstatic.com/media/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png/v1/fill/w_29,h_29,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4c673_e47b03f2fb7e4abeaefbc943276b6819~mv2.png";

const BEIGE = "#ede8de";
const BEIGE_DARK = "#e2dbd0";
const BRUN = "#3d1a0e";

// ── Config statique par slug ──────────────────────────────────────────────────
const FORMATION_CONFIG = {
  "paille-terre-chaux": {
    num: "",
    sousTitre: "Construire · Rénover · Isoler · Décorer",
    desc: "Apprenez les clés pour réaliser votre projet durable, performant et confortable. Une formation complète pour passer de la théorie au chantier.",
    detail:
      "Enduits, isolation paille, torchis, chaux — toutes les techniques fondamentales de la construction naturelle, animées par André depuis 25 ans.",
    img: IMG_PAILLE_REAL,
    cardBg: "#c8a040",
    accent: "#a07828",
    Pattern: PatternPaille,
    patternId: "pat-paille",
  },
  "poele-de-masse": {
    num: "",
    sousTitre: "1 heure de feu = 24h de confort",
    desc: "Construisez votre poêle personnalisé. Les apports du stage vous permettent de réaliser ensuite votre projet en toute autonomie.",
    detail:
      "Conception, dimensionnement, maçonnerie réfractaire — vous repartez avec tous les plans de votre futur poêle.",
    img: IMG_POELE_REAL,
    cardBg: "#c06030",
    accent: "#8f3e18",
    Pattern: PatternFeu,
    patternId: "pat-feu",
  },
  photovoltaique: {
    num: "",
    sousTitre: "Par Sébastien Deroo",
    desc: "Pour toute personne désirant être davantage autonome, résiliente et économe dans sa consommation d'énergie.",
    detail:
      "Dimensionnement, câblage, batteries, régulateurs — maîtrisez votre installation solaire de A à Z.",
    img: IMG_PHOTO_REAL,
    cardBg: "#4a7a8a",
    accent: "#2d5f70",
    Pattern: PatternSolaire,
    patternId: "pat-solaire",
  },
};

const TEMOIGNAGES = [
  {
    texte:
      "Une semaine extraordinaire. André transmet avec une générosité rare — on repart avec les mains dans la terre et la tête pleine de solutions concrètes.",
    auteur: "Marie-Claire B.",
    formation: "Paille, Terre & Chaux",
    note: 5,
    accent: "#a07828",
  },
  {
    texte:
      "Je suis venu sans aucune base en maçonnerie. Trois jours plus tard, j'avais tous les plans de mon poêle et la confiance pour le construire. Bluffant.",
    auteur: "Thomas R.",
    formation: "Poêle de Masse",
    note: 5,
    accent: "#8f3e18",
  },
  {
    texte:
      "Formation très complète, très bien rythmée. Sébastien maîtrise son sujet et sait l'expliquer simplement. Je repars avec une vraie autonomie.",
    auteur: "Lucie & Paul M.",
    formation: "Photovoltaïque",
    note: 5,
    accent: "#2d5f70",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDateCourt(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d
    .toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
    .replace(".", "");
}

function formatPlage(debut, fin) {
  return `${formatDateCourt(debut)} – ${formatDateCourt(fin)}`;
}

// ── Badge places ──────────────────────────────────────────────────────────────
function PlacesBadge({ places, statut }) {
  // Complet ou 0 places → liste d'attente
  if (statut === "complet" || places === 0)
    return (
      <span
        className="font-raleway text-[8px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
        style={{
          backgroundColor: "#f0eaf8",
          color: "#7040a0",
          border: "1px solid #d0b8e8",
        }}
      >
        Liste d&apos;attente
      </span>
    );
  if (places <= 3)
    return (
      <span
        className="font-raleway text-[8px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
        style={{
          backgroundColor: "#fdf3e0",
          color: "#b07020",
          border: "1px solid #e8d090",
        }}
      >
        {places} place{places > 1 ? "s" : ""}
      </span>
    );
  return (
    <span
      className="font-raleway text-[8px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: "#e8f0e8",
        color: "#407040",
        border: "1px solid #b0d0b0",
      }}
    >
      {places} places
    </span>
  );
}

// ── SVG Patterns ──────────────────────────────────────────────────────────────

function PatternPaille({ id }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="16"
            x2="32"
            y2="16"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="32"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <circle cx="16" cy="16" r="1.5" fill="rgba(255,255,255,0.06)" />
          <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.04)" />
          <circle cx="32" cy="32" r="1" fill="rgba(255,255,255,0.04)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function PatternFeu({ id }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0 L40 40 L0 40 Z"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.8"
          />
          <path
            d="M0 0 L20 40 L40 0"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <path
            d="M20 10 L30 30 L10 30 Z"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function PatternSolaire({ id }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="40"
            x2="40"
            y2="0"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.8"
          />
          <line
            x1="-10"
            y1="40"
            x2="30"
            y2="0"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="40"
            x2="50"
            y2="0"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <circle
            cx="20"
            cy="20"
            r="2"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ── Étoiles ───────────────────────────────────────────────────────────────────
function Stars({ note, accent }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Note : ${note} sur 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 1L7.35 4.27L11 4.64L8.5 6.93L9.18 10.5L6 8.77L2.82 10.5L3.5 6.93L1 4.64L4.65 4.27L6 1Z"
            fill={i <= note ? accent : "transparent"}
            stroke={i <= note ? accent : "#c8bfb0"}
            strokeWidth="0.8"
          />
        </svg>
      ))}
    </div>
  );
}

// ── Badge satisfaction ────────────────────────────────────────────────────────
function SatisfactionBadge() {
  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
      style={{ backgroundColor: BEIGE_DARK, border: `1px solid #d0c8b8` }}
    >
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 1L7.35 4.27L11 4.64L8.5 6.93L9.18 10.5L6 8.77L2.82 10.5L3.5 6.93L1 4.64L4.65 4.27L6 1Z"
              fill="#c8a040"
              stroke="#c8a040"
              strokeWidth="0.8"
            />
          </svg>
        ))}
      </div>
      <div className="h-4 w-px" style={{ backgroundColor: "#d0c8b8" }} />
      <p
        className="font-raleway text-[10px] tracking-[0.14em] uppercase"
        style={{ color: "#7a5c3c" }}
      >
        <strong>100%</strong> de satisfaction stagiaires
      </p>
    </div>
  );
}

// ── Hook parallaxe ────────────────────────────────────────────────────────────
function useParallax() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      el.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return ref;
}

// ── Hook visible ──────────────────────────────────────────────────────────────
function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Formation row ─────────────────────────────────────────────────────────────
function FormationRow({ formation, i }) {
  const isEven = i % 2 === 0;
  const [ref, visible] = useVisible();
  const config = FORMATION_CONFIG[formation.slug] || {};
  const { Pattern } = config;

  //  Affiche ouvert ET complet
  const stagesVisibles = (formation.stages || []).filter(
    (s) => s.statut === "ouvert" || s.statut === "complet",
  );

  const prochainLabel =
    stagesVisibles.length > 0
      ? stagesVisibles
          .slice(0, 3)
          .map((s) => formatDateCourt(s.date_debut))
          .join(" · ")
      : "Dates à venir";

  return (
    <article
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Link
        href={`/formations/${formation.slug}`}
        className="group block focus:outline-none focus-visible:ring-4 focus-visible:ring-inset"
        aria-label={`Formation ${formation.titre} — ${formation.duree} — ${formation.tarif} €`}
      >
        <div
          className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
          style={{ minHeight: "460px" }}
        >
          {/* Visuel */}
          <div
            className="relative md:w-1/2 min-h-[300px] md:min-h-0 overflow-hidden"
            style={{ backgroundColor: config.cardBg }}
            aria-hidden="true"
          >
            {Pattern && <Pattern id={config.patternId} />}
            <Image
              src={config.img}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: 0.6 }}
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background: isEven
                  ? "linear-gradient(to right, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)"
                  : "linear-gradient(to left, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <div
              className="absolute bottom-4 font-raleway font-black select-none pointer-events-none"
              style={{
                fontSize: "clamp(5rem, 12vw, 9rem)",
                lineHeight: 1,
                color: "rgba(255,255,255,0.07)",
                right: isEven ? "1.5rem" : "auto",
                left: isEven ? "auto" : "1.5rem",
              }}
            >
              {config.num}
            </div>
            <div
              className="absolute top-5"
              style={{
                left: isEven ? "1.25rem" : "auto",
                right: isEven ? "auto" : "1.25rem",
              }}
            >
              <span
                className="font-raleway font-bold text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Stage · {formation.duree}
              </span>
            </div>
          </div>

          {/* Texte */}
          <div
            className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-20"
            style={{ backgroundColor: BEIGE }}
          >
            <div className="flex items-center justify-between mb-5">
              <p
                className="font-raleway font-bold text-[9px] tracking-[0.3em] uppercase"
                style={{ color: config.accent }}
              >
                Formation {config.num}
              </p>
              <span
                className="font-raleway font-bold text-[9px] tracking-[0.14em] uppercase px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${config.accent}18`,
                  color: config.accent,
                  border: `1px solid ${config.accent}40`,
                }}
              >
                {formation.tarif ? `${formation.tarif} €` : "À définir"}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Fredericka the Great', serif",
                fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)",
                lineHeight: 1.15,
                color: BRUN,
                marginBottom: "0.6rem",
              }}
            >
              {formation.titre}
            </h2>

            <p
              className="font-raleway uppercase mb-5"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                color: "#9a7a5a",
              }}
            >
              {config.sousTitre}
            </p>

            <div className="flex items-center gap-2 mb-6">
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="0.5"
                  y="1.5"
                  width="10"
                  height="10"
                  rx="1.5"
                  stroke={config.accent}
                  strokeWidth="1"
                />
                <line
                  x1="3"
                  y1="0"
                  x2="3"
                  y2="3"
                  stroke={config.accent}
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <line
                  x1="8"
                  y1="0"
                  x2="8"
                  y2="3"
                  stroke={config.accent}
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              <p
                className="font-raleway text-[9px] tracking-[0.14em] uppercase"
                style={{ color: config.accent }}
              >
                {prochainLabel}
              </p>
            </div>

            <div
              className="h-px w-10 mb-6"
              style={{ backgroundColor: config.accent, opacity: 0.5 }}
            />

            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "#5a4535", maxWidth: "420px" }}
            >
              {config.desc}
            </p>
            <p
              className="text-xs leading-relaxed mb-8"
              style={{ color: "#8a7060", maxWidth: "420px" }}
            >
              {config.detail}
            </p>

            <span
              className="font-raleway font-bold text-[10px] tracking-[0.18em] uppercase self-start flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
              style={{ color: config.accent }}
            >
              Voir les dates
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="5"
                  x2="11"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M8 1.5 L12 5 L8 8.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>

      {i < 2 && <div className="h-px" style={{ backgroundColor: "#d4ccbf" }} />}
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomeClient({ formations = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useParallax();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  //  Affiche ouvert ET complet dans le tableau des dates
  const prochainsDates = formations.map((f) => {
    const config = FORMATION_CONFIG[f.slug] || {};
    const stagesVisibles = (f.stages || []).filter(
      (s) => s.statut === "ouvert" || s.statut === "complet",
    );
    return {
      slug: f.slug,
      label: f.titre,
      tarif: f.tarif ? `${f.tarif} €` : "À définir",
      accent: config.accent || "#8b5e3c",
      stages: stagesVisibles,
    };
  });

  return (
    <div style={{ backgroundColor: BEIGE }}>
      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center"
        style={{
          minHeight: "100svh",
          backgroundImage: `url(${IMG_BANDEAU})`,
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
        aria-label="Formations 2026 — La Maison en Paille"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(40,14,4,0.52) 0%, rgba(28,8,2,0.84) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 text-center px-6 flex flex-col items-center gap-8 max-w-3xl">
          <p className="font-raleway text-[9px] tracking-[0.4em] uppercase text-white/40">
            André de Bouter · 25 ans de transmission · Charente
          </p>
          <h1
            className="font-raleway font-black text-white uppercase"
            style={{
              fontSize: "clamp(2.8rem, 9vw, 6.5rem)",
              letterSpacing: "0.05em",
              lineHeight: 1,
              textShadow: "0 2px 8px rgba(0,0,0,0.35)",
            }}
          >
            Formations
            <br />
            <span style={{ color: "#e8b86d" }}>2026</span>
          </h1>
          <div className="flex items-center gap-6">
            <div className="h-px w-12 bg-white/20" />
            <p className="font-raleway text-[10px] tracking-[0.25em] uppercase text-white/40">
              Construction naturelle
            </p>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <Link
            href="/inscription"
            className="mt-4 font-raleway font-bold text-[10px] tracking-[0.18em] uppercase px-8 py-3 rounded-full text-white transition-all duration-200 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            style={{ border: "1px solid rgba(255,255,255,0.3)" }}
          >
            S&apos;inscrire à une formation
          </Link>
          <div
            className={`mt-4 flex flex-col items-center gap-2 transition-opacity duration-500 ${
              scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-hidden="true"
          >
            <p className="font-raleway text-[9px] tracking-[0.2em] uppercase text-white/30">
              Découvrir
            </p>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="animate-bounce"
            >
              <line
                x1="8"
                y1="0"
                x2="8"
                y2="18"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
              <path
                d="M3 13 L8 20 L13 13"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <div
        className="py-14 px-8 text-center"
        style={{ backgroundColor: BEIGE, borderBottom: `1px solid #d4ccbf` }}
      >
        <p
          className="font-raleway italic max-w-xl mx-auto"
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            lineHeight: 1.9,
            color: "#5a4535",
          }}
        >
          Vous souhaitez concrétiser votre projet de construction naturelle ? Je
          vous transmets le savoir-faire pour le réaliser avec confiance et
          plaisir.
        </p>
        <p
          className="font-raleway font-bold text-[9px] tracking-[0.22em] uppercase mt-4"
          style={{ color: "#b08040" }}
        >
          — André de Bouter
        </p>
      </div>

      {/* ══ PROCHAINES DATES ══ */}
      <section
        aria-label="Prochaines dates de formation"
        style={{ backgroundColor: BEIGE, borderBottom: `1px solid #d4ccbf` }}
      >
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-8">
            <p
              className="font-raleway font-bold text-[10px] tracking-[0.22em] uppercase"
              style={{ color: BRUN }}
            >
              Prochaines dates 2026
            </p>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "#d4ccbf" }}
            />
          </div>

          <div
            className="flex flex-col divide-y"
            style={{ borderColor: "#d4ccbf" }}
          >
            {prochainsDates.map((f) => (
              <div
                key={f.slug}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5"
              >
                {/* Label */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: f.accent }}
                  />
                  <p
                    className="font-raleway font-bold text-[11px] tracking-[0.12em] uppercase"
                    style={{ color: BRUN }}
                  >
                    {f.label}
                  </p>
                </div>

                {/* Dates + badges */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {f.stages.length > 0 ? (
                    f.stages.map((s) => (
                      <div key={s.id} className="flex items-center gap-1.5">
                        <span
                          className="font-raleway text-[9px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
                          style={{
                            backgroundColor: `${f.accent}14`,
                            color: f.accent,
                            border: `1px solid ${f.accent}30`,
                          }}
                        >
                          {formatPlage(s.date_debut, s.date_fin)}
                        </span>
                        {/*  passe statut ET places */}
                        <PlacesBadge
                          places={s.places_dispo}
                          statut={s.statut}
                        />
                      </div>
                    ))
                  ) : (
                    <span
                      className="font-raleway text-[9px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: `${f.accent}10`,
                        color: "#9a8070",
                        border: `1px solid #d4ccbf`,
                      }}
                    >
                      Dates à venir
                    </span>
                  )}
                </div>

                {/* Tarif + CTA */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <p
                    className="font-raleway font-bold text-[11px] tracking-[0.08em]"
                    style={{ color: "#7a5c3c" }}
                  >
                    {f.tarif}
                  </p>
                  <Link
                    href={`/formations/${f.slug}`}
                    className="font-raleway font-bold text-[9px] tracking-[0.16em] uppercase px-4 py-2 rounded-full transition-opacity duration-200 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                    style={{ backgroundColor: f.accent, color: "#fff" }}
                  >
                    S&apos;inscrire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FORMATIONS ══ */}
      <section aria-label="Nos formations">
        {formations.map((f, i) => (
          <FormationRow key={f.slug} formation={f} i={i} />
        ))}
      </section>

      {/* ══ TÉMOIGNAGES ══ */}
      <section
        aria-label="Témoignages stagiaires"
        style={{ backgroundColor: BEIGE_DARK, borderTop: `1px solid #d0c8b8` }}
      >
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <p
                className="font-raleway font-bold text-[10px] tracking-[0.22em] uppercase mb-2"
                style={{ color: BRUN }}
              >
                Ce qu&apos;ils en pensent
              </p>
              <div
                className="h-px w-10"
                style={{ backgroundColor: "#c8a868" }}
              />
            </div>
            <SatisfactionBadge />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMOIGNAGES.map((t, i) => (
              <blockquote
                key={i}
                className="flex flex-col gap-5 p-6 rounded-xl"
                style={{ backgroundColor: BEIGE, border: `1px solid #d4ccbf` }}
              >
                <svg
                  width="24"
                  height="18"
                  viewBox="0 0 24 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0L12 2.4C8.4 3.6 6.6 5.4 6 8.4H10.8V18H0ZM13.2 18V10.8C13.2 4.8 16.8 1.2 24 0L25.2 2.4C21.6 3.6 19.8 5.4 19.2 8.4H24V18H13.2Z"
                    fill={t.accent}
                    fillOpacity="0.25"
                  />
                </svg>
                <p
                  className="font-raleway italic text-sm leading-relaxed flex-1"
                  style={{ color: "#5a4535" }}
                >
                  {t.texte}
                </p>
                <footer
                  className="flex items-end justify-between gap-3 pt-4"
                  style={{ borderTop: `1px solid #d4ccbf` }}
                >
                  <div>
                    <p
                      className="font-raleway font-bold text-[10px] tracking-[0.12em]"
                      style={{ color: BRUN }}
                    >
                      {t.auteur}
                    </p>
                    <p
                      className="font-raleway text-[9px] tracking-[0.12em] uppercase mt-0.5"
                      style={{ color: t.accent }}
                    >
                      {t.formation}
                    </p>
                  </div>
                  <Stars note={t.note} accent={t.accent} />
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p
              className="font-raleway text-[9px] tracking-[0.18em] uppercase"
              style={{ color: "#a89070" }}
            >
              Témoignages placeholder, on remplacera par les vrais plus tard.
            </p>
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      <section
        className="py-16 px-8"
        style={{
          backgroundColor: BEIGE_DARK,
          borderTop: `1px solid #d0c8b8`,
          borderBottom: `1px solid #d0c8b8`,
        }}
        aria-label="Newsletter"
      >
        <div className="max-w-xl mx-auto">
          <div className="pl-6" style={{ borderLeft: "3px solid #c06030" }}>
            <p
              className="font-raleway font-bold text-[10px] tracking-[0.18em] uppercase mb-2"
              style={{ color: "#8b5e3c" }}
            >
              Restez informé
            </p>
            <p
              className="font-raleway text-sm mb-6"
              style={{ color: BRUN, lineHeight: 1.7 }}
            >
              Recevez les <strong>Nouv&apos;d&apos;André</strong> — actualités
              et nouvelles dates de stages directement dans votre boîte mail.
            </p>
            <Link
              href="/contact"
              className="btn-newsletter focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c06030] focus-visible:ring-offset-2"
            >
              Je m&apos;abonne
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PORTE OUVERTE ══ */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: BRUN }}
        aria-label="Journée Porte Ouverte — 14 mars 2026"
      >
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-16">
            <p
              className="font-raleway text-[9px] tracking-[0.3em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Événement · Samedi 14 mars 2026
            </p>
            <h2
              className="font-raleway font-black text-white uppercase"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "0.1em",
              }}
            >
              Journée Porte Ouverte
            </h2>
            <div
              className="w-10 h-px mx-auto mt-5"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            />
          </header>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-8 items-center">
            <div className="flex justify-center order-1">
              <Image
                src={IMG_PORTE}
                alt="Affiche journée nationale du Poêle de Masse — Porte ouverte 14 mars 2026"
                width={380}
                height={228}
                className="rounded-xl object-contain w-full max-w-[360px]"
                unoptimized
              />
            </div>

            <div className="text-center flex flex-col items-center gap-5 order-2">
              <h3
                className="font-raleway font-black text-white uppercase"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  letterSpacing: "0.06em",
                  lineHeight: 1.1,
                }}
              >
                Porte
                <br />
                Ouverte
              </h3>
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
              />
              <p
                className="text-sm leading-relaxed max-w-[220px]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Venez découvrir le confort du poêle de masse auto-construit.
              </p>
              <Link
                href="/contact"
                className="font-raleway font-bold text-[10px] tracking-[0.16em] uppercase text-white px-6 py-3 rounded-full transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ border: "1px solid rgba(255,255,255,0.22)" }}
              >
                Réserver ma place
              </Link>
              <p
                className="font-raleway text-[9px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                Places limitées
              </p>
              <div className="flex items-center gap-2 mt-1">
                <svg
                  width="11"
                  height="14"
                  viewBox="0 0 11 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5.5 0C2.46 0 0 2.46 0 5.5c0 3.85 5.5 8.5 5.5 8.5S11 9.35 11 5.5C11 2.46 8.54 0 5.5 0Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                    fill="rgba(255,255,255,0.3)"
                  />
                </svg>
                <p
                  className="font-raleway text-[9px] tracking-[0.14em] uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Charente · 16 · France
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 order-3">
              <Image
                src={IMG_GIF}
                alt="Caméra thermique montrant la chaleur rayonnée par un poêle de masse"
                width={280}
                height={210}
                className="rounded-xl object-contain"
                unoptimized
              />
              <p
                className="font-raleway text-[9px] tracking-[0.12em] text-center max-w-[220px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Caméra thermique — rayonnement du poêle de masse
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SÉPARATEUR FOOTER ══ */}
      <div style={{ backgroundColor: BEIGE_DARK }} className="py-6 px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div className="h-px flex-1" style={{ backgroundColor: "#cec5b5" }} />
          <div className="flex items-center gap-2.5">
            <Image
              src={LOGO_FOOTER}
              alt=""
              width={18}
              height={18}
              unoptimized
              aria-hidden="true"
            />
            <p
              className="font-raleway text-[9px] tracking-[0.25em] uppercase"
              style={{ color: "#a89070" }}
            >
              La Maison en Paille · Charente
            </p>
          </div>
          <div className="h-px flex-1" style={{ backgroundColor: "#cec5b5" }} />
        </div>
      </div>
    </div>
  );
}
