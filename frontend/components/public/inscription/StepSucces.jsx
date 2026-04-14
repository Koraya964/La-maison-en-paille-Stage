import { formatDate } from "./constants";

export default function StepSucces({ form, formation, selectedStage, statut }) {
  const isListeAttente = statut === "liste_attente";

  return (
    <div className="text-center py-4">
      {/* Icône — verte si confirmé, violet si liste d'attente */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: isListeAttente ? "#f0eaf8" : "#f0fdf4" }}
      >
        {isListeAttente ? (
          // Icône horloge / attente
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "#7040a0" }}
          >
            <circle cx="12" cy="12" r="9" strokeWidth={2} />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 7v5l3 3"
            />
          </svg>
        ) : (
          // Icône check
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
        )}
      </div>

      {/* Titre */}
      <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.08em] text-xl mb-4">
        {isListeAttente ? "Sur liste d'attente" : "Demande envoyée !"}
      </h2>

      {/* Message principal */}
      <p className="text-sm text-[#4a4a4a] leading-relaxed mb-2">
        Merci <strong>{form.prenom}</strong>,{" "}
        {isListeAttente ? (
          <>
            le stage <strong>{formation?.titre}</strong> est complet. Vous avez
            été ajouté à la liste d&apos;attente.
          </>
        ) : (
          <>
            votre demande d&apos;inscription au stage{" "}
            <strong>{formation?.titre}</strong> a bien été reçue.
          </>
        )}
      </p>

      <p className="text-sm text-[#4a4a4a] leading-relaxed mb-2">
        {isListeAttente ? (
          <>
            Vous serez contacté à <strong>{form.email}</strong> en priorité si
            une place se libère.
          </>
        ) : (
          <>
            Vous recevrez un email de confirmation à{" "}
            <strong>{form.email}</strong>.
          </>
        )}
      </p>

      {/* Bandeau info liste d'attente */}
      {isListeAttente && (
        <p
          className="text-xs text-[#7040a0] bg-[#f0eaf8] px-4 py-3 mb-6 leading-relaxed"
          style={{ border: "1px solid #d0b8e8" }}
        >
          André vous contactera personnellement dès qu&apos;une place sera
          disponible. Vous pouvez également nous appeler pour vous renseigner
          sur d&apos;autres dates.
        </p>
      )}

      {/* Récapitulatif */}
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
        {isListeAttente && (
          <p className="mt-1" style={{ color: "#7040a0" }}>
            <strong>Statut :</strong> Liste d&apos;attente
          </p>
        )}
        <p className="mt-1">
          <strong>Contact :</strong> 05 45 66 27 68 ·
          contact@lamaisonenpaille.com
        </p>
      </div>
    </div>
  );
}
