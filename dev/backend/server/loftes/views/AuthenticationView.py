from cornice import Service

from loftes.cors import cors_policy
from loftes.marshmallow_schema.UserSchema import UserSchema
from loftes.models import User, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.security import password_utils

from marshmallow import ValidationError

import logging

import pyramid.httpexceptions as exception


login = Service(name="login", path="/login", cors_policy=cors_policy)


"""
@api {post} /login User's Authentication
@apiVersion 0.2.0
@apiName Login
@apiGroup Authentication
@apiSampleRequest off

@apiSuccess (Body parameters) {String} email User's email
@apiSuccess (Body parameters) {String} password User's password

@apiSuccessExample {json} Body:

{
	"email":"lemaitre@gmail.com",
	"password":"Conquérantdelunivers"
}

@apiSuccessExample Success response:
HTTP/1.1 200 OK

{
  "user": {
    "first_name": "Missy",
    "last_name": "Of Gallifrey",
    "pseudo": "LeMaitre",
    "email": "lemaitre@gmail.com",
    "is_admin": false
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsZW1haXRyZUBnbWFpbC5jb20iLCJpYXQiOjE2MTkwNDYxMTEsImV4cCI6MTYxOTA0OTcxMX0.cQBvaaj7czxA5kUp9DrmK_GYw-M8IG8cT5pJLj62ome26q30TQZC4lZSvqRmpQpzkhRd-BFBzu8EDklNTaMgyQ"
}

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}
"""


@login.post()
def login_user(request):

    service_informations = ServiceInformations()

    user = DBSession().query(User).filter_by(email=request.json["email"]).first()

    if user != None:
        if password_utils.verify_password(user.password, request.json["password"]):

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

"""
@api {post} /signup Create a new User
@apiVersion 0.2.0
@apiName SignUp
@apiGroup Authentication
@apiSampleRequest off

@apiSuccess (Body parameters) {String} first_name User's first name
@apiSuccess (Body parameters) {String} last_name User's last name
@apiSuccess (Body parameters) {String} pseudo User's pseudo
@apiSuccess (Body parameters) {String} email User's email
@apiSuccess (Body parameters) {String} password User's password

@apiSuccessExample {json} Body:

{
	"first_name":"Missy",
	"last_name":"Of Gallifrey",
	"pseudo":"LeMaitre",
	"email":"lemaitre@gmail.com",
	"password":"Conquérantdelunivers"
}

@apiSuccessExample Success response:
HTTP/1.1 201 Created

{
    "first_name": "Missy",
    "last_name": "Of Gallifrey",
    "pseudo": "LeMaitre",
    "email": "lemaitre@gmail.com",
    "is_admin": false
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'first_name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'last_name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'email': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'pseudo': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'password': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "This email is already in use. Please use another one."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "This pseudo is already in use. Please use another one."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'email': ['Not a valid email address.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Pseudo can contain only letters, numbers and underscores."
  }
}
"""


@signup.post()
def signup_user(request):

    service_informations = ServiceInformations()

    try:
        user_schema = UserSchema()
        user = user_schema.load(request.json)

        DBSession.add(user)
        DBSession.flush()

        response = service_informations.build_response(exception.HTTPCreated, user_schema.dump(user))

    except ValidationError as validation_error:
        response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))

    except ValueError as value_error:
        response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))

    except Exception as e:
        response = service_informations.build_response(exception.HTTPInternalServerError)
        logging.getLogger(__name__).warn("Returning: %s", str(e))

    return response


whoami = Service(name="whoami", path="/whoami", cors_policy=cors_policy)

"""
@api {get} /whoami Request a user informations
@apiVersion 0.2.0
@apiName Whoami
@apiGroup Authentication
@apiSampleRequest off

@apiSuccessExample Success response:
HTTP/1.1 200 OK

{
  "first_name": "Missy",
  "last_name": "Of Gallifrey",
  "pseudo": "Le maitre",
  "email": "lemaitre@gmail.com",
  "is_admin": false
}

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The User is not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}

"""


@whoami.get()
def whoami_user(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    if user != None:
        response = service_informations.build_response(exception.HTTPOk, UserSchema().dump(user))

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
