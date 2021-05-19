from loftes.models import Challenge, DBSession


class ChallengeResources:
    def find_last_challenge_by_name(self, name):

        query = DBSession.query(Challenge).filter(Challenge.name.like("%" + name + "%")).order_by(Challenge.id.desc())

        return query.first()
