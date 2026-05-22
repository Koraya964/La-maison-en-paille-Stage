import { BEIGE, BEIGE_DARK, BRUN } from "./constants";

//  Étoiles
export function Stars({ note, accent }) {
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

//  Badge satisfaction
export function SatisfactionBadge() {
  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
      style={{ backgroundColor: BEIGE_DARK, border: "1px solid #d0c8b8" }}
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

//  Badge statut stage
export function StatutBadge({ statut, places }) {
  if (statut === "complet" || places === 0)
    return (
      <span
        className="font-raleway text-[9px] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
        style={{
          background: "#eeedfe",
          color: "#3c3489",
          border: "1px solid #d0b8e8",
        }}
      >
        Liste d&apos;attente
      </span>
    );
  if (places <= 3)
    return (
      <span
        className="font-raleway text-[9px] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
        style={{
          background: "#fdf3e0",
          color: "#b07020",
          border: "1px solid #e8d090",
        }}
      >
        {places} place{places > 1 ? "s" : ""}
      </span>
    );
  return (
    <span
      className="font-raleway text-[9px] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
      style={{
        background: "#e8f0e8",
        color: "#407040",
        border: "1px solid #b0d0b0",
      }}
    >
      Ouvert
    </span>
  );
}

//  Barre de places ─
export function BarrePlaces({ places, total = 10, statut }) {
  const isComplet = statut === "complet" || places === 0;
  const pct = isComplet ? 100 : Math.round((places / total) * 100);
  const color = isComplet ? "#7f77dd" : places <= 3 ? "#b07020" : "#407040";
  return (
    <div
      className="flex-1 h-[3px] rounded-full overflow-hidden"
      style={{ background: "#d4ccbf" }}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

//  Icône calendrier
export function IconCalendar({ color }) {
  return (
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
        stroke={color}
        strokeWidth="1"
      />
      <line
        x1="3"
        y1="0"
        x2="3"
        y2="3"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="0"
        x2="8"
        y2="3"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

//  Flèche droite ─
export function ArrowRight() {
  return (
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
  );
}
