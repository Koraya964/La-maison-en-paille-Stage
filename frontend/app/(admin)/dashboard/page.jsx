import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import { cookies } from "next/headers";

export const metadata = { title: "Vue générale" };

const API = process.env.NEXT_PUBLIC_API_URL;

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function getDashboardData() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Cookie: `auth_token=${token}` }),
  };

  try {
    const [inscriptions, stages, actualites, realisations] = await Promise.all([
      fetch(`${API}/api/inscriptions`, { headers, cache: "no-store" }).then(
        (r) => r.json(),
      ),
      fetch(`${API}/api/stages/all`, { headers, cache: "no-store" }).then((r) =>
        r.json(),
      ),
      fetch(`${API}/api/actualites/all`, { headers, cache: "no-store" }).then(
        (r) => r.json(),
      ),
      fetch(`${API}/api/realisations`, { headers, cache: "no-store" }).then(
        (r) => r.json(),
      ),
    ]);

    // Prochains stages — ouverts ou complets, triés par date
    const prochainStages = stages
      .filter(
        (s) =>
          s.statut === "ouvert" ||
          s.statut === "complet" ||
          s.statut === "liste_attente",
      )
      .sort((a, b) => new Date(a.date_debut) - new Date(b.date_debut))
      .slice(0, 4);

    // Dernières inscriptions — triées par date de création
    const dernieresInscriptions = [...inscriptions]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);

    return {
      stats: {
        enAttente: inscriptions.filter((i) => i.statut === "en_attente").length,
        stagesOuverts: stages.filter((s) => s.statut === "ouvert").length,
        actualites: Array.isArray(actualites) ? actualites.length : 0,
        realisations: Array.isArray(realisations) ? realisations.length : 0,
      },
      prochainStages,
      dernieresInscriptions,
    };
  } catch {
    return {
      stats: { enAttente: 0, stagesOuverts: 0, actualites: 0, realisations: 0 },
      prochainStages: [],
      dernieresInscriptions: [],
    };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateCourt(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

function formatDateLong(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function initiales(prenom, nom) {
  return `${prenom?.[0] ?? ""}${nom?.[0] ?? ""}`.toUpperCase();
}

// ─── Statut stage ─────────────────────────────────────────────────────────────

const stageStatutConfig = {
  ouvert: { dot: "#15803d", label: "Ouvert" },
  complet: { dot: "#dc2626", label: "Complet" },
  liste_attente: { dot: "#d97706", label: "Liste d'attente" },
  annule: { dot: "#a8a29e", label: "Annulé" },
  termine: { dot: "#d6d3d1", label: "Terminé" },
};

const inscriptionStatutConfig = {
  en_attente: { bg: "#fffbeb", text: "#d97706", label: "En attente" },
  confirmee: { bg: "#f0fdf4", text: "#15803d", label: "Confirmée" },
  annulee: { bg: "#fef2f2", text: "#dc2626", label: "Annulée" },
  liste_attente: { bg: "#eff6ff", text: "#1d4ed8", label: "Liste d'attente" },
};

const avatarColors = [
  { bg: "#e8d5be", text: "#8b6c47" },
  { bg: "#d5e8d5", text: "#4a7a4a" },
  { bg: "#d5dde8", text: "#4a5f7a" },
  { bg: "#e8d5d5", text: "#7a4a4a" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const { stats, prochainStages, dernieresInscriptions } =
    await getDashboardData();

  const dateAujourdhui = formatDateLong(new Date());
  const messageContextuel =
    stats.enAttente > 0
      ? `${stats.enAttente} inscription${stats.enAttente > 1 ? "s" : ""} nécessite${stats.enAttente > 1 ? "nt" : ""} votre attention.`
      : "Tout est à jour, rien en attente.";

  return (
    <AuthGuard>
      <div className="p-6 md:p-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[9px] tracking-[0.22em] uppercase font-bold mb-2 capitalize"
              style={{ color: "#c8bfb0" }}
            >
              {dateAujourdhui}
            </p>
            <h1
              className="font-serif text-3xl mb-1"
              style={{ color: "#3d1a0e", fontWeight: 400 }}
            >
              Bonjour, André
            </h1>
            <p className="text-sm" style={{ color: "#9a8070" }}>
              {messageContextuel}
            </p>
          </div>

          {/* Actions rapides header */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/dashboard/stages/nouveau"
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-2.5 rounded-full text-white transition-colors"
              style={{ backgroundColor: "#3d1a0e" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line
                  x1="5"
                  y1="1"
                  x2="5"
                  y2="9"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <line
                  x1="1"
                  y1="5"
                  x2="9"
                  y2="5"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Nouveau stage
            </Link>
            <Link
              href="/dashboard/actualites/nouvelle"
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-2.5 rounded-full border transition-colors hover:bg-stone-50"
              style={{ borderColor: "#e2dbd0", color: "#9a8070" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line
                  x1="5"
                  y1="1"
                  x2="5"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <line
                  x1="1"
                  y1="5"
                  x2="9"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Actualité
            </Link>
            <Link
              href="/dashboard/realisations/nouveau"
              className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-bold px-4 py-2.5 rounded-full border transition-colors hover:bg-stone-50"
              style={{ borderColor: "#e2dbd0", color: "#9a8070" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line
                  x1="5"
                  y1="1"
                  x2="5"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <line
                  x1="1"
                  y1="5"
                  x2="9"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Photo
            </Link>
          </div>
        </div>

        {/* ── Métriques ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Inscriptions en attente — carte urgence */}
          <Link
            href="/dashboard/inscriptions"
            className="relative overflow-hidden rounded-2xl p-5 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: stats.enAttente > 0 ? "#3d1a0e" : "white",
              border: stats.enAttente > 0 ? "none" : "1px solid #e2dbd0",
            }}
          >
            {stats.enAttente > 0 && (
              <span
                className="absolute top-3 right-3 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#e8b86d" }}
              />
            )}
            <p
              className="text-[9px] tracking-[0.2em] uppercase font-bold mb-3"
              style={{
                color:
                  stats.enAttente > 0 ? "rgba(255,255,255,0.4)" : "#c8bfb0",
              }}
            >
              En attente
            </p>
            <p
              className="font-black text-4xl leading-none mb-1"
              style={{ color: stats.enAttente > 0 ? "white" : "#3d1a0e" }}
            >
              {stats.enAttente}
            </p>
            <p
              className="text-[10px] mb-4"
              style={{
                color:
                  stats.enAttente > 0 ? "rgba(255,255,255,0.35)" : "#9a8070",
              }}
            >
              inscriptions
            </p>
            <div
              className="pt-3"
              style={{
                borderTop: `1px solid ${stats.enAttente > 0 ? "rgba(255,255,255,0.08)" : "#f0ede6"}`,
              }}
            >
              <span
                className="text-[9px] tracking-[0.15em] uppercase font-bold"
                style={{ color: stats.enAttente > 0 ? "#e8b86d" : "#8b6c47" }}
              >
                → Traiter
              </span>
            </div>
          </Link>

          {/* Stages ouverts */}
          <Link
            href="/dashboard/stages"
            className="rounded-2xl p-5 border transition-colors hover:border-stone-300 bg-white"
            style={{ borderColor: "#e2dbd0" }}
          >
            <p
              className="text-[9px] tracking-[0.2em] uppercase font-bold mb-3"
              style={{ color: "#c8bfb0" }}
            >
              Stages ouverts
            </p>
            <p
              className="font-black text-4xl leading-none mb-1"
              style={{ color: "#3d1a0e" }}
            >
              {stats.stagesOuverts}
            </p>
            <p className="text-[10px] mb-4" style={{ color: "#9a8070" }}>
              sessions
            </p>
            <div className="pt-3" style={{ borderTop: "1px solid #f0ede6" }}>
              <span
                className="text-[9px] tracking-[0.15em] uppercase font-bold"
                style={{ color: "#8b6c47" }}
              >
                → Gérer
              </span>
            </div>
          </Link>

          {/* Actualités */}
          <Link
            href="/dashboard/actualites"
            className="rounded-2xl p-5 border transition-colors hover:border-stone-300 bg-white"
            style={{ borderColor: "#e2dbd0" }}
          >
            <p
              className="text-[9px] tracking-[0.2em] uppercase font-bold mb-3"
              style={{ color: "#c8bfb0" }}
            >
              Actualités
            </p>
            <p
              className="font-black text-4xl leading-none mb-1"
              style={{ color: "#3d1a0e" }}
            >
              {stats.actualites}
            </p>
            <p className="text-[10px] mb-4" style={{ color: "#9a8070" }}>
              publiées
            </p>
            <div className="pt-3" style={{ borderTop: "1px solid #f0ede6" }}>
              <span
                className="text-[9px] tracking-[0.15em] uppercase font-bold"
                style={{ color: "#8b6c47" }}
              >
                → Gérer
              </span>
            </div>
          </Link>

          {/* Galerie */}
          <Link
            href="/dashboard/realisations"
            className="rounded-2xl p-5 border transition-colors hover:border-stone-300 bg-white"
            style={{ borderColor: "#e2dbd0" }}
          >
            <p
              className="text-[9px] tracking-[0.2em] uppercase font-bold mb-3"
              style={{ color: "#c8bfb0" }}
            >
              Galerie
            </p>
            <p
              className="font-black text-4xl leading-none mb-1"
              style={{ color: "#3d1a0e" }}
            >
              {stats.realisations}
            </p>
            <p className="text-[10px] mb-4" style={{ color: "#9a8070" }}>
              photos
            </p>
            <div className="pt-3" style={{ borderTop: "1px solid #f0ede6" }}>
              <span
                className="text-[9px] tracking-[0.15em] uppercase font-bold"
                style={{ color: "#8b6c47" }}
              >
                → Gérer
              </span>
            </div>
          </Link>
        </div>

        {/* ── Deux colonnes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Prochains stages */}
          <div
            className="bg-white rounded-2xl border p-5"
            style={{ borderColor: "#e2dbd0" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-[9px] tracking-[0.22em] uppercase font-bold"
                style={{ color: "#c8bfb0" }}
              >
                Prochains stages
              </p>
              <Link
                href="/dashboard/stages"
                className="text-[9px] tracking-[0.15em] uppercase font-bold transition-colors"
                style={{ color: "#8b6c47" }}
              >
                Voir tout →
              </Link>
            </div>

            {prochainStages.length === 0 ? (
              <div
                className="py-8 text-center rounded-xl border border-dashed"
                style={{ borderColor: "#e2dbd0" }}
              >
                <p className="font-serif text-sm" style={{ color: "#c8bfb0" }}>
                  Aucun stage programmé.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {prochainStages.map((stage) => {
                  const sc =
                    stageStatutConfig[stage.statut] ?? stageStatutConfig.ouvert;
                  return (
                    <Link
                      key={stage.id}
                      href={`/dashboard/stages/${stage.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-stone-50"
                      style={{ backgroundColor: "#f7f4ef" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: sc.dot }}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-bold truncate"
                          style={{ color: "#3d1a0e" }}
                        >
                          {stage.formation_titre}
                        </p>
                        <p
                          className="text-[10px] mt-0.5"
                          style={{ color: "#9a8070" }}
                        >
                          {formatDateCourt(stage.date_debut)} →{" "}
                          {formatDateCourt(stage.date_fin)}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className="text-xs font-black"
                          style={{ color: "#3d1a0e" }}
                        >
                          {stage.places_dispo}
                          <span
                            className="font-normal"
                            style={{ color: "#c8bfb0" }}
                          >
                            /{stage.places_total}
                          </span>
                        </p>
                        <p className="text-[9px]" style={{ color: "#9a8070" }}>
                          places
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dernières inscriptions */}
          <div
            className="bg-white rounded-2xl border p-5"
            style={{ borderColor: "#e2dbd0" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-[9px] tracking-[0.22em] uppercase font-bold"
                style={{ color: "#c8bfb0" }}
              >
                Dernières inscriptions
              </p>
              <Link
                href="/dashboard/inscriptions"
                className="text-[9px] tracking-[0.15em] uppercase font-bold transition-colors"
                style={{ color: "#8b6c47" }}
              >
                Voir tout →
              </Link>
            </div>

            {dernieresInscriptions.length === 0 ? (
              <div
                className="py-8 text-center rounded-xl border border-dashed"
                style={{ borderColor: "#e2dbd0" }}
              >
                <p className="font-serif text-sm" style={{ color: "#c8bfb0" }}>
                  Aucune inscription.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {dernieresInscriptions.map((i, idx) => {
                  const av = avatarColors[idx % avatarColors.length];
                  const sc =
                    inscriptionStatutConfig[i.statut] ??
                    inscriptionStatutConfig.en_attente;
                  return (
                    <Link
                      key={i.id}
                      href="/dashboard/inscriptions"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-stone-50"
                      style={{ backgroundColor: "#f7f4ef" }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                        style={{ background: av.bg, color: av.text }}
                      >
                        {initiales(i.prenom, i.nom)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-bold truncate"
                          style={{ color: "#3d1a0e" }}
                        >
                          {i.prenom} {i.nom}
                        </p>
                        <p
                          className="text-[10px] truncate mt-0.5"
                          style={{ color: "#9a8070" }}
                        >
                          {i.formation_titre}
                        </p>
                      </div>
                      <span
                        className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: sc.bg, color: sc.text }}
                      >
                        {sc.label}
                      </span>
                    </Link>
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
