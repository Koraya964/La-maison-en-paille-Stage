# La Maison en Paille — Site Next.js

Site public + dashboard admin pour André de Bouter.  
**Stack :** Next.js 14 · App Router · MySQL · JWT · Tailwind CSS · Vercel

---

## 📁 Structure du projet

```
la-maison-en-paille/
│
├── app/
│   ├── (public)/                   ← Pages du site public
│   │   ├── page.jsx                  → / (Accueil)
│   │   ├── formations/
│   │   │   ├── paille-terre-chaux/page.jsx
│   │   │   ├── poele-de-masse/page.jsx
│   │   │   └── photovoltaique/page.jsx
│   │   ├── actualites/page.jsx       → /actualites
│   │   ├── realisations/page.jsx     → /realisations
│   │   ├── ressources/page.jsx       → /ressources
│   │   ├── andre-de-bouter/page.jsx  → /andre-de-bouter
│   │   └── contact/page.jsx          → /contact
│   │
│   ├── (admin)/                    ← Pages protégées (JWT)
│   │   ├── login/page.jsx            → /login
│   │   └── dashboard/
│   │       ├── layout.jsx            (sidebar admin)
│   │       ├── page.jsx              → /dashboard
│   │       ├── actualites/           CRUD actualités
│   │       ├── stages/               CRUD stages
│   │       ├── inscriptions/         Gestion inscriptions
│   │       └── realisations/         Upload photos
│   │
│   ├── api/                        ← API Routes (back-end)
│   │   ├── auth/route.js             POST login / DELETE logout
│   │   ├── actualites/route.js       GET list · POST create
│   │   ├── actualites/[id]/route.js  GET · PUT · DELETE
│   │   ├── stages/route.js           GET list · POST create
│   │   ├── stages/[id]/route.js      GET · PUT · DELETE
│   │   ├── inscriptions/route.js     GET list · POST create
│   │   ├── inscriptions/[id]/route.js GET · PUT · DELETE
│   │   ├── realisations/route.js     GET list · POST upload
│   │   └── realisations/[id]/route.js GET · PUT · DELETE
│   │
│   ├── layout.jsx                  ← Layout global (Header + Footer)
│   ├── not-found.jsx               ← Page 404
│   ├── sitemap.js                  ← Génération sitemap.xml
│   └── robots.js                   ← Génération robots.txt
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx              ← Navigation principale (Client)
│   │   ├── Footer.jsx              ← Pied de page + newsletter
│   │   └── AdminSidebar.jsx        ← Menu latéral dashboard (Client)
│   └── admin/
│       ├── NewsForm.jsx            ← Formulaire créer/éditer actualité
│       ├── StageForm.jsx           ← Formulaire créer/éditer stage
│       ├── InscriptionTable.jsx    ← Tableau + actions inscriptions
│       └── PhotoUploader.jsx       ← Upload d'image avec aperçu
│
├── lib/
│   ├── db.js                       ← Pool MySQL + fonction query()
│   ├── auth.js                     ← signToken() + verifyToken()
│   └── uploadImage.js              ← saveImage() + isValidImage()
│
├── middleware.js                   ← Protection automatique /dashboard/*
├── scripts/
│   └── createAdmin.js              ← Générer le hash bcrypt du mot de passe
│
├── public/
│   └── images/
│       ├── realisations/           ← Photos uploadées par André
│       ├── stages/                 ← Photos des formations
│       └── logo/                   ← Logo et favicon
│
├── .env.local.example              ← Template variables d'environnement
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Démarrage rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.local.example .env.local
# Ouvrez .env.local et renseignez vos credentials MySQL + JWT_SECRET
```

### 3. Créer la base de données MySQL

