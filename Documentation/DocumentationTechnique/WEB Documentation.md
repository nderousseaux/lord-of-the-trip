# Web site Lord of the Trips

## Choix techniques

### Technologies

- Langage [Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript)
- Framework [React](https://fr.reactjs.org/)
- Librairie [ReactQuery](https://react-query.tanstack.com/) pour les requêtes à l'API
- Librairie [ReactRouter](https://reactrouter.com/) pour le routage dans l'application Web
- Librairie [KonvaJs](https://konvajs.org/), plus particulièrement la version adaptée à react [ReactKonva](https://konvajs.org/docs/react/index.html) pour créer les cartes des challenges
- Librairie [MaterialUI](https://material-ui.com/) pour le design de l'application

### Architecture et communication

- Le client web communique avec une API via des requêtes HTTP qui répond avec des données en JSON, pour plus de détails sur l'API, [DocumentationTechniqueAPI](https://git.unistra.fr/acrobatt-1/lord-of-the-trips/-/blob/master/Documentation/DocumentationTechnique/API%20Documentation.md)
- Pour le détails des routes, [APIdoc](https://hephaistos.nathanaelderousseaux.fr/apidoc/). Séléctionnez la version 0.3 pour avoir toutes les dernières routes
- Pour connecter le client web à l'API, il vous suffit de spécifier son url dans la variable `urlPrefix` qui se trouve dans le fichier `src/api/fetchUtils.js` pour connecter le client web à l'API.
- NB : L'application web se situe dans le dossier `/dev/frontend/web/lord-of-the-trips`

## Normes de développement

### Règles de nommage

Pour les différents éléments de code, les règles de nommage sont les suivantes :
* Les noms des fichiers sont en Camel case, ex : editMap.js
* Les composants sont en Pascal case, ex : EditMap
* Les variables et fonctions sont en Camel case, ex : crossingPoints

La langue utilisé dans le code pour les fichiers/commentaires/variables/... est l'anglais, mais tout ce qui est affiché à l'utilisateur est en français. L'application est prévue pour des utilisateurs français.

### Architecture des fichiers

## Règles de gestion

## Le code plus en détail

### Titre 1

### Titre 2

