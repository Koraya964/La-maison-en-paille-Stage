# La Maison en Paille — Backend Express

API REST Node.js / Express pour le site La Maison en Paille.

## Stack

- **Node.js** >= 18
- **Express** 4
- **MySQL 2** (pool de connexions)
- **JWT** (jsonwebtoken + bcryptjs)

---

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Copier et remplir le fichier d'environnement
cp .env.example .env
# → éditer .env avec vos valeurs

# 3. Créer la BDD MySQL (schéma dans le guide du projet)

# 4. Générer le hash du mot de passe admin
node scripts/createAdmin.js
# → copier la requête SQL affichée et l'exécuter en BDD

# 5. Démarrer en développement
npm run dev
```

Le serveur démarre sur **http://localhost:4000**.

---

## Routes disponibles

### Auth
| Méthode | URL | Accès |
|---------|-----|-------|
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Public |

### Actualités
| Méthode | URL | Accès |
|---------|-----|-------|
| GET | `/api/actualites` | Public (publiées) |
| GET | `/api/actualites/all` | 🔒 Admin |
| GET | `/api/actualites/:id` | Public |
| POST | `/api/actualites` | 🔒 Admin |
| PUT | `/api/actualites/:id` | 🔒 Admin |
| DELETE | `/api/actualites/:id` | 🔒 Admin |

### Stages
| Méthode | URL | Accès |
|---------|-----|-------|
| GET | `/api/stages` | Public |
| GET | `/api/stages/all` | 🔒 Admin |
| GET | `/api/stages/:id` | Public |
| POST | `/api/stages` | 🔒 Admin |
| PUT | `/api/stages/:id` | 🔒 Admin |
| DELETE | `/api/stages/:id` | 🔒 Admin |

### Inscriptions
| Méthode | URL | Accès |
|---------|-----|-------|
| GET | `/api/inscriptions` | 🔒 Admin |
| GET | `/api/inscriptions/:id` | 🔒 Admin |
| POST | `/api/inscriptions` | Public (formulaire) |
| PUT | `/api/inscriptions/:id` | 🔒 Admin |
| DELETE | `/api/inscriptions/:id` | 🔒 Admin |

### Réalisations
| Méthode | URL | Accès |
|---------|-----|-------|
| GET | `/api/realisations` | Public |
| GET | `/api/realisations/:id` | Public |
| POST | `/api/realisations` | 🔒 Admin |
| PUT | `/api/realisations/:id` | 🔒 Admin |
| DELETE | `/api/realisations/:id` | 🔒 Admin |

---

## Authentification

Les routes 🔒 Admin nécessitent un token JWT valide, passé :
- en **cookie httpOnly** `auth_token` (posé automatiquement par `/api/auth/login`)
- ou en header `Authorization: Bearer <token>`

---

## Déploiement

Déployez sur **Railway** ou **Render** (gratuit) :

1. Pusher sur GitHub
2. Connecter le repo sur railway.app ou render.com
3. Ajouter les variables d'environnement (identiques à `.env`)
4. Mettre à jour `NEXT_PUBLIC_API_URL` sur Vercel avec l'URL de prod
