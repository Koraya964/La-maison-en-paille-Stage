"use client";

import Link from "next/link";
import Image from "next/image";
import { BEIGE, BRUN, FORMATION_CONFIG } from "./Constants";
import { Pattern } from "./Patterns";
import { IconCalendar, ArrowRight, StatutBadge, BarrePlaces } from "./ui";
import { useVisible } from "./hooks";
import { formatDateCourt, formatPlage } from "./DateHelpers";

function DateRow({ stage }) {
  const isComplet = stage.statut === "complet" || stage.places_dispo === 0;

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "#f5f0e6", border: "1px solid #e2dbd0" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-raleway font-bold text-sm"
          style={{ color: BRUN }}
        >
          {formatPlage(stage.date_debut, stage.date_fin)}
        </span>
        <StatutBadge statut={stage.statut} places={stage.places_dispo} />
      </div>
      <div className="flex items-center gap-3">
        <BarrePlaces
          places={stage.places_dispo}
          total={stage.places_total}
          statut={stage.statut}
        />
        <span
          className="font-raleway text-[10px] whitespace-nowrap"
          style={{ color: "#9a8070" }}
        >
          {isComplet
            ? "Complet"
            : `${stage.places_dispo} place${stage.places_dispo > 1 ? "s" : ""}`}
        </span>
        <Link
          href={`/inscription?stage=${stage.id}`}
          className="font-raleway font-bold text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full whitespace-nowrap transition-opacity hover:opacity-75"
          style={{ background: BRUN, color: BEIGE }}
        >
          {isComplet ? "M'inscrire" : "S'inscrire"}
        </Link>
      </div>
    </div>
  );
}

export default function FormationRow({ formation, i }) {
  const isEven = i % 2 === 0;
  const [ref, visible] = useVisible();

  const config = FORMATION_CONFIG[formation.slug] || {};
  const accent = config.accent || "#8b5e3c";
  const cardBg = config.cardBg || "#7a6a5a";

  const stagesVisibles = (formation.stages || []).filter(
    (s) => s.statut === "ouvert" || s.statut === "complet",
  );

  const prochainLabel =
    stagesVisibles.length > 0
      ? stagesVisibles
          .slice(0, 3)
          .map((s) => formatDateCourt(s.date_debut))
          .join(" · ")
      : null;

  return (
    <article
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
          <div
            className="relative md:w-1/2 min-h-[300px] md:min-h-0 overflow-hidden"
            style={{ backgroundColor: cardBg }}
            aria-hidden="true"
          >
            <Pattern type={config.patternType} id={config.patternId} />
            <Image
              src={
                formation.image_hero || config.img || "/images/placeholder.jpg"
              }
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

          <div
            className="md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-20"
            style={{ backgroundColor: BEIGE }}
          >
            <div className="flex items-center justify-between mb-5">
              <p
                className="font-raleway font-bold text-[9px] tracking-[0.3em] uppercase"
                style={{ color: accent }}
              >
                Formation
              </p>
              <span
                className="font-raleway font-bold text-[9px] tracking-[0.14em] uppercase px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${accent}18`,
                  color: accent,
                  border: `1px solid ${accent}40`,
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
              {formation.sous_titre || config.sousTitre}
            </p>

            {prochainLabel && (
              <div className="flex items-center gap-2 mb-6">
                <IconCalendar color={accent} />
                <p
                  className="font-raleway text-[9px] tracking-[0.14em] uppercase"
                  style={{ color: accent }}
                >
                  {prochainLabel}
                </p>
              </div>
            )}

            <div
              className="h-px w-10 mb-6"
              style={{ backgroundColor: accent, opacity: 0.5 }}
            />

            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "#5a4535", maxWidth: "420px" }}
            >
              {formation.introduction || config.desc}
            </p>

            <p
              className="text-xs leading-relaxed mb-8"
              style={{ color: "#8a7060", maxWidth: "420px" }}
            >
              {config.detail}
            </p>

            <span
              className="font-raleway font-bold text-[10px] tracking-[0.18em] uppercase self-start flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
              style={{ color: accent }}
            >
              Voir les dates
              <ArrowRight />
            </span>
          </div>
        </div>
      </Link>
      {i < 2 && <div className="h-px" style={{ backgroundColor: "#d4ccbf" }} />}
    </article>
  );
}
