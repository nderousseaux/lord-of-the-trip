from loftes.models import User, UserChallenge, DBSession
import re


def check_user_connection(request):

    if request.authenticated_userid != None:
        user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()
    else:
        user = None

    return user


def check_data(self, data):

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
