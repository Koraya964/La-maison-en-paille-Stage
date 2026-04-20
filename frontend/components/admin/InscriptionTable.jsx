"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

const statutColors = {
  en_attente: "bg-amber-100 text-amber-700",
  confirmee: "bg-green-100 text-green-700",
  annulee: "bg-red-100 text-red-600",
  liste_attente: "bg-blue-100 text-blue-700",
};

const statutLabels = {
  en_attente: "En attente",
  confirmee: "Confirmée",
  annulee: "Annulée",
  liste_attente: "Liste d'attente",
};

const STATUTS = Object.keys(statutLabels);

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function InscriptionModal({ inscription, onClose, onUpdateStatut, updating }) {
  if (!inscription) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-xl text-[#3d2b1f]">
              {inscription.prenom} {inscription.nom}
            </h3>
            <p className="text-stone-400 text-sm mt-0.5">
              {inscription.formation_titre}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-xl leading-none ml-4"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Infos contact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                E-mail
              </p>
              <a
                href={`mailto:${inscription.email}`}
                className="text-[#8b6c47] hover:underline"
              >
                {inscription.email}
              </a>
            </div>
            {inscription.telephone && (
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  Téléphone
                </p>
                <p className="text-stone-600">{inscription.telephone}</p>
              </div>
            )}
            {inscription.adresse && (
              <div className="col-span-2">
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                  Adresse
                </p>
                <p className="text-stone-600">
                  {inscription.adresse}
                  <br />
                  {inscription.cedex} {inscription.city}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                Date du stage
              </p>
              <p className="text-stone-600">
                {formatDate(inscription.date_debut)} →{" "}
                {formatDate(inscription.date_fin)}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                Reçu le
              </p>
              <p className="text-stone-600">
                {formatDate(inscription.created_at)}
              </p>
            </div>
          </div>

          {/* Section entreprise — uniquement si is_entreprise */}
          {inscription.is_entreprise && (
            <div className="border-t border-stone-100 pt-5">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
                Entreprise
              </p>
              <div className="grid grid-cols-2 gap-4">
                {inscription.entreprise_name && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Raison sociale
                    </p>
                    <p className="text-stone-700 font-medium">
                      {inscription.entreprise_name}
                    </p>
                  </div>
                )}
                {inscription.entreprise_quality && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Qualité
                    </p>
                    <p className="text-stone-600">
                      {inscription.entreprise_quality}
                    </p>
                  </div>
                )}
                {inscription.siret && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      SIRET
                    </p>
                    <p className="text-stone-600 font-mono text-xs">
                      {inscription.siret}
                    </p>
                  </div>
                )}
                {inscription.entreprise_telephone && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Téléphone
                    </p>
                    <p className="text-stone-600">
                      {inscription.entreprise_telephone}
                    </p>
                  </div>
                )}
                {inscription.entreprise_adress && (
                  <div className="col-span-2">
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      Adresse
                    </p>
                    <p className="text-stone-600">
                      {inscription.entreprise_adress}
                      <br />
                      {inscription.entreprise_cedex}{" "}
                      {inscription.entreprise_city}
                    </p>
                  </div>
                )}
                {inscription.entreprise_email && (
                  <div className="col-span-2">
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                      E-mail
                    </p>
                    <a
                      href={`mailto:${inscription.entreprise_email}`}
                      className="text-[#8b6c47] hover:underline"
                    >
                      {inscription.entreprise_email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          {inscription.message && (
            <div className="border-t border-stone-100 pt-5">
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-1">
                Message
              </p>
              <p className="text-stone-600 bg-stone-50 p-3 rounded">
                {inscription.message}
              </p>
            </div>
          )}

          {/* Statut */}
          <div className="border-t border-stone-100 pt-4">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
              Statut
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUTS.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateStatut(inscription.id, s)}
                  disabled={
                    updating === inscription.id || inscription.statut === s
                  }
                  className={`text-xs tracking-widest uppercase font-bold px-3 py-2 transition-colors disabled:opacity-50 ${
                    inscription.statut === s
                      ? `${statutColors[s]} cursor-default`
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {statutLabels[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

export default function InscriptionTable({
  inscriptions: initialInscriptions,
}) {
  const [inscriptions, setInscriptions] = useState(initialInscriptions);
  const [updating, setUpdating] = useState(null);
  const [selected, setSelected] = useState(null);

  async function updateStatut(id, statut) {
    setUpdating(id);
    try {
      const res = await fetch(`${API}/api/inscriptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statut }),
      });
      if (res.ok) {
        setInscriptions((prev) =>
          prev.map((i) => (i.id === id ? { ...i, statut } : i)),
        );
        setSelected((prev) => (prev?.id === id ? { ...prev, statut } : prev));
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <>
      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        {inscriptions.length === 0 ? (
          <div className="p-16 text-center text-stone-400 font-serif text-lg">
            Aucune inscription pour le moment.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Stagiaire
                </th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Formation
                </th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Date stage
                </th>
                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs tracking-widest uppercase text-stone-500 font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {inscriptions.map((i) => (
                <tr key={i.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#3d2b1f]">
                      {i.prenom} {i.nom}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    {i.formation_titre}
                  </td>
                  <td className="px-6 py-4 text-stone-500 text-xs">
                    {formatDate(i.date_debut)} → {formatDate(i.date_fin)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block text-xs tracking-wider uppercase px-2 py-1 ${statutColors[i.statut]}`}
                    >
                      {statutLabels[i.statut]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <select
                        value={i.statut}
                        disabled={updating === i.id}
                        onChange={(e) => updateStatut(i.id, e.target.value)}
                        className="text-xs border border-stone-200 px-2 py-1 focus:outline-none focus:border-[#8b6c47] disabled:opacity-50 bg-white"
                      >
                        {STATUTS.map((s) => (
                          <option key={s} value={s}>
                            {statutLabels[s]}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setSelected(i)}
                        className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
                      >
                        Détail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <InscriptionModal
        inscription={selected}
        onClose={() => setSelected(null)}
        onUpdateStatut={updateStatut}
        updating={updating}
      />
    </>
  );
}
