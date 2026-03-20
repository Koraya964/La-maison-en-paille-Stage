/**
 * Script à exécuter UNE SEULE FOIS pour créer le compte admin d'André.
 *
 * Usage :
 *   node scripts/createAdmin.js
 *
 * Puis copiez le hash affiché et insérez-le dans la base de données :
 *   INSERT INTO admin (email, password) VALUES ('andre@lamaisonenpaille.com', 'HASH_ICI');
 */

const argon2 = require('argon2')

const MOT_DE_PASSE = 'ChangezMoiAbsolument2026!'

async function main() {
  const hash = await argon2.hash(MOT_DE_PASSE)
  console.log('\n✅ Hash argon2 généré :')
  console.log(hash)
  console.log('\nInsérez cette ligne en base de données :')
  console.log(`INSERT INTO admin (email, password) VALUES ('andre@lamaisonenpaille.com', '${hash}');`)
  console.log('\n⚠️  Pensez à changer le mot de passe dans ce script avant de l\'exécuter !\n')
}

main()
