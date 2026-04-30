import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getFormation(slug) {
  try {
    const res = await fetch(`${API}/api/stages/formations`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const formations = await res.json();
    const formation = formations.find((f) => f.slug === slug);
    if (!formation) return null;
    return {
      ...formation,
      galerie: formation.galerie
        ? typeof formation.galerie === "string"
          ? JSON.parse(formation.galerie)
          : formation.galerie
        : [],
      programme: formation.programme
        ? typeof formation.programme === "string"
          ? JSON.parse(formation.programme)
          : formation.programme
        : [],
    };
  } catch {
    return null;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
  });
}

function StatutBadge({ statut }) {
  const config = {
    ouvert: { bg: "#f0fdf4", text: "#15803d", label: "Ouvert" },
    complet: { bg: "#fef2f2", text: "#dc2626", label: "Complet" },
    liste_attente: { bg: "#fffbeb", text: "#d97706", label: "Liste d'attente" },
    annule: { bg: "#f5f5f4", text: "#78716c", label: "Annulé" },
    termine: { bg: "#f5f5f4", text: "#a8a29e", label: "Terminé" },
  };
  const c = config[statut] ?? config.ouvert;
  return (
    <span
      className="text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full flex-shrink-0"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {c.label}
    </span>
  );
}

export async function generateMetadata({ params }) {
  const formation = await getFormation(params.slug);
  if (!formation) return { title: "Formation introuvable" };
  return {
    title: `${formation.titre}${formation.duree ? ` — ${formation.duree}` : ""} | La Maison en Paille`,
    description:
      formation.description ||
      `Formation ${formation.titre} avec André de Bouter.`,
  };
}

