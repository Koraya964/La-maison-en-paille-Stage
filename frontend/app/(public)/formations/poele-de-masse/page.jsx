import Link from "next/link";
import Image from "next/image";
export const dynamic = 'force-dynamic'
// ── CONSTANTES D'IMAGES ──
const IMG_GIF =
  "https://static.wixstatic.com/media/f4c673_9e107a544f7a4064a4a68de072001bac~mv2.gif";

const PHOTOS = [
  "https://static.wixstatic.com/media/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_0ad1e98972b741d88fc67ca7f6fcbe84~mv2_d_3264_2176_s_2.jpg",
  "https://static.wixstatic.com/media/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_ae9592c32d2c455ca5ec4bcb8c3cfde7~mv2_d_4000_3000_s_4_2.jpg",
  "https://static.wixstatic.com/media/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_970ee1d01bf4444fb77b8ac3eb30d9b6~mv2_d_2300_1533_s_2.jpg",
  "https://static.wixstatic.com/media/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_bde4a1de4e964eb7904e48385d42e1a6~mv2_d_3264_2448_s_4_2.jpg",
  "https://static.wixstatic.com/media/457787_382aa54518cd47ef86e021eb696b0c7c~mv2_d_2579_2579_s_4_2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_382aa54518cd47ef86e021eb696b0c7c~mv2_d_2579_2579_s_4_2.jpg",
  "https://static.wixstatic.com/media/457787_ceca839650634ae2b5bc8c1aaf5077b1~mv2_d_3264_2176_s_2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_ceca839650634ae2b5bc8c1aaf5077b1~mv2_d_3264_2176_s_2.jpg",
];

export const metadata = {
  title: "Stage Poêle de Masse — 3 jours | La Maison en Paille",
  description:
    "Construisez votre autonomie énergétique. Stage de 3 jours sur le poêle de masse Oxa-Libre avec André de Bouter.",
};

async function getStagesPoele() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stages?formation=poele-de-masse`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatStageDates(dateDebut, dateFin) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const debut = new Date(dateDebut).toLocaleDateString("fr-FR", options);
  const fin = new Date(dateFin).toLocaleDateString("fr-FR", options);
  return `${debut} → ${fin}`;
}

export default async function PoeleDeMassePage() {
  const stages = await getStagesPoele();

  return (
    <div className="bg-[#F9F6F1] text-[#2D2D2D] font-sans selection:bg-[#A35C44] selection:text-white">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src={IMG_GIF}
          alt="Poêle de masse en brique"
          fill
          className="object-cover brightness-[0.4]"
          priority
          unoptimized
        />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full">
            Autonomie Énergétique
          </span>
          <h1 className="font-raleway text-5xl md:text-7xl font-light text-white mb-6 leading-[1.1]">
            Maîtriser la <span className="italic">chaleur</span> rayonnante
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Un stage immersif de 3 jours pour concevoir et bâtir votre propre
            poêle de masse Oxa-Libre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscription"
              className="px-8 py-4 bg-[#A35C44] hover:bg-[#8B4A35] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Réserver ma place — 380€
            </Link>
            <a
              href="#details"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold transition-all"
            >
              Découvrir le programme
            </a>
          </div>
        </div>
      </section>

      {/* ── ARGUMENTS CLÉS ── */}
      <section id="details" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#A35C44]/10 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />
            <Image
              src={IMG_GIF}
              alt="Efficacité thermique"
              width={500}
              height={400}
              className="relative rounded-xl shadow-2xl z-10 object-cover w-full"
              unoptimized
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#3D1A0E] leading-tight">
              Pourquoi choisir le poêle de masse Oxa-Libre ?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Plus qu'un simple chauffage, c'est un outil de résilience. Conçu
              pour maximiser l'énergie du bois, il offre une inertie thermique
              inégalée.
            </p>

            <div className="grid gap-6">
              {[
                {
                  title: "Efficience Maximale",
                  desc: "Rendement > 85% avec 3x moins de bois.",
                },
                {
                  title: "Inertie Durable",
                  desc: "1h de chauffe diffuse 12h à 24h de chaleur douce.",
                },
                {
                  title: "Polyvalence",
                  desc: "Option four à pain, eau chaude et banc chauffant.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#A35C44]/10 flex items-center justify-center text-[#A35C44] font-bold">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIE ── */}
      <section className="bg-[#F2EDE4] py-20 px-6">
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">L'expérience en images</h2>
          <p className="text-gray-500">
            Chantiers participatifs et réalisations
          </p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-2xl group relative"
            >
              <Image
                src={src}
                alt={`Photo stage ${i}`}
                width={400}
                height={500}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── DATES & CTA FINAL ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          <div className="md:w-1/2 p-10 lg:p-16 space-y-6 bg-[#2D2D2D] text-white">
            <h2 className="text-4xl font-bold italic">Prêt à bâtir ?</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Les stages se déroulent en Charente (16) avec André de Bouter.
              Petit groupe de 10 personnes maximum pour un suivi personnalisé.
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm uppercase tracking-widest text-[#A35C44] font-bold">
                Tarif Inclusif
              </p>
              <span className="text-5xl font-light">380 €</span>
              <p className="text-xs text-gray-500 mt-2">
                Formation + déjeuners végétariens inclus.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <div className="space-y-4 mb-10">
              {stages.length === 0 ? (
                <p className="text-gray-400 text-sm italic">
                  Aucune date disponible pour le moment.
                </p>
              ) : (
                stages.map((stage) => (
                  <div
                    key={stage.id}
                    className="flex items-center justify-between p-4 rounded-xl transition-colors border border-transparent "
                  >
                    <span className="font-medium text-gray-700">
                      {formatStageDates(stage.date_debut, stage.date_fin)}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                        stage.statut === "annule" || stage.statut === "complet"
                          ? "bg-gray-100 text-gray-400"
                          : stage.statut === "liste_attente"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {stage.statut === "ouvert"
                        ? "Ouvert"
                        : stage.statut === "complet"
                          ? "Complet"
                          : stage.statut === "liste_attente"
                            ? "Liste d'attente"
                            : "Annulé"}
                    </span>
                  </div>
                ))
              )}
            </div>
            <Link
              href="/inscription"
              className="w-full py-5 bg-[#A35C44] text-center text-white rounded-2xl font-bold shadow-lg shadow-[#A35C44]/20 hover:-translate-y-1 transition-all"
            >
              Réserver ma session
            </Link>
          </div>
        </div>
      </section>

      {/* ── NAVIGATION FORMATIONS ── */}
      <section className="bg-[#3D1A0E] py-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#BC8A5F]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-white font-raleway text-2xl mb-10 font-light tracking-wide">
            Explorer d&apos;autres domaines d&apos;autonomie
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {[
              {
                label: "Paille, Terre, Chaux",
                href: "/formations/paille-terre-chaux",
              },
              { label: "Photovoltaïque", href: "/formations/photovoltaique" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group px-8 py-4 border border-white/20 text-white/80 rounded-xl hover:border-[#BC8A5F] hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <span className="font-medium tracking-wide">{link.label}</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
