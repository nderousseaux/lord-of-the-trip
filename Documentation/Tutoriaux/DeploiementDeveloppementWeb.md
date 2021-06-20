# Lord of the Trips Déploiement de l'environnement de développement Web

## Général

Dans ce document, nous allons vous présenter les étapes nécessaires aux déploiement de l'environnement de développement pour l’application web Lord of the Trips

## Déploiement

### Pré-requis

Vous devez avoir sur votre poste :

#### Pour le client web

* NodeJs, pour plus de détails allez sur https://nodejs.org/en/, NodeJs est nécessaire pour lancer une application react

#### Pour le serveur

* Pour que le client fonctionne, il faut avoir un serveur pour utiliser l'API :
Voir : [API en developpement](https://git.unistra.fr/acrobatt-1/lord-of-the-trips/-/blob/master/Documentation/Tutoriaux/DeploiementDeveloppementAPI.md) ou [API en production](https://git.unistra.fr/acrobatt-1/lord-of-the-trips/-/blob/master/Documentation/Tutoriaux/MiseEnProductionAPI.md)


### Installation du projet

- Cloner le repository : `git clone git@git.unistra.fr:acrobatt-1/lord-of-the-trips.git`
- Aller dans le dossier de l'application web : `cd lord-of-the-trips/dev/frontend/web/lord-of-the-trips`
- Installer les dépendances avec npm: `npm i`
- Lancer l'application react : `npm start`

### Connection à l'API :

Une fois votre serveur déployé, il vous suffit de spécifier son url dans la variable `urlPrefix` qui se trouve dans le fichier `src/api/fetchUtils.js` pour connecter le client web à l'API.
