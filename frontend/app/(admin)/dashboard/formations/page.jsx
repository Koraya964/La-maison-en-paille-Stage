import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import { cookies } from "next/headers";

export const metadata = { title: "Formations — Dashboard" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getFormations(cookieHeader) {
  try {
    const res = await fetch(`${API}/api/formations/admin`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function DashboardFormationsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";
  const formations = await getFormations(cookieHeader);

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
              {formations.length} formation{formations.length > 1 ? "s" : ""}
            </p>
            <h1
              className="font-serif text-3xl mb-1"
              style={{ color: "#3d1a0e", fontWeight: 400 }}
            >
              Formations
            </h1>
            <p className="text-sm" style={{ color: "#9a8070" }}>
              Gérez les formations proposées sur le site.
            </p>
          </div>
          <Link
            href="/dashboard/formations/nouveau"
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
            Nouvelle formation
          </Link>
        </div>

        {/* ── Liste ── */}
        {formations.length === 0 ? (
          <div
            className="py-24 text-center rounded-2xl border border-dashed"
            style={{ borderColor: "#e2dbd0" }}
          >
            <p className="font-serif text-xl mb-2" style={{ color: "#c8bfb0" }}>
              Aucune formation.
            </p>
            <p className="text-sm mb-6" style={{ color: "#d6d3d1" }}>
              Créez votre première formation.
            </p>
            <Link
              href="/dashboard/formations/nouvelle"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-bold px-5 py-2.5 rounded-full text-white"
              style={{ backgroundColor: "#3d1a0e" }}
            >
              Créer une formation
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {formations.map((f) => (
              <Link
                key={f.id}
                href={`/dashboard/formations/${f.id}`}
                className="group bg-white rounded-2xl border px-6 py-5 flex items-center gap-5 transition-colors hover:border-stone-300"
                style={{ borderColor: "#e2dbd0" }}
              >
                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold text-sm truncate"
                    style={{ color: "#3d1a0e" }}
                  >
                    {f.titre}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: "#8b6c47" }}
                    >
                      /{f.slug}
                    </span>
                    {f.duree && (
                      <>
                        <span style={{ color: "#e2dbd0" }}>·</span>
                        <span
                          className="text-[10px]"
                          style={{ color: "#9a8070" }}
                        >
                          {f.duree}
                        </span>
                      </>
                    )}
                    {f.tarif && (
                      <>
                        <span style={{ color: "#e2dbd0" }}>·</span>
                        <span
                          className="text-[10px] font-bold"
                          style={{ color: "#9a8070" }}
                        >
                          {f.tarif} €
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Badges inclus */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {f.hebergement && (
                    <span
                      className="text-[9px] tracking-[0.12em] uppercase font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#f0ede6", color: "#9a8070" }}
                    >
                      Héberg.
                    </span>
                  )}
                  {f.repas && (
                    <span
                      className="text-[9px] tracking-[0.12em] uppercase font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#f0ede6", color: "#9a8070" }}
                    >
                      Repas
                    </span>
                  )}
                </div>

                {/* Flèche */}
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <path
                    d="M1 5H13M13 5L9 1M13 5L9 9"
                    stroke="#9a8070"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
