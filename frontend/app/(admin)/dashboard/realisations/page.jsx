import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import { cookies } from "next/headers";
import RealisationsGrid from "@/components/admin/RealisationsGrid";

export const metadata = { title: "Réalisations — Dashboard" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getRealisations(cookieHeader) {
  try {
    const res = await fetch(`${API}/api/realisations`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function DashboardRealisationsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";

  const realisations = await getRealisations(cookieHeader);

  const parCategorie = {
    poele_de_masse: realisations.filter((r) => r.categorie === "poele_de_masse")
      .length,
    paille: realisations.filter((r) => r.categorie === "paille").length,
    autre: realisations.filter((r) => r.categorie === "autre").length,
  };

  return (
    <AuthGuard>
      <div className="p-6 md:p-8">
        {/* ── En-tête ── */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[9px] tracking-[0.22em] uppercase font-bold mb-2"
              style={{ color: "#c8bfb0" }}
            >
              Galerie · {realisations.length} photo
              {realisations.length > 1 ? "s" : ""}
            </p>
            <h1
              className="font-serif text-3xl mb-1"
              style={{ color: "#3d1a0e", fontWeight: 400 }}
            >
              Réalisations
            </h1>
            <p className="text-sm" style={{ color: "#9a8070" }}>
              Photos de constructions et chantiers.
            </p>
          </div>
          <Link
            href="/dashboard/realisations/nouvelle"
            className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-bold px-5 py-2.5 rounded-full text-white transition-colors whitespace-nowrap"
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
            Uploader une photo
          </Link>
        </div>

        {/* ── Métriques catégories ── */}
        {realisations.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              {
                key: "poele_de_masse",
                label: "Poêle de masse",
                dot: "#c06030",
              },
              { key: "paille", label: "Paille", dot: "#8aab7a" },
              { key: "autre", label: "Autre", dot: "#a8a29e" },
            ].map(({ key, label, dot }) => (
              <div
                key={key}
                className="bg-white rounded-xl border px-4 py-3 flex items-center gap-3"
                style={{ borderColor: "#e2dbd0" }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dot }}
                />
                <div>
                  <p
                    className="text-[9px] tracking-[0.15em] uppercase font-bold"
                    style={{ color: "#c8bfb0" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-lg font-black leading-none mt-0.5"
                    style={{ color: "#3d1a0e" }}
                  >
                    {parCategorie[key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Grille interactive ── */}
        {realisations.length === 0 ? (
          <div
            className="py-24 text-center rounded-2xl border border-dashed"
            style={{ borderColor: "#e2dbd0" }}
          >
            <p className="font-serif text-xl mb-2" style={{ color: "#c8bfb0" }}>
              Aucune photo pour le moment.
            </p>
            <p className="text-sm mb-6" style={{ color: "#d6d3d1" }}>
              Uploadez votre première réalisation.
            </p>
            <Link
              href="/dashboard/realisations/nouvelle"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-bold px-5 py-2.5 rounded-full text-white"
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
              Uploader une photo
            </Link>
          </div>
        ) : (
          <RealisationsGrid realisations={realisations} />
        )}
      </div>
    </AuthGuard>
  );
}
