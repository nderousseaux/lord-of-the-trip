# iutrs_absences

## Lancer le projet
- Cloner le répo
- Installer un environnement virtuel
    - Sur Debian : `python3 -m venv env`
    - Sur mac : `virtualenv env`
- Activer l'environnement virutel : `source env/bin/activate`
- Préparer les scripts que j'ai fait pour vous : `python setup.py develop && python setup.py install`
- Installer les dependances : `./dependencies.sh`
- Lancer le serveur : `server_start`

## Base de données
- Créer la base de données : `initialize_loftes_db`
- Remplir la base de données : `fill_loftes_db`