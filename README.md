# Conclave Arizona

Observatoire statique du conclave budgétaire belge de l’automne 2026. Le site relie chiffres, acteurs, angles morts et sources dans un graphe explorable, puis permet de tester la crédibilité d’un paquet budgétaire sans confondre simulation et prévision.

## Publication GitHub Pages

Le paquet est déjà compilé : aucun `npm install`, générateur ou serveur n’est requis.

1. Décompressez le ZIP.
2. Placez **le contenu** du dossier à la racine de `yannkeep/conclave-arizona`.
3. Committez puis poussez sur `main`.
4. Dans **Settings → Pages**, choisissez **Deploy from a branch**, branche `main`, dossier `/ (root)`.
5. Le site sera disponible à `https://yannkeep.github.io/conclave-arizona/`.

La présence de `.nojekyll` empêche GitHub Pages de transformer les fichiers. Tous les chemins sont relatifs et compatibles avec un site de projet.

## Ce que contient le site

- graphe SVG de 37 nœuds : mesures, risques, coalition et preuves ;
- pan, zoom, déplacement de nœuds, filtres, recherche et export SVG ;
- simulateur transparent du montant facial au rendement net ;
- douze angles morts filtrables et sauvegardables ;
- carte interactive des cinq partis et matrice des tensions ;
- audit comparatif des quatre annexes et protocole de preuve ;
- trois scénarios qualitatifs, chronologie 2025–2035 et checklist exportable ;
- registre filtrable de 26 sources principales ;
- recherche globale avec raccourci `/` ;
- favoris et progression conservés uniquement dans `localStorage` ;
- mode sombre/clair, navigation clavier, alternative textuelle au graphe et impression ;
- manifeste PWA et consultation hors ligne du shell ;
- métadonnées SEO, Schema.org, sitemap et page 404 ;
- aucun traqueur, cookie, framework ou appel API côté visiteur.

## Mise à jour éditoriale

Les données sont centralisées dans `assets/data.js` et exposées dans `assets/dataset.json`. La date d’arrêté est le **31 août 2026**. Après le conclave, requalifiez chaque mesure selon les cinq statuts du site et ajoutez sa base juridique, son profil annuel et sa source primaire.

Si vous modifiez les fichiers du shell, incrémentez la constante `CACHE` dans `sw.js` pour forcer le renouvellement hors ligne.

## Tests rapides avant publication

Ouvrez `index.html` depuis un petit serveur local, par exemple :

```bash
python3 -m http.server 8080
```

Puis vérifiez : graphe, trois préréglages, recherche `/`, favoris, export SVG, filtres de sources, mode clair et largeur mobile.

## Licences

Le code du site est publié sous licence MIT. Les contenus analytiques peuvent être réutilisés sous CC BY 4.0 avec attribution à « Conclave Arizona — analyse indépendante » et mention de la date d’arrêté. Les documents et sites tiers restent soumis à leurs propres droits.