Exécutez le schéma SQL complet (voir section [Base de données](#base-de-données)).

### 4. Créer le compte admin d'André

```bash
npm run create-admin
# Copiez le hash affiché et insérez-le en base de données
```

### 5. Lancer le serveur de développement

```bash
npm run dev
# → http://localhost:3000
# → http://localhost:3000/login  (dashboard admin)
```

---

## 🗄 Base de données

### Schéma SQL complet à exécuter

```sql
CREATE DATABASE IF NOT EXISTS la_maison_en_paille
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE la_maison_en_paille;

CREATE TABLE admin (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE formations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  titre       VARCHAR(255) NOT NULL,
  description TEXT,
  duree       VARCHAR(50),
  tarif       DECIMAL(8,2),
  hebergement BOOLEAN DEFAULT TRUE,
  repas       BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE stages (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  formation_id INT NOT NULL,
  date_debut   DATE NOT NULL,
  date_fin     DATE NOT NULL,
  places_total INT DEFAULT 10,
  places_dispo INT DEFAULT 10,
  statut       ENUM('ouvert','complet','liste_attente','annule') DEFAULT 'ouvert',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE
);

CREATE TABLE inscriptions (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  stage_id     INT NOT NULL,
  nom          VARCHAR(100) NOT NULL,
  prenom       VARCHAR(100) NOT NULL,
  email        VARCHAR(255) NOT NULL,
  telephone    VARCHAR(20),
  message      TEXT,
  statut       ENUM('en_attente','confirmee','annulee') DEFAULT 'en_attente',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (stage_id) REFERENCES stages(id) ON DELETE CASCADE
);

CREATE TABLE actualites (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titre       VARCHAR(255) NOT NULL,
  contenu     TEXT NOT NULL,
  image_url   VARCHAR(500),
  publie      BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE realisations (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titre       VARCHAR(255),
  description TEXT,
  image_url   VARCHAR(500) NOT NULL,
  categorie   ENUM('poele_de_masse','paille','autre') DEFAULT 'autre',
  ordre       INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Données initiales
INSERT INTO formations (slug, titre, duree, tarif) VALUES
  ('poele-de-masse',    'Poêle de Masse',          '3 jours', 380.00),
  ('paille-terre-chaux','Paille, Terre & Chaux',   '6 jours', 660.00),
  ('photovoltaique',    'Autonomie Photovoltaïque', '2 jours', NULL);
```

---

## 🔐 Authentification

Le dashboard est protégé par JWT via un cookie `httpOnly`.

**Flux :**
1. André saisit ses identifiants sur `/login`
2. `POST /api/auth` vérifie bcrypt → signe un token JWT 7 jours
3. Le token est stocké dans un cookie `httpOnly` (invisible au JS)
4. `middleware.js` vérifie ce token avant chaque requête vers `/dashboard/*`
5. Token invalide → redirection automatique vers `/login`

---

## 📡 API Reference

| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| POST | `/api/auth` | Public | Connexion admin |
| DELETE | `/api/auth` | Admin | Déconnexion |
| GET | `/api/actualites` | Public | Liste des actualités publiées |
| POST | `/api/actualites` | Admin | Créer une actualité |
| GET | `/api/actualites/[id]` | Public | Une actualité |
| PUT | `/api/actualites/[id]` | Admin | Modifier |
| DELETE | `/api/actualites/[id]` | Admin | Supprimer |
| GET | `/api/stages` | Public | Liste des stages |
| POST | `/api/stages` | Admin | Créer un stage |
| PUT | `/api/stages/[id]` | Admin | Modifier |
| DELETE | `/api/stages/[id]` | Admin | Supprimer |
| GET | `/api/inscriptions` | Admin | Liste des inscriptions |
| POST | `/api/inscriptions` | Public | Nouvelle inscription |
| PUT | `/api/inscriptions/[id]` | Admin | Changer statut |
| GET | `/api/realisations` | Public | Liste galerie |
| POST | `/api/realisations` | Admin | Upload photo |
| PUT | `/api/realisations/[id]` | Admin | Modifier infos |
| DELETE | `/api/realisations/[id]` | Admin | Supprimer |

---

## 🎨 Design System

**Palette :**
| Nom | Valeur | Usage |
|-----|--------|-------|
| `bois` | `#3d2b1f` | Fond sombre, textes titres |
| `terre` | `#8b6c47` | Couleur principale, CTAs |
| `paille` | `#c8a96e` | Accents, hover, highlights |
| `chaux` | `#f5f0e8` | Fonds clairs |
| `mousse` | `#5a6e4a` | Formation photovoltaïque |

**Typographie :**
- Titres : `Playfair Display` (serif élégant)
- Corps : `Lato` (lisibilité)

**Classes utilitaires custom :**
- `.btn-primary` — Bouton plein terre
- `.btn-outline` — Bouton bordure terre
- `.tag-label` — Badge catégorie

---

## 🚢 Déploiement sur Vercel

```bash
# 1. Pousser sur GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Connecter sur vercel.com → "Import Project"

# 3. Ajouter les variables d'environnement dans Vercel :
#    DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET, NEXT_PUBLIC_URL
```

> **Note :** Pour la base de données MySQL en production, utilisez [Railway](https://railway.app) ou [PlanetScale](https://planetscale.com) — tous deux proposent un plan gratuit.

---

## 🐛 Erreurs courantes

| Erreur | Cause probable | Solution |
|--------|---------------|----------|
| `JWT_SECRET is missing` | `.env.local` absent ou vide | Copier `.env.local.example` → `.env.local` |
| `Access denied for user` | Mauvais credentials MySQL | Vérifier `DB_USER` et `DB_PASSWORD` |
| `Cannot read properties of undefined` | Oubli de `await` sur `query()` | Ajouter `await` devant l'appel |
| `useState is not a function` | `'use client'` manquant | Ajouter `'use client'` en haut du fichier |
| Redirect loop sur `/login` | Cookie non posé / domaine | Vérifier `NODE_ENV` et `secure` du cookie |

---

*Projet réalisé dans le cadre du stage AFEC Angoulême 2026*  
*Stack : Next.js 14 · App Router · MySQL · JWT · Tailwind CSS · Vercel*
