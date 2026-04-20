import AuthGuard from "@/components/admin/AuthGuard";
import StageForm from "@/components/admin/StageForm";

export const metadata = { title: "Nouveau stage" };

export default function NouveauStagePage() {
  return (
    <AuthGuard>
      <div className="p-8">
        <h1 className="font-serif text-3xl text-[#3d2b1f] mb-8">
          Nouveau stage
        </h1>
        <StageForm />
      </div>
    </AuthGuard>
  );
}
