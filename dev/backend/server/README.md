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

    python setup.py develop
    python setup.py install 

    env/bin/pserve development.ini --reload

    env/bin/initialize_loftes_db development.ini