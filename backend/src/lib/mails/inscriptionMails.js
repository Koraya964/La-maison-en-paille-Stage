import { transporter } from '../mailer.js';

const FROM = process.env.MAIL_FROM;

function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
    });
}

function baseInfo(inscription) {
    return `
    <p>Formation : <strong>${inscription.formation_titre}</strong></p>
    <p>Dates : du <strong>${formatDate(inscription.date_debut)}</strong> au <strong>${formatDate(inscription.date_fin)}</strong></p>
  `;
}

function wrap(content) {
    return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #3d2b1f;">
      <div style="background: #3d2b1f; padding: 24px 32px;">
        <h1 style="color: white; margin: 0; font-size: 20px; font-weight: normal; letter-spacing: 0.05em;">
          La Maison en Paille
        </h1>
      </div>
      <div style="padding: 32px; background: #fffdf9; border: 1px solid #f0e8d8; border-top: none;">
        ${content}
        <hr style="border: none; border-top: 1px solid #f0e8d8; margin: 32px 0;" />
        <p style="font-size: 12px; color: #9a8878;">
          La Maison en Paille — André de Bouter<br />
          Pour toute question : <a href="mailto:${process.env.MAIL_USER}" style="color: #8b6c47;">${process.env.MAIL_USER}</a>
        </p>
      </div>
    </div>
  `;
}

//Envoyé automatiquement dès la soumission du formulaire

export async function sendMailInscriptionRecue(inscription) {
    await transporter.sendMail({
        from: FROM,
        to: inscription.email,
        subject: `Demande d'inscription reçue — ${inscription.formation_titre}`,
        html: wrap(`
      <p>Bonjour <strong>${inscription.prenom}</strong>,</p>
      <p>Nous avons bien reçu votre demande d'inscription. Nous l'étudions et vous répondrons dans les meilleurs délais.</p>
      ${baseInfo(inscription)}
      <p>Merci de votre intérêt pour nos formations.</p>
      <p>À bientôt,<br/>André de Bouter</p>
    `),
    });
}

//Envoyés par André depuis le dashboard

export async function sendMailConfirmee(inscription) {
    await transporter.sendMail({
        from: FROM,
        to: inscription.email,
        subject: `Inscription confirmée — ${inscription.formation_titre}`,
        html: wrap(`
      <p>Bonjour <strong>${inscription.prenom}</strong>,</p>
      <p>Votre inscription a bien été <strong>confirmée</strong>. Nous avons hâte de vous accueillir !</p>
      ${baseInfo(inscription)}
      <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
      <p>À très bientôt,<br/>André de Bouter</p>
    `),
    });
}

export async function sendMailAnnulee(inscription) {
    await transporter.sendMail({
        from: FROM,
        to: inscription.email,
        subject: `Inscription annulée — ${inscription.formation_titre}`,
        html: wrap(`
      <p>Bonjour <strong>${inscription.prenom}</strong>,</p>
      <p>Votre inscription a malheureusement été <strong>annulée</strong>.</p>
      ${baseInfo(inscription)}
      <p>N'hésitez pas à nous contacter pour plus d'informations ou pour vous inscrire à une prochaine session.</p>
      <p>Cordialement,<br/>André de Bouter</p>
    `),
    });
}

export async function sendMailListeAttente(inscription) {
    await transporter.sendMail({
        from: FROM,
        to: inscription.email,
        subject: `Liste d'attente — ${inscription.formation_titre}`,
        html: wrap(`
      <p>Bonjour <strong>${inscription.prenom}</strong>,</p>
      <p>Le stage affiche complet pour le moment. Votre demande a été placée en <strong>liste d'attente</strong>.</p>
      ${baseInfo(inscription)}
      <p>Nous vous contacterons dès qu'une place se libère.</p>
      <p>Cordialement,<br/>André de Bouter</p>
    `),
    });
}