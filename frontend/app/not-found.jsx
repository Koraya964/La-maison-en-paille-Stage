import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-[#f5f0e8]">
      <div className="text-center px-4">
        <p className="font-serif text-8xl text-[#c8a96e] mb-6">404</p>
        <h1 className="font-serif text-3xl text-[#3d2b1f] mb-4">
          Page introuvable
        </h1>
        <p className="text-stone-500 mb-8 max-w-sm mx-auto">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="btn-primary hover:cursor-pointer hover:underline"
        >
          Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
