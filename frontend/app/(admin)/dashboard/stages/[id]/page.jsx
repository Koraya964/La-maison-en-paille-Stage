import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import StageForm from "@/components/admin/StageForm";
import { fetchInscriptionsByStage } from "@/lib/api/inscriptions";

export const metadata = { title: "Modifier un stage" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getStage(id, cookieHeader) {
  try {
    const res = await fetch(`${API}/api/stages/${id}`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
      credentials: "include",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatDateCourt(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function initiales(prenom, nom) {
  return `${prenom?.[0] ?? ""}${nom?.[0] ?? ""}`.toUpperCase();
}

//  Couleurs statut sur fond sombre
const statutDark = {
  ouvert: {
    bg: "rgba(21,128,61,0.2)",
    border: "rgba(21,128,61,0.4)",
    text: "#4ade80",
    dot: "#4ade80",
    label: "Ouvert",
  },
  complet: {
    bg: "rgba(220,38,38,0.2)",
    border: "rgba(220,38,38,0.4)",
    text: "#f87171",
    dot: "#f87171",
    label: "Complet",
  },
  liste_attente: {
    bg: "rgba(217,119,6,0.2)",
    border: "rgba(217,119,6,0.4)",
    text: "#fbbf24",
    dot: "#fbbf24",
    label: "Liste d'attente",
  },
  annule: {
    bg: "rgba(168,162,158,0.2)",
    border: "rgba(168,162,158,0.3)",
    text: "#d6d3d1",
    dot: "#d6d3d1",
    label: "Annulé",
  },
  termine: {
    bg: "rgba(168,162,158,0.15)",
    border: "rgba(168,162,158,0.2)",
    text: "#a8a29e",
    dot: "#a8a29e",
    label: "Terminé",
  },
};

//  Palette avatars
const avatarColors = [
  { bg: "#e8d5be", text: "#8b6c47" },
  { bg: "#d5e8d5", text: "#4a7a4a" },
  { bg: "#d5dde8", text: "#4a5f7a" },
  { bg: "#e8d5d5", text: "#7a4a4a" },
  { bg: "#e5d5e8", text: "#6a4a7a" },
];

export default async function EditStagePage({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";

  const [stage, inscrits] = await Promise.all([
    getStage(params.id, cookieHeader),
    fetchInscriptionsByStage(params.id, cookieHeader).catch(() => []),
  ]);

  if (!stage) notFound();

  const statutStyle = statutDark[stage.statut] ?? statutDark.ouvert;
  const placesPct = Math.round(
    ((stage.places_total - stage.places_dispo) / stage.places_total) * 100,
  );
  const barreColor =
    stage.places_dispo === 0
      ? "#f87171"
      : stage.places_dispo <= 3
        ? "#fbbf24"
        : "#4ade80";

  const emailsGroupes = inscrits.map((i) => i.email).join(",");

  return (
    <AuthGuard>
      <div className="p-6 md:p-8">
        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/dashboard/stages"
            className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold transition-colors"
            style={{ color: "#9a8070" }}
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path
                d="M11 5H1M1 5L5 1M1 5L5 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Stages
          </Link>
          <span style={{ color: "#c8bfb0" }} className="text-xs">
            /
          </span>
          <span
            className="text-[10px] tracking-widest uppercase font-bold"
            style={{ color: "#c8bfb0" }}
          >
            Modifier
          </span>
        </div>

        {/* ── Header card sombre ── */}
        <div
          className="relative overflow-hidden rounded-2xl p-7 mb-6"
          style={{ backgroundColor: "#3d1a0e" }}
        >
          <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6">
            {/* Infos formation */}
            <div>
              <p
                className="text-[9px] tracking-[0.25em] uppercase font-bold mb-2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Formation · Stage
              </p>
              <h1
                className="font-serif text-2xl md:text-3xl mb-3"
                style={{ color: "white", fontWeight: 400 }}
              >
                {stage.formation_titre}
              </h1>
              {/* Dates */}
              <div className="flex items-center gap-2 mb-4">
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                  <rect
                    x="0.5"
                    y="1.5"
                    width="10"
                    height="10"
                    rx="1.5"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1"
                  />
                  <line
                    x1="3"
                    y1="0"
                    x2="3"
                    y2="3"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <line
                    x1="8"
                    y1="0"
                    x2="8"
                    y2="3"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="text-xs"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {formatDateCourt(stage.date_debut)} →{" "}
                  {formatDateCourt(stage.date_fin)}
                </span>
              </div>
              {/* Badge statut */}
              <span
                className="inline-flex items-center gap-2 text-[9px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full"
                style={{
                  background: statutStyle.bg,
                  border: `1px solid ${statutStyle.border}`,
                  color: statutStyle.text,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: statutStyle.dot }}
                />
                {statutStyle.label}
              </span>
            </div>

            {/* Métriques */}
            <div className="flex items-stretch gap-3 flex-shrink-0">
              {/* Places */}
              <div
                className="rounded-xl px-5 py-4 text-center min-w-[80px]"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  className="text-[9px] tracking-[0.18em] uppercase font-bold mb-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Places
                </p>
                <p
                  className="font-black text-3xl leading-none"
                  style={{ color: "white" }}
                >
                  {stage.places_dispo}
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  / {stage.places_total}
                </p>
                {/* Barre */}
                <div
                  className="mt-3 h-[3px] rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${placesPct}%`,
                      backgroundColor: barreColor,
                    }}
                  />
                </div>
              </div>

              {/* Inscrits */}
              <div
                className="rounded-xl px-5 py-4 text-center min-w-[80px]"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  className="text-[9px] tracking-[0.18em] uppercase font-bold mb-1"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Inscrits
                </p>
                <p
                  className="font-black text-3xl leading-none"
                  style={{ color: "#e8b86d" }}
                >
                  {inscrits.length}
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  confirmés
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Deux colonnes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulaire */}
          <div
            className="bg-white rounded-2xl border p-6"
            style={{ borderColor: "#e2dbd0" }}
          >
            <p
              className="text-[9px] tracking-[0.2em] uppercase font-bold mb-5"
              style={{ color: "#9a8070" }}
            >
              Modifier le stage
            </p>
            <StageForm stage={stage} />
          </div>

          {/* Inscrits */}
          <div
            className="bg-white rounded-2xl border p-6"
            style={{ borderColor: "#e2dbd0" }}
          >
            <div className="flex items-center justify-between mb-5">
              <p
                className="text-[9px] tracking-[0.2em] uppercase font-bold"
                style={{ color: "#9a8070" }}
              >
                Inscrits confirmés
                <span className="ml-2 font-normal" style={{ color: "#c8bfb0" }}>
                  ({inscrits.length})
                </span>
              </p>

              {inscrits.length > 0 && (
                <div className="flex items-center gap-3">
                  {/* ── Bouton email groupé ── */}
                  <a
                    href={`mailto:${emailsGroupes}`}
                    className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-75"
                    style={{
                      background: "rgba(139,108,71,0.1)",
                      border: "1px solid rgba(139,108,71,0.25)",
                      color: "#8b6c47",
                    }}
                    title={`Écrire à tous les inscrits (${inscrits.length})`}
                  >
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <rect
                        x="0.5"
                        y="0.5"
                        width="12"
                        height="9"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M1 1.5L6.5 5.5L12 1.5"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                    Email groupé
                  </a>

                  <Link
                    href={`/dashboard/inscriptions?stage=${stage.id}`}
                    className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] uppercase font-bold transition-colors"
                    style={{ color: "#8b6c47" }}
                  >
                    Voir tout
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4H9M9 4L6 1M9 4L6 7"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {inscrits.length === 0 ? (
              <div
                className="py-12 text-center rounded-xl border border-dashed"
                style={{ borderColor: "#e2dbd0" }}
              >
                <p className="font-serif text-sm" style={{ color: "#c8bfb0" }}>
                  Aucun inscrit confirmé.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {inscrits.map((i, idx) => {
                  const av = avatarColors[idx % avatarColors.length];
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-stone-50"
                      style={{ background: "#f7f4ef" }}
                    >
                      {/* Avatar initiales */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: av.bg, color: av.text }}
                      >
                        {initiales(i.prenom, i.nom)}
                      </div>

                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-bold truncate"
                          style={{ color: "#3d1a0e" }}
                        >
                          {i.prenom} {i.nom}
                        </p>
                        <p
                          className="text-[10px] truncate"
                          style={{ color: "#9a8070" }}
                        >
                          {i.email}
                        </p>
                      </div>

                      {/* Actions rapides */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {i.telephone && (
                          <a
                            href={`tel:${i.telephone}`}
                            className="transition-colors hover:opacity-70"
                            title={i.telephone}
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                            >
                              <path
                                d="M2 1.5C2 1.5 1 3 1.5 5C2.5 8.5 7.5 11 10 11.5C12 12 12.5 11 12.5 11L11 8.5L9 9C9 9 7 7.5 6 6C5 4.5 6 3 6 3L3.5 1.5L2 1.5Z"
                                stroke="#c8bfb0"
                                strokeWidth="1"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        )}
                        <a
                          href={`mailto:${i.email}`}
                          className="transition-colors hover:opacity-70"
                          title={`Écrire à ${i.prenom}`}
                        >
                          <svg
                            width="14"
                            height="11"
                            viewBox="0 0 14 11"
                            fill="none"
                          >
                            <rect
                              x="0.5"
                              y="0.5"
                              width="13"
                              height="10"
                              rx="1.5"
                              stroke="#c8bfb0"
                              strokeWidth="1"
                            />
                            <path
                              d="M1 1.5L7 6.5L13 1.5"
                              stroke="#c8bfb0"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
