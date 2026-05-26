import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import { cookies } from "next/headers";
import { fetchStagesAdmin } from "@/lib/api/stages";
import StagesTable from "@/components/admin/StagesTable";

export const metadata = { title: "Stages — Dashboard" };

export default async function DashboardStagesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";

  let stages = [];
  try {
    stages = await fetchStagesAdmin(cookieHeader);
  } catch {
    stages = [];
  }

  const total = stages.length;
  const ouverts = stages.filter((s) => s.statut === "ouvert").length;
  const complets = stages.filter((s) => s.statut === "complet").length;
  const inscrits = stages.reduce((acc, s) => acc + (s.nb_inscriptions || 0), 0);

  return (
    <AuthGuard>
      <div className="p-6 md:p-8">
        {/* ── En-tête ── */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl text-[#3d2b1f]">Stages</h1>
            <p className="text-stone-500 mt-1 text-sm">
              {total} session{total > 1 ? "s" : ""} programmée
              {total > 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/dashboard/stages/nouveau"
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-bold px-5 py-2.5 rounded-full bg-[#3d2b1f] text-white hover:bg-[#5a3e2b] transition-colors whitespace-nowrap"
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1V10M1 5.5H10"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Nouveau stage
          </Link>
        </div>

        {/* ── Métriques ── */}
        {total > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total", value: total, color: "#3d2b1f" },
              { label: "Ouverts", value: ouverts, color: "#15803d" },
              { label: "Complets", value: complets, color: "#dc2626" },
              // { label: "Inscrits", value: inscrits, color: "#8b6c47" } peut-être pour la v2,
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="bg-white border border-stone-200 rounded-xl px-5 py-4"
              >
                <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1">
                  {label}
                </p>
                <p className="text-2xl font-bold" style={{ color }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Table interactive ── */}
        <StagesTable stages={stages} />
      </div>
    </AuthGuard>
  );
}
