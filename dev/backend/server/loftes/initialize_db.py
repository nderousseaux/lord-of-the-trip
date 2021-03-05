import os
import sys
import transaction

from sqlalchemy import engine_from_config

from sqlalchemy.orm import sessionmaker

from pyramid.paster import (
    get_appsettings,
    setup_logging,
    )

from .models import (
    DBSession,
    Base,
    )

from .models.entity.Question import *


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def pre():
    os.system("env/bin/python setup.py develop && env/bin/python setup.py install)

def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    pre()
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)

def fill(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    pre()
    config_uri = argv[1]
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    Session = sessionmaker(bind=engine)
    session = Session()

    #DATA
    q = Question(nameQuestion='Question n°1', 
        typeQuestion='Question trop cool', 
        descriptionQuestion='C\'est une question bien sous tout raport', 
        nbPoint='1', 
        result='oui')
    session.add(q)
    session.commit()