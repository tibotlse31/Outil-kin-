// ========================================
// VPPB SIMULATOR - Core Logic
// ========================================

class VPPBSimulator {
    constructor() {
        this.currentCanal = 'post';
        this.currentManoeuvre = null;
        this.currentTest = null;
        this.isAnimating = false;
        this.animationProgress = 0;
        this.animationSpeed = 1;
        this.animationFrameId = null;
        
        // État du labyrinthe
        this.labyrinth = {
            post: { name: 'Canal postérieur', affected: false },
            horiz: { name: 'Canal horizontal', affected: false },
            ant: { name: 'Canal antérieur', affected: false }
        };

        // Cristaux
        this.otoliths = {
            position: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
            trail: []
        };

        // Nystagmus
        this.nystagmus = {
            latence: 0,
            latenceStartTime: 0,
            direction: 'none',
            amplitude: 0,
            frequency: 0,
            type: 'none', // torsionnel, horizontal, vertical
            geometric: false, // géotropique/agéotropique
            phase: 'slow' // slow, fast
        };

        // Position de la tête
        this.headPosition = {
            rotation: { x: 0, y: 0, z: 0 },
            translation: { x: 0, y: 0, z: 0 }
        };

        this.init();
    }

    init() {
        this.setupCanals();
        this.setupManoeuvres();
        this.setupTests();
        this.updateUI();
    }

    setupCanals() {
        const canalInfo = {
            post: {
                name: 'Canal postérieur',
                frequency: '90%',
                symptoms: 'Vertiges en se couchant et en se levant',
                duration: '6 ± 2 semaines',
                nystagmus: 'Torsionnel géotropique roulant vers oreille basse',
                test: 'Dix-Hallpike'
            },
            horiz: {
                name: 'Canal horizontal',
                frequency: '9%',
                symptoms: 'Vertiges prolongés (>1 min)',
                duration: 'Plus variable',
                nystagmus: 'Horizontal (géotropique ou agéotropique)',
                test: 'BOW-LEAN, Supine Roll Test'
            },
            ant: {
                name: 'Canal antérieur',
                frequency: '1%',
                symptoms: 'Ébriété, vertige moins intense',
                duration: 'Variable',
                nystagmus: 'Vertical inférieur',
                test: 'Deep Head Hanging'
            }
        };

        const current = canalInfo[this.currentCanal];
        const infoHtml = `
            <h4>${current.name}</h4>
            <p><strong>Fréquence:</strong> ${current.frequency}</p>
            <p><strong>Symptômes:</strong> ${current.symptoms}</p>
            <p><strong>Durée:</strong> ${current.duration}</p>
            <p><strong>Nystagmus:</strong> ${current.nystagmus}</p>
            <p><strong>Test diagnostique:</strong> ${current.test}</p>
        `;
        document.getElementById('canalInfo').innerHTML = infoHtml;
    }

