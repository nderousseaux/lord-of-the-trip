# iutrs_absences

## Premier démarrage
Les commandes suivantes sont à faire avec un virtualenv de définit.

    env/bin/pip install -r requirements.dev
    env/bin/pip install -r requirements.in
    env/bin/pip install -r requirements.txt

    env/bin/python setup.py develop && env/bin/python setup.py install
    
    cp example.ini development.ini
    sed -i -e "s/user/{VOTRE USERNAME}/g" development.ini 
    sed -i -e "s/password/{VOTRE PASSWORD}/g" development.ini 
    sed -i -e "s/adresse/{ADRESSE DE LA BASE}/g" development.ini 
    sed -i -e "s/base/{NOM DE LA BASE}/g" development.ini 


### Lancement :

    env/bin/python setup.py develop
    env/bin/python setup.py install 

    env/bin/pserve development.ini --reload

    env/bin/initialize_loftes_db development.ini


## Spécialement pour vous 

    Pour éviter d'avoir à faire python setup.py develop/install à chaque fois, j'ai fais un script.

    Lancer le serveur : 
    `env/bin/server_start`

    Créer la base : 
    `env/bin/initialize_loftes_db development.ini`

    Remplir la base avec les données :
     `env/bin/fill_loftes_db development.ini`