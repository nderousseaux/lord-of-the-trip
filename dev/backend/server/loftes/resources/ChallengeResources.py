from loftes.models import Challenge, Segment, Event, UserChallenge, DBSession
import datetime
from sqlalchemy import or_, func


class ChallengeResources:
    def find_last_challenge_by_name(self, name):

        query = DBSession.query(Challenge).filter(Challenge.name.like("%" + name + "%")).order_by(Challenge.id.desc())

        return query.first()

    def find_all_subscribed_challenges_by_user(self, user_id):

        query = (
            DBSession.query(Challenge)
            .join(UserChallenge, UserChallenge.challenge_id == Challenge.id)
            .filter(
                UserChallenge.user_id == user_id,
                UserChallenge.subscribe_date != None,
                UserChallenge.unsubscribe_date == None,
            )
        )

        return query.all()

    def find_all_unsubscribed_challenges_by_user(self, user_id):

        # create query
        query = DBSession.query(Challenge).filter(Challenge.draft == False)

        # create subquery
        subquery = (
            DBSession.query(Challenge.id)
            .join(UserChallenge, UserChallenge.challenge_id == Challenge.id)
            .filter(
                Challenge.draft == False,
                UserChallenge.user_id == user_id,
                UserChallenge.subscribe_date != None,
                UserChallenge.unsubscribe_date == None,
            )
        )

        # select all from query not in subquery
        query = query.filter(~Challenge.id.in_(subquery))

        return query.all()

    def find_all_published_challenges(self):

        now = datetime.datetime.now()

        query = (
            DBSession.query(Challenge)
            .filter(Challenge.draft == False)
            .filter(or_(Challenge.end_date == None, Challenge.end_date > now))
        )

        return query.all()
