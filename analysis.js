// ========================================
// VPPB SIMULATOR - Analysis Module
// ========================================

class NystagmusAnalyzer {
    constructor() {
        this.measurements = {
            latence: 0,
            amplitude: 0,
            frequency: 0,
            duration: 0,
            fatigability: false,
            direction: 'none'
        };
    }

    analyzeCurrent() {
        const nyst = simulator.nystagmus;
        const canal = simulator.currentCanal;

        return {
            type: nyst.type,
            latence: nyst.latence,
            amplitude: nyst.amplitude,
            frequency: nyst.frequency,
            direction: nyst.direction,
            interpretation: this.interpret(canal, nyst),
            recommendations: this.getRecommendations(canal, nyst)
        };
    }

    interpret(canal, nyst) {
        const interpretations = {
            post: {
                properties: [
                    '✓ Type: TORSIONNEL',
                    '✓ Direction: Géotropique (vers oreille basse)',
                    '✓ Épuisement: Oui (en position)',
                    '✓ Inversion: Oui (au retour assis)'
                ],
                diagnosis: 'VPPB du canal postérieur',
                confidence: '95-100%',
                notes: [
                    'Hallmark: nystagmus torsionnel géotropique',
                    'Latence: 3-10 sec (normal)',
                    'Durée: 30-60 sec maximum',
                    'Plus fréquent (90% des VPPB)'
                ]
            },
            horiz: {
                properties: [
                    '? Type: HORIZONTAL',
                    '? Direction: Géotropique ou agéotropique',
                    '? Latence: ESSENTIELLE pour diagnostic',
                    '? Épuisement: Dépend du type'
                ],
                diagnosis: 'VPPB du canal horizontal (9% des VPPB)',
                confidence: '85-95%',
                notes: [
                    'Différencier: cupulolithiase (sans latence) vs canalolithiase (avec latence)',
                    'Géotropique: cristaux dans bras long du canal',
                    'Agéotropique: cristaux dans bras court ou cupule',
                    'Tests multiples souvent nécessaires (BOW-LEAN, Supine Roll, Upright Head Roll)'
                ]
            },
            ant: {
                properties: [
                    '? Type: VERTICAL INFÉRIEUR',
                    '? Direction: Variable',
                    '? Latence: Variable',
                    '? Localisation: Souvent bilatéral'
                ],
                diagnosis: 'VPPB du canal antérieur (1% des VPPB)',
                confidence: '70-85%',
                notes: [
                    'Rare et difficile à diagnostiquer',
                    'Symptômes: ébriété plutôt que vertige rotatoire',
                    'Amélioration position couchée = indice clinique',
                    'Souvent bilatéral (40% des cas)',
                    'Traitement: Manoeuvre de Yacovino ou Li'
                ]
            }
        };

        return interpretations[canal] || interpretations.post;
    }

    getRecommendations(canal, nyst) {
        const recommendations = {
            post: {
                therapeutic: [
                    'Manoeuvre d\'Epley (80-90% efficacité)',
                    'Manoeuvre de Sémont (alternative si contracture cervicale)',
                    'Exercices Brandt & Daroff (auto-rééducation)'
                ],
                precautions: [
                    'Dormir côté sain pendant 1-2 nuits',
                    'Éviter mouvements tête plan pitch (antéro-postérieur)',
                    'Pause 5-10 min après manoeuvre'
                ],
                redflags: [
                    'Nystagmus atypique (direction/forme anormale)',
                    'Nystagmus très faible ou absent',
                    'Dissociation signes/symptômes',
                    'Antécédent AVC → IRM urgente'
                ]
            },
            horiz: {
                therapeutic: [
                    'Barbecue (Lempert) - géotropique: 85% efficacité',
                    'Gufoni 3G - géotropique: 80% efficacité',
                    'Gufoni 3A - agéotropique/cupulo: 75% efficacité'
                ],
                precautions: [
                    'Dormir côté sain ou sur le dos',
                    'Éviter se pencher en avant',
                    'Visage parallèle au sol',
                    'Multiples tests diagnostiques peuvent être nécessaires'
                ],
                redflags: [
                    'Pas de latence mais symptômes > 1 min = cupulolithiase',
                    'Conversion vers canal antérieur pendant traitement',
                    'Forme très agéotropique pure (cupule immobiliée) = difficile'
                ]
            },
            ant: {
                therapeutic: [
                    'Manoeuvre de Yacovino (1ère ligne, 70% efficacité)',
                    'Manoeuvre de Li (variante)',
                    'Deep Head Hanging test → manoeuvre'
                ],
                precautions: [
                    'Rechercher atteinte bilatérale',
                    'Différencier avec atteinte centrale',
                    'Suivi: test IFO (test impulse vestibulo-céphalique)',
                    'Pronostic: récurrence 50%+'
                ],
                redflags: [
                    'Antécédent traumatique crânien',
                    'Symptômes très asymétriques',
                    'Signes neurologiques associés',
                    'Amélioration ne correspond pas au test → imagerie'
                ]
            }
        };

        return recommendations[canal] || recommendations.post;
    }

    getDetailedAnalysis(progress) {
        const analysis = {
            timeline: this.getTimeline(progress),
            nystagmusPhases: this.getNystagmusPhases(progress),
            otolithsMigration: this.getOtolithsMigration(progress)
        };

        return analysis;
    }

