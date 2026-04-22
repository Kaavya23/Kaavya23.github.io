# 🌸 Portfolio — Kaavya Suppiah

Portfolio personnel de Kaavya Suppiah, Développeuse Power Platform & Big Data / IA.

## ✨ Features

- Design lilas/mauve élégant avec palette cohérente
- Curseur personnalisé avec traîne animée
- **Plumes blanches** qui s'envolent au clic (canvas particles)
- Animations d'entrée au scroll (reveal)
- Effet de tilt 3D sur les cartes projets
- Effet magnétique sur les cartes de contact
- Compteurs animés pour les statistiques
- Orbes parallax qui suivent la souris
- Navigation sticky responsive avec menu hamburger
- Totalement responsive (mobile, tablette, desktop)
- Déployable sur GitHub Pages (site statique pur HTML/CSS/JS)

## 📁 Structure

```
portfolio-kaavya/
├── index.html
├── css/
│   ├── style.css        # Styles principaux + tokens CSS
│   └── animations.css   # Keyframes & animations
├── js/
│   ├── feathers.js      # Système de plumes (canvas)
│   ├── animations.js    # Scroll reveal + compteurs
│   └── main.js          # Curseur, nav, interactions
└── README.md
```

## 🚀 Déploiement sur GitHub Pages

### Option 1 — GitHub Pages (recommandé, gratuit)

1. Crée un dépôt GitHub, par exemple `kaavya-portfolio`
2. Clone ou initialise le repo en local :
   ```bash
   git init
   git remote add origin https://github.com/TON-USERNAME/kaavya-portfolio.git
   ```
3. Copie tous les fichiers dans le dossier du repo
4. Pousse le code :
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git push -u origin main
   ```
5. Dans les **Settings** du repo → **Pages** → Source: `Deploy from branch` → Branch: `main` → `/root`
6. Ton portfolio sera live sur : `https://TON-USERNAME.github.io/kaavya-portfolio/`

### Option 2 — Domaine personnalisé

Ajoute un fichier `CNAME` à la racine avec ton domaine :
```
kaavya.dev
```

## 🎨 Personnalisation

Les couleurs sont toutes définies en variables CSS dans `css/style.css` (`:root` block).
Pour changer la palette, modifie simplement les variables `--lilac-*` et `--mauve-*`.

## 📦 Dépendances

Aucune dépendance npm. Polices chargées via Google Fonts :
- **Syne** (titres)
- **Cormorant Garamond** (corps)
- **DM Mono** (labels, badges)

---

Fait avec 💜 par Kaavya Suppiah
