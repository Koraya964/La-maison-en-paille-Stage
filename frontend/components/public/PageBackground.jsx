/**
 * Fond texturé paille utilisé sur toutes les pages publiques.
 *
 * Stratégie :
 * - Mobile : texture paille synthétique SVG inline (pas de backgroundAttachment:fixed)
 * - Desktop : image réelle + enrichissement SVG par-dessus
 * - Partout : couches de profondeur (vignette, gradient chaud, grain)
 */

// SVG de texture paille — lignes diagonales fines qui évoquent la paille
const STRAW_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23noise)' opacity='0.08'/%3E%3Cg stroke='%23c8a060' stroke-width='0.6' opacity='0.18'%3E%3Cline x1='0' y1='20' x2='120' y2='0'/%3E%3Cline x1='0' y1='40' x2='120' y2='20'/%3E%3Cline x1='0' y1='60' x2='120' y2='40'/%3E%3Cline x1='0' y1='80' x2='120' y2='60'/%3E%3Cline x1='0' y1='100' x2='120' y2='80'/%3E%3Cline x1='0' y1='120' x2='120' y2='100'/%3E%3Cline x1='0' y1='10' x2='60' y2='0'/%3E%3Cline x1='60' y1='120' x2='120' y2='110'/%3E%3C/g%3E%3Cg stroke='%23a06830' stroke-width='0.4' opacity='0.10'%3E%3Cline x1='10' y1='0' x2='0' y2='30'/%3E%3Cline x1='40' y1='0' x2='0' y2='80'/%3E%3Cline x1='80' y1='0' x2='20' y2='120'/%3E%3Cline x1='120' y1='10' x2='60' y2='120'/%3E%3Cline x1='120' y1='50' x2='90' y2='120'/%3E%3C/g%3E%3C/svg%3E")`;

// Grain fin par-dessus tout
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.04'/%3E%3C/svg%3E")`;

export default function PageBackground({ children }) {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: "#7a3d1a" }}
    >
      {/* ── COUCHE 1 : image réelle (desktop uniquement) ── */}
      <div
        className="fixed inset-0 -z-30 hidden md:block"
        style={{
          backgroundImage: "url('/images/formations/bg-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      {/* ── COUCHE 2 : texture paille SVG (tous écrans) ── */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: STRAW_TEXTURE,
          backgroundSize: "120px 120px",
          backgroundRepeat: "repeat",
          // Sur mobile : fond de couleur chaud derrière la texture
          backgroundColor: "#8b4a1f",
        }}
        aria-hidden="true"
      />

      {/* ── COUCHE 3 : gradient chaud pour unifier et donner de la profondeur ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, rgba(90,30,8,0.72) 0%, rgba(60,20,5,0.55) 40%, rgba(100,45,10,0.78) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── COUCHE 4 : vignette (bords plus sombres) ── */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(20,5,0,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── COUCHE 5 : grain fin (par-dessus tout) ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: GRAIN,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.4,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Contenu */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
