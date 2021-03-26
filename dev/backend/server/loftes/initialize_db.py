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
from .models.entity.User import *
from .models.entity.Challenge import *
from .models.entity.CrossingPoint import *
from .models.entity.Segment import *
from .models.entity.UserSubscribe import *



def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
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

    #User
    u = User(first_name='Missy',
             last_name='Of Gallifrey',
             pseudo='Le maitre',
             mail='lemaitre@gmail.com')
             #password='Conquérantdelunivers',
             #is_admin='1')
    session.add(u)
    session.commit()

    #Challenge
    c1 = Challenge(name='A la recherche d\'Aslan',
                    description='Fille d\'Eve et Fils d\'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous', 
                    end_date='2020-03-18',
                    map_url='Map/Narnia.jpg',
                    level='1',
                    scalling='4',
                    admin_id='1')
    session.add(c1)
    session.commit()
    
    c2 = Challenge(name='Oops, on a perdu Han Solo',
                    description='Leia Organa, Lando Calrissian et le reste de l\'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n\'attends pas', 
                    end_date='2020-03-18',
                    map_url='Map/Tatoine.jpg',
                    level='2',
                    scalling='4',
                    admin_id='1')
    session.add(c2)
    session.commit()

    us = UserSubscribe(user_id='1',
                       challenge_id='1',
                       subscribe_date='2020-03-18')
    session.add(us)
    session.commit()

    #Crossing points
    cp1 = CrossingPoint(name_crossing='L\'armoire',
                        x_position='0.10',
                        y_position='0.10')
    session.add(cp1)
    session.commit()

    cp2 = CrossingPoint(name_crossing='La passe du faune',
                        x_position='0.10',
                        y_position='0.10')
    session.add(cp2)
    session.commit()

    cp3 = CrossingPoint(name_crossing='La passe du magicien',
                        x_position='0.20',
                        y_position='0.40')
    session.add(cp3)
    session.commit()

    cp4 = CrossingPoint(name_crossing='Le carrousel des ours',
                        x_position='0.30',
                        y_position='0.40')
    session.add(cp4)
    session.commit()

    cp5 = CrossingPoint(name_crossing='Le pont des centaures',
                        x_position='0.30',
                        y_position='0.50')
    session.add(cp5)
    session.commit()

    cp6 = CrossingPoint(name_crossing='Le pont de la sorcière',
                        x_position='0.20',
                        y_position='0.50')
    session.add(cp6)
    session.commit()

    cp7 = CrossingPoint(name_crossing='Le nid des griffons',
                        x_position='0.20',
                        y_position='0.50')
    session.add(cp7)
    session.commit()

    cp8 = CrossingPoint(name_crossing='La table de pierre',
                        x_position='0.20',
                        y_position='0.50')
    session.add(cp8)
    session.commit()


    cp9 = CrossingPoint(name_crossing='Cair Paravel',
                        x_position='0.20',
                        y_position='0.50')
    session.add(cp9)
    session.commit()

    #segment
    s1 = Segment(name_segment='A travers le bois d\'entre les mondes',
                start_crossing_point_id='1',
                end_crossing_point_id='2',
                challenge_id='1')
    session.add(s1)
    session.commit()

    s2 = Segment(name_segment='La route d\'Ettinsmoor',
                start_crossing_point_id='2',
                end_crossing_point_id='3',
                challenge_id='1')
    session.add(s2)
    session.commit()

    s3 = Segment(name_segment='La traversée du grand désert',
                start_crossing_point_id='2',
                end_crossing_point_id='3',
                challenge_id='1')
    session.add(s3)
    session.commit()

    s4 = Segment(name_segment='La traversée du Grand Océan Oriental',
                start_crossing_point_id='5',
                end_crossing_point_id='8',
                challenge_id='1')
    session.add(s4)
    session.commit()

    # q = Question(nameQuestion='Question n°1', 
    #     typeQuestion='Question trop cool', 
    #     descriptionQuestion='C\'est une question bien sous tout raport', 
    #     nbPoint='1', 
    #     result='oui')
    # session.add(q)
    # session.commit()