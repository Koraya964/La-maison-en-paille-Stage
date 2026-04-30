import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import FormationForm from "@/components/admin/FormationForm";

export const metadata = { title: "Nouvelle formation" };

export default function NewFormationPage() {
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
            Nouvelle
          </span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1
            className="font-serif text-3xl mb-1"
            style={{ color: "#3d1a0e", fontWeight: 400 }}
          >
            Nouvelle formation
          </h1>
          <p className="text-sm" style={{ color: "#9a8070" }}>
            Créez une nouvelle formation proposée sur le site.
          </p>
        </div>

        <FormationForm />
      </div>
    </AuthGuard>
  );
}
