import PageBackground from "@/components/public/PageBackground";
import InscriptionForm from "@/components/public/InscriptionForm";

export const metadata = {
  title: "S'inscrire à une formation | La Maison en Paille",
  description:
    "Inscrivez-vous à une formation Paille Terre Chaux, Poêle de masse ou Photovoltaïque avec André de Bouter. Stage à Saint-Simeux, Charente (16).",
};

export default function InscriptionPage() {
  return (
    <PageBackground>
      {/* Titre */}
      <div className="text-center pt-14 pb-8 px-6">
        <h1
          className="font-raleway font-black text-white uppercase tracking-[0.1em]"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          Inscription
        </h1>
        <p
          className="text-white/80 text-sm mt-3"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          Choisissez votre stage et renseignez vos coordonnées.
        </p>
      </div>

      {/* Formulaire */}
      <div className="pb-16 px-4">
        <InscriptionForm />
      </div>

      {/* Contact alternatif */}
      <div className="bg-[#3d1a0e] py-10 px-6 text-center">
        <p className="font-raleway font-bold text-[10px] tracking-[0.2em] uppercase text-white mb-3">
          Vous préférez nous contacter directement ?
        </p>
        <p className="text-white/70 text-sm">
          <a
            href="tel:0545662768"
            className="text-[#c8a040] hover:text-white transition-colors font-bold"
          >
            Par téléphone : 05 45 66 27 68
          </a>
          &nbsp;·&nbsp;
          <a
            href="mailto:contact@lamaisonenpaille.com?subject=INSCRIPTION"
            className="text-[#c8a040] hover:text-white transition-colors font-bold"
          >
            Par email : contact@lamaisonenpaille.com
          </a>
        </p>
      </div>
    </PageBackground>
  );
}
