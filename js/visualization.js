// ========================================
// VPPB SIMULATOR - Visualization Module
// ========================================

class LabyrinthVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.parentElement.offsetWidth;
        this.height = this.canvas.parentElement.offsetHeight;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        this.resizeObserver = new ResizeObserver(() => this.handleResize());
        this.resizeObserver.observe(this.canvas.parentElement);
        
        this.animationAngle = 0;
        this.lastDrawTime = 0;
    }

    handleResize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.draw();
    }

    draw() {
        this.animationAngle += 0.02;
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        const canal = simulator.currentCanal;
        
        switch (canal) {
            case 'post':
                this.drawPosteriorCanal();
                break;
            case 'horiz':
                this.drawHorizontalCanal();
                break;
            case 'ant':
                this.drawAnteriorCanal();
                break;
        }

        this.drawOtoliths();
        this.drawNystagmusIndicator();
        
        requestAnimationFrame(() => this.draw());
    }

    drawPosteriorCanal() {
        // Fond
        this.ctx.fillStyle = '#f0f9ff';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Titre
        this.ctx.fillStyle = '#1e40af';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Canal Semi-Circulaire Postérieur', this.width / 2, 30);

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) / 3;

        // Draw semi-circle (canal)
        this.ctx.strokeStyle = '#4ecdc4';
        this.ctx.lineWidth = 20;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY - radius / 2, radius, Math.PI, 0, false);
        this.ctx.stroke();

        // Ampule à droite
        this.ctx.fillStyle = '#c7a0e8';
        this.ctx.beginPath();
        this.ctx.arc(centerX + radius, centerY - radius / 2, 25, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#a78bcd';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Cupule
        this.ctx.fillStyle = '#95e1d3';
        this.ctx.beginPath();
        this.ctx.ellipse(centerX + radius, centerY - radius / 2, 8, 15, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Vestibule au centre
        this.ctx.fillStyle = '#e0e7ff';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = '#818cf8';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Labels
        this.ctx.fillStyle = '#1e40af';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        
        this.ctx.fillText('Vestibule', centerX, centerY + 40);
        this.ctx.fillText('Ampoule', centerX + radius, centerY - radius / 2 - 40);
        this.ctx.fillText('Endolymphe', centerX - radius / 2, centerY + 10);

        // Dessiner l'endolymphe en mouvement
        this.drawEndalymph(centerX, centerY - radius / 2, radius, 'post');
    }

    drawHorizontalCanal() {
        // Fond
        this.ctx.fillStyle = '#f0fdf4';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Titre
        this.ctx.fillStyle = '#15803d';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Canal Semi-Circulaire Horizontal', this.width / 2, 30);

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radiusX = this.width / 4;
        const radiusY = this.height / 4;

        // Draw horizontal ellipse (canal)
        this.ctx.strokeStyle = '#4ecdc4';
        this.ctx.lineWidth = 20;
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        this.ctx.stroke();

        // Ampules à droite et à gauche
        const ampuleRadius = 25;
        
        // Ampule droite
        this.ctx.fillStyle = '#c7a0e8';
        this.ctx.beginPath();
        this.ctx.arc(centerX + radiusX, centerY, ampuleRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Ampule gauche
        this.ctx.beginPath();
        this.ctx.arc(centerX - radiusX, centerY, ampuleRadius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = '#a78bcd';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Cupules
        this.ctx.fillStyle = '#95e1d3';
        this.ctx.beginPath();
        this.ctx.arc(centerX + radiusX, centerY, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(centerX - radiusX, centerY, 8, 0, Math.PI * 2);
        this.ctx.fill();

        // Vestibule central
        this.ctx.fillStyle = '#e0e7ff';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = '#818cf8';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Labels
        this.ctx.fillStyle = '#15803d';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Ampule D', centerX + radiusX, centerY - 40);
        this.ctx.fillText('Ampule G', centerX - radiusX, centerY - 40);

        // Dessiner l'endolymphe
        this.drawEndalymph(centerX, centerY, radiusX, 'horiz');
    }

    drawAnteriorCanal() {
        // Fond
        this.ctx.fillStyle = '#fefce8';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Titre
        this.ctx.fillStyle = '#b45309';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Canal Semi-Circulaire Antérieur', this.width / 2, 30);

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.min(this.width, this.height) / 3;

        // Draw semi-circle (canal)
        this.ctx.strokeStyle = '#4ecdc4';
        this.ctx.lineWidth = 20;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY + radius / 2, radius, 0, Math.PI, false);
        this.ctx.stroke();

        // Ampule à gauche
        this.ctx.fillStyle = '#c7a0e8';
        this.ctx.beginPath();
        this.ctx.arc(centerX - radius, centerY + radius / 2, 25, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = '#a78bcd';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Cupule
        this.ctx.fillStyle = '#95e1d3';
        this.ctx.beginPath();
        this.ctx.ellipse(centerX - radius, centerY + radius / 2, 8, 15, -Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Vestibule
        this.ctx.fillStyle = '#e0e7ff';
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = '#818cf8';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Labels
        this.ctx.fillStyle = '#b45309';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Ampoule Antérieure', centerX - radius, centerY + radius / 2 + 40);

        this.drawEndalymph(centerX, centerY + radius / 2, radius, 'ant');
    }

    drawEndalymph(centerX, centerY, radius, canalType) {
        // Simuler le mouvement de l'endolymphe
        const progress = simulator.animationProgress / 100;
        const angle = progress * Math.PI * 2;
        
        // Particules d'endolymphe en mouvement
        this.ctx.fillStyle = 'rgba(78, 205, 196, 0.3)';
        
        for (let i = 0; i < 5; i++) {
            const particleAngle = angle + (i / 5) * Math.PI * 2;
            const x = centerX + Math.cos(particleAngle) * (radius * 0.6);
            const y = centerY + Math.sin(particleAngle) * (radius * 0.6);
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Flèche de direction du courant
        this.ctx.strokeStyle = '#4ecdc4';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        
        const startAngle = angle;
        const endAngle = angle + Math.PI / 6;
        const startX = centerX + Math.cos(startAngle) * (radius * 0.5);
        const startY = centerY + Math.sin(startAngle) * (radius * 0.5);
        const endX = centerX + Math.cos(endAngle) * (radius * 0.5);
        const endY = centerY + Math.sin(endAngle) * (radius * 0.5);

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
    }

    drawOtoliths() {
        // Position relative aux données du simulateur
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        const otolithX = centerX + simulator.otoliths.position.x;
        const otolithY = centerY + simulator.otoliths.position.y;

        // Cristaux (otholites)
        this.ctx.fillStyle = '#ff6b6b';
        
        // Dessiner plusieurs cristaux
        for (let i = 0; i < 3; i++) {
            const x = otolithX + Math.random() * 20 - 10;
            const y = otolithY + Math.random() * 20 - 10;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5 + Math.random() * 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Trace du mouvement
        simulator.otoliths.trail.push({ x: otolithX, y: otolithY });
        if (simulator.otoliths.trail.length > 50) {
            simulator.otoliths.trail.shift();
        }

        this.ctx.strokeStyle = 'rgba(255, 107, 107, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        
        simulator.otoliths.trail.forEach((point, index) => {
            if (index === 0) {
                this.ctx.moveTo(point.x, point.y);
            } else {
                this.ctx.lineTo(point.x, point.y);
            }
        });
        
        this.ctx.stroke();
    }

    drawNystagmusIndicator() {
        const y = this.height - 60;
        
        // Fond
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(20, y - 30, this.width - 40, 50);

        // Titre
        this.ctx.fillStyle = '#1e40af';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Nystagmus simulé:', 30, y - 10);

        // Oscillation oculaire
        const startX = 300;
        const waveY = y + 10;
        const waveWidth = 200;
        const waveHeight = 15;

        this.ctx.strokeStyle = '#2563eb';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        const progress = simulator.animationProgress / 100;
        for (let i = 0; i <= waveWidth; i += 5) {
            const x = startX + i;
            const oscillation = Math.sin((progress * Math.PI * 4) + (i / waveWidth) * Math.PI * 2);
            const yOffset = waveY + oscillation * waveHeight;
            
            if (i === 0) {
                this.ctx.moveTo(x, yOffset);
            } else {
                this.ctx.lineTo(x, yOffset);
            }
        }
        
        this.ctx.stroke();

        // Légende du type
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '11px Arial';
        this.ctx.fillText('Type: ' + simulator.nystagmus.type, startX + 220, waveY + 5);
        this.ctx.fillText('Amplitude: ' + Math.round(simulator.nystagmus.amplitude) + '°', startX + 220, waveY + 18);
    }
}

// Créer l'instance de visualisation
let visualization;

window.addEventListener('load', () => {
    setTimeout(() => {
        visualization = new LabyrinthVisualization('labyrinthe');
        visualization.draw();
        
        // Stocker la fonction pour appel global
        window.drawLabyrinth = () => visualization.draw();
    }, 100);
});
