// app/(admin)/dashboard/soumissions/page.jsx
import AuthGuard from "@/components/admin/AuthGuard";
import { cookies } from "next/headers";
import SoumissionsBoard from "@/components/admin/SoumissionBoard";

export const metadata = { title: "Soumissions clients — Dashboard" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getSoumissions(cookieHeader) {
  try {
    const res = await fetch(`${API}/api/soumissions`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function DashboardSoumissionsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";

  const soumissions = await getSoumissions(cookieHeader);

  const enAttente = soumissions.filter((s) => s.statut === "en_attente");
  const traitees = soumissions.filter((s) => s.statut !== "en_attente");

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
              Modération · {enAttente.length} en attente
            </p>
            <h1
              className="font-serif text-3xl mb-1"
              style={{ color: "#3d1a0e", fontWeight: 400 }}
            >
              Soumissions clients
            </h1>
            <p className="text-sm" style={{ color: "#9a8070" }}>
              Photos envoyées par vos stagiaires et clients.
            </p>
          </div>
        </div>

        {/* ── Métriques ── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "En attente", value: enAttente.length, dot: "#e8b86d" },
            {
              label: "Approuvées",
              value: soumissions.filter((s) => s.statut === "approuvee").length,
              dot: "#8aab7a",
            },
            {
              label: "Rejetées",
              value: soumissions.filter((s) => s.statut === "rejetee").length,
              dot: "#c8bfb0",
            },
          ].map(({ label, value, dot }) => (
            <div
              key={label}
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
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Board interactif ── */}
        {soumissions.length === 0 ? (
          <div
            className="py-24 text-center rounded-2xl border border-dashed"
            style={{ borderColor: "#e2dbd0" }}
          >
            <p className="font-serif text-xl mb-2" style={{ color: "#c8bfb0" }}>
              Aucune soumission pour le moment.
            </p>
            <p className="text-sm" style={{ color: "#d6d3d1" }}>
              Les photos envoyées par vos clients apparaîtront ici.
            </p>
          </div>
        ) : (
          <SoumissionsBoard enAttente={enAttente} traitees={traitees} />
        )}
      </div>
    </AuthGuard>
  );
}