    setupManoeuvres() {
        const manoeuvres = {
            post: [
                { id: 'epley', name: 'Manoeuvre d\'Epley', description: 'Standard: 4 rotations de 90°' },
                { id: 'semont', name: 'Manoeuvre de Sémont', description: 'Basculement 180° sans extension cervicale' },
                { id: 'brandt', name: 'Exercices Brandt & Daroff', description: 'Auto-rééducation (2-3x/jour)' }
            ],
            horiz: [
                { id: 'lempert', name: 'Barbecue (Lempert)', description: 'Rotations 360° géotropique' },
                { id: 'gufoni3g', name: 'Gufoni 3G', description: 'Géotropique - côté affecté' },
                { id: 'gufoni3a', name: 'Gufoni 3A', description: 'Agéotropique - côté affecté' }
            ],
            ant: [
                { id: 'yacovino', name: 'Manoeuvre de Yacovino', description: 'Menton-poitrine et redressement' },
                { id: 'li', name: 'Manoeuvre de Li', description: 'Passage en décubitus ventral' }
            ]
        };

        const container = document.getElementById('manoeuvreButtons');
        container.innerHTML = '';
        
        manoeuvres[this.currentCanal].forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.textContent = m.name;
            btn.onclick = () => this.selectManoeuvre(m.id, m.name, m.description);
            container.appendChild(btn);
        });
    }

    setupTests() {
        const tests = {
            post: [
                { id: 'dixhallpike', name: 'Dix-Hallpike', description: 'Test diagnostique standard' }
            ],
            horiz: [
                { id: 'bowlean', name: 'BOW and LEAN', description: 'Différencie cupulo/canalo' },
                { id: 'supineroll', name: 'Supine Roll Test', description: 'Localise le côté atteint' },
                { id: 'upright', name: 'Upright Head Roll', description: 'Confirme le diagnostic' }
            ],
            ant: [
                { id: 'deepheading', name: 'Deep Head Hanging', description: 'Test diagnostique' }
            ]
        };

        const container = document.getElementById('testButtons');
        container.innerHTML = '';
        
        tests[this.currentCanal].forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.textContent = t.name;
            btn.onclick = () => this.selectTest(t.id, t.name, t.description);
            container.appendChild(btn);
        });
    }

    selectManoeuvre(id, name, description) {
        this.currentManoeuvre = { id, name, description };
        this.updateManoeuvreInfo();
        this.resetAnimation();
        
        // Update button states
        document.querySelectorAll('#manoeuvreButtons .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    selectTest(id, name, description) {
        this.currentTest = { id, name, description };
        this.updateTestInfo();
        this.resetTest();
        
        // Update button states
        document.querySelectorAll('#testButtons .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    updateManoeuvreProgress(progress) {
        this.animationProgress = progress;
        this.updateLabyrinthState(progress, 'manoeuvre');
        this.updateNystagmusSimulation(progress, 'manoeuvre');
        this.updateVisualization();
    }

    updateTestProgress(progress) {
        this.animationProgress = progress;
        this.updateLabyrinthState(progress, 'test');
        this.updateNystagmusSimulation(progress, 'test');
        this.updateVisualization();
    }

    updateLabyrinthState(progress, type) {
        // Simuler le mouvement des cristaux basé sur la manoeuvre/test
        const angle = (progress / 100) * Math.PI * 2;
        
        if (type === 'manoeuvre' && this.currentManoeuvre) {
            switch (this.currentManoeuvre.id) {
                case 'epley':
                    // Simulation Epley: 4 positions de 90°
                    const position = Math.floor((progress / 100) * 4);
                    const subProgress = ((progress % 25) / 25) * Math.PI / 2;
                    this.otoliths.position.x = Math.sin(subProgress) * 50;
                    this.otoliths.position.z = Math.cos(subProgress) * 50;
                    break;
                case 'semont':
                    // Simulation Sémont: basculement de 180°
                    this.otoliths.position.x = Math.sin(angle) * 60;
                    this.otoliths.position.y = Math.cos(angle) * 30;
                    break;
                case 'lempert':
                    // Simulation Barbecue: rotation 360°
                    this.otoliths.position.x = Math.sin(angle) * 40;
                    this.otoliths.position.y = Math.cos(angle) * 40;
                    break;
            }
        }

        if (type === 'test' && this.currentTest) {
            switch (this.currentTest.id) {
                case 'dixhallpike':
                    // Position initiale -> bascule -> retour
                    if (progress < 33) {
                        this.headPosition.rotation.y = (progress / 33) * (Math.PI / 4);
                    } else if (progress < 66) {
                        this.headPosition.rotation.x = ((progress - 33) / 33) * (Math.PI / 2);
                    } else {
                        this.headPosition.rotation.x = Math.PI / 2 - ((progress - 66) / 34) * (Math.PI / 2);
                    }
                    break;
                case 'bowlean':
                    if (progress < 50) {
                        this.headPosition.rotation.z = (progress / 50) * (Math.PI / 3);
                    } else {
                        this.headPosition.rotation.z = (Math.PI / 3) - ((progress - 50) / 50) * (Math.PI / 3);
                    }
                    break;
            }
        }
    }

    updateNystagmusSimulation(progress, type) {
        // Simuler le nystagmus basé sur la position
        
        // Latence
        if (progress < 15 && this.currentCanal === 'horiz') {
            this.nystagmus.latence = 5 + (progress / 15) * 5; // Latence de 5-10s
        }

        // Direction et amplitude
        const oscillation = Math.sin((progress / 100) * Math.PI * 6);
        
        switch (this.currentCanal) {
            case 'post':
                this.nystagmus.type = 'torsionnel';
                this.nystagmus.amplitude = Math.abs(oscillation) * 15;
                this.nystagmus.direction = oscillation > 0 ? 'géotropique' : 'anti-horaire';
                break;
            case 'horiz':
                this.nystagmus.type = 'horizontal';
                this.nystagmus.amplitude = Math.abs(oscillation) * 12;
                this.nystagmus.geometric = progress > 20;
                break;
            case 'ant':
                this.nystagmus.type = 'vertical';
                this.nystagmus.amplitude = Math.abs(oscillation) * 10;
                this.nystagmus.direction = 'inférieur';
                break;
        }

        // Fréquence
        this.nystagmus.frequency = 1 + Math.abs(oscillation) * 2;
        
        // Phase
        this.nystagmus.phase = oscillation > 0 ? 'fast' : 'slow';

        // Metter à jour l'affichage des stats
        this.updateAnalysisStats();
    }

    updateAnalysisStats() {
        // Latence
        const latenceEl = document.getElementById('latenceValue');
        if (this.nystagmus.latence > 0) {
            latenceEl.textContent = Math.round(this.nystagmus.latence) + 's';
        }

        // Direction
        const directionEl = document.getElementById('directionValue');
        directionEl.textContent = this.nystagmus.direction !== 'none' ? 
            this.nystagmus.direction.substring(0, 8) : '-';

        // Amplitude
        const amplitudeEl = document.getElementById('amplitudeValue');
        amplitudeEl.textContent = Math.round(this.nystagmus.amplitude) + '°';

        // Mouvement oculaire
        const pupil = document.getElementById('eyePupil');
        const oscillation = Math.sin((this.animationProgress / 100) * Math.PI * 6);
        pupil.style.left = (50 + oscillation * 15) + '%';
        pupil.style.top = (50 + Math.cos((this.animationProgress / 100) * Math.PI * 4) * 15) + '%';
    }

    updateVisualization() {
        // Trigger visualization update
        if (window.drawLabyrinth) {
            window.drawLabyrinth();
        }
    }

    updateManoeuvreInfo() {
        if (!this.currentManoeuvre) return;

        const infoPanel = document.getElementById('manoeuvreInfo');
        const infos = {
            epley: {
                title: 'Manoeuvre d\'Epley',
                steps: [
                    'Position assise, tête tournée 45° du côté atteint',
                    'Bascule en décubitus dorsal tête hors table',
                    'Rotation tête 90° côté opposé (attendre 30s)',
                    'Rotation tête + tronc 90° de plus (attendre 30s)',
                    'Relever à la verticale en conservant la rotation'
                ],
                notes: '✓ Efficacité: 80-90% | ✓ Pause 5-10 min | ✓ Dormir côté sain 1-2 nuits'
            },
            semont: {
                title: 'Manoeuvre de Sémont',
                steps: [
                    'Position assise, tête tournée 45° côté OPPOSÉ au vertige',
                    'Basculement rapide et contrôlé vers le côté vertigineux',
                    'Repositionner en décubitus latéral strict',
                    'Bascule tête + tronc 180°',
                    'Attendre 5-10 min en position'
                ],
                notes: '✓ Intérêt: moins d\'extension cervicale | ✓ Même efficacité que Epley'
            },
            lempert: {
                title: 'Barbecue (Lempert)',
                steps: [
                    'Position penché en avant + DD tête relevée 30°',
                    'Rotation 60° vers côté sain (attendre 30s)',
                    'Continuation 4-5 rotations supplémentaires',
                    'Total 360° en 5-6 étapes',
                    'Relever assis doucement'
                ],
                notes: '✓ Pour: canalolithiase géotropique | ✓ Efficacité: 85%'
            }
        };

        const info = infos[this.currentManoeuvre.id] || {
            title: this.currentManoeuvre.name,
            steps: ['Position 1', 'Position 2', 'Position 3'],
            notes: 'Manoeuvre thérapeutique'
        };

        infoPanel.innerHTML = `
            <h4>${info.title}</h4>
            <p><strong>Étapes:</strong></p>
            <ol style="margin-left: 1.5rem;">
                ${info.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <p style="margin-top: 0.5rem;"><strong>Notes:</strong> ${info.notes}</p>
        `;
    }

    updateTestInfo() {
        if (!this.currentTest) return;

        const infoPanel = document.getElementById('testInfo');
        const infos = {
            dixhallpike: {
                title: 'Test de Dix-Hallpike',
                description: 'Test diagnostique pour canal postérieur',
                procedure: [
                    'Patient assis, tournez tête 45° du côté suspect',
                    'Basculez rapidement en décubitus dorsal (tête hors table)',
                    'Observez: latence (3-10s) puis nystagmus torsionnel géotropique',
                    'Redressez le patient et observez l\'inversion'
                ],
                interpretation: '✓ Positif: nystagmus géotropique torsionnel | ✓ Diagnostic confirmé',
                warning: '⚠️ Nystagmus atypique = IRM urgente'
            },
            bowlean: {
                title: 'BOW and LEAN Test',
                description: 'Différencie canalolithiase vs cupulolithiase',
                procedure: [
                    'Position BOW: DD tête relevée 30°, incline vers côté testé',
                    'Observez: latence + direction du nystagmus',
                    'Position LEAN: incline côté opposé',
                    'Comparez: inversion du nystagmus'
                ],
                interpretation: '✓ Avec latence = canalolithiase | ✓ Sans latence = cupulolithiase',
                warning: '⚠️ Latence variable: 3-30s selon le cas'
            }
        };

        const info = infos[this.currentTest.id] || {
            title: this.currentTest.name,
            description: this.currentTest.description,
            procedure: ['Étape 1', 'Étape 2', 'Étape 3'],
            interpretation: 'Interpréter les résultats',
            warning: 'Points cliniques importants'
        };

        infoPanel.innerHTML = `
            <h4>${info.title}</h4>
            <p>${info.description}</p>
            <p><strong>Procédure:</strong></p>
            <ol style="margin-left: 1.5rem;">
                ${info.procedure.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <p><strong>Interprétation:</strong> ${info.interpretation}</p>
            <p><strong style="color: #dc2626;">${info.warning}</strong></p>
        `;
    }

    updateClinicalInfo() {
        const clinicalInfo = document.getElementById('clinicalInfo');
        const canalDatas = {
            post: {
                title: 'Canal postérieur - Données cliniques',
                differential: 'Vertiges centraux, positionnels non VPPB',
                prognosis: 'Résolution spontanée en 6±2 semaines',
                recurrence: '15-30% de récurrence',
                keyPoints: [
                    'Nystagmus GEOTROPIQUE torsionnel = hallmark',
                    'Épuisement en position = normal',
                    'Inversion au retour = essentiel pour diagnostic',
                    'Manoeuvres curatives > 80% efficacité'
                ]
            },
            horiz: {
                title: 'Canal horizontal - Données cliniques',
                differential: 'Distinguer cupulolithiase vs canalolithiase essentiel',
                prognosis: 'Plus variable que canal postérieur',
                recurrence: '20-35% de récurrence',
                keyPoints: [
                    'Latence = critère clé pour diagnostic',
                    'Formes agéotropiques plus rares mais existent',
                    'Conversion fréquente vers canal antérieur',
                    'Tests multiples souvent nécessaires'
                ]
            },
            ant: {
                title: 'Canal antérieur - Données cliniques',
                differential: 'Souvent bilatéral, diagnostic difficile',
                prognosis: 'Très variable, traitement moins standardisé',
                recurrence: '>50% de récurrence',
                keyPoints: [
                    'Vertige moins rotatoire = ébriété',
                    'Amélioration position couchée = indice',
                    'Deep Head Hanging test essentiel',
                    'Manoeuvres Yacovino ou Li efficaces'
                ]
            }
        };

        const data = canalDatas[this.currentCanal];
        clinicalInfo.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>Diagnostiques différentiels:</strong> ${data.differential}</p>
            <p><strong>Pronostic:</strong> ${data.prognosis}</p>
            <p><strong>Récurrence:</strong> ${data.recurrence}</p>
            <p><strong>Points clés:</strong></p>
            <ul style="margin-left: 1.5rem;">
                ${data.keyPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
        `;
    }

    playAnimation() {
        this.isAnimating = true;
        this.animateFrame();
    }

    pauseAnimation() {
        this.isAnimating = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    }

    resetAnimation() {
        this.pauseAnimation();
        this.animationProgress = 0;
        document.getElementById('manoeuvreSlider').value = 0;
        document.getElementById('progressDisplay').textContent = '0%';
        this.updateManoeuvreProgress(0);
    }

    playTest() {
        this.isAnimating = true;
        this.animateTestFrame();
    }

    pauseTest() {
        this.isAnimating = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    }

    resetTest() {
        this.pauseTest();
        this.animationProgress = 0;
        document.getElementById('testSlider').value = 0;
        document.getElementById('testProgressDisplay').textContent = '0%';
        this.updateTestProgress(0);
    }

    animateFrame() {
        if (!this.isAnimating) return;

        this.animationProgress += 0.5 * this.animationSpeed;
        if (this.animationProgress >= 100) {
            this.animationProgress = 100;
            this.isAnimating = false;
        }

        document.getElementById('manoeuvreSlider').value = this.animationProgress;
        document.getElementById('progressDisplay').textContent = Math.round(this.animationProgress) + '%';
        this.updateManoeuvreProgress(this.animationProgress);

        if (this.isAnimating) {
            this.animationFrameId = requestAnimationFrame(() => this.animateFrame());
        }
    }

    animateTestFrame() {
        if (!this.isAnimating) return;

        this.animationProgress += 0.5 * this.animationSpeed;
        if (this.animationProgress >= 100) {
            this.animationProgress = 100;
            this.isAnimating = false;
        }

        document.getElementById('testSlider').value = this.animationProgress;
        document.getElementById('testProgressDisplay').textContent = Math.round(this.animationProgress) + '%';
        this.updateTestProgress(this.animationProgress);

        if (this.isAnimating) {
            this.animationFrameId = requestAnimationFrame(() => this.animateTestFrame());
        }
    }

    updateSpeed(speed) {
        this.animationSpeed = parseFloat(speed);
        document.getElementById('speedDisplay').textContent = speed + 'x';
    }

    updateUI() {
        this.setupCanals();
        this.setupManoeuvres();
        this.setupTests();
        this.updateClinicalInfo();
    }
}

// Instance globale
let simulator;

// Fonctions globales pour les event handlers
function setCanal(canal) {
    simulator.currentCanal = canal;
    simulator.animationProgress = 0;
    simulator.updateUI();
    
    // Update button states
    document.querySelectorAll('.panel:first-child .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function updateManoeuvreProgress(value) {
    simulator.updateManoeuvreProgress(parseFloat(value));
}

function updateTestProgress(value) {
    simulator.updateTestProgress(parseFloat(value));
}

function updateSpeed(value) {
    simulator.updateSpeed(value);
}

function playAnimation() {
    simulator.playAnimation();
}

function pauseAnimation() {
    simulator.pauseAnimation();
}

function resetAnimation() {
    simulator.resetAnimation();
}

function playTest() {
    simulator.playTest();
}

function pauseTest() {
    simulator.pauseTest();
}

function resetTest() {
    simulator.resetTest();
}

function openDocumentation() {
    alert('Documentation: Visitez le repository GitHub pour plus d\'infos');
}

// Initialisation au chargement
window.addEventListener('load', () => {
    simulator = new VPPBSimulator();
});
