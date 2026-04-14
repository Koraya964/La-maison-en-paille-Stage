import "./globals.css";
import Header from "@/frontend/components/layout/Header";
import Footer from "@/frontend/components/layout/Footer";

export const metadata = {
  title: {
    default:
      "La Maison en Paille — Formations : Paille Terre Chaux / Poêle de masse",
    template: "%s | La Maison en Paille",
  },
  description:
    "Formations en construction naturelle animées par André de Bouter depuis 25 ans. Charente (16).",
  metadataBase: new URL("https://www.lamaisonenpaille.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
