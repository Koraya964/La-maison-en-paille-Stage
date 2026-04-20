import { Inscription } from '../lib/models/Inscription.js';
import {
  sendMailInscriptionRecue,
  sendMailConfirmee,
  sendMailAnnulee,
  sendMailListeAttente,
} from '../lib/mails/inscriptionMails.js';

const STATUTS_VALIDES = ['en_attente', 'confirmee', 'annulee', 'liste_attente'];

const MAIL_PAR_STATUT = {
  confirmee: sendMailConfirmee,
  annulee: sendMailAnnulee,
  liste_attente: sendMailListeAttente,
  en_attente: null,
};

// Vérifie le token hCaptcha auprès de l'API hCaptcha

async function verifyHcaptcha(token) {
  const res = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET,
      response: token,
    }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function getByStage(req, res) {
  try {
    const rows = await Inscription.findConfirmedByStage(req.params.stage_id);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/inscriptions — toutes (dashboard uniquement)
export async function getAll(_req, res) {
  try {
    const rows = await Inscription.findAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// GET /api/inscriptions/:id
export async function getById(req, res) {
  try {
    const row = await Inscription.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Non trouvé' });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// POST /api/inscriptions — formulaire public
export async function create(req, res) {
  try {
    const {
      stage_id, nom, prenom, email, telephone, message, hcaptchaToken,
      adresse, city, cedex,
      is_entreprise,
      siret, entreprise_name, entreprise_quality,
      entreprise_email, entreprise_telephone,
      entreprise_adress, entreprise_cedex, entreprise_city,
    } = req.body;

    // 1. Validation des champs requis
    if (!stage_id || !nom || !prenom || !email) {
      return res.status(400).json({ error: 'stage_id, nom, prenom et email sont requis' });
    }

    // 2. Vérification hCaptcha
    if (!hcaptchaToken) {
      return res.status(400).json({ error: 'Vérification anti-bot manquante' });
    }
    const captchaOk = await verifyHcaptcha(hcaptchaToken);
    if (!captchaOk) {
      return res.status(400).json({ error: 'Vérification anti-bot échouée' });
    }

    // 3. Création en BDD
    const id = await Inscription.create({
      stage_id, nom, prenom, email, telephone, message,
      adresse, city, cedex,
      is_entreprise: is_entreprise ?? false,
      siret, entreprise_name, entreprise_quality,
      entreprise_email, entreprise_telephone,
      entreprise_adress, entreprise_cedex, entreprise_city,
    });

    // 4. Récupérer l'inscription complète pour le mail (avec formation_titre et dates)
    const inscription = await Inscription.findById(id);

    // 5. Mail de confirmation asynchrone (n'impacte pas la réponse)
    if (inscription) {
      sendMailInscriptionRecue(inscription).catch((err) =>
        console.error('Erreur envoi mail inscription reçue :', err)
      );
    }

    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(err.status ?? 500).json({ error: err.message ?? 'Erreur serveur' });
  }
}

// PUT /api/inscriptions/:id — changer le statut (dashboard)
export async function update(req, res) {
  try {
    const { statut } = req.body;

    if (!STATUTS_VALIDES.includes(statut)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }

    const inscription = await Inscription.findById(req.params.id);
    if (!inscription) {
      return res.status(404).json({ error: 'Non trouvé' });
    }

    await Inscription.updateStatut(req.params.id, statut);

    const sendMail = MAIL_PAR_STATUT[statut];
    if (sendMail) {
      sendMail(inscription).catch((err) =>
        console.error(`Erreur envoi mail (statut: ${statut}) :`, err)
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

// DELETE /api/inscriptions/:id
export async function remove(req, res) {
  try {
    await Inscription.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}