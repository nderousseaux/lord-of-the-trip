from loftes.models import Challenge, UserChallenge, DBSession


class UserChallengeResources:
    def find_current_subscriptions(self, challenge):

        query = DBSession.query(UserChallenge).filter(
            UserChallenge.unsubscribe_date == None, UserChallenge.challenge_id == challenge.id
        )

        return query.all()
