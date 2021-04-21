from cornice import Service

from loftes.cors import cors_policy
from loftes.marshmallow_schema.UserSchema import UserSchema
from loftes.models import User, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.security.password_utils import verify_password

from marshmallow import ValidationError

import logging

import pyramid.httpexceptions as exception


login = Service(name="login", path="/login", cors_policy=cors_policy)


@login.post()
def login_user(request):

    service_informations = ServiceInformations()

    user = DBSession().query(User).filter_by(email=request.json["email"]).first()

    if user != None:
        if verify_password(user.password, request.json["password"]):

            data = {
                "user": UserSchema().dump(user),
                "token": request.create_jwt_token(user.email),
            }

            response = service_informations.build_response(exception.HTTPOk, data)
        else:
            response = service_informations.build_response(exception.HTTPUnauthorized)
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


signup = Service(name="signup", path="/signup", cors_policy=cors_policy)


@signup.post()
def signup_user(request):

    service_informations = ServiceInformations()

    try:
        user_schema = UserSchema()
        user = user_schema.load(request.json)

        DBSession.add(user)
        DBSession.flush()

        response = service_informations.build_response(
            exception.HTTPCreated, user_schema.dump(user)
        )

    except ValidationError as validation_error:
        response = service_informations.build_response(
            exception.HTTPBadRequest, None, str(validation_error)
        )
        DBSession.close()

    except ValueError as value_error:
        response = service_informations.build_response(
            exception.HTTPBadRequest, None, str(value_error)
        )
        DBSession.close()

    except Exception as e:
        response = service_informations.build_response(
            exception.HTTPInternalServerError
        )
        logging.getLogger(__name__).warn("Returning: %s", str(e))
        DBSession.close()

    return response


whoami = Service(name="whoami", path="/whoami", cors_policy=cors_policy)


@whoami.get()
def whoami_user(request):

    service_informations = ServiceInformations()
    user_email = request.authenticated_userid

    if user_email != None:
        user = DBSession.query(User).filter(User.email == user_email).first()

        if user != None:
            response = service_informations.build_response(
                exception.HTTPOk, UserSchema().dump(user)
            )

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
