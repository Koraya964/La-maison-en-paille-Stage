import PageBackground from "@/frontend/components/public/PageBackground";
import InscriptionForm from "@/frontend/components/public/inscription/InscriptionForm";

export const metadata = {
  title: "S'inscrire à une formation | La Maison en Paille",
  description:
    "Inscrivez-vous à une formation construction naturelle avec André de Bouter — Poêle de Masse, Paille Terre Chaux, Photovoltaïque. Saint-Simeux, Charente (16).",
};

export default function InscriptionPage() {
  return (
    <PageBackground>
      <div className="min-h-screen flex flex-col">
        {/* ── En-tête ── */}
        <header className="pt-20 pb-12 px-6 text-center">
          <p
            className="font-raleway text-white/40 uppercase tracking-[0.4em] mb-5"
            style={{ fontSize: "0.7rem" }}
          >
            Formations · Saint-Simeux · Charente
          </p>

          <h1 className="flex flex-col items-center gap-2">
            <span
              className="font-raleway font-black text-white uppercase"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "0.06em",
                lineHeight: 1,
                textShadow: "0 4px 24px rgba(0,0,0,0.5)",
              }}
            >
              Réserver <span style={{ color: "#e8b86d" }}>votre stage</span>
            </span>
            <span className="sr-only">
              Inscription à une formation construction naturelle — Poêle de
              Masse, Paille Terre Chaux, Photovoltaïque. André de Bouter,
              Saint-Simeux, Charente (16).
            </span>
          </h1>

          <p
            className="mt-5 text-white/65 max-w-sm mx-auto leading-relaxed"
            style={{ fontSize: "clamp(0.82rem, 1.4vw, 0.9rem)" }}
          >
            Sélectionnez une formation et une date, puis renseignez vos
            coordonnées. André vous confirme sous 48h.
          </p>
        </header>

        {/* ── Formulaire ── */}
        <main className="flex-1 px-4 pb-20">
          <InscriptionForm />
        </main>

        {/* ── Pied de page — contact alternatif ── */}
        <footer
          className="px-6 py-8 text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "rgba(10,3,0,0.45)",
          }}
        >
          <p
            className="font-raleway text-white uppercase tracking-[0.25em] mb-4"
            style={{ fontSize: "0.65rem" }}
          >
            Vous préférez nous contacter directement ?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8">
            <a
              href="tel:0545662768"
              className="font-raleway text-white/60 hover:text-white transition-colors duration-200"
              style={{ fontSize: "0.8rem", letterSpacing: "0.08em" }}
            >
              Tél : 05 45 66 27 68
            </a>
            <span className="hidden sm:block text-white/15" aria-hidden="true">
              —
            </span>
            <a
              href="mailto:contact@lamaisonenpaille.com?subject=INSCRIPTION"
              className="font-raleway text-white/60 hover:text-white transition-colors duration-200"
              style={{ fontSize: "0.8rem", letterSpacing: "0.08em" }}
            >
              Email : contact@lamaisonenpaille.com
            </a>
          </div>
        </footer>
      </div>
    </PageBackground>
  );
}