    getTimeline(progress) {
        const timeline = {
            0: { phase: 'Repos', description: 'Patient au repos, pas de symptômes' },
            15: { phase: 'Décélération/Accélération', description: 'Mouvements des cristaux initiés' },
            30: { phase: 'Latence', description: 'Délai avant apparition (3-10s typique)' },
            50: { phase: 'Nystagmus maximum', description: 'Amplitude et fréquence maximales' },
            75: { phase: 'Épuisement', description: 'Amplitude décroît, fatigabilité du système' },
            100: { phase: 'Récupération', description: 'Retour au repos, possible inversion' }
        };

        // Trouver la phase appropriée
        for (let key of Object.keys(timeline).reverse()) {
            if (progress >= parseInt(key)) {
                return timeline[key];
            }
        }
        return timeline[0];
    }

    getNystagmusPhases(progress) {
        const phases = [];

        if (progress < 20) {
            phases.push({
                name: 'Pré-nystagmus',
                phase: 'slow',
                amplitude: progress / 20 * 50,
                description: 'Cristaux se déplacent, endolymphe en mouvement'
            });
        }

        if (progress >= 20 && progress < 60) {
            const relProgress = (progress - 20) / 40;
            phases.push({
                name: 'Nystagmus actif',
                phase: 'fast',
                amplitude: 50 + relProgress * 20,
                frequency: 1 + relProgress * 2,
                description: 'Oscillations oculaires régulières'
            });
        }

        if (progress >= 60) {
            const relProgress = (progress - 60) / 40;
            phases.push({
                name: 'Épuisement',
                phase: 'slow',
                amplitude: Math.max(20, 70 - relProgress * 70),
                frequency: Math.max(0.5, 3 - relProgress * 2),
                description: 'Diminution progressive de l\'amplitude'
            });
        }

        return phases;
    }

    getOtolithsMigration(progress) {
        const migration = {
            position: {
                x: Math.sin(progress / 100 * Math.PI * 2) * 60,
                y: Math.cos(progress / 100 * Math.PI * 2) * 40,
                z: Math.sin(progress / 100 * Math.PI) * 30
            },
            velocity: {
                x: Math.cos(progress / 100 * Math.PI * 2) * 30,
                y: -Math.sin(progress / 100 * Math.PI * 2) * 30,
                z: Math.cos(progress / 100 * Math.PI) * 20
            },
            acceleration: {
                magnitude: Math.abs(Math.sin(progress / 100 * Math.PI * 4)) * 100
            }
        };

        return migration;
    }

    generateReport(canal, test, manoeuvre) {
        const report = {
            patient: {
                canal: canal,
                test: test ? test.name : 'N/A',
                manoeuvre: manoeuvre ? manoeuvre.name : 'N/A'
            },
            findings: this.analyzeCurrent(),
            recommendations: this.getRecommendations(canal, simulator.nystagmus),
            followup: this.getFollowup(canal)
        };

        return report;
    }

    getFollowup(canal) {
        const followup = {
            post: {
                duration: '6 ± 2 semaines',
                control: 'Test Dix-Hallpike 1 semaine après manoeuvre',
                recurrence: '15-30%',
                when: 'Si récurrence: refaire manoeuvre'
            },
            horiz: {
                duration: 'Plus variable',
                control: 'Tests répétés (BOW-LEAN, Supine Roll) pour confirmer conversion',
                recurrence: '20-35%',
                when: 'Conversion fréquente vers canal antérieur'
            },
            ant: {
                duration: 'Très variable (semaines à mois)',
                control: 'Deep Head Hanging test',
                recurrence: '>50%',
                when: 'Suivi prolongé recommandé'
            }
        };

        return followup[canal] || followup.post;
    }
}

// Créer analyseur global
const analyzer = new NystagmusAnalyzer();

// Mettre à jour l'analyse à chaque changement
window.addEventListener('load', () => {
    // Vérifier régulièrement et mettre à jour
    setInterval(() => {
        if (simulator && simulator.currentManoeuvre) {
            const analysis = analyzer.analyzeCurrent();
            
            // Mettre à jour l'interprétation
            const interpretationPanel = document.getElementById('analysisInterpretation');
            if (interpretationPanel) {
                const rec = analysis.recommendations;
                interpretationPanel.innerHTML = `
                    <h4>Recommandations cliniques</h4>
                    <p><strong>Manoeuvres thérapeutiques:</strong></p>
                    <ul style="margin-left: 1.5rem;">
                        ${rec.therapeutic.map(m => `<li>${m}</li>`).join('')}
                    </ul>
                    <p style="margin-top: 0.5rem;"><strong>Précautions:</strong></p>
                    <ul style="margin-left: 1.5rem;">
                        ${rec.precautions.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                    <p style="margin-top: 0.5rem;"><strong style="color: #dc2626;">🚨 Signaux d'alerte:</strong></p>
                    <ul style="margin-left: 1.5rem;">
                        ${rec.redflags.map(f => `<li style="color: #dc2626;">${f}</li>`).join('')}
                    </ul>
                `;
            }
        }
    }, 100);
});
