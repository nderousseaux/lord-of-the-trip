# iutrs_absences

## Premier démarrage
Les commandes suivantes sont à faire avec un virtualenv de définit.

    git clone git@git.unistra.fr:n.derousseaux/iutrs_absences.git
    cd iutrs_absences
    pip install -r requirements.dev
    python setup.py develop
    python setup.py install
    cp example.ini development.ini
    sed -i -e "s/user/{VOTRE USERNAME}/g" development.ini 
    sed -i -e "s/password/{VOTRE PASSWORD}/g" development.ini 
    sed -i -e "s/adresse/{ADRESSE DE LA BASE}/g" development.ini 
    sed -i -e "s/base/{NOM DE LA BASE}/g" development.ini 




### Lancement :

    pserve development.ini







## Mini cahier des charges
Ce projet est une application développée en Python Pyramid et en Vue.js. 

Pour commencer, l'application devra prendre un paramètre : le numéro de séance, elle ressortira ensuite le trombinoscope des élèves devant assister au cours. Le professeur devra ensuite indiquer qui est présent.

Elle devra implémenter les fonctionnalités suivantes :
- Faire l'appel au début d'une séance et noter les absences.
- Pouvoir revenir sur une séance afin de noter des élèves présents, ou en retard, (et inclure une excuse sur l'absence/retard si besoin)
- Les élèves dispensés d'un cours ne devront pas apparaitre sur le trombinoscope.
- Proposer deux types de remplissages : 
    - Absent par défaut : le professeur devra décocher tous les élèves présents.
    - Présent par défaut : le professeur devra cocher les élèves absents.

Afin d'éviter les allez-retour incessant à l'api, les données ne seront envoyées que lors de la confirmation de l'utilisateur, en cliquant sur un bouton "valider".





Par la suite il faudra inclure cette vue à une application plus large. Un enseignant connecté pourra voir toute sa semaine, et les appels qu'il doit effectuer.

Le secrétariat devra avoir accès aux vues des agendas d'appel de tout les enseignants. Ainsi, il sera possible de faire l'appel à la place d'un enseignant.


Le secrétariat devra aussi avoir accès à l'agenda des cours d'un élève, afin de l'excuser de ses absences. On pourra excuser une séance en particulier, toute une moitié de journée, une journée complète ou toute la semaine.