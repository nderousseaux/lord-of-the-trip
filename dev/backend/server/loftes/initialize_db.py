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
from loftes.security.PasswordUtils import PasswordUtils

from .models.User import *
from .models.Challenge import *
from .models.CrossingPoint import *
from .models.Segment import *
from .models.UserChallenge import *
from .models.EventType import *
from .models.Obstacle import *


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

    # DATA

    # Constant - EventTypes
    et1 = EventType(code="START", label="Départ du parcours")
    session.add(et1)

    et2 = EventType(code="ARRIVAL", label="Arrivée à la fin du parcours")
    session.add(et2)

    et3 = EventType(code="MOVE", label="Déplacement")
    session.add(et3)

    et4 = EventType(code="OBSTACLE_ARR", label="Arrivée sur un obstacle")
    session.add(et4)

    et5 = EventType(code="OBSTACLE_REP", label="Réponse à un obstacle")
    session.add(et5)

    et6 = EventType(code="OBSTACLE_REP_OK", label="Réponse validée")
    session.add(et6)

    et7 = EventType(
        code="OBSTACLE_REP_KO",
        label="Refus de la réponse par un administrateur ou par le système",
    )
    session.add(et7)

    et8 = EventType(
        code="CROSS_PT_ARRIVAL",
        label="Arrivée à un point de passage",
    )
    session.add(et8)

    et9 = EventType(code="CHOOSE_SEGMENT", label="Choix d'un segment")
    session.add(et9)

    session.commit()

    # User
    u1 = User(
        first_name="Missy",
        last_name="Of Gallifrey",
        pseudo="LeMaitre",
        email="lemaitre@gmail.com",
        password=PasswordUtils().hash_password("Conquérantdelunivers"),
        is_admin=True,
    )

    session.add(u1)
    session.commit()

    u2 = User(
        first_name="Daenerys",
        last_name="Targaryen",
        pseudo="motherOfDragons",
        email="d.targaryen@gmail.com",
        password=PasswordUtils().hash_password("khaldrogo"),
        is_admin=True,
    )

    session.add(u2)
    session.commit()

    u3 = User(
        first_name="Bilbo",
        last_name="Baggins",
        pseudo="ring_bearer",
        email="littlehobbit@yahoo.com",
        password=PasswordUtils().hash_password("theshire"),
        is_admin=False,
    )

    session.add(u3)
    session.commit()

    c1 = Challenge(
        name="A la recherche d'Aslan",
        description="Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        start_date=datetime.datetime.now(),
        end_date="2022-03-18 12:00:00",
        map_url="/uploads/challenges/challenge_1.jpeg",
        level="1",
        scalling=1000,
        step_length=0.7,
        draft=False,
        admin_id=1,
    )

    session.add(c1)
    session.commit()

    # Challenge
    cp1 = CrossingPoint(
        name="L'armoire",
        challenge_id="1",
        position_x="0.142",
        position_y="0.324511",
    )
    session.add(cp1)
    session.commit()

    cp2 = CrossingPoint(
        name="La passe du faune",
        challenge_id="1",
        position_x="0.524667",
        position_y="0.335221",
    )

    session.add(cp2)
    session.commit()

    cp3 = CrossingPoint(
        name="Le nid des griffons",
        challenge_id="1",
        position_x="0.794001",
        position_y="0.262905",
    )
    session.add(cp3)
    session.commit()

    cp4 = CrossingPoint(
        name="Le pont des centaures",
        challenge_id="1",
        position_x="0.508841",
        position_y="0.485851",
    )
    session.add(cp4)
    session.commit()

    cp5 = CrossingPoint(
        name="La passe du magicien",
        challenge_id="1",
        position_x="0.292667",
        position_y="0.654686",
    )
    session.add(cp5)
    session.commit()

    cp6 = CrossingPoint(
        name="L'antre du dragon",
        challenge_id="1",
        position_x="0.477333",
        position_y="0.665706",
    )
    session.add(cp6)
    session.commit()

    cp7 = CrossingPoint(
        name="Cair Paravel",
        challenge_id="1",
        position_x="0.746667",
        position_y="0.480433",
    )
    session.add(cp7)
    session.commit()

    cp8 = CrossingPoint(
        name="La table de pierre",
        challenge_id="1",
        position_x="0.2",
        position_y="0.5",
    )
    session.add(cp8)
    session.commit()

    cp9 = CrossingPoint(
        name="Le pont de la sorcière",
        challenge_id="1",
        position_x="0.615334",
        position_y="0.615723",
    )
    session.add(cp9)
    session.commit()

    # segment
    s1 = Segment(
        name="A travers le bois d'entre les mondes",
        start_crossing_point_id="1",
        end_crossing_point_id="2",
        challenge_id="1",
        coordinates='[{"position_x": 0.17866666666666667,"position_y": 0.31105390366024877},{"position_x": 0.21666666666666667,"position_y": 0.3007552424862014},{"position_x": 0.264,"position_y": 0.29354617966436825},{"position_x": 0.2886666666666667,"position_y": 0.290456581312154},{"position_x": 0.31533333333333335,"position_y": 0.29354617966436825},{"position_x": 0.35933333333333334,"position_y": 0.3038448408384156},{"position_x": 0.392,"position_y": 0.3059045730732251},{"position_x": 0.4226666666666667,"position_y": 0.31311363589505825},{"position_x": 0.44666666666666666,"position_y": 0.31826296648208197},{"position_x": 0.478,"position_y": 0.3254720293039151},{"position_x": 0.496,"position_y": 0.32856162765612934},{"position_x": 0.512,"position_y": 0.33268109212574826}]',
    )
    session.add(s1)
    session.commit()

    s2 = Segment(
        name="La traversée du grand désert",
        start_crossing_point_id="2",
        end_crossing_point_id="3",
        challenge_id="1",
        coordinates='[{"position_x": 0.5553333333333333,"position_y": 0.31105390366024877},{"position_x": 0.5853333333333334,"position_y": 0.2925163135469635},{"position_x": 0.6046666666666667,"position_y": 0.2863371168425351},{"position_x": 0.6273333333333333,"position_y": 0.28530725072513036},{"position_x": 0.6553333333333333,"position_y": 0.28736698295993984},{"position_x": 0.6713333333333333,"position_y": 0.28839684907734453}]',
    )
    session.add(s2)
    session.commit()

    s3 = Segment(
        name="La traversée des monts",
        start_crossing_point_id="1",
        end_crossing_point_id="4",
        challenge_id="1",
        coordinates='[{"position_x": 0.162,"position_y": 0.34332303676742726},{"position_x": 0.19133333333333333,"position_y": 0.368039823585141},{"position_x": 0.21466666666666667,"position_y": 0.383487815346212},{"position_x": 0.26,"position_y": 0.4154136649857589},{"position_x": 0.292,"position_y": 0.4329213889816394},{"position_x": 0.3413333333333333, "position_y": 0.45866804191675786},{"position_x": 0.388,"position_y": 0.48029523038225735},{"position_x": 0.44,"position_y": 0.49471335602592365},{"position_x": 0.4593333333333333,"position_y": 0.49986268661294736},{"position_x": 0.484,"position_y": 0.49986268661294736},{"position_x": 0.49866666666666665,"position_y": 0.49986268661294736}]',
    )
    session.add(s3)
    session.commit()

    s4 = Segment(
        name="La route d'Ettinsmoor",
        start_crossing_point_id="4",
        end_crossing_point_id="7",
        challenge_id="1",
        coordinates='[{"position_x": 0.5586666666666666,"position_y": 0.5070717494347805},{"position_x": 0.6146666666666667,"position_y": 0.520460008961042},{"position_x": 0.6613333333333333,"position_y": 0.5225197411958515},{"position_x": 0.692,"position_y": 0.5153106783740184},{"position_x": 0.71,"position_y": 0.505012017199971},{"position_x": 0.726,"position_y": 0.49162375767370947},{"position_x": 0.7366666666666667,"position_y": 0.485444560969281}]',
    )
    session.add(s4)
    session.commit()

    s5 = Segment(
        name="Vers le nid des aigles",
        start_crossing_point_id="7",
        end_crossing_point_id="3",
        challenge_id="1",
        coordinates='[{"position_x": 0.7606666666666667,"position_y": 0.44939924686011523},{"position_x": 0.7693333333333333,"position_y": 0.41747339722056837},{"position_x": 0.782,"position_y": 0.37009955581995047},{"position_x": 0.782,"position_y": 0.32993477724116566},{"position_x": 0.7833333333333333,"position_y": 0.3083075887756662},{"position_x": 0.7986666666666666,"position_y": 0.28050120360573827}]',
    )
    session.add(s5)
    session.commit()

    s6 = Segment(
        name="A la table de pierre",
        start_crossing_point_id="1",
        end_crossing_point_id="8",
        challenge_id="1",
        coordinates='[{"position_x": 0.16533333333333333,"position_y": 0.39481634263766413},{"position_x": 0.182,"position_y": 0.4442499162730915}]',
    )
    session.add(s6)
    session.commit()

    s7 = Segment(
        name="A la table de pierre 2",
        start_crossing_point_id="8",
        end_crossing_point_id="5",
        challenge_id="1",
        coordinates='[{"position_x": 0.206,"position_y": 0.5168554775501255},{"position_x": 0.21,"position_y": 0.5446618627200535},{"position_x": 0.21933333333333332,"position_y": 0.5673189173029577},{"position_x": 0.23,"position_y": 0.5920357041206713},{"position_x": 0.23733333333333334,"position_y": 0.6064538297643377},{"position_x": 0.252,"position_y": 0.6260212859950277},{"position_x": 0.26666666666666666,"position_y": 0.6414692777560987},{"position_x": 0.2786666666666667,"position_y": 0.6497082066953367}]',
    )
    session.add(s7)
    session.commit()

    s8 = Segment(
        name="A la table de pierre 3",
        start_crossing_point_id="5",
        end_crossing_point_id="6",
        challenge_id="1",
        coordinates='[{"position_x": 0.31266666666666665,"position_y": 0.6775145918652645},{"position_x": 0.3373333333333333,"position_y": 0.7053209770351925},{"position_x": 0.36133333333333334, "position_y": 0.7217988349136683},{"position_x": 0.3873333333333333, "position_y": 0.7259182993832872},{"position_x": 0.414,"position_y": 0.7156196382092398},{"position_x": 0.43733333333333335,"position_y": 0.707380709270002},{"position_x": 0.45866666666666667,"position_y": 0.6909028513915262}]',
    )
    session.add(s8)
    session.commit()

    s9 = Segment(
        name="Fuyons la sorcière",
        start_crossing_point_id="9",
        end_crossing_point_id="7",
        challenge_id="1",
        coordinates='[{"position_x": 0.6526666666666666,"position_y": 0.612633026468766},{"position_x": 0.6946666666666667,"position_y": 0.6043940975295282},{"position_x": 0.7153333333333334,"position_y": 0.5848266412988382},{"position_x": 0.7346666666666667,"position_y": 0.5590799883637197},{"position_x": 0.742,"position_y": 0.5353930676634108},{"position_x": 0.7493333333333333,"position_y": 0.5075866824934829}]',
    )
    session.add(s9)
    session.commit()

    s10 = Segment(
        name="Vers le chateau sorcière",
        start_crossing_point_id="5",
        end_crossing_point_id="4",
        challenge_id="1",
        coordinates='[{"position_x": 0.32133333333333336,"position_y": 0.6507380728127413},{"position_x": 0.37133333333333335,"position_y": 0.6548575372823603},{"position_x": 0.42933333333333334,"position_y": 0.612633026468766},{"position_x": 0.4653333333333333,"position_y": 0.5807071768292192},{"position_x": 0.49066666666666664,"position_y": 0.5508410594244818},{"position_x": 0.5086666666666667,"position_y": 0.5014074857890545}]',
    )
    session.add(s10)
    session.commit()

    s11 = Segment(
        name="Suivons Mr thimus",
        start_crossing_point_id="4",
        end_crossing_point_id="3",
        challenge_id="1",
        coordinates='[{"position_x": 0.542,"position_y": 0.45094404603622235},{"position_x": 0.586,"position_y": 0.4200480625140802},{"position_x": 0.6373333333333333,"position_y": 0.39018194510934284},{"position_x": 0.68,"position_y": 0.3623755599394149},{"position_x": 0.7473333333333333,"position_y": 0.3191211830084159},{"position_x": 0.78,"position_y": 0.2820460027818454}]',
    )
    session.add(s11)
    session.commit()

    s12 = Segment(
        name="Vers le chateau sorcière 2",
        start_crossing_point_id="6",
        end_crossing_point_id="9",
        challenge_id="1",
        coordinates='[{"position_x": 0.49533333333333335, "position_y": 0.669790595984729}, {"position_x": 0.512, "position_y": 0.654342604223658}, {"position_x": 0.5253333333333333, "position_y": 0.6440439430496105}, {"position_x": 0.54, "position_y": 0.6522828719888485}, {"position_x": 0.546, "position_y": 0.6605218009280864}, {"position_x": 0.562, "position_y": 0.6512530058714437}, {"position_x": 0.5673333333333334, "position_y": 0.6275660851711348}, {"position_x": 0.5726666666666667, "position_y": 0.6141778256448732}, {"position_x": 0.582, "position_y": 0.6079986289404448}, {"position_x": 0.592, "position_y": 0.6079986289404448}, {"position_x": 0.6006666666666667, "position_y": 0.6090284950578495}]',
    )
    session.add(s12)
    session.commit()

    c2 = Challenge(
        name="Oops, on a perdu Han Solo",
        description="Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
        start_date=datetime.datetime.now(),
        end_date="2022-03-18 18:30:00",
        map_url="/uploads/challenges/challenge_2.jpeg",
        level="2",
        scalling=4200,
        step_length=0.8,
        draft=False,
        admin_id=1,
    )

    session.add(c2)
    session.commit()

    c3 = Challenge(
        name="A travers le bois d'entre les mondes",
        description="Vous venez d'arriver en plein milieu d'une foret, des bruits inquiténat se font entendre vous devez en sortir. Ou est la sortie ?",
        map_url="/uploads/challenges/challenge_3.jpeg",
        level="2",
        scalling="4200",
        admin_id="1",
    )
    session.add(c3)
    session.commit()

    q1 = Obstacle(
        label="Quelle est le vrai nom de la sorcière blanche ?",
        progress=0.5,
        question_type=0,
        nb_points=25,
        result="Jadis",
        segment_id=1,
    )
    session.add(q1)
    session.commit()

    q2 = Obstacle(
        label="Qui est le père d'Aslan ?",
        progress=0.5,
        question_type=0,
        nb_points=25,
        result="L'empereur d'au-delà des Mers",
        segment_id=2,
    )
    session.add(q2)
    session.commit()

    q3 = Obstacle(
        label="Télécharger une photo",
        progress=0.5,
        question_type=1,
        nb_points=30,
        segment_id=3,
    )
    session.add(q3)
    session.commit()

    # update challenge1
    session.query(Challenge).filter(Challenge.id == 1).update(
        {
            Challenge.start_crossing_point_id: 1,
            Challenge.end_crossing_point_id: 3,
        }
    )
    session.commit()

    # update challenge2
    session.query(Challenge).filter(Challenge.id == 2).update(
        {
            Challenge.start_crossing_point_id: 4,
            Challenge.end_crossing_point_id: 5,
        }
    )
    session.commit()
