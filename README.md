# 🧬 VPPB Simulator - Outil Pédagogique Interactif

Un simulateur web interactif et éducatif pour comprendre et maîtriser le Vertige Paroxystique Positionnel Bénin (VPPB) en 3D avec visualisation biomécanique complète.

**Démo live:** [VPPB Simulator](https://ton-username.github.io/vppb-simulator/)

---

## 📋 Table des matières

- [Caractéristiques](#-caractéristiques)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Architecture](#-architecture)
- [Physiopathologie](#-physiopathologie-simulée)
- [Contenu Clinique](#-contenu-clinique)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

---

## ✨ Caractéristiques

### 🎯 Visualisation 3D interactive
- **Visualisation en 2D des canaux semi-circulaires** (postérieur, horizontal, antérieur)
- **Simulation du mouvement des otholites** (cristaux) en temps réel
- **Affichage dynamique de l'endolymphe** et de la cupule
- **Trace du mouvement** des cristaux pendant les manoeuvres

### 🎮 Contrôles des manoeuvres
- **Manoeuvre d'Epley** - Rotations progressives (canal postérieur)
- **Manoeuvre de Sémont** - Basculement 180° (alternative canal postérieur)
- **Barbecue (Lempert)** - Rotations 360° (canal horizontal géotropique)
- **Gufoni 3G & 3A** - Manoeuvres adaptées (canal horizontal)
- **Yacovino** - Pour canal antérieur
- Slider de progression et animation fluide

### 📊 Analyse du nystagmus
- **Mesure en temps réel:**
  - Latence d'apparition
  - Direction et type (torsionnel, horizontal, vertical)
  - Amplitude et fréquence
  - Fatigabilité
- **Visualisation du mouvement oculaire** (eye movement display)
- **Interprétation automatique** des résultats

### 🔬 Tests diagnostiques
- **Dix-Hallpike** (canal postérieur)
- **BOW and LEAN test** (canal horizontal)
- **Supine Roll Test** (canal horizontal)
- **Deep Head Hanging** (canal antérieur)
- Chaque test avec animation et interprétation

### 📚 Contenu clinique intégré
- Descriptions complètes des canaux (symptômes, fréquence, évolution)
- Propriétés du nystagmus pour chaque canal
- Points d'alerte cliniques
- Recommandations thérapeutiques
- Données de pronostic et récurrence

---

## 🚀 Installation

### Option 1: Utiliser directement le fichier HTML

Téléchargez simplement le fichier et ouvrez-le dans votre navigateur:

```bash
git clone https://github.com/ton-username/vppb-simulator.git
cd vppb-simulator
# Ouvrir index.html dans le navigateur
```

### Option 2: Serveur local (recommandé)

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis visitez `http://localhost:8000`

### Option 3: GitHub Pages

1. Fork ce repository
2. Accédez aux **Settings** → **Pages**
3. Sélectionnez `main` comme source
4. Votre site sera disponible à `https://ton-username.github.io/vppb-simulator/`

---

## 📖 Utilisation

### Workflow basique

1. **Sélectionner le canal** atteint (postérieur, horizontal, antérieur)
   - Les informations sur le canal s'affichent automatiquement
   - La visualisation du labyrinthe s'adapte

2. **Visualiser la manoeuvre**
   - Choisir la manoeuvre appropriée au canal
   - Observer l'animation et le mouvement des cristaux
   - Ajuster la vitesse avec le slider de vitesse

3. **Animer la manoeuvre**
   - Bouton **Jouer** pour lancer l'animation
   - Slider de progression pour contrôler manuellement
   - Observer en temps réel le nystagmus simulé

4. **Analyser les résultats**
   - Tab "Analyse" montre les mesures (latence, amplitude, direction)
   - Visualisation du mouvement oculaire
   - Interprétation clinique automatique

5. **Tester les diagnostics**
   - Tab "Test diagnostic" pour reproduire les tests cliniques
   - Observer les résultats attendus
   - Comparer avec votre expérience clinique

---

## 🏗️ Architecture

```
vppb-simulator/
├── index.html              # Page principale avec structure
├── js/
│   ├── simulator.js        # Logique principale + classe VPPBSimulator
│   ├── visualization.js    # Module de visualisation 2D/3D
│   └── analysis.js         # Analyse et interprétation du nystagmus
├── README.md               # Ce fichier
└── LICENSE                 # MIT License
```

### Modules JavaScript

#### `simulator.js` - Cœur du simulateur
- **Classe `VPPBSimulator`**
  - Gestion de l'état global
  - Initialisation des canaux, manoeuvres et tests
  - Contrôle de l'animation
  - Mise à jour de l'interface utilisateur

- Propriétés:
  - `currentCanal` - Canal actuellement sélectionné
  - `otoliths` - Position et vélocité des cristaux
  - `nystagmus` - Propriétés du nystagmus
  - `headPosition` - Position/rotation de la tête

#### `visualization.js` - Rendu graphique
- **Classe `LabyrinthVisualization`**
  - Rendu Canvas 2D du labyrinthe
  - Animation fluide avec requestAnimationFrame
  - Affichage des 3 canaux différents
  - Dessins de l'endolymphe, cristaux, trace du mouvement

- Méthodes:
  - `drawPosteriorCanal()` - Rendu canal postérieur
  - `drawHorizontalCanal()` - Rendu canal horizontal
  - `drawAnteriorCanal()` - Rendu canal antérieur
  - `drawOtoliths()` - Rendu des cristaux
  - `drawNystagmusIndicator()` - Oscillation oculaire

#### `analysis.js` - Analyse et interprétation
- **Classe `NystagmusAnalyzer`**
  - Analyse des propriétés du nystagmus
  - Génération d'interprétations cliniques
  - Recommendations thérapeutiques
  - Timeline d'évolution

---

## 🧠 Physiopathologie simulée

### Canal Postérieur (90% des VPPB)

**Mécanisme:**
1. Cristaux (otholites) tombent dans la lumière du canal
2. Lors d'un mouvement de la tête:
   - L'endolymphe se déplace et dévie la cupule
   - Signaux proprioceptifs du système vestibulaire
   - Nystagmus réflexe pour stabiliser le regard

**Propriétés du nystagmus:**
- **Type:** Torsionnel roulant
- **Direction:** Géotropique (vers oreille basse)
- **Latence:** 3-10 secondes
- **Épuisement:** Oui, en conservant la position
- **Inversion:** Oui, au retour à l'orthostatisme

**Simulation:**
```javascript
// Position des cristaux avec Epley
const position = Math.floor((progress / 100) * 4);
const subProgress = ((progress % 25) / 25) * Math.PI / 2;
this.otoliths.position.x = Math.sin(subProgress) * 50;
this.otoliths.position.z = Math.cos(subProgress) * 50;
```

### Canal Horizontal (9% des VPPB)

**Deux types:**

#### Cupulolithiase
- Cristaux collés CONTRE la cupule
- Sans latence d'apparition
- Nystagmus agéotropique
- Symptômes prolongés

#### Canalolithiase  
- Cristaux libres dans le canal
- Latence 3-10 sec
- Nystagmus géotropique ou agéotropique selon position
- Symptoms s'épuisent

**Tests:**
- BOW-LEAN: Identifie le type et le côté
- Supine Roll Test: Localise précisément
- Upright Head Roll: Confirme le diagnostic

### Canal Antérieur (1% des VPPB)

**Caractéristiques:**
- Rare et diagnostiquement difficile
- Souvent bilatéral (40% des cas)
- Ébriété plutôt que vertige rotatoire
- Amélioration en position couchée

---

## 📚 Contenu clinique

### Données pour chaque canal

```javascript
{
    name: 'Canal postérieur',
    frequency: '90%',
    symptoms: 'Vertiges en se couchant et en se levant',
    duration: '6 ± 2 semaines',
    nystagmus: 'Torsionnel géotropique',
    test: 'Dix-Hallpike'
}
```

### Manoeuvres thérapeutiques

Chaque manoeuvre inclut:
- Étapes détaillées
- Temps de maintien
- Notes d'efficacité
- Consignes post-manoeuvre
- Précautions spéciales

### Interprétation du nystagmus

L'analyseur fournit:
- Mesures objectives (latence, amplitude, fréquence)
- Classement du type de nystagmus
- Diagnostic probable
- Niveau de confiance (%)
- Points d'alerte cliniques

---

## 🔴 Signaux d'alerte (Red Flags)

L'outil met en évidence les situations qui suggèrent une cause centrale plutôt qu'une VPPB:

- ❌ Nystagmus atypique (direction/forme anormale)
- ❌ Changement des caractéristiques pendant l'observation
- ❌ Nystagmus très faible ou absent (dissociation signes/symptômes)
- ❌ Distorsion majeure entre souffrance du patient et signes objectifs
- ❌ Antécédents d'AVC ou pathologie neurologique
- ❌ Autres signes neurologiques associés

**→ Recommandation: IRM urgente**

---

## 🎓 Cas d'usage pédagogiques

### Pour les étudiants
- Apprendre l'anatomie du labyrinthe
- Comprendre les lois d'Ewald
- Maîtriser les tests diagnostiques
- Pratiquer les manoeuvres thérapeutiques

### Pour les cliniciens
- Rafraîchir ses connaissances
- Entraîner ses yeux au diagnostic du nystagmus
- Réviser les manoeuvres
- Discuter des cas complexes

### Pour la formation continue
- Support de présentation
- Démonstration interactive
- Explication aux patients
- Validation des compétences

---

## 🚀 Améliorations futures

- [ ] Visualisation 3D WebGL avec Three.js
- [ ] Animations physiquement réalistes (moteur physique)
- [ ] Enregistrement/export de cas cliniques
- [ ] Mode examen avec questions à choix multiple
- [ ] Mode coopératif (patient + examiner)
- [ ] Support du tactile et des gestes pour simulateurs
- [ ] API pour intégration dans LMS
- [ ] Support multilingue
- [ ] Versions mobiles dédiées (iOS, Android)

---

## 🤝 Contribuer

Les contributions sont bienvenues! Pour contribuer:

1. Fork le repository
2. Créez une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Domaines d'amélioration
- Optimisation des performances
- Amélioration des animations
- Correction de bugs
- Ajout de contenu clinique
- Améliorations UX/UI
- Documentation

---

## 📖 Références cliniques

- **Norré ME, Beckers A.** Vestibular habituation training. Specificity of adequate exercise training. Acta Otolaryngol. 1989
- **Dix MR, Hallpike CS.** The pathology, symptomatology and diagnosis of certain common disorders of the vestibular system. Ann Otol Rhinol Laryngol. 1952
- **Brandt T.** Vertigo: its multisensory syndromes. 2nd ed. Springer; 2003
- **Gufoni M, Ginocchio D, Dispenza F.** Benign paroxysmal positional vertigo and its variants. Auris Nasus Larynx. 2015

---

## 📝 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour les détails.

```
MIT License

Copyright (c) 2024 VPPB Simulator Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Auteurs et Contributeurs

- **Créateur principal:** [Ton nom]
- **Contributeurs:**
  - Contenu clinique: Médecins spécialistes en vestibulologie
  - Visualisation: Développeurs Web spécialisés en graphique Canvas

---

## 📧 Contact & Support

- Issues GitHub: [GitHub Issues](https://github.com/ton-username/vppb-simulator/issues)
- Discussions: [GitHub Discussions](https://github.com/ton-username/vppb-simulator/discussions)
- Email: ton-email@example.com

---

## ⭐ Montrez votre soutien

Si cet outil vous a été utile, n'hésitez pas à:
- ⭐ Star ce repository
- 🔗 Le partager avec vos collègues
- 💬 Laisser des retours et suggestions
- 🤝 Contribuer à son développement

---

**Version:** 1.0.0  
**Dernière mise à jour:** 2024-01-15  
**Statut:** En développement actif 🚀

---

Fait avec ❤️ pour la formation médicale en vestibulologie
