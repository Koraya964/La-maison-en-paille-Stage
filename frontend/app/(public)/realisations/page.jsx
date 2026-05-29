import RealisationsClient from "@/components/public/RealisationsClient";

export const metadata = {
  title: "Réalisations | La Maison en Paille",
  description:
    "Galerie photo des constructions en paille, terre et chaux réalisées par les stagiaires et André de Bouter.",
};

const API = process.env.NEXT_PUBLIC_API_URL;

async function getRealisations() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/realisations`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function RealisationsPage() {
  const realisations = await getRealisations();

  return <RealisationsClient realisations={realisations} />;
}
