import PhotoUploader from "@/frontend/components/admin/PhotoUploader";

export const metadata = { title: "Nouvelle photo" };

export default function NouvelleRealisationPage() {
  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-[#3d2b1f] mb-8">
        Uploader une photo
      </h1>
      <PhotoUploader />
    </div>
  );
}
