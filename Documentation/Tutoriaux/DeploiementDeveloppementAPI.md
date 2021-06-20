# API Lord of the Trips déploiement de l'environnement de développement API

## Général

Dans ce document, nous allons vous présenter les étapes nécessaires aux déploiement de l'environnement de développement pour l’application Lord of the Trips

## Déploiement

### Pré-requis

Vous devez avoir sur votre poste

* Python 3.7.3, pour plus détails aller sur https://www.python.org/ et https://www.python.org/doc/
* SQL Server et SQL client pour l'utilisation de l'ORM
* virtualenv ou venv pour la création des environnements virtuels
* Un outil pour accéder à la base de données :  MAMP,  WAMP,  LAMP ou autre

### Installation du projet 

- Cloner le répository
- Installer un environnement virtuel
	- Sur Debian : `python3 -m venv env`
	- Sur mac : `virtualenv env`
- Activer l'environnement virtuel : `source env/bin/activate`
- Préparer les scripts que j'ai fait pour vous : `python setup.py develop && python setup.py install`
- Installer les dependances : `./dependencies.sh`
- Lancer le serveur : `server_start`
 
### Créer et alimenter la Base de données

- Créer la base de données : `initialize_loftes_db development.ini`
- Remplir la base de données : `fill_loftes_db development.ini`

**REM** : si vous désirez ajouter des données à l'initialisation de la base de données, il vous suffit de les ajouter dans le fichier initialize_db.py qui se trouve à la racine du répertoire loftes.
