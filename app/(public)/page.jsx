import HomeClient from "./HomeClient";
import { query } from "@/lib/db";

export const metadata = {
  title: "La Maison en Paille — Formations 2026",
  description:
    "Formations en construction naturelle animées par André de Bouter depuis 25 ans.",
};

export default async function HomePage() {
  const formations = await query(`
    SELECT
      f.id,
      f.slug,
      f.titre,
      f.duree,
      f.tarif,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id',          s.id,
          'date_debut',  s.date_debut,
          'date_fin',    s.date_fin,
          'places_dispo',s.places_dispo,
          'statut',      s.statut
        )
      ) AS stages
    FROM formations f
    LEFT JOIN stages s
      ON s.formation_id = f.id
      AND s.date_debut >= CURDATE()
    GROUP BY f.id, f.slug, f.titre, f.duree, f.tarif
    ORDER BY f.id ASC
  `);

  const data = formations.map((f) => ({
    ...f,
    tarif: parseFloat(f.tarif),
    stages: f.stages ? f.stages.filter((s) => s.id !== null) : [],
  }));

  return <HomeClient formations={data} />;
}
