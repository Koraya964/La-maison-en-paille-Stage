export const dynamic = 'force-dynamic';
import { fetchActualites } from "@/lib/api/actualites";
export const dynamic = 'force-dynamic'
export const metadata = {
  title: "Actualités | La Maison en Paille",
  description: "Les dernières nouvelles de La Maison en Paille.",
};

const IMG_BANDEAU =
  "https://static.wixstatic.com/media/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg/v1/fill/w_381,h_1920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3e33e8_d74efc6c8f1f4e95800c902d07a36027~mv2.jpg";

async function getActualites() {
  try {
    return await query(
      "SELECT * FROM actualites WHERE publie = TRUE ORDER BY created_at DESC",
    );
  } catch {
    return [];
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ActualitesPage() {
  const actualites = await fetchActualites();

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${IMG_BANDEAU})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#c8824a]/55 pointer-events-none" />
      <div className="relative z-10">
        <div className="text-center py-14">
          <h1
            className="font-raleway font-black text-white uppercase tracking-[0.1em]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            Actualités
          </h1>
        </div>
        <div className="bg-white/95 py-12 px-6">
          <div className="max-w-5xl mx-auto">
            {actualites.length === 0 ? (
              <p className="text-center font-raleway text-[#4a4a4a] py-16">
                Aucune actualité pour le moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {actualites.map((news) => (
                  <article
                    key={news.id}
                    className="bg-white border border-[#f0e8d8] hover:shadow-md transition-shadow"
                  >
                    {news.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={news.image_url}
                          alt={news.titre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-raleway font-bold text-[9px] tracking-[0.15em] uppercase text-[#8b3a2a] mb-2">
                        {formatDate(news.created_at)}
                      </p>
                      <h2 className="font-raleway font-black text-[#3d1a0e] uppercase tracking-[0.05em] text-base mb-3 leading-tight">
                        {news.titre}
                      </h2>
                      <p className="text-sm text-[#4a4a4a] leading-relaxed line-clamp-4">
                        {news.contenu}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
