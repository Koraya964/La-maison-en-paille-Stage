import Link from "next/link";
import Image from "next/image";
import { BEIGE, BEIGE_DARK, BRUN, IMAGES } from "./constants";

export function Newsletter() {
  return (
    <section
      className="py-16 px-8"
      aria-label="Newsletter"
      style={{
        backgroundColor: BEIGE_DARK,
        borderTop: "1px solid #d0c8b8",
        borderBottom: "1px solid #d0c8b8",
      }}
    >
      <div className="max-w-xl mx-auto">
        <div className="pl-6" style={{ borderLeft: "3px solid #c06030" }}>
          <p
            className="font-raleway font-bold text-[10px] tracking-[0.18em] uppercase mb-2"
            style={{ color: "#8b5e3c" }}
          >
            Restez informé
          </p>
          <p
            className="font-raleway text-sm mb-6"
            style={{ color: BRUN, lineHeight: 1.7 }}
          >
            Recevez les <strong>Nouv&apos;d&apos;André</strong> — actualités et
            nouvelles dates de stages directement dans votre boîte mail.
          </p>
          <Link
            href="/contact"
            className="btn-newsletter focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c06030] focus-visible:ring-offset-2"
          >
            Je m&apos;abonne
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PorteOuverte() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: BRUN }}
      aria-label="Journée Porte Ouverte — 14 mars 2026"
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <p
            className="font-raleway text-[9px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Événement · Samedi 14 mars 2026
          </p>
          <h2
            className="font-raleway font-black text-white uppercase"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "0.1em",
            }}
          >
            Journée Porte Ouverte
          </h2>
          <div
            className="w-10 h-px mx-auto mt-5"
            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
          />
        </header>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-10 md:gap-8 items-center">
          <div className="flex justify-center order-1">
            <Image
              src={IMAGES.porte}
              alt="Affiche journée nationale du Poêle de Masse — Porte ouverte 14 mars 2026"
              width={380}
              height={228}
              className="rounded-xl object-contain w-full max-w-[360px]"
              unoptimized
            />
          </div>

          <div className="text-center flex flex-col items-center gap-5 order-2">
            <h3
              className="font-raleway font-black text-white uppercase"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                letterSpacing: "0.06em",
                lineHeight: 1.1,
              }}
            >
              Porte
              <br />
              Ouverte
            </h3>
            <div
              className="w-8 h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
            />
            <p
              className="text-sm leading-relaxed max-w-[220px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Venez découvrir le confort du poêle de masse auto-construit.
            </p>
            <Link
              href="/contact"
              className="font-raleway font-bold text-[10px] tracking-[0.16em] uppercase text-white px-6 py-3 rounded-full transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ border: "1px solid rgba(255,255,255,0.22)" }}
            >
              Réserver ma place
            </Link>
            <p
              className="font-raleway text-[9px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Places limitées
            </p>
            <div className="flex items-center gap-2 mt-1">
              <svg
                width="11"
                height="14"
                viewBox="0 0 11 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5.5 0C2.46 0 0 2.46 0 5.5c0 3.85 5.5 8.5 5.5 8.5S11 9.35 11 5.5C11 2.46 8.54 0 5.5 0Zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                  fill="rgba(255,255,255,0.3)"
                />
              </svg>
              <p
                className="font-raleway text-[9px] tracking-[0.14em] uppercase"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Charente · 16 · France
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 order-3">
            <Image
              src={IMAGES.gif}
              alt="Caméra thermique montrant la chaleur rayonnée par un poêle de masse"
              width={280}
              height={210}
              className="rounded-xl object-contain"
              unoptimized
            />
            <p
              className="font-raleway text-[9px] tracking-[0.12em] text-center max-w-[220px]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Caméra thermique — rayonnement du poêle de masse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
