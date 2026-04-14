/**
 * Fond texturé paille utilisé sur toutes les pages publiques.
 * backgroundAttachment: fixed ne fonctionne pas sur iOS Safari.
 * Solution : image fixe via position:fixed sur desktop, fond uni couleur sur mobile.
 */
export default function PageBackground({ children }) {
  return (
    <div className="relative min-h-screen bg-[#c8824a]">
      {/* Image fixe desktop uniquement */}
      <div
        className="fixed inset-0 -z-10 hidden md:block"
        style={{
          backgroundImage: "url('/images/formations/bg-texture.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-[#c8824a]/55 hidden md:block" />
      {children}
    </div>
  )
}
