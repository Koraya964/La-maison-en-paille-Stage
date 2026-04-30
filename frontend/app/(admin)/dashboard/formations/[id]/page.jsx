import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import FormationForm from "@/components/admin/FormationForm";

export const metadata = { title: "Modifier une formation" };

const API = process.env.NEXT_PUBLIC_API_URL;

async function getFormation(id, cookieHeader) {
  try {
    const res = await fetch(`${API}/api/formations/admin/${id}`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function EditFormationPage({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;
  const cookieHeader = token ? `auth_token=${token}` : "";
  const formation = await getFormation(params.id, cookieHeader);

  if (!formation) notFound();

  return (
    <AuthGuard>
      <div className="p-6 md:p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/dashboard/formations"
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
            Formations
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

        {/* Header */}
        <div className="mb-6">
          <h1
            className="font-serif text-3xl mb-1"
            style={{ color: "#3d1a0e", fontWeight: 400 }}
          >
            {formation.titre}
          </h1>
          <p className="text-sm font-mono" style={{ color: "#8b6c47" }}>
            /{formation.slug}
          </p>
        </div>

        <FormationForm formation={formation} />
      </div>
    </AuthGuard>
  );
}
