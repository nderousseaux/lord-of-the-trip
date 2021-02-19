# iutrs_absences

## Premier démarrage
Les commandes suivantes sont à faire avec un virtualenv de définit.

    pip install -r requirements.dev
    pip install -r requirements.in
    pip install -r requirements.txt
    python setup.py develop
    python setup.py install
    cp example.ini development.ini
    sed -i -e "s/user/{VOTRE USERNAME}/g" development.ini 
    sed -i -e "s/password/{VOTRE PASSWORD}/g" development.ini 
    sed -i -e "s/adresse/{ADRESSE DE LA BASE}/g" development.ini 
    sed -i -e "s/base/{NOM DE LA BASE}/g" development.ini 




### Lancement :

    pserve development.ini