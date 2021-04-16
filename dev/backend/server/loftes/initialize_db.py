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

from .models.User import *
from .models.Challenge import *
from .models.CrossingPoint import *
from .models.Segment import *
from .models.UserSubscribe import *
from .models.EventTypes import *


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

    #DATA

    #Constant - EventTypes
    et1 = EventTypes(code="START",
                     label="Départ du parcours")
    session.add(et1)

    et2 = EventTypes(code="ARRIVAL",
                     label="Arrivée à la fin du parcours")
    session.add(et2)

    et3 = EventTypes(code="MOVE",
                     label="Déplacement")
    session.add(et3)

    et4 = EventTypes(code="OBSTACLE_ARR",
                     label="Arrivée sur un obstacle")
    session.add(et4)

    et5 = EventTypes(code="OBSTACLE_REP",
                     label="Réponse à un obstacle")
    session.add(et5)

    et6 = EventTypes(code="OBSTACLE_REP_OK",
                     label="Réponse validée")
    session.add(et6)

    et7 = EventTypes(code="OBSTACLE_REP_KO",
                     label="Refus de la réponse par un administrateur ou par le système")
    session.add(et7)

    et8 = EventTypes(code="CROSS_PT_ARRIVAL",
                     label="Arrivée à un point de passage")
    session.add(et8)

    et9 = EventTypes(code="CHOOSE_SEGMENT",
                      label="Choix d'un segment")
    session.add(et9)

    session.commit()

    #User
    u = User(first_name='Missy',
             last_name='Of Gallifrey',
             pseudo='Le maitre',
             mail='lemaitre@gmail.com',
             password='Conquérantdelunivers')
             # is_admin=1)
    session.add(u)
    session.commit()

    c1 = Challenge(name='A la recherche d\'Aslan',
                    description='Fille d\'Eve et Fils d\'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous', 
                    end_date='2020-03-18',
                    map_url='/uploads/challenges/challenge_1.jpeg',
                    level='1',
                    scalling='1000',
                    admin_id='1')
    session.add(c1)
    session.commit()

    #Challenge
    cp1 = CrossingPoint(name='La table de pierre',
                        challenge_id='1',
                        position_x='0.2',
                        position_y='0.5')
    session.add(cp1)
    session.commit()

    cp2 = CrossingPoint(name='Le pont des centaures',
                        challenge_id='1',
                        position_x='0.788667',
                        position_y='0.183831')
    
    session.add(cp2)
    session.commit()

    cp3 = CrossingPoint(name='L\'armoire',
                        challenge_id='1',
                        position_x='0.142',
                        position_y='0.324511')
    session.add(cp3)
    session.commit()

    cp4 = CrossingPoint(name='La passe du faune',
                        challenge_id='1',
                        position_x='0.414841',
                        position_y='0.524986')
    session.add(cp4)
    session.commit()

    cp5 = CrossingPoint(name='La passe du magicien',
                        challenge_id='1',
                        position_x='0.2',
                        position_y='0.4')
    session.add(cp4)
    session.commit()

    #segment
    s1 = Segment(name='A travers le bois d\'entre les mondes',
                start_crossing_point_id='3',
                end_crossing_point_id='4',
                challenge_id='1',
                coordinates='[{"position_x": 0.08782608695652173,"position_y": 0.2761206218840732},{"position_x": 0.10782608695652174,"position_y": 0.4093724556249045}]')
    session.add(s1)
    session.commit()

    # s2 = Segment(name='La route d\'Ettinsmoor',
    #             start_crossing_point_id='4',
    #             end_crossing_point_id='5',
    #             challenge_id='1')
    #             #,coordinates='[{"position_x": 0.7869565217391304,"position_y": 0.17832111088162822},{"position_x": 0.7504347826086957,"position_y": 0.15387123313101697},{"position_x": 0.7147826086956521,"position_y": 0.1392013064806502},{"position_x": 0.6895652173913044,"position_y": 0.13186634315546683},{"position_x": 0.6608695652173913,"position_y": 0.1306438492679363}]')
    # session.add(s2)
    # session.commit()

    # s3 = Segment(name='La traversée du grand désert',
    #             start_crossing_point_id='4',
    #             end_crossing_point_id='5',
    #             challenge_id='1',
    #             coordinates='[{"position_x": 0.7869565217391304,"position_y": 0.17832111088162822},{"position_x": 0.7504347826086957,"position_y": 0.15387123313101697},{"position_x": 0.7147826086956521,"position_y": 0.1392013064806502},{"position_x": 0.6895652173913044,"position_y": 0.13186634315546683},{"position_x": 0.6608695652173913,"position_y": 0.1306438492679363}]')
    # session.add(s3)
    # session.commit()

    cp6 = CrossingPoint(name='Cair Paravel',
                        challenge_id='1',
                        position_x='0.486',
                        position_y='0.324923')
    session.add(cp6)
    session.commit()

    cp7 = CrossingPoint(name='Le nid des griffons',
                        challenge_id='1',
                        position_x='0.636001',
                        position_y='0.260419')
    session.add(cp7)
    session.commit()

    cp8 = CrossingPoint(name='Le pont de la sorcière',
                        challenge_id='1',
                        position_x='0.636001',
                        position_y='0.260419')
    session.add(cp8)
    session.commit()
   
    c2 = Challenge(name='Oops, on a perdu Han Solo',
                    description='Leia Organa, Lando Calrissian et le reste de l\'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n\'attends pas', 
                    end_date='2020-03-18',
                    map_url='/uploads/challenges/challenge_2.jpeg',
                    level='2',
                    scalling='4200',
                    admin_id='1')
    session.add(c2)
    session.commit()

    c3 = Challenge(name='A travers le bois d\'entre les mondes',
                    description='Vous venez d\'arriver en plein milieu d\'une foret, des bruits inquiténat se font entendre vous devez en sortir. Ou est la sortie ?', 
                    end_date='2020-03-18',
                    map_url='/uploads/challenges/challenge_3.jpeg',
                    level='2',
                    scalling='4200',
                    admin_id='1')
    session.add(c3)
    session.commit()

    us = UserSubscribe(user_id='1',
                       challenge_id='1',
                       subscribe_date='2020-03-18')
    session.add(us)
    session.commit()

    #Crossing points
    


    #segment


    # s3 = Segment(name='La traversée du grand désert',
    #             start_crossing_point_id='2',
    #             end_crossing_point_id='3',
    #             challenge_id='1')
    # session.add(s3)
    # session.commit()

    # s4 = Segment(name='La traversée du Grand Océan Oriental',
    #             start_crossing_point_id='5',
    #             end_crossing_point_id='8',
    #             challenge_id='1')
    # session.add(s4)
    # session.commit()

    # q = Question(nameQuestion='Question n°1', 
    #     typeQuestion='Question trop cool', 
    #     descriptionQuestion='C\'est une question bien sous tout raport', 
    #     nbPoint='1', 
    #     result='oui')
    # session.add(q)
    # session.commit()