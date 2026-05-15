import { BEIGE, BEIGE_DARK, BRUN, TEMOIGNAGES } from "./constants";
import { Stars, SatisfactionBadge } from "./ui";

export default function Temoignages() {
  return (
    <section
      aria-label="Témoignages stagiaires"
      style={{ backgroundColor: BEIGE_DARK, borderTop: "1px solid #d0c8b8" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <p
              className="font-raleway font-bold text-[10px] tracking-[0.22em] uppercase mb-2"
              style={{ color: BRUN }}
            >
              Ce qu&apos;ils en pensent
            </p>
            <div className="h-px w-10" style={{ backgroundColor: "#c8a868" }} />
          </div>
          <SatisfactionBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMOIGNAGES.map((t, i) => (
            <blockquote
              key={i}
              className="flex flex-col gap-5 p-6 rounded-xl"
              style={{ backgroundColor: BEIGE, border: "1px solid #d4ccbf" }}
            >
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0L12 2.4C8.4 3.6 6.6 5.4 6 8.4H10.8V18H0ZM13.2 18V10.8C13.2 4.8 16.8 1.2 24 0L25.2 2.4C21.6 3.6 19.8 5.4 19.2 8.4H24V18H13.2Z"
                  fill={t.accent}
                  fillOpacity="0.25"
                />
              </svg>
              <p
                className="font-raleway italic text-sm leading-relaxed flex-1"
                style={{ color: "#5a4535" }}
              >
                {t.texte}
              </p>
              <footer
                className="flex items-end justify-between gap-3 pt-4"
                style={{ borderTop: "1px solid #d4ccbf" }}
              >
                <div>
                  <p
                    className="font-raleway font-bold text-[10px] tracking-[0.12em]"
                    style={{ color: BRUN }}
                  >
                    {t.auteur}
                  </p>
                  <p
                    className="font-raleway text-[9px] tracking-[0.12em] uppercase mt-0.5"
                    style={{ color: t.accent }}
                  >
                    {t.formation}
                  </p>
                </div>
                <Stars note={t.note} accent={t.accent} />
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p
            className="font-raleway text-[9px] tracking-[0.18em] uppercase"
            style={{ color: "#a89070" }}
          >
            Témoignages placeholder, on remplacera par les vrais plus tard.
          </p>
        </div>
      </div>
    </section>
  );
}
