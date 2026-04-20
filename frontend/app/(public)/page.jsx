// app/(public)/page.jsx
import HomeClient from "./HomeClient";
import { fetchFormationsWithStages } from "@/lib/api/stages"; // ← corrigé

export const metadata = {
  title: "La Maison en Paille — Formations 2026",
  description:
    "Formations en construction naturelle animées par André de Bouter depuis 25 ans.",
};

export default async function HomePage() {
  const formations = await fetchFormationsWithStages();
  return <HomeClient formations={formations} />;
}
