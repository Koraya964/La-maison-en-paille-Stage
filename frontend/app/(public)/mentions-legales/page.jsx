export const metadata = {
  title: "Mentions légales | La Maison en Paille",
  description: "Mentions légales du site La Maison en Paille — André de Bouter",
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-[#ede8de] min-h-screen">
      {/* Hero */}
      <section className="bg-[#3d1a0e] px-8 pt-14 pb-12">
        <div className="max-w-[720px] mx-auto">
          <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-bold mb-3">
            Informations légales
          </p>
          <h1 className="font-['Fredericka_the_Great'] text-[clamp(2rem,5vw,3rem)] text-white font-normal leading-[1.15]">
            Mentions légales
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <div className="max-w-[720px] mx-auto px-8 py-16">
        {/* Éditeur */}
        <Section title="Éditeur du site">
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
        </Section>

        {/* Hébergement */}
        <Section title="Hébergement">
          <Row label="Hébergeur" value="Render Services, Inc." />
          <Row
            label="Adresse"
            value="525 Brannan St, Suite 300 — San Francisco, CA 94107 — États-Unis"
          />
          <Row label="Site web" value="www.render.com" />
        </Section>

        {/* Propriété intellectuelle */}
        <Section title="Propriété intellectuelle">
          <p className="text-[#6b5744] text-[0.9rem] leading-[1.8]">
            L'ensemble des contenus présents sur ce site (textes, photographies,
            illustrations, logos) est la propriété exclusive d'André de Bouter —
            La Maison en Paille, ou fait l'objet d'une autorisation
            d'utilisation. Toute reproduction, représentation, modification ou
            exploitation, totale ou partielle, de ces contenus est interdite
            sans autorisation préalable écrite.
          </p>
        </Section>

        {/* Données personnelles */}
        <Section title="Données personnelles">
          <p className="text-[#6b5744] text-[0.9rem] leading-[1.8] mb-4">
            Les informations collectées via les formulaires de ce site
            (inscription aux stages, envoi de photo) sont utilisées uniquement
            dans le cadre de la gestion des formations et de la galerie. Elles
            ne sont ni cédées, ni vendues à des tiers.
          </p>
          <p className="text-[#6b5744] text-[0.9rem] leading-[1.8]">
            Conformément à la loi Informatique et Libertés du 6 janvier 1978
            modifiée et au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d'un droit d'accès, de rectification et de
            suppression de vos données. Pour exercer ce droit, contactez :{" "}
            <span className="text-[#c06030]">contact@lamaisonenpaille.com</span>
          </p>
        </Section>

        {/* Cookies */}
        <Section title="Cookies">
          <p className="text-[#6b5744] text-[0.9rem] leading-[1.8]">
            Ce site utilise un cookie de session sécurisé uniquement pour
            l'authentification de l'espace administration. Aucun cookie
            publicitaire ou de traçage n'est utilisé. Aucune donnée n'est
            transmise à des régies publicitaires.
          </p>
        </Section>

        {/* Responsabilité */}
        <Section title="Responsabilité">
          <p className="text-[#6b5744] text-[0.9rem] leading-[1.8]">
            André de Bouter s'efforce de maintenir les informations publiées sur
            ce site à jour et exactes. Toutefois, il ne peut être tenu
            responsable des erreurs ou omissions, ni des dommages résultant de
            l'utilisation des informations contenues sur ce site. Les dates et
            tarifs des stages sont susceptibles d'évoluer — toute inscription
            fait l'objet d'une confirmation par email.
          </p>
        </Section>

        {/* Conception */}
        <Section title="Conception & développement">
          <Row
            label="Développeurs"
            value="Julien Raynaud & Evangeline Herbrik"
          />
          <Row label="Formation" value="Stage AFEC Angoulême — 2026" />
          <Row
            label="Stack technique"
            value="Next.js 14 · Express · MySQL · Render"
          />
        </Section>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-[#e2dbd0] text-center">
          <p className="text-[#c8bfb0] text-[10px] tracking-[0.2em] uppercase">
            La Maison en Paille · Mosnac-Saint-Simeux · Charente
          </p>
        </div>
      </div>
    </div>
  );
}

// Composant section
function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="font-['Fredericka_the_Great'] text-[1.4rem] text-[#3d1a0e] font-normal mb-5 pb-3 border-b border-[#e2dbd0]">
        {title}
      </h2>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </section>
  );
}

// Composant ligne
function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 py-[10px] border-b border-[#f0ede6]">
      <span className="text-[9px] tracking-[0.18em] uppercase font-bold text-[#c8bfb0] pt-[2px]">
        {label}
      </span>
      <span className="text-[0.9rem] text-[#3d1a0e] leading-[1.6]">
        {value}
      </span>
    </div>
  );
}
