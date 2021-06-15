# API Lord of the Trips

## Choix techniques

### Technologies

### Architecture et communication

## Normes de développement

### Règles de nommage

Pour les différents éléments de code, les règles de nommage sont les suivantes :

* Variables et fonctions sont en minuscules et dans le cas où il y aurait plusieurs mots, ils doivent être séparés par "\_", ex : ma_variable
* Constantes sont en majuscule et dans le cas de plusieurs mots, séparés par "\_", ex : MA_CONSTANTE
* Classes s'écrivent avec un ou plusieurs mots concaténés, dont chaque première lettre est en majuscule : MaClasse

La langue utilisé pour la definition des différents éléments est l'anglais et il convient dans la mesure du possible de définirun nom ayant du sens, par exemple segments_list pour une liste de segments.

### Architecture des fichiers

L'ensemble des fichiers et répertoires de l''API se trouvent dans le répertoires backend/server.

A ce niveau se trouve :

* Les fichiers nécessaires au framework pyramid, à python et au déploiement de l'API
* Le fichier contenant l'environnement virtuel créé pour le projet
* Le fichier loftes qui contient les répertoires et les fichiers de l'API

Dans le fichier loftes, nous avons des répertoires dédié au différents type de fichiers

* models : ici vous trouverez les classe définissant les tables de la base de données, 1 classe = 1 tables
* views : fichier contenant les vues de l'API, c'est dans ce fichier que se trouve les routes d'accès à la base de données, nous avons un fichier par entités de la base de données, ainsi qu'une fichier pour la partie authentification
* ressources : dans ce fichier, vous trouverez différentes fonctions qui permettent d'interagir avec les données, comme par exemple la fonction de validation des parcours.
* marshmallow_schema : dans le fichier nous avons mis en place les classes définissant les différents json renvoyés par l'API
* security : fichiers servant à la sécurité de l'API, tel que la gestions des mots de passe
* services : fichier des services, comme par exemple les messages de retour des réponse HTTP 

## Règles de gestion

### Règles de creation/modification des données en base

### Règles de validation des challenges

### Règles des évenements utilisateur sur un parcours

## Le code plus en détail

### Titre 1

### Titre 2


