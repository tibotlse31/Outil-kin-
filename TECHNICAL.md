# 📐 Documentation Technique - VPPB Simulator

## Architecture Générale

```
┌─────────────────────────────────────────────────────┐
│              index.html (UI Layer)                   │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │          HTML Structure & CSS Styling           │ │
│  │  - Layout responsif                             │ │
│  │  - Panneaux interactifs                         │ │
│  │  - Canvas pour visualisation                    │ │
│  └────────────────────────────────────────────────┘ │
└──────────────┬──────────────────────────────────────┘
               │
        ┌──────┴───────────────────────────┐
        │                                   │
        ▼                                   ▼
┌─────────────────┐              ┌─────────────────────┐
│ simulator.js    │              │ visualization.js    │
│                 │              │                     │
│ VPPBSimulator   │              │ LabyrinthViz        │
│ Class           │              │ Class               │
│                 │              │                     │
│ - State mgmt    │              │ - Canvas rendering  │
│ - Animation     │              │ - 2D graphics       │
│ - Manoeuvres    │              │ - Real-time draw    │
│ - Tests         │              │                     │
└────────┬────────┘              └──────────┬──────────┘
         │                                  │
         │                                  │
         └──────────────────┬───────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  analysis.js         │
                 │                      │
                 │ NystagmusAnalyzer    │
                 │                      │
                 │ - Measurements       │
                 │ - Interpretation     │
                 │ - Recommendations    │
                 └──────────────────────┘
```

## Flux de données

```
User Input
    ↓
Event Handler (onclick, oninput)
    ↓
simulator.setCanal() / selectManoeuvre()
    ↓
VPPBSimulator.update*()
    ├─ updateLabyrinthState()
    ├─ updateNystagmusSimulation()
    └─ updateVisualization()
    ↓
LabyrinthVisualization.draw()
    ├─ Clear canvas
    ├─ drawPosteriorCanal() / drawHorizontalCanal() / drawAnteriorCanal()
    ├─ drawOtoliths()
    ├─ drawEndalymph()
    └─ drawNystagmusIndicator()
    ↓
NystagmusAnalyzer.analyzeCurrent()
    ├─ Measurements
    ├─ Interpretation
    └─ Recommendations
    ↓
UI Update (DOM elements)
```

## Classes principales

### VPPBSimulator

```javascript
class VPPBSimulator {
    // Propriétés
    currentCanal: string          // 'post', 'horiz', 'ant'
    currentManoeuvre: Object      // Manoeuvre sélectionnée
    currentTest: Object           // Test sélectionné
    isAnimating: boolean          // État de l'animation
    animationProgress: number     // 0-100
    animationSpeed: number        // Vitesse (0.5x-3x)
    
    // État du labyrinthe
    labyrinth: {
        post: { name, affected }
        horiz: { name, affected }
        ant: { name, affected }
    }
    
    // Cristaux
    otoliths: {
        position: { x, y, z }
        velocity: { x, y, z }
        trail: []               // Historique de position
    }
    
    // Nystagmus
    nystagmus: {
        latence: number         // Latence en secondes
        direction: string       // 'géotropique', 'agéotropique'
        amplitude: number       // En degrés
        frequency: number       // En Hz
        type: string           // 'torsionnel', 'horizontal', 'vertical'
        phase: string          // 'slow', 'fast'
    }
    
    // Position de la tête
    headPosition: {
        rotation: { x, y, z }
        translation: { x, y, z }
    }
    
    // Méthodes publiques
    setCanal(canal)
    selectManoeuvre(id, name, description)
    selectTest(id, name, description)
    updateManoeuvreProgress(progress)
    updateTestProgress(progress)
    playAnimation()
    pauseAnimation()
    resetAnimation()
    playTest()
    pauseTest()
    resetTest()
    updateSpeed(speed)
    updateUI()
}
```

### LabyrinthVisualization

