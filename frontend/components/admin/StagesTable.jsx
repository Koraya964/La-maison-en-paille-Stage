"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

//  Constantes ─

const statutConfig = {
  ouvert: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "#15803d",
    label: "Ouvert",
  },
  complet: {
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "#dc2626",
    label: "Complet",
  },
  liste_attente: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    dot: "#d97706",
    label: "Liste d'attente",
  },
  annule: {
    bg: "bg-stone-100",
    text: "text-stone-500",
    dot: "#a8a29e",
    label: "Annulé",
  },
  termine: {
    bg: "bg-gray-100",
    text: "text-stone-400",
    dot: "#d6d3d1",
    label: "Terminé",
  },
};

const STATUTS = Object.keys(statutConfig);

//  Helpers

function formatDateCourt(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

function formatDateLong(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

//  StatutBadge

function StatutBadge({ statut, size = "md" }) {
  const c = statutConfig[statut] || statutConfig.ouvert;
  const padding =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${padding} rounded-full tracking-wider uppercase font-bold ${c.bg} ${c.text}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: c.dot }}
      />
      {c.label}
    </span>
  );
}

//  BarrePlaces

function BarrePlaces({ dispo, total, statut }) {
  const pct =
    statut === "complet" || dispo === 0
      ? 100
      : Math.round(((total - dispo) / total) * 100);

  const color =
    statut === "complet" || dispo === 0
      ? "#dc2626"
      : dispo <= 3
        ? "#d97706"
        : "#15803d";

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-16 h-1.5 rounded-full overflow-hidden bg-stone-200 flex-shrink-0">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-stone-500 whitespace-nowrap">
        {dispo} / {total}
      </span>
    </div>
  );
}

//  SortIcon ─

function SortIcon({ active, dir }) {
  return (
    <span
      className={`inline-flex flex-col gap-[2px] ml-1 ${active ? "opacity-100" : "opacity-30"}`}
    >
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path
          d="M1 4L4 1L7 4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={active && dir === "asc" ? 1 : 0.4}
        />
      </svg>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path
          d="M1 1L4 4L7 1"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={active && dir === "desc" ? 1 : 0.4}
        />
      </svg>
    </span>
  );
}

//  Card mobile

