// components/layout/AdminSidebar.jsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";

const navItems = [
  { label: "Vue générale", href: "/dashboard" },
  { label: "Actualités", href: "/dashboard/actualites" },
  { label: "Stages", href: "/dashboard/stages" },
  { label: "Inscriptions", href: "/dashboard/inscriptions" },
  { label: "Réalisations", href: "/dashboard/realisations" },
  { label: "Formations", href: "/dashboard/formations" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-[#3d2b1f] text-stone-300 flex flex-col">
      <div className="px-6 py-8 border-b border-stone-700">
        <Link href="/" className="text-[#c8a96e] font-serif text-lg">
          La Maison en Paille
        </Link>
        <p className="text-xs text-stone-500 mt-1 tracking-widest uppercase">
          Dashboard
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mb-1 text-sm rounded transition-colors ${
                active
                  ? "bg-[#8b6c47] text-white"
                  : "hover:bg-[#2a1d15] text-stone-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-stone-700">
        <button
          onClick={handleLogout}
          className="text-xs text-stone-400 hover:text-white transition-colors tracking-widest uppercase"
        >
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
