import AdminSidebar from "@/frontend/components/layout/AdminSidebar";

export const metadata = {
  title: { default: "Dashboard", template: "%s — Dashboard" },
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-stone-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
