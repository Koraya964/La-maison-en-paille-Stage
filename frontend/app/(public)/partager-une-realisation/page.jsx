import PageBackground from "@/frontend/components/public/PageBackground";
import SoumissionForm from "@/frontend/components/public/SoumissionForm";

export const metadata = {
  title: "Partager une réalisation | La Maison en Paille",
  description:
    "Vous avez construit avec André de Bouter ? Partagez vos photos de réalisation — poêle de masse, construction paille, photovoltaïque. Vos photos rejoindront la galerie.",
};

export default function PartagerRealisationPage() {
  return (
    <PageBackground>
      <div className="min-h-screen flex flex-col">
        {/* ── En-tête ── */}
        <header className="pt-20 pb-12 px-6 text-center">
          <p
            className="font-raleway text-white/40 uppercase tracking-[0.4em] mb-5"
            style={{ fontSize: "0.7rem" }}
          >
            Galerie · Communauté
          </p>

          <h1 className="flex flex-col items-center gap-2">
            <span
              className="font-raleway font-medium text-white/40 uppercase tracking-[0.45em]"
              style={{ fontSize: "clamp(0.65rem, 1.3vw, 0.85rem)" }}
            >
              Partager
            </span>
            <span
              className="font-raleway font-black text-white uppercase leading-none"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "0.06em",
                textShadow: "0 4px 24px rgba(0,0,0,0.5)",
              }}
            >
              Votre <span style={{ color: "#e8b86d" }}>réalisation</span>
            </span>
            <span className="sr-only">
              Partager une réalisation — poêle de masse, construction paille
              terre chaux, photovoltaïque. Photos de chantiers construits avec
              André de Bouter, Charente.
            </span>
          </h1>

          <p
            className="mt-5 text-white/55 max-w-sm mx-auto leading-relaxed"
            style={{ fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)" }}
          >
            Vous avez participé à une formation ou fait appel à André ? Envoyez
            vos photos — elles rejoindront la galerie après validation.
          </p>
        </header>

        {/* ── Formulaire ── */}
        <main className="flex-1 px-4 pb-20 rounded-lg">
          <SoumissionForm />
        </main>

        {/* ── Pied de page ── */}
        <footer
          className="px-6 py-8 text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "rgba(10,3,0,0.45)",
          }}
        >
          <p
            className="font-raleway text-white/35 uppercase tracking-[0.25em]"
            style={{ fontSize: "0.65rem" }}
          >
            Vos photos sont modérées avant publication · Aucune donnée revendue
          </p>
        </footer>
      </div>
    </PageBackground>
  );
}