export default async function FormationPage({ params }) {
  const formation = await getFormation(params.slug);
  if (!formation) notFound();

  const autresFormations = [];
  try {
    const res = await fetch(`${API}/api/stages/formations`, {
      cache: "no-store",
    });
    if (res.ok) {
      const all = await res.json();
      autresFormations.push(
        ...all.filter((f) => f.slug !== params.slug).slice(0, 3),
      );
    }
  } catch {}

  const imgHero =
    formation.image_hero ||
    "https://static.wixstatic.com/media/457787_636791b4baad4907b60f835956955fc3~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/457787_636791b4baad4907b60f835956955fc3~mv2.jpg";

  return (
    <div style={{ backgroundColor: "#f9f6f1" }} className="text-[#2D2D2D]">
      {/* ── HERO ── */}
      <section
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#3d1a0e" }}
      >
        <Image
          src={imgHero}
          alt={formation.titre}
          fill
          className="object-cover"
          style={{ opacity: 0.35 }}
          priority
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(61,26,14,0.4) 0%, rgba(61,26,14,0.85) 100%)",
          }}
        />
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-white/60 border border-white/20 rounded-full">
            Bioconstruction & Transmission
          </span>
          <h1 className="font-raleway text-5xl md:text-7xl font-light text-white mb-4 leading-[1.1]">
            {formation.titre}
          </h1>
          {formation.sous_titre && (
            <p
              className="text-lg md:text-xl mb-6 font-light italic"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {formation.sous_titre}
            </p>
          )}
          {formation.description && (
            <p
              className="text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {formation.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/inscription?formation=${formation.id}`}
              className="px-8 py-4 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
              style={{ backgroundColor: "#BC8A5F" }}
            >
              Réserver ma place
              {formation.tarif ? ` — ${formation.tarif} €` : ""}
            </Link>
            {formation.programme?.length > 0 && (
              <a
                href="#programme"
                className="px-8 py-4 text-white border rounded-xl font-bold transition-all"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                Voir le programme
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── INTRODUCTION ── */}
      {formation.introduction && (
        <section
          className="py-14 px-6"
          style={{
            backgroundColor: "#ede8de",
            borderBottom: "1px solid #d5cab8",
          }}
        >
          <div className="max-w-3xl mx-auto">
            <p
              className="text-[9px] tracking-[0.22em] uppercase font-bold mb-4"
              style={{ color: "#BC8A5F" }}
            >
              La formation
            </p>
            <div className="flex items-start gap-5">
              <div
                className="flex-shrink-0 rounded-full"
                style={{
                  width: "3px",
                  backgroundColor: "#BC8A5F",
                  alignSelf: "stretch",
                  minHeight: "60px",
                }}
              />
              <p
                className="text-base leading-relaxed whitespace-pre-line"
                style={{ color: "#5a4535", lineHeight: 1.85 }}
              >
                {formation.introduction}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── PROGRAMME + FICHE ── */}
      <section
        id="programme"
        className="py-16 px-6"
        style={{ backgroundColor: "#f9f6f1" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            {/* Programme */}
            <div>
              {formation.programme?.length > 0 && (
                <>
                  <p
                    className="text-[9px] tracking-[0.22em] uppercase font-bold mb-5"
                    style={{ color: "#9a8070" }}
                  >
                    Au programme
                  </p>
                  <div className="flex flex-col gap-3">
                    {formation.programme.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white"
                        style={{ border: "1px solid #e8e0d4" }}
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: "rgba(188,138,95,0.15)" }}
                        >
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="#BC8A5F"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#3d1a0e" }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {(!formation.programme || formation.programme.length === 0) &&
                formation.description && (
                  <>
                    <p
                      className="text-[9px] tracking-[0.22em] uppercase font-bold mb-5"
                      style={{ color: "#9a8070" }}
                    >
                      La formation
                    </p>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "#5a4535" }}
                    >
                      {formation.description}
                    </p>
                  </>
                )}
            </div>

            {/* Fiche sticky */}
            <div className="self-start sticky top-8">
              <div
                className="rounded-2xl p-6 bg-white"
                style={{ border: "1px solid #e8e0d4" }}
              >
                <p
                  className="text-[9px] tracking-[0.22em] uppercase font-bold mb-4"
                  style={{ color: "#9a8070" }}
                >
                  Prochaines dates
                </p>
                <div className="flex flex-col gap-2 mb-6">
                  {formation.stages?.length > 0 ? (
                    formation.stages.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-3 rounded-xl"
                        style={{
                          border: "1px solid #f0ede6",
                          backgroundColor: "#faf8f5",
                        }}
                      >
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#3d1a0e" }}
                        >
                          {formatDate(s.date_debut)} → {formatDate(s.date_fin)}
                        </span>
                        <StatutBadge statut={s.statut} />
                      </div>
                    ))
                  ) : (
                    <p
                      className="text-sm italic py-3 text-center"
                      style={{ color: "#c8bfb0" }}
                    >
                      Dates à venir — nous contacter
                    </p>
                  )}
                </div>

                <div
                  className="flex flex-col gap-4 pt-5 mb-6"
                  style={{ borderTop: "1px solid #f0ede6" }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {formation.duree && (
                      <div>
                        <p
                          className="text-[9px] tracking-[0.2em] uppercase font-bold mb-1"
                          style={{ color: "#BC8A5F" }}
                        >
                          Durée
                        </p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "#3d1a0e" }}
                        >
                          {formation.duree}
                        </p>
                      </div>
                    )}
                    {formation.tarif && (
                      <div>
                        <p
                          className="text-[9px] tracking-[0.2em] uppercase font-bold mb-1"
                          style={{ color: "#BC8A5F" }}
                        >
                          Tarif
                        </p>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "#3d1a0e" }}
                        >
                          {formation.tarif} €
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p
                      className="text-[9px] tracking-[0.2em] uppercase font-bold mb-1"
                      style={{ color: "#BC8A5F" }}
                    >
                      Formateur
                    </p>
                    <p className="text-sm" style={{ color: "#5a4535" }}>
                      André de Bouter, expert en bioconstruction depuis 25 ans.
                    </p>
                  </div>
                  {formation.lieu && (
                    <div>
                      <p
                        className="text-[9px] tracking-[0.2em] uppercase font-bold mb-1"
                        style={{ color: "#BC8A5F" }}
                      >
                        Lieu
                      </p>
                      <p className="text-sm" style={{ color: "#5a4535" }}>
                        {formation.lieu}
                      </p>
                    </div>
                  )}
                </div>

                <Link
                  href={`/inscription?formation=${formation.id}`}
                  className="w-full py-4 text-center text-white rounded-xl font-bold transition-all inline-block"
                  style={{ backgroundColor: "#3d1a0e" }}
                >
                  Réserver ma session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIE ── */}
      {formation.galerie?.length > 0 && (
        <section
          className="py-16 px-6"
          style={{ backgroundColor: "#ede8de", borderTop: "1px solid #d5cab8" }}
        >
          <div className="max-w-5xl mx-auto">
            <p
              className="text-[9px] tracking-[0.22em] uppercase font-bold mb-2"
              style={{ color: "#9a8070" }}
            >
              Galerie
            </p>
            <h2
              className="font-serif text-2xl mb-8"
              style={{ color: "#3d1a0e", fontWeight: 400 }}
            >
              L&apos;expérience en images
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {formation.galerie.map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl group"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={src}
                    alt={`Photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AUTRES FORMATIONS ── */}
      {autresFormations.length > 0 && (
        <section
          className="py-16 px-6 overflow-hidden relative"
          style={{ backgroundColor: "#3d1a0e" }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: "rgba(188,138,95,0.07)" }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p
              className="text-[9px] tracking-[0.22em] uppercase font-bold mb-3"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Continuer à explorer
            </p>
            <h2
              className="font-raleway text-2xl font-light mb-10 tracking-wide"
              style={{ color: "white" }}
            >
              Autres formations
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {autresFormations.map((f) => (
                <Link
                  key={f.slug}
                  href={`/formations/${f.slug}`}
                  className="group px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
                  style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <span className="font-medium tracking-wide">{f.titre}</span>
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
      )}
    </div>
  );
}
