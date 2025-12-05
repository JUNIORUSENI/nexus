# 🦎 Le Nexus Connecté — Formulaire Augmenté

> **Défi "Formulaire Augmenté"** — Nuit de l'Info 2025 | SFEIR

Un portail interactif propulsé par **Gemini AI** qui génère des réponses personnalisées et uniques pour chaque utilisateur.

## ✨ Fonctionnalités

### 🎯 4 Missions Disponibles
| Mission | Description | Champs Spécifiques |
|---------|-------------|-------------------|
| 📞 Contact | Envoyer un message | Nom, Email, Message |
| 💎 Don | Faire une contribution | Montant, Fréquence (unique/mensuel) |
| 🛡️ Bénévolat | Rejoindre l'équipe | Compétences, Disponibilité |
| ❓ Infos | Poser une question | Message libre |

### 🤖 Intégration Gemini AI
- **Réponses personnalisées** générées en temps réel
- **Effet machine à écrire** montrant l'IA en action
- **Prophétie mystique** unique pour chaque soumission
- **Nom de projet annuel** généré dynamiquement

### 🎨 Design Futuriste
- Thème cyberpunk avec particules animées
- Interface responsive (mobile/desktop)
- Animations fluides et modernes

---

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/JUNIORUSENI/nexus.git
cd nexus

# Installer les dépendances
npm install

# Configurer l'API Gemini
echo "API_KEY=ta-clé-gemini-ici" > .env.local

# Lancer en développement
npm run dev
```

## 📦 Déploiement Production

```bash
# Build de production
npm run build

# Preview local
npm run preview
```

Le dossier `dist/` contient les fichiers statiques à déployer.

### Déploiement Vercel (recommandé)
```bash
npx vercel --prod
```

### Variables d'Environnement
| Variable | Description |
|----------|-------------|
| `API_KEY` | Clé API Gemini (obligatoire pour l'IA) |

---

## 🏗️ Architecture

```
le-nexus-connecté/
├── components/
│   ├── Layout.tsx           # Layout principal
│   ├── MissionSelector.tsx  # Sélection de mission
│   ├── DynamicForm.tsx      # Formulaire adaptatif
│   ├── ConfirmationEcho.tsx # Page de confirmation IA
│   ├── AxolotlAvatar.tsx    # Avatar animé
│   └── ParticleBackground.tsx # Fond de particules
├── services/
│   └── geminiService.ts     # Intégration Gemini AI
├── App.tsx                  # Composant racine
├── types.ts                 # Types TypeScript
└── index.html               # Point d'entrée
```

---

## 🔮 Nombre de Possibilités de Réponses

Avec l'IA Gemini, le nombre de réponses possibles est **virtuellement infini**:

- **4 types de missions** × **∞ variations IA** = Réponses uniques
- Chaque soumission génère:
  - 1 message personnalisé (50-60 mots)
  - 1 nom de projet créatif
  - 1 prophétie mystique
  - 1 emoji d'humeur

Sans IA (mode fallback): **4 réponses prédéfinies** (une par mission)

---

## 🌊 Thème Nuit de l'Info 2025

Le formulaire intègre le thème de l'année via:
- Mention de l'année **{currentYear}** dans les réponses
- Projet annuel généré dynamiquement
- Prophéties liées au parcours de l'utilisateur

---

## 🛠️ Technologies

- **React 19** + TypeScript
- **Vite** — Build ultra-rapide
- **Tailwind CSS** — Styling
- **Gemini AI** — Génération de contenu

---

## 👥 Équipe

Développé pour le défi **SFEIR "Formulaire Augmenté"** lors de la **Nuit de l'Info 2025**.

---

## 📄 Licence

MIT © 2025
