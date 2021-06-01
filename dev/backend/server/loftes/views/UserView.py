from cornice import Service

from loftes.cors import cors_policy
from loftes.models import User, DBSession

from loftes.marshmallow_schema import UserSchema
from loftes.services.ServiceInformations import ServiceInformations
from loftes.security.PasswordUtils import PasswordUtils

from marshmallow import ValidationError

import logging

import pyramid.httpexceptions as exception

user = Service(
    name="user", 
    path="/user/update", 
    cors_policy=cors_policy)

@user.put()
def update_user(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        query = DBSession.query(User).filter(User.id==user.id)
        try:

            query.update(UserSchema().check_json(request.json))
            DBSession.flush()
            response = service_informations.build_response(exception.HTTPNoContent)

        except ValidationError as validation_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(validation_error)
            )

        except ValueError as value_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(value_error)
            )

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)

        except Exception as e:
            response = service_informations.build_response(exception.HTTPInternalServerError)
            logging.getLogger(__name__).warn("Returning: %s", str(e))
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response

user_patch = Service(
    name="user_patch", 
    path="/user/modify", 
    cors_policy=cors_policy)

@user_patch.patch()
def modify_user(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        query = DBSession.query(User).filter(User.id==user.id)
        try:

            query.update(UserSchema().check_json(request.json))
            DBSession.flush()
            response = service_informations.build_response(exception.HTTPNoContent)

        except ValidationError as validation_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(validation_error)
            )

        except ValueError as value_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(value_error)
            )

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)

        except Exception as e:
            response = service_informations.build_response(exception.HTTPInternalServerError)
            logging.getLogger(__name__).warn("Returning: %s", str(e))
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
