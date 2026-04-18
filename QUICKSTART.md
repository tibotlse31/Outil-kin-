# ⚡ Quick Start - VPPB Simulator

## Installation en 30 secondes

### Option 1️⃣: Direct (Recommandé)

1. **Télécharger les fichiers**
   - `vppb-simulator.html` (fichier principal)
   - Dossier `js/` avec les 3 fichiers JavaScript

2. **Ouvrir dans le navigateur**
   ```bash
   # Simplement double-cliquer sur vppb-simulator.html
   # OU utiliser un serveur local:
   python -m http.server 8000
   # Puis ouvrir http://localhost:8000
   ```

3. **C'est prêt!** 🎉

---

### Option 2️⃣: GitHub (Pour déploiement)

```bash
# Cloner le repository
git clone https://github.com/YOUR_USERNAME/vppb-simulator.git
cd vppb-simulator

# Serveur local
python -m http.server 8000

# Ou avec Node
npx http-server
```

---

## Structure des fichiers

```
vppb-simulator/
├── vppb-simulator.html        ← Ouvrir ce fichier
├── js/
│   ├── simulator.js           ← Logique principale
│   ├── visualization.js       ← Rendu 2D
│   └── analysis.js            ← Analyse nystagmus
├── README.md                  ← Documentation complète
├── DEPLOYMENT.md              ← Déploiement GitHub/Netlify
├── TECHNICAL.md               ← Documentation technique
└── package.json               ← Métadonnées projet
```

**Important:** Les fichiers JS doivent être dans le dossier `js/` !

---

## Utilisation rapide

### 1️⃣ Sélectionner un canal
```
Boutons en haut:
- Canal postérieur (90%) ← Le plus fréquent
- Canal horizontal (9%)
- Canal antérieur (1%)
```

### 2️⃣ Choisir une manoeuvre
```
Exemple pour canal postérieur:
- Manoeuvre d'Epley
- Manoeuvre de Sémont
- Exercices Brandt & Daroff
```

### 3️⃣ Animer et observer
```
- Slider: Contrôle manuel (0-100%)
- Jouer: Animation automatique
- Pause/Réinitialiser: Contrôles
```

### 4️⃣ Analyser les résultats
```
Tab "Analyse":
- Latence (sec)
- Direction (géotropique/agéotropique)
- Amplitude (degrés)
- Mouvement oculaire
- Interprétation clinique
```

---

## Fonctionnalités principales

### 🎯 Visualisation 3D du labyrinthe
- **Canal postérieur**: Demi-cercle avec ampoule à droite
- **Canal horizontal**: Ellipse avec ampules droite/gauche
- **Canal antérieur**: Demi-cercle avec ampoule à gauche

### 🧬 Animation des cristaux
- Position/vélocité en temps réel
- Trace du mouvement
- Endolymphe en motion

### 📊 Analyse du nystagmus
- Mesures objectives
- Interprétation automatique
- Recommandations cliniques

### ⚠️ Points d'alerte
- Nystagmus atypique?
- Dissociation signes/symptômes?
- → IRM urgente!

---

## Troubleshooting rapide

### Canvas vide?
✓ Vérifier que les fichiers JS sont dans `js/`
✓ Vérifier console (F12) pour erreurs
✓ Utiliser serveur local, pas fichier:// direct

### Manoeuvres ne s'affichent pas?
✓ Vérifier que simulateur est chargé (attendre 1-2 sec)
✓ Rafraîchir la page (Ctrl+F5)
✓ Vérifier console (F12)

### Performance lente?
✓ Fermer autres onglets/apps
✓ Réduire vitesse animation (slider vitesse)
✓ Utiliser navigateur moderne (Chrome, Firefox)

---

## Déployer sur GitHub Pages

```bash
# 1. Créer repo sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/vppb-simulator.git
git push -u origin main

# 2. Settings → Pages → Source: main branch
# 3. Attendre quelques minutes
# 4. Site live à: https://USERNAME.github.io/vppb-simulator/
```

---

## Cas d'usage

### 👨‍🎓 Étudiants en vestibulologie
```
→ Apprendre l'anatomie du labyrinthe
→ Comprendre les lois d'Ewald
→ Maîtriser les manoeuvres
→ Pratiquer avant ses patients
```

### 👨‍⚕️ Cliniciens expérimentés
```
→ Rafraîchir ses connaissances
→ Entraîner l'oeil au diagnostic
→ Discuter cas complexes
```

### 🏥 Formateurs/Présentateurs
```
→ Support de présentation
→ Démonstration interactive
→ Explication aux patients
```

---

## Améliorations futures

- [ ] 3D WebGL (Three.js)
- [ ] Modes examen avec QCM
- [ ] Export PDF des cas
- [ ] Mode multiplayer
- [ ] Application mobile

---

## Support

**Erreur?** → Vérifier la console (F12)
**Question?** → GitHub Issues
**Contribution?** → Fork + Pull Request

---

## Vous êtes prêt! 🚀

Ouvrez `vppb-simulator.html` et commencez à explorer la VPPB de manière interactive!

**Bon apprentissage!** 🧬

---

**Besoin de plus?**
- README.md → Documentation complète
- TECHNICAL.md → Architecture et API
- DEPLOYMENT.md → Déployer en production
