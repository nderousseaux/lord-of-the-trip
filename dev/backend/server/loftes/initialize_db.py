import os
import sys
import transaction
import datetime

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

from .models.Question import *
from .models.User import *
from .models.Challenge import *
from .models.CrossingPoint import *
from .models.Segment import *
from .models.UserSubscribe import *


def usage(argv):
    cmd = os.path.basename(argv[0])
    print("usage: %s <config_uri>\n" '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def pre():
    os.system("python setup.py develop && python setup.py install")


def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    pre()
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, "sqlalchemy.")
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)


def fill(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    pre()
    config_uri = argv[1]
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, "sqlalchemy.")
    Session = sessionmaker(bind=engine)
    session = Session()

    # DATA

    # User
    u = User(
        first_name="Missy",
        last_name="Of Gallifrey",
        pseudo="LeMaitre",
        email="lemaitre@gmail.com",
        password="Conquérantdelunivers",
    )
    session.add(u)
    session.commit()

    # Challenge
    c1 = Challenge(
        name="A la recherche d'Aslan",
        description="Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        start_date=datetime.datetime.now(),
        end_date="2020-03-18",
        map_url="/uploads/challenges/challenge_1.jpeg",
        level="1",
        scalling="4",
        admin_id="1",
    )
    session.add(c1)
    session.commit()

    c2 = Challenge(
        name="Oops, on a perdu Han Solo",
        description="Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
        start_date=datetime.datetime.now(),
        end_date="2020-03-18",
        map_url="/uploads/challenges/challenge_2.jpeg",
        level="2",
        scalling="4",
        admin_id="1",
    )
    session.add(c2)
    session.commit()

    us = UserSubscribe(user_id="1", challenge_id="1", subscribe_date="2020-03-18")
    session.add(us)
    session.commit()

    # Crossing points
    cp1 = CrossingPoint(
        name="L'armoire", challenge_id="1", position_x="0.10", position_y="0.10"
    )
    session.add(cp1)
    session.commit()

    cp2 = CrossingPoint(
        name="La passe du faune", challenge_id="1", position_x="0.10", position_y="0.10"
    )
    session.add(cp2)
    session.commit()

    cp3 = CrossingPoint(
        name="La passe du magicien",
        challenge_id="1",
        position_x="0.20",
        position_y="0.40",
    )
    session.add(cp3)
    session.commit()

    cp4 = CrossingPoint(
        name="Le carrousel des ours",
        challenge_id="1",
        position_x="0.30",
        position_y="0.40",
    )
    session.add(cp4)
    session.commit()

    cp5 = CrossingPoint(
        name="Le pont des centaures",
        challenge_id="1",
        position_x="0.30",
        position_y="0.50",
    )
    session.add(cp5)
    session.commit()

    cp6 = CrossingPoint(
        name="Le pont de la sorcière",
        challenge_id="1",
        position_x="0.20",
        position_y="0.50",
    )
    session.add(cp6)
    session.commit()

    cp7 = CrossingPoint(
        name="Le nid des griffons",
        challenge_id="1",
        position_x="0.20",
        position_y="0.50",
    )
    session.add(cp7)
    session.commit()

    cp8 = CrossingPoint(
        name="La table de pierre",
        challenge_id="1",
        position_x="0.20",
        position_y="0.50",
    )
    session.add(cp8)
    session.commit()

    cp9 = CrossingPoint(
        name="Cair Paravel", challenge_id="1", position_x="0.20", position_y="0.50"
    )
    session.add(cp9)
    session.commit()

    # segment
    s1 = Segment(
        name="A travers le bois d'entre les mondes",
        start_crossing_point_id="1",
        end_crossing_point_id="2",
        challenge_id="1",
    )
    session.add(s1)
    session.commit()

    s2 = Segment(
        name="La route d'Ettinsmoor",
        start_crossing_point_id="2",
        end_crossing_point_id="3",
        challenge_id="1",
    )
    session.add(s2)
    session.commit()

    s3 = Segment(
        name="La traversée du grand désert",
        start_crossing_point_id="2",
        end_crossing_point_id="3",
        challenge_id="1",
    )
    session.add(s3)
    session.commit()

    s4 = Segment(
        name="La traversée du Grand Océan Oriental",
        start_crossing_point_id="5",
        end_crossing_point_id="8",
        challenge_id="1",
    )
    session.add(s4)
    session.commit()

    # q = Question(nameQuestion='Question n°1',
    #     typeQuestion='Question trop cool',
    #     descriptionQuestion='C\'est une question bien sous tout raport',
    #     nbPoint='1',
    #     result='oui')
    # session.add(q)
    # session.commit()