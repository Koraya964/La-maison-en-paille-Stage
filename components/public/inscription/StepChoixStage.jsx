"use client";

import { FORMATIONS, STATUT_LABELS, formatDate } from "./constants";

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4 inline-block"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function StepChoixStage({
  formationId,
  setFormationId,
  stages,
  loadingStages,
  selectedStage,
  setSelectedStage,
  onNext,
}) {
  return (
    <div className="space-y-8">
      {/* ── Sélecteur formation ── */}
      <div>
        <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-3">
          Formation *
        </label>
        <div className="grid grid-cols-1 gap-3">
          {FORMATIONS.map((f) => {
            const selected = Number(formationId) === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormationId(f.id)}
                className={`text-left p-4 border-2 transition-all ${
                  selected
                    ? "border-[#8b3a2a] bg-[#fff8f6]"
                    : "border-stone-200 hover:border-[#c8a040]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.06em] text-sm">
                      {f.titre}
                    </p>
                    <p className="font-raleway text-[10px] tracking-wider uppercase text-[#8b3a2a] mt-0.5">
                      {f.duree}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-raleway font-black text-[#c8a040] text-sm">
                      {f.tarif}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selected
                          ? "border-[#8b3a2a] bg-[#8b3a2a]"
                          : "border-stone-300"
                      }`}
                    >
                      {selected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sélecteur date ── */}
      {formationId && (
        <div>
          <label className="block font-raleway font-bold text-[10px] tracking-[0.15em] uppercase text-[#3d1a0e] mb-3">
            Date du stage *
          </label>

          {loadingStages ? (
            <div className="flex items-center gap-3 py-4 text-[#4a4a4a] text-sm">
              <Spinner /> Chargement des dates…
            </div>
          ) : stages.length === 0 ? (
            <p className="text-sm text-[#4a4a4a] py-3 border border-stone-200 px-4">
              Aucune date disponible pour le moment.{" "}
              <a
                href="mailto:contact@lamaisonenpaille.com"
                className="text-[#8b3a2a] underline"
              >
                Contactez-nous
              </a>
            </p>
          ) : (
            <div className="space-y-2">
              {stages.map((s) => {
                const statut = STATUT_LABELS[s.statut] || STATUT_LABELS.ouvert;
                const dispo = s.statut === "ouvert";
                const checked = selectedStage?.id === s.id;

                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={!dispo}
                    onClick={() => dispo && setSelectedStage(s)}
                    className={`w-full text-left p-4 border-2 transition-all flex items-center justify-between ${
                      !dispo
                        ? "border-stone-100 bg-stone-50 opacity-60 cursor-not-allowed"
                        : checked
                          ? "border-[#8b3a2a] bg-[#fff8f6]"
                          : "border-stone-200 hover:border-[#c8a040]"
                    }`}
                  >
                    <div>
                      <p className="font-raleway font-bold text-sm text-[#3d1a0e]">
                        {formatDate(s.date_debut)} → {formatDate(s.date_fin)}
                      </p>
                      <p className="text-xs text-[#4a4a4a] mt-0.5">
                        {s.places_dispo} place{s.places_dispo > 1 ? "s" : ""}{" "}
                        restante{s.places_dispo > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`font-raleway font-bold text-[9px] tracking-[0.12em] uppercase px-2 py-1 ${statut.cls}`}
                      >
                        {statut.label}
                      </span>
                      {dispo && (
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            checked
                              ? "border-[#8b3a2a] bg-[#8b3a2a]"
                              : "border-stone-300"
                          }`}
                        >
                          {checked && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Bouton suivant ── */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedStage}
          className="btn-terracotta w-full text-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuer →
        </button>
        {!formationId && (
          <p className="text-xs text-[#4a4a4a] text-center mt-3">
            Sélectionnez une formation pour voir les dates disponibles
          </p>
        )}
      </div>
    </div>
  );
}
