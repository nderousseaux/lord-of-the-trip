from loftes.models import User, DBSession


def CheckUserConnect(request):

    if request.authenticated_userid != None:
        user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()
    else:
        user = None

    return user
