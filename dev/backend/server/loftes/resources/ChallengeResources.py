from loftes.models import Challenge, DBSession


def find_last_challenge_by_name(name):

    query = DBSession.query(Challenge).filter(Challenge.name.like("%" + name + "%")).order_by(Challenge.id.desc())

    return query.first()
