from loftes.models import User, UserChallenge, DBSession


class UserResources:

    def find_all_subscribers_by_challenge(self, challenge):

        query = (
            DBSession.query(User)
            .join(UserChallenge, UserChallenge.user_id == User.id)
            .filter(UserChallenge.subscribe_date != None, UserChallenge.unsubscribe_date == None, UserChallenge.challenge_id == challenge.id)
        )

        return query.all()

def check_data(data):

    if "email" in data:
        user = DBSession().query(User).filter_by(email=data["email"]).first()

        if user != None:
            raise ValueError("This email is already in use. Please use another one.")

    if "pseudo" in data:
        if not re.match("^[A-Za-z0-9_-]*$", data["pseudo"]):
            raise ValueError("Pseudo can contain only letters, numbers and underscores.")

        user = DBSession().query(User).filter_by(pseudo=data["pseudo"]).first()

        if user != None:
            raise ValueError("This pseudo is already in use. Please use another one.")
    
    return data