```javascript
class LabyrinthVisualization {
    // Propriétés
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    animationAngle: number
    
    // Méthodes
    draw()                          // Animation loop
    drawPosteriorCanal()           // Rendu canal postérieur
    drawHorizontalCanal()          // Rendu canal horizontal
    drawAnteriorCanal()            // Rendu canal antérieur
    drawEndalymph(x, y, r, type)  // Rendu mouvement endolymphe
    drawOtoliths()                 // Rendu cristaux
    drawNystagmusIndicator()       // Rendu oscillation oculaire
    handleResize()                 // Gestion du redimensionnement
}
```

### NystagmusAnalyzer

```javascript
class NystagmusAnalyzer {
    // Propriétés
    measurements: {
        latence, amplitude, frequency, duration, 
        fatigability, direction
    }
    
    // Méthodes
    analyzeCurrent()               // Analyse propriétés actuelles
    interpret(canal, nyst)         // Interprétation clinique
    getRecommendations(canal)      // Recommandations thérapeutiques
    getDetailedAnalysis(progress)  // Analyse détaillée
    getTimeline(progress)          // Timeline d'évolution
    getNystagmusPhases(progress)   // Phases du nystagmus
    getOtolithsMigration(progress) // Migration des cristaux
    generateReport(canal, test, manoeuvre) // Rapport complet
    getFollowup(canal)             // Suivi recommandé
}
```

## API et Fonctions globales

### Gestion des canaux

```javascript
setCanal('post')    // Canal postérieur
setCanal('horiz')   // Canal horizontal
setCanal('ant')     // Canal antérieur
```

### Contrôle des tabs

```javascript
switchTab('manoeuvre')   // Tab Manoeuvre
switchTab('test')        // Tab Test diagnostic
switchTab('analysis')    // Tab Analyse
```

### Contrôle de l'animation

```javascript
playAnimation()          // Lancer animation manoeuvre
pauseAnimation()         // Pause animation
resetAnimation()         // Réinitialiser
updateManoeuvreProgress(value)  // Mise à jour manuelle slider

playTest()               // Lancer animation test
pauseTest()              // Pause
resetTest()              // Réinitialiser
updateTestProgress(value) // Mise à jour manuelle
```

### Propriétés accessibles

```javascript
// État global simulateur
simulator.currentCanal           // Canal courant
simulator.animationProgress      // 0-100
simulator.animationSpeed         // Vitesse
simulator.otoliths.position      // {x, y, z}
simulator.nystagmus.latence      // Latence en sec
simulator.nystagmus.amplitude    // Amplitude en deg
simulator.nystagmus.direction    // Direction nyst
```

## Structure HTML

### Panneaux principaux

```html
<div class="panel">
  <h2>Titre du panneau</h2>
  <div class="controls">
    <!-- Contrôles -->
  </div>
  <div class="info-box">
    <!-- Informations -->
  </div>
</div>
```

### Système de tabs

```html
<div class="tabs">
  <button class="tab active" onclick="switchTab('id')">Tab 1</button>
  <button class="tab" onclick="switchTab('id')">Tab 2</button>
</div>

<div id="id" class="tab-content active">
  <!-- Contenu du tab -->
</div>
```

### Canvas de visualisation

```html
<div class="unity-container">
  <canvas id="labyrinthe"></canvas>
</div>
```

## Modèle de données - Manoeuvres

### Structure manoeuvre

```javascript
{
    id: 'epley',           // Identifiant unique
    name: 'Manoeuvre d\'Epley',  // Nom affiché
    description: 'Standard: 4 rotations de 90°'
}
```

### Manoeuvres disponibles

#### Canal postérieur
- `epley` - Manoeuvre d'Epley
- `semont` - Manoeuvre de Sémont
- `brandt` - Exercices Brandt & Daroff

#### Canal horizontal
- `lempert` - Barbecue (Lempert)
- `gufoni3g` - Gufoni 3G (géotropique)
- `gufoni3a` - Gufoni 3A (agéotropique)

#### Canal antérieur
- `yacovino` - Manoeuvre de Yacovino
- `li` - Manoeuvre de Li

## Modèle de données - Tests

### Structure test

```javascript
{
    id: 'dixhallpike',
    name: 'Test de Dix-Hallpike',
    description: 'Test diagnostique standard'
}
```

