from loftes.models import User, UserChallenge, DBSession


class UserResources:

    def find_all_subscribers_by_challenge(self, challenge):

        query = (
            DBSession.query(User)
            .join(UserChallenge, UserChallenge.user_id == User.id)
            .filter(UserChallenge.subscribe_date != None, UserChallenge.unsubscribe_date == None, UserChallenge.challenge_id == challenge.id)
        )

        return query.all()