function StageCard({ stage }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-[#3d2b1f]">{stage.formation_titre}</p>
          <p className="text-xs text-stone-400 mt-0.5">
            {formatDateCourt(stage.date_debut)} →{" "}
            {formatDateCourt(stage.date_fin)}
          </p>
        </div>
        <StatutBadge statut={stage.statut} size="sm" />
      </div>

      <BarrePlaces
        dispo={stage.places_dispo}
        total={stage.places_total}
        statut={stage.statut}
      />

      {stage.nb_inscriptions > 0 && (
        <Link
          href={`/dashboard/inscriptions?stage=${stage.id}`}
          className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <circle
              cx="4"
              cy="3.5"
              r="2"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M0.5 9.5C0.5 7.57 2.07 6 4 6"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle
              cx="8"
              cy="7"
              r="2.5"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M8 5.5V8.5M6.5 7H9.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          {stage.nb_inscriptions} inscrit{stage.nb_inscriptions > 1 ? "s" : ""}
        </Link>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-stone-100">
        <Link
          href={`/dashboard/stages/${stage.id}`}
          className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
        >
          Modifier
        </Link>
      </div>
    </div>
  );
}

//  Composant principal

export default function StagesTable({ stages: initialStages }) {
  const [filterStatut, setFilterStatut] = useState("tous");
  const [filterFormation, setFilterFormation] = useState("toutes");
  const [sortBy, setSortBy] = useState("date_debut");
  const [sortDir, setSortDir] = useState("asc");

  // Formations uniques pour le filtre
  const formations = useMemo(() => {
    const set = new Set(initialStages.map((s) => s.formation_titre));
    return [...set];
  }, [initialStages]);

  // Données filtrées + triées
  const filtered = useMemo(() => {
    let list = [...initialStages];
    if (filterStatut !== "tous")
      list = list.filter((s) => s.statut === filterStatut);
    if (filterFormation !== "toutes")
      list = list.filter((s) => s.formation_titre === filterFormation);
    list.sort((a, b) => {
      let va = a[sortBy],
        vb = b[sortBy];
      if (sortBy === "date_debut") {
        va = new Date(va);
        vb = new Date(vb);
      } else if (sortBy === "places_dispo") {
        va = Number(va);
        vb = Number(vb);
      } else {
        va = (va || "").toLowerCase();
        vb = (vb || "").toLowerCase();
      }
      return sortDir === "asc" ? (va > vb ? 1 : -1) : va < vb ? 1 : -1;
    });
    return list;
  }, [initialStages, filterStatut, filterFormation, sortBy, sortDir]);

  function toggleSort(col) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  const thClass =
    "px-5 py-3.5 text-left text-[10px] tracking-widest uppercase text-stone-500 font-bold select-none";
  const thBtn =
    "flex items-center gap-0.5 hover:text-stone-700 transition-colors cursor-pointer";

  return (
    <>
      {/* ── Filtres ── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Pills statut */}
        <div className="flex items-center gap-2 flex-wrap">
          {["tous", ...STATUTS].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              className={`text-[10px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full transition-colors
                ${
                  filterStatut === s
                    ? "bg-[#3d2b1f] text-white"
                    : "bg-white border border-stone-200 text-stone-500 hover:border-stone-300"
                }`}
            >
              {s === "tous" ? "Tous" : statutConfig[s].label}
            </button>
          ))}
        </div>

        {/* Filtre formation */}
        {formations.length > 1 && (
          <select
            value={filterFormation}
            onChange={(e) => setFilterFormation(e.target.value)}
            className="ml-auto text-xs border border-stone-200 rounded-md px-3 py-1.5 bg-white text-stone-600 focus:outline-none focus:border-[#8b6c47]"
          >
            <option value="toutes">Toutes les formations</option>
            {formations.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        )}

        {/* Compteur */}
        <p className="text-xs text-stone-400 ml-auto">
          {filtered.length} stage{filtered.length > 1 ? "s" : ""}
          {filtered.length !== initialStages.length &&
            ` sur ${initialStages.length}`}
        </p>
      </div>

      {/* ── Vue mobile ── */}
      <div className="flex flex-col gap-3 sm:hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-stone-400 font-serif">
            Aucun résultat.
          </div>
        ) : (
          filtered.map((s) => <StageCard key={s.id} stage={s} />)
        )}
      </div>

      {/* ── Vue desktop ── */}
      <div className="hidden sm:block bg-white border border-stone-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-stone-400 font-serif text-lg">
            Aucun résultat pour ces filtres.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className={thClass}>
                  <button
                    className={thBtn}
                    onClick={() => toggleSort("formation_titre")}
                  >
                    Formation{" "}
                    <SortIcon
                      active={sortBy === "formation_titre"}
                      dir={sortDir}
                    />
                  </button>
                </th>
                <th className={thClass}>
                  <button
                    className={thBtn}
                    onClick={() => toggleSort("date_debut")}
                  >
                    Dates{" "}
                    <SortIcon active={sortBy === "date_debut"} dir={sortDir} />
                  </button>
                </th>
                <th className={thClass}>
                  <button
                    className={thBtn}
                    onClick={() => toggleSort("places_dispo")}
                  >
                    Places{" "}
                    <SortIcon
                      active={sortBy === "places_dispo"}
                      dir={sortDir}
                    />
                  </button>
                </th>
                <th className={thClass}>
                  <button
                    className={thBtn}
                    onClick={() => toggleSort("statut")}
                  >
                    Statut{" "}
                    <SortIcon active={sortBy === "statut"} dir={sortDir} />
                  </button>
                </th>
                <th className={`${thClass} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((stage) => (
                <tr
                  key={stage.id}
                  className="hover:bg-stone-50/70 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#3d2b1f]">
                      {stage.formation_titre}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-stone-600 whitespace-nowrap">
                      {formatDateCourt(stage.date_debut)} →{" "}
                      {formatDateCourt(stage.date_fin)}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatDateLong(stage.date_debut)}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <BarrePlaces
                      dispo={stage.places_dispo}
                      total={stage.places_total}
                      statut={stage.statut}
                    />
                  </td>
                  <td className="px-5 py-4">
                    <StatutBadge statut={stage.statut} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      {stage.nb_inscriptions > 0 && (
                        <Link
                          href={`/dashboard/inscriptions?stage=${stage.id}`}
                          className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-bold text-stone-400 hover:text-[#3d2b1f] transition-colors"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <circle
                              cx="4.5"
                              cy="3.5"
                              r="2"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                            <path
                              d="M1 10C1 7.79 2.79 6 5 6"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                            <circle
                              cx="9"
                              cy="8"
                              r="2.5"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                            <path
                              d="M9 6.5V9.5M7.5 8H10.5"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                            />
                          </svg>
                          {stage.nb_inscriptions} inscrit
                          {stage.nb_inscriptions > 1 ? "s" : ""}
                        </Link>
                      )}
                      <Link
                        href={`/dashboard/stages/${stage.id}`}
                        className="text-xs tracking-widest uppercase font-bold text-[#8b6c47] hover:text-[#3d2b1f] transition-colors"
                      >
                        Modifier
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