### Tests disponibles

#### Canal postérieur
- `dixhallpike` - Test de Dix-Hallpike

#### Canal horizontal
- `bowlean` - BOW and LEAN test
- `supineroll` - Supine Roll Test
- `upright` - Upright Head Roll Test

#### Canal antérieur
- `deepheading` - Deep Head Hanging

## Simulation physique

### Calcul position des cristaux

```javascript
// Épley: 4 positions de 90°
const position = Math.floor((progress / 100) * 4);
const subProgress = ((progress % 25) / 25) * Math.PI / 2;
otoliths.position.x = Math.sin(subProgress) * 50;
otoliths.position.z = Math.cos(subProgress) * 50;

// Sémont: basculement 180°
const angle = (progress / 100) * Math.PI * 2;
otoliths.position.x = Math.sin(angle) * 60;
otoliths.position.y = Math.cos(angle) * 30;
```

### Calcul nystagmus

```javascript
// Oscillation des yeux
const oscillation = Math.sin((progress / 100) * Math.PI * 6);

// Amplitude
nystagmus.amplitude = Math.abs(oscillation) * 15;

// Fréquence
nystagmus.frequency = 1 + Math.abs(oscillation) * 2;

// Phase
nystagmus.phase = oscillation > 0 ? 'fast' : 'slow';
```

## Rendu Canvas

### Couleurs utilisées

```javascript
const colors = {
    canalStroke: '#4ecdc4',      // Bleu-vert
    ampule: '#c7a0e8',           // Violet
    cupule: '#95e1d3',           // Vert menthe
    vestibule: '#e0e7ff',        // Bleu clair
    otoliths: '#ff6b6b',         // Rouge
    endolymph: 'rgba(78, 205, 196, 0.3)',
    text: '#1e40af'              // Bleu foncé
}
```

### Dimensions relatives

```javascript
const scale = Math.min(width, height);

// Pour canal postérieur
const radius = scale / 3;
const ampuleRadius = 25;

// Pour canal horizontal
const radiusX = width / 4;
const radiusY = height / 4;
```

## Performance et optimisation

### Techniques utilisées

1. **RequestAnimationFrame**
   - Synchronisation avec rafraîchissement écran
   - ~60 FPS optimal

2. **Lazy rendering**
   - Redessiner seulement si données changent
   - Limiter la fréquence d'appel

3. **Optimisation Canvas**
   - Réutiliser contexte
   - Limiter les appels de fillRect/strokeRect
   - Utiliser les paths pour formes complexes

### Recommandations

- Maintenir FPS > 30
- Limiter nombre de particules (otoliths) < 10
- Trail historique < 100 points
- Optimiser les fonctions draw()

## Debugging

### Mode console

```javascript
// Vérifier état du simulateur
console.log(simulator);

// Vérifier nystagmus courant
console.log(simulator.nystagmus);

// Vérifier position cristaux
console.log(simulator.otoliths.position);

// Vérifier animation
console.log('Progress:', simulator.animationProgress);
console.log('Is animating:', simulator.isAnimating);
```

### Points de breakpoint utiles

- Début animation: `playAnimation()`
- Mise à jour état: `updateLabyrinthState()`
- Calcul nystagmus: `updateNystagmusSimulation()`
- Rendu: `draw()` dans LabyrinthVisualization

## Roadmap futures améliorations

### Court terme
- [ ] Ajouter WebGL avec Three.js pour meilleure 3D
- [ ] Améliorer les animations physiques
- [ ] Exporter cas cliniques en PDF

### Moyen terme
- [ ] API REST pour intégration LMS
- [ ] Mode multiplayer (examiner + patient)
- [ ] Base de données cas cliniques
- [ ] Quizz interactifs

### Long terme
- [ ] App native (Electron, React Native)
- [ ] VR/AR pour immersion
- [ ] AI pour diagnostic assisté
- [ ] Marketplace plugins

---

**Pour questions techniques:** voir GitHub Issues ou contact mail

**Version documentation:** 1.0.0
