# Lord of the Trips - Choix technologiques

## Général

Dans ce document, nous allons vous présenter les différents choix techniques que nous avons fait concernant l'application.

## API

Le choix des technologies possibles pour une API est vaste : Java, PHP, Python , C#, ... Chaque langage ayant ses spécificités, ses avantages et ses inconvénients. Après avoir étudié plusieurs options, nous avons arrêté notre choix sur Python et le framewok Pyramid.

### Pourquoi choisir Python et Pyramid ?

La première raison qui nous a fait choisir Python, a été le souhait d'apprendre une nouvelle technologie, même si celle-ci été connu d'un des membres de l'équipe. D'autres critères beaucoup plus raisonnés ont motivé notre choix.

 - Tout d'abord Python est un langage relativement facile à apprendre et donc cela ne pouvais être qu'un atout dans la réalisation du projet. Nous aurions eu une phase d'apprentissage quelque soit le langage choisi, autant prendre celui qui serait le plus aisé à apprendre.
 - le langage python dispose d'un des dépôt de recensement de paquage performant et très complet  **PyPI**. Son objectif est de doter la communauté des développeurs Python d'un catalogue complet recensant tous les paquets Python libres, ce qui facile la recherche et l'installation des bibliothèques
 - Le possibilité de créer facilement des environnements virtuel de développement et basculer rapidement entre eux, ce qui permettra de tester de façon sécurisé l'installation d'une nouvelle librairies ou de tester plusieurs librairies pour une même fonctionnalités sans encombrer l'environnement de développement. 
 - Python a récemment retrouvé ses lettres de noblesses, en étant très utilisé dans le domaine du traitement de données (machine learning, BI, etc). Il dispose d'un écosystème très fourni dans ce domaine, et représente aussi un atout du point de vue professionnel.

Pour utiliser Pyton, nous avons choisi d'utiliser le framework [Pyramid](https://trypyramid.com/). Il s'agit d'un micro-framework, il est donc plus facile à apprendre et bien plus léger à implémenter, ce qui convient à une apllication de petite taille comme la notre. De plus, Il consomme moins de ressources et n’impose rien. Chaque fonctionnalité peut être implémentée par la bibliothèque externe de son choix. Autre point fort de Pyramid, sa documentation est riche et précise. 


###  Les  librairies Python implémentés dans le projet

-   [SQL Alchemy](https://www.sqlalchemy.org/) pour l'ORM pour l'ORM pour la création et l'interaction avec la base de données :  
Nous avons choisir de passer  par un ORM car il permet d'accéder aux SGBD de façon uniforme quelque soit le SGBD utilisé. Il nous permettra 
	-	De creer les tables au travers de classes qui seront directement mapper à la base de données
	-	De créer des scripts qui dialogue avec la base de données sans émettre d’ordres SQL.
	-	De créer des traitement sans réellement prendre en compte les spécificités liés à un SGBD particulier.

-   [PyMySQL](https://pypi.org/project/PyMySQL/) pour la connexion à la base de données :
PyMySQL est une librairie pour se connecter à un serveur de base de données MySQL depuis Python. Il contient une bibliothèque cliente MySQL pure Python. 

-   [Marshmallow](https://marshmallow.readthedocs.io/en/stable/) pour la génération et le traitement des fichiers JSON. Elle permet:
    - De transformer facilement un objet python en JSON et inversement de transformer un fichier JSON en objet Python. 
    - D'ajouter des contrôles et traitements sur les donneés en entrée et en sortie de l'API.

-   [Cornice](https://cornice.readthedocs.io/en/latest/) pour la contruction des routes. Cette librairie permet de créer facilement les routes de l'API et de normaliser le codes utilisé.

## Web

Dans le développement de page web, HTML et CSS sont incontournables pour la mise en page et le graphisme. L'interactivité des pages se fait à l'aide de JavaScript, la majeure partie des navigateurs disposant d'un moteur JavaScript dédié pour l'interpréter. Nous avons aussi décidé d'utiliser la bibliothéque **ReactJS**

###  Pourquoi choisir React JS 

 Plusieurs raisons ont motivé ce choix:
- Le gain de temps et d'efficacité, de nombreuses fonctionnalités sont déjà présentes ce qui nous dispensent de les développer.
- Les normes de développement implémenter permette de poser un cadre et de donner une base commune à tous les développeurs qui seront sur le projet.
- La possibilité de créer des composants autonomes qui seront réutilisé encore et encore. 
- Sa pérennité, l'application existe depuis 2013. Il s'agit de plus bibliothèque développée et utilisé par Facebook. Il y très  peu de chance qu'elle disparaisse du jour au lendemain ou ne soit plus maintenue, 
- Sa grande communauté est importante et étant donné qu'il est 100% open source. De ce fait, React est sans cesse mis à jour et s’adapte en permanence aux contraintes de développement. 
- La maitrise de l'outil par l'équipe et la possibilité de nous appuyer sur les professeurs si nous rencontrons des difficultés.
- Sa popularité nous laisse à penser qu'il peut représenter un atout du point de vue professionnel.

###  Les  libriaries React JS implémentés dans le projet

## Mobile

Dans l’écosystème mobile, deux acteurs se taillent la part du Apple (avec iOs) et Google (avec Android). D’autres plateformes existes (RIM avec BlackBerry ou Windows avec Windows Phone), mais ils restent marginales
Lorsque l’on fait du développement pour mobile, il convient de bien choisir son périmètre ( un seul os, les eux, ..), de définir le type de développement(natif ou multiplateformes) et de bien entendu le choix de l’outil de développement. Nous avons décidé de nous orienter vers du développement multiplateformes et choisi le framework React Native.

### Pourquoi React Native

- React Native permet de développer des applications qui fonctionne à la fois sur IOS et Android, nous permettant de coder une seule application pour ces deux plateformes.  Nous avons 1 seul code et donc uniformité du code et, de la logique, mais aussi de l’apparence et  de l’expérience utilisateur. 
De plus, toutes les mises à jour et correctifs seront également automatiquement reflétés partout. 


- React Native est un framework basé sur la librairie React, nous avons déjà dans l'équipe des compétences en React. De plus, nous avons fait le choix de développer notre client web en React, ce qui permet de s'appuyer sur plusieurs ressources en cas de problème.

- React Native dispose d'une excellente documentation, ainsi que d'une importante communauté en ligne ce qui nous aidera en cas de blocage.

###  Les  libriaries React Native implémentés dans le projet
