import { formatDate } from "./constants";

export default function StepSucces({ form, formation, selectedStage }) {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl mb-4">
        Demande envoyée !
      </h2>
      <p className="text-sm text-[#4a4a4a] leading-relaxed mb-2">
        Merci <strong>{form.prenom}</strong>, votre demande d&apos;inscription
        au stage
        <strong> {formation?.titre}</strong> a bien été reçue.
      </p>
      <p className="text-sm text-[#4a4a4a] leading-relaxed mb-8">
        Vous recevrez un email de confirmation à <strong>{form.email}</strong>.
      </p>
      <div className="text-xs text-[#4a4a4a] bg-[#f5f0e6] p-4 text-left">
        <p className="font-raleway font-bold text-[#3d1a0e] uppercase tracking-wider mb-2">
          Récapitulatif
        </p>
        <p>
          <strong>Formation :</strong> {formation?.titre}
        </p>
        <p>
          <strong>Dates :</strong> {formatDate(selectedStage?.date_debut)} →{" "}
          {formatDate(selectedStage?.date_fin)}
        </p>
        <p>
          <strong>Contact :</strong> 05 45 66 27 68 ·
          contact@lamaisonenpaille.com
        </p>
      </div>
    </div>
  );
}
