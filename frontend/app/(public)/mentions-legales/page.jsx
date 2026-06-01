export const metadata = {
  title: "Mentions légales | La Maison en Paille",
  description: "Mentions légales du site La Maison en Paille — André de Bouter",
};

export default function MentionsLegalesPage() {
  return (
    <div style={{ backgroundColor: "#ede8de", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section
        style={{ backgroundColor: "#3d1a0e", padding: "56px 32px 48px" }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Informations légales
          </p>
          <h1
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "white",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Mentions légales
          </h1>
        </div>
      </section>

      {/* ── Contenu ── */}
      <div
        style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 32px" }}
      >
        {/* Éditeur */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "1.4rem",
              color: "#3d1a0e",
              fontWeight: 400,
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e2dbd0",
            }}
          >
            Éditeur du site
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Row label="Nom" value="André de Bouter" />
            <Row
              label="Activité"
              value="Organisme de formation — construction en paille, poêle de masse, enduits terre et chaux"
            />
            <Row
              label="Adresse"
              value="21, rue des Chaumes — Les Pellières — 16120 Mosnac-Saint-Simeux"
            />
            <Row label="Téléphone" value="05 45 66 27 68" />
            <Row label="Email" value="contact@lamaisonenpaille.com" />
            <Row label="Site web" value="www.lamaisonenpaille.com" />
          </div>
        </section>

        {/* Hébergement */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "1.4rem",
              color: "#3d1a0e",
              fontWeight: 400,
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e2dbd0",
            }}
          >
            Hébergement
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Row label="Hébergeur" value="Render Services, Inc." />
            <Row
              label="Adresse"
              value="525 Brannan St, Suite 300 — San Francisco, CA 94107 — États-Unis"
            />
            <Row label="Site web" value="www.render.com" />
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "1.4rem",
              color: "#3d1a0e",
              fontWeight: 400,
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e2dbd0",
            }}
          >
            Propriété intellectuelle
          </h2>
          <p style={{ color: "#6b5744", fontSize: "0.9rem", lineHeight: 1.8 }}>
            L'ensemble des contenus présents sur ce site (textes, photographies,
            illustrations, logos) est la propriété exclusive d'André de Bouter —
            La Maison en Paille, ou fait l'objet d'une autorisation
            d'utilisation. Toute reproduction, représentation, modification ou
            exploitation, totale ou partielle, de ces contenus est interdite
            sans autorisation préalable écrite.
          </p>
        </section>

        {/* Données personnelles */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "1.4rem",
              color: "#3d1a0e",
              fontWeight: 400,
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e2dbd0",
            }}
          >
            Données personnelles
          </h2>
          <p
            style={{
              color: "#6b5744",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              marginBottom: "16px",
            }}
          >
            Les informations collectées via les formulaires de ce site
            (inscription aux stages, envoi de photo) sont utilisées uniquement
            dans le cadre de la gestion des formations et de la galerie. Elles
            ne sont ni cédées, ni vendues à des tiers.
          </p>
          <p style={{ color: "#6b5744", fontSize: "0.9rem", lineHeight: 1.8 }}>
            Conformément à la loi Informatique et Libertés du 6 janvier 1978
            modifiée et au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d'un droit d'accès, de rectification et de
            suppression de vos données. Pour exercer ce droit, contactez :{" "}
            <span style={{ color: "#c06030" }}>
              contact@lamaisonenpaille.com
            </span>
          </p>
        </section>

        {/* Cookies */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "1.4rem",
              color: "#3d1a0e",
              fontWeight: 400,
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e2dbd0",
            }}
          >
            Cookies
          </h2>
          <p style={{ color: "#6b5744", fontSize: "0.9rem", lineHeight: 1.8 }}>
            Ce site utilise un cookie de session sécurisé uniquement pour
            l'authentification de l'espace administration. Aucun cookie
            publicitaire ou de traçage n'est utilisé. Aucune donnée n'est
            transmise à des régies publicitaires.
          </p>
        </section>

        {/* Responsabilité */}
        <section>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "1.4rem",
              color: "#3d1a0e",
              fontWeight: 400,
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e2dbd0",
            }}
          >
            Responsabilité
          </h2>
          <p style={{ color: "#6b5744", fontSize: "0.9rem", lineHeight: 1.8 }}>
            André de Bouter s'efforce de maintenir les informations publiées sur
            ce site à jour et exactes. Toutefois, il ne peut être tenu
            responsable des erreurs ou omissions, ni des dommages résultant de
            l'utilisation des informations contenues sur ce site. Les dates et
            tarifs des stages sont susceptibles d'évoluer — toute inscription
            fait l'objet d'une confirmation par email.
          </p>
        </section>

        {/* Développement */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "'Fredericka the Great', serif",
              fontSize: "1.4rem",
              color: "#3d1a0e",
              fontWeight: 400,
              marginBottom: "20px",
              paddingBottom: "12px",
              borderBottom: "1px solid #e2dbd0",
            }}
          >
            Conception & développement
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Row
              label="Développeurs"
              value="Julien Raynaud & Evangeline Herbrik"
            />
            <Row label="Formation" value="Stage AFEC Angoulême — 2026" />
            <Row
              label="Stack technique"
              value="Next.js 14 · Express · MySQL · Render"
            />
          </div>
        </section>

        {/* Footer */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "24px",
            borderTop: "1px solid #e2dbd0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#c8bfb0",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            La Maison en Paille · Mosnac-Saint-Simeux · Charente
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Composant ligne ──
function Row({ label, value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: "16px",
        padding: "10px 0",
        borderBottom: "1px solid #f0ede6",
      }}
    >
      <span
        style={{
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#c8bfb0",
          paddingTop: "2px",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "0.9rem", color: "#3d1a0e", lineHeight: 1.6 }}>
        {value}
      </span>
    </div>
  );
}
