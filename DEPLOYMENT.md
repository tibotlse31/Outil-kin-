# 🚀 Guide de Déploiement - VPPB Simulator

## Déployer sur GitHub Pages

### Étape 1: Créer un repository GitHub

```bash
# Si ce n'est pas déjà fait
git init
git add .
git commit -m "Initial commit: VPPB Simulator v1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vppb-simulator.git
git push -u origin main
```

### Étape 2: Activer GitHub Pages

1. Allez sur: **Settings** → **Pages** (dans votre repo)
2. **Source:** Sélectionnez `main` branch
3. **Folder:** Sélectionnez `/ (root)` 
4. Cliquez **Save**
5. Attendez quelques minutes
6. Votre site sera disponible à: `https://YOUR_USERNAME.github.io/vppb-simulator/`

### Étape 3: Configuration du domaine personnalisé (optionnel)

1. Allez à **Settings** → **Pages**
2. Entrez votre domaine dans **Custom domain**
3. Créez un fichier `CNAME` à la racine avec votre domaine
4. Configurez les DNS de votre domaine

---

## Déployer sur Netlify

### Avec Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy
```

### Via GitHub (recommandé)

1. Connectez votre GitHub à Netlify
2. Sélectionnez le repository
3. Settings:
   - Build command: (vide - pas de build nécessaire)
   - Publish directory: `.` ou `./` (root)
4. Déployez

---

## Déployer sur Vercel

```bash
npm i -g vercel
vercel
```

Sélectionnez les paramètres par défaut. Votre app sera disponible à `https://vppb-simulator.vercel.app`

---

## Installation locale avancée

### Avec LiveServer VS Code

1. Installez l'extension "Live Server"
2. Click-droit sur `index.html`
3. "Open with Live Server"

### Avec Docker

Créez un `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g http-server
EXPOSE 8080
CMD ["http-server", "-p", "8080"]
```

Puis:

```bash
docker build -t vppb-simulator .
docker run -p 8080:8080 vppb-simulator
```

---

## Configuration pour développement

### Ajouter Prettier (formatage)

```bash
npm install --save-dev prettier
npx prettier --write .
```

Créez `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 4,
  "trailingComma": "es5"
}
```

### Ajouter ESLint (linting)

```bash
npm install --save-dev eslint
npx eslint --init
```

---

## Building et optimisation

### Minifier les fichiers

```bash
# Installer terser
npm install --save-dev terser

# Minifier JavaScript
terser js/simulator.js -o js/simulator.min.js -c -m
```

### Optimiser les images

```bash
# Avec ImageMagick
convert original.png -quality 80 optimized.png
```

---

## Testing

### Tester la performance

Utilisez Google Lighthouse:
1. Ouvrez DevTools (F12)
2. Onglet "Lighthouse"
3. "Analyze page load"

Objectif:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### Tester sur différents navigateurs

- Chrome/Edge ✓ (Support complet Canvas)
- Firefox ✓ (Support complet Canvas)
- Safari ✓ (Support complet Canvas)
- Mobile: iOS Safari, Chrome Mobile ✓

---

## Monitoring et Analytics

### Ajouter Google Analytics

Insérez dans `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Sentry pour le monitoring d'erreurs

```html
<script src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
</script>
```

---

## Maintenance

### Updates réguliers

```bash
# Vérifier les dépendances (si utilisées)
npm outdated

# Update
npm update
```

### Backups

```bash
# Créer une archive
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## Troubleshooting

### Les fichiers JS ne se chargent pas

- Vérifier les chemins dans `index.html`
- Vérifier la console (F12) pour les erreurs CORS
- Solution: Utiliser un serveur local

### Canvas vide

- Vérifier que la fonction `draw()` est appelée
- Vérifier `requestAnimationFrame` en console
- Vérifier que `simulator` n'est pas undefined

### Performance lente

- Réduire la fréquence de `requestAnimationFrame`
- Optimiser les fonctions `draw()`
- Utiliser WebGL pour plus de performance (future: Three.js)

---

## Pour les contributeurs

### Setup local

```bash
git clone https://github.com/YOUR_USERNAME/vppb-simulator.git
cd vppb-simulator
# Ouvrir avec votre éditeur
code .
# Ouvrir dans navigateur (serveur local)
python -m http.server 8000
```

### Workflow Git

```bash
# Créer une feature branch
git checkout -b feature/new-feature

# Commit
git add .
git commit -m "feat: Add new feature"

# Push
git push origin feature/new-feature

# Créer une Pull Request sur GitHub
```

---

## Checklist avant production

- [ ] Tous les liens fonctionnent
- [ ] Pas d'erreurs en console (F12)
- [ ] Responsive design (testez sur mobile)
- [ ] Performance acceptable (Lighthouse >85)
- [ ] Accessibility testée
- [ ] README complète
- [ ] LICENSE présente
- [ ] .gitignore configuré
- [ ] Version en `package.json` (si utilisé)

---

## Support et Contact

Pour des questions sur le déploiement:
- GitHub Issues: https://github.com/YOUR_USERNAME/vppb-simulator/issues
- Email: votre-email@example.com

---

**Bon déploiement! 🚀**
