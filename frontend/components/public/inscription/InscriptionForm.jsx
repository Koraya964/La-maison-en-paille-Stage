"use client";

import { useState } from "react";
import { FORMATIONS } from "./constants";
import { useStages } from "./hooks/useStages";
import { useInscriptionForm } from "./hooks/useInscriptionForm";
import ProgressBar from "./ProgressBar";
import StepChoixStage from "./StepChoixStage";
import StepCoordonnees from "./StepCoordonnees";
import StepSucces from "./StepSucces";

export default function InscriptionForm({ preselectedFormationId = null }) {
  const [step, setStep] = useState(1);
  const [formationId, setFormationId] = useState(preselectedFormationId);
  const [selectedStage, setSelectedStage] = useState(null);

  const { stages, loading } = useStages(formationId);
  const inscription = useInscriptionForm(() => setStep(3));

  const formation = FORMATIONS.find((f) => f.id === Number(formationId));

  return (
    <div className="bg-white shadow-lg max-w-2xl mx-auto">
      <ProgressBar step={step} />
      <div className="p-8">
        {step === 1 && (
          <StepChoixStage
            formationId={formationId}
            setFormationId={setFormationId}
            stages={stages}
            loadingStages={loading}
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepCoordonnees
            formation={formation}
            selectedStage={selectedStage}
            inscription={inscription}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepSucces
            form={inscription.form}
            formation={formation}
            selectedStage={selectedStage}
          />
        )}
      </div>
    </div>
  );
}
