"use client";

import Image from "next/image";
import {
  BEIGE,
  BEIGE_DARK,
  BRUN,
  IMAGES,
} from "../../components/public/Constants";
import Hero from "../../components/public/Hero";
import FormationRow from "../../components/public/FormationRow";
import Temoignages from "../../components/public/Temoignage";
import { Newsletter, PorteOuverte } from "../../components/public/Sections";

// Intro
function Intro() {
  return (
    <div
      className="py-14 px-8 text-center"
      style={{ backgroundColor: BEIGE, borderBottom: "1px solid #d4ccbf" }}
    >
      <p
        className="font-raleway italic max-w-xl mx-auto"
        style={{
          fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
          lineHeight: 1.9,
          color: "#5a4535",
        }}
      >
        Vous souhaitez concrétiser votre projet de construction naturelle ? Je
        vous transmets le savoir-faire pour le réaliser avec confiance et
        plaisir.
      </p>
      <p
        className="font-raleway font-bold text-[9px] tracking-[0.22em] uppercase mt-4"
        style={{ color: "#b08040" }}
      >
        — André de Bouter
      </p>
    </div>
  );
}

//  Pied de page séparateur
function FooterDivider() {
  return (
    <div style={{ backgroundColor: BEIGE_DARK }} className="py-6 px-8">
      <div className="max-w-5xl mx-auto flex items-center gap-5">
        <div className="h-px flex-1" style={{ backgroundColor: "#cec5b5" }} />
        <div className="flex items-center gap-2.5">
          <Image
            src={IMAGES.logo}
            alt=""
            width={18}
            height={18}
            unoptimized
            aria-hidden="true"
          />
          <p
            className="font-raleway text-[9px] tracking-[0.25em] uppercase"
            style={{ color: "#a89070" }}
          >
            La Maison en Paille · Charente
          </p>
        </div>
        <div className="h-px flex-1" style={{ backgroundColor: "#cec5b5" }} />
      </div>
    </div>
  );
}

//  Page principale
export default function HomeClient({ formations = [] }) {
  return (
    <div style={{ backgroundColor: BEIGE }}>
      <Hero />
      <Intro />

      <section id="formations" aria-label="Nos formations">
        {formations.map((f, i) => (
          <FormationRow key={f.slug} formation={f} i={i} />
        ))}
      </section>

      <Temoignages />
      <Newsletter />
      <PorteOuverte />
      <FooterDivider />
    </div>
  );
}
