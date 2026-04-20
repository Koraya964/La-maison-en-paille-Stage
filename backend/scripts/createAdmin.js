/**
 * scripts/createAdmin.js
 *
 * À exécuter UNE SEULE FOIS pour générer le hash du mot de passe d'André.
 * Le hash obtenu doit être inséré directement en BDD dans la table `admin`.
 *
 * Usage :
 *   node scripts/createAdmin.js
 */

import argon2 from 'argon2';

const MOT_DE_PASSE = 'Testtest12345';

const hash = await argon2.hash(MOT_DE_PASSE);

console.log('Hash argon2 à insérer en BDD :');
console.log(hash);
console.log('Requête SQL :');
console.log(`INSERT INTO admin (email, password) VALUES ('andre@lamaisonenpaille.com', '${hash}');`);
