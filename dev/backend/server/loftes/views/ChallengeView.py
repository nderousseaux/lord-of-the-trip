from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from loftes.cors import cors_policy
from loftes.models import (
    Challenge,
    CrossingPoint,
    UserChallenge,
    User,
    Segment,
    Obstacle,
    DBSession,
)
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema
from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
from loftes.utils import get_project_root
from loftes.resources.CheckChallengeResources import checkChallenge
from loftes.resources import ObstacleResources
from loftes.resources.ChallengeResources import ChallengeResources
from loftes.resources.UserChallengeResources import UserChallengeResources

import loftes.error_messages as error_messages

from pathlib import Path

import pyramid.httpexceptions as exception
from pyramid.response import FileResponse
from pyramid.authentication import AuthTicket

from sqlalchemy import exc

import logging
import os
import shutil
import socket
import datetime
import base64


challenge = Service(name="challenge", path="/challenges", cors_policy=cors_policy)

"""
@api {get} /challenges Request all challenges informations
@apiVersion 0.1.0
@apiName GetChallenges
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiParam {Bool} [draft=False] Status of the challenge

@apiSuccess (OK 200) {Array} Challenges All challenges created
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "challenges": [
    {
      "id": 1,
      "name": "A la recherche d'Aslan",
      "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
      "start_date": "2021-05-27T10:12:52",
      "end_date": "2021-03-18T12:00:00",
      "alone_only": null,
      "level": "1",
      "scalling": 2,
      "step_length": 0.7,
      "draft": true,
      "start_crossing_point_id": 1,
      "end_crossing_point_id": 1
    },
    {
      "id": 2,
      "name": "Oops, on a perdu Han Solo",
      "description": "Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
      "start_date": "2021-05-27T10:12:52",
      "end_date": "2022-03-18T18:30:00",
      "alone_only": null,
      "level": "2",
      "scalling": 4200,
      "step_length": 0.8,
      "draft": true,
      "start_crossing_point_id": 4,
      "end_crossing_point_id": 5
    }
  ]
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

@apiError (Error 403) {Object} UserNotAdmin User is not super administrator
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to view this resource using the credentials that you supplied."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No challenges were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge.get()
def get_challenges(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    if user != None:

        challenges = []

        # solution pour ce sprint, pensez à changer
        if user.id == 1:
            challenges = DBSession.query(Challenge).all()

        if request.query_string != "":
            splitter = request.query_string.split("=")
            if len(splitter) == 2 and splitter[0] == "draft":
                if splitter[1] == "false":
                    challenges = ChallengeResources().find_all_published_challenges()
                # if user is not superadmin and he wants to see all challenges
                elif splitter[1] == "true" and user.id != 1:
                    return service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
                    )

        if len(challenges) == 0:
            return service_informations.build_response(exception.HTTPNoContent())

        data = {"challenges": ChallengeSchema(many=True).dump(challenges)}

        response = service_informations.build_response(exception.HTTPOk, data)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {post} /challenges Create a new Challenge
@apiVersion 0.1.0
@apiName PostChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (Body parameters) {String} name Challenge's name
@apiSuccess (Body parameters) {String} [description] Challenge's description
@apiSuccess (Body parameters) {Date} [start_date] Challenge's start date in format "YYYY-MM-DD"
@apiSuccess (Body parameters) {Date} [end_date] Challenge's end date in format "YYYY-MM-DD"
@apiSuccess (Body parameters) {Bool} [alone_only] If true user is the only person to participate in challenge, if false it is a team
@apiSuccess (Body parameters) {Number} [level] Challenge's difficulty
@apiSuccess (Body parameters) {Number} [scalling] Challenge's scale in meters
@apISuccess (Body parameters) {Float} [step_length] Challenge's step length in meters

@apiSuccessExample {json} Body:

{
	"name":"A la recherche d'Aslan",
	"description":"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
  "start_date":"2021-12-18",
	"end_date":"2022-10-18",
	"alone_only":"0",
	"level":3,
	"scalling":10000,
  "step_length": 0.7
}

@apiSuccessExample {json} Success response:
HTTP/1.1 201 Created

{
  "id": 1,
  "name": "A la recherche d'Aslan",
  "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
  "start_date": "2021-12-18T03:16:00",
  "end_date": "2022-10-18T03:16:00",
  "alone_only": 0,
  "level":3,
  "scalling": 1000,
  "step_length": 0.7,
  "draft": false,
  "start_crossing_point_id": null,
  "end_crossing_point_id": null
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The given value {name} is already used as a challenge name."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Invalid value']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Invalid isoformat string: '2022-10-'"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's start date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's end date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's start and end date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "This value (-2) is not valid for scalling."
  }
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

@apiError (Error 403) {Object} UserNotAdmin User is not administrator
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to perform this action using the credentials that you supplied."
  }
}

@apiError (Error 403) {Object} DraftField Draft field in JSON body
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "The field draft is not used on challenge's creation."
  }
}

"""


@challenge.post()
def create_challenge(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        # check if user is admin
        if user.is_admin:

            try:
                challenge_schema = ChallengeSchema()
                challenge_data = request.json
                challenge_data["admin_id"] = user.id

                challenge = challenge_schema.load(challenge_data)

                DBSession.add(challenge)
                DBSession.flush()

                response = service_informations.build_response(exception.HTTPCreated, challenge_schema.dump(challenge))

            except ValidationError as validation_error:
                response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))

            except ValueError as value_error:
                response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))

            except PermissionError as pe:
                response = service_informations.build_response(exception.HTTPForbidden, None, str(pe))

            except Exception as e:
                response = service_informations.build_response(exception.HTTPInternalServerError)
                logging.getLogger(__name__).warn("Returning: %s", str(e))

        else:
            response = service_informations.build_response(exception.HTTPForbidden)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


challenge_by_id = Service(name="challenge_by_id", path="challenges/{id:\d+}", cors_policy=cors_policy)

"""
@api {get} /challenges/:id Request a challenge informations
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName GetChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (OK 200) {Number} id Challenge's ID
@apiSuccess (OK 200) {String} name Challenge's name
@apiSuccess (OK 200) {String} description Challenge's description
@apiSuccess (OK 200) {Date} start_date Challenge's start date
@apiSuccess (OK 200) {Date} end_date Challenge's end date
@apiSuccess (OK 200) {Bool} alone_only If true user is the only person to participate in challenge, if false it is a team
@apiSuccess (OK 200) {Number} level Challenge's difficulty
@apiSuccess (OK 200) {Number} scalling Challenge's scale in meters
@apISuccess (OK 200) {Float} step_length Challenge's step length in meters
@apiSuccess (OK 200) {Bool} draft If true the challenge is in edition mode, if false challenge is published
@apiSuccess (OK 200) {Number} start_crossing_point_id ID of crossing point choosed as start of a challenge
@apiSuccess (OK 200) {Number} end_crossing_point_id ID of crossing point choosed as start of a challenge

@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "id": 1,
  "name": "A la recherche d'Aslan",
  "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
  "start_date": "2021-12-18T03:16:00",
  "end_date": "2022-10-18T03:16:00",
  "alone_only": 0,
  "level":3,
  "scalling": 1000,
  "step_length": 0.7,
  "draft": false,
  "start_crossing_point_id": null,
  "end_crossing_point_id": null
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

@apiError (Error 403) {Object} PermissionDenied User is not challenge's admin or challenge's is not published yet
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to view this resource using the credentials that you supplied."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_by_id.get()
def get_challenge(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                response = service_informations.build_response(exception.HTTPOk, ChallengeSchema().dump(challenge))

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
                )
        else:
            response = service_informations.build_response(exception.HTTPNotFound())

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {put} /challenges/:id Update a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PutChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (Body parameters) {String} name Challenge's name
@apiSuccess (Body parameters) {String} [description] Challenge's description
@apiSuccess (Body parameters) {Date} [start_date] Challenge's start date in format "YYYY-MM-DD"
@apiSuccess (Body parameters) {Date} [end_date] Challenge's end date in format "YYYY-MM-DD"
@apiSuccess (Body parameters) {Bool} [alone_only] If true user is the only person to participate in challenge, if false it is a team
@apiSuccess (Body parameters) {Number} [level] Challenge's difficulty
@apiSuccess (Body parameters) {Number} [scalling] Challenge's scale in meters
@apISuccess (Body parameters) {Float} [step_length] Challenge's step length in meters
@apiSuccess (Body parameters) {Number} [start_crossing_point_id] ID of crossing point choosed as start of a challenge
@apiSuccess (Body parameters) {Number} [end_crossing_point_id] ID of end point choosed as end of a challenge

@apiSuccessExample {json} Body:

{
	"name":"A la recherche d'Aslan",
	"description":"Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
  "start_date":"2021-12-18",
	"end_date":"2022-10-18",
	"alone_only":"0",
	"level":3,
	"scalling":10000,
  "step_length": 0.7
}

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The given value {name} is already used as a challenge name."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Invalid value']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Invalid isoformat string: '2022-10-'"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's start date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's end date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's start and end date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "This value (-2) is not valid for scalling."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Start crossing point does not exist."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "End crossing point does not exist."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Nothing to update."
  }
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

@apiError (Error 403) {Object} UserNotAdmin User is not administrator
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to perform this action using the credentials that you supplied."
  }
}

@apiError (Error 403) {Object} PublishedChallenge Modification of a published challenge
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to modify a published challenge."
  }
}

@apiError (Error 403) {Object} DraftField Draft field in JSON body
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "The field draft is not used on challenge's creation."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_by_id.put()
def update_challenge(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge is draft
                if challenge.draft:

                    try:
                        challenge_data = request.json
                        challenge_data["id"] = challenge.id

                        DBSession.query(Challenge).filter(Challenge.id == challenge.id).update(
                            ChallengeSchema().check_json(challenge_data)
                        )
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
                        response = service_informations.build_response(exception.HTTPForbidden, None, str(pe))

                    except Exception as e:
                        response = service_informations.build_response(exception.HTTPInternalServerError)
                        logging.getLogger(__name__).warn("Returning: %s", str(e))

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.MODIFY_PUBLISHED_CHALLENGE,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(exception.HTTPNotFound)
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {patch} /challenges/:id Partially modify a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PatchChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (Body parameters) {String} name Challenge's name
@apiSuccess (Body parameters) {String} [description] Challenge's description
@apiSuccess (Body parameters) {Date} [start_date] Challenge's start date in format "YYYY-MM-DD"
@apiSuccess (Body parameters) {Date} [end_date] Challenge's end date in format "YYYY-MM-DD"
@apiSuccess (Body parameters) {Bool} [alone_only] If true user is the only person to participate in challenge, if false it is a team
@apiSuccess (Body parameters) {Number} [level] Challenge's difficulty
@apiSuccess (Body parameters) {Number} [scalling] Challenge's scale in meters
@apISuccess (Body parameters) {Float} [step_length] Challenge's step length in meters
@apiSuccess (Body parameters) {Number} [start_crossing_point_id] ID of crossing point choosed as start of a challenge
@apiSuccess (Body parameters) {Number} [end_crossing_point_id] ID of end point choosed as end of a challenge

@apiSuccessExample {json} Body:

{
  "step_length": 0.8
}

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The given value {name} is already used as a challenge name."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Invalid value']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Invalid isoformat string: '2022-10-'"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's start date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's end date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's start and end date must be greater of today's date (22-04-2021, 12:59)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "This value (-2) is not valid for scalling."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Start crossing point does not exist."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "End crossing point does not exist."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Nothing to update."
  }
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

@apiError (Error 403) {Object} UserNotAdmin User is not administrator
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to perform this action using the credentials that you supplied."
  }
}

@apiError (Error 403) {Object} DraftField Draft field in JSON body
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "The field draft is not used on challenge's creation."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_by_id.patch()
def modify_challenge(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge is draft
                if challenge.draft:

                    try:
                        challenge_data = request.json
                        challenge_data["id"] = challenge.id

                        DBSession.query(Challenge).filter(Challenge.id == challenge.id).update(
                            ChallengeSchema().check_json(challenge_data)
                        )
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
                        response = service_informations.build_response(exception.HTTPForbidden, None, str(pe))

                    except Exception as e:
                        response = service_informations.build_response(exception.HTTPInternalServerError)
                        logging.getLogger(__name__).warn("Returning: %s", str(e))

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.MODIFY_PUBLISHED_CHALLENGE,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(exception.HTTPNotFound)
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {delete} /challenges/:id Delete a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName DeleteChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 403) {Object} PublishedChallenge Modification of a published challenge
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to perform this action using the credentials that you supplied."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_by_id.delete()
def delete_challenge(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            can_be_deleted = False

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                current_subscriptions = UserChallengeResources().find_current_subscriptions(challenge)

                # if there are no users who are subscribed to challenge, challenge can be deleted
                if challenge.draft or len(current_subscriptions) == 0:
                    can_be_deleted = True

            # check if challenge is to be deleted
            if can_be_deleted:

                try:

                    if challenge.map_url != None:
                        image = str(get_project_root()) + challenge.map_url
                        if os.path.exists(image):
                            os.remove(image)

                    challenge.start_crossing_point_id = None
                    challenge.end_crossing_point_id = None

                    crossing_points_to_delete = (
                        DBSession.query(CrossingPoint).filter(CrossingPoint.challenge_id == challenge.id).all()
                    )

                    for crossing_point_to_delete in crossing_points_to_delete:
                        DBSession.delete(crossing_point_to_delete)

                    DBSession.delete(challenge)
                    DBSession.flush()

                    response = service_informations.build_response(exception.HTTPNoContent)

                except Exception as e:
                    response = service_informations.build_response(exception.HTTPInternalServerError)
                    logging.getLogger(__name__).warn("Returning: %s", str(e))

            else:
                response = service_informations.build_response(exception.HTTPForbidden)
        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


challenge_image = Service(
    name="challenge_image",
    path="challenges/{id:\d+}/image",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:id/image Request a challenge's map
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName GetChallengeImage
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (OK 200) {File} Image Challenge's map in jpeg/png format.

@apiError (Error 404) {Object} RessourceNotFound Challenge or challenge's map are not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_image.get()
def download_image(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                if challenge.map_url != None:
                    image = str(get_project_root()) + challenge.map_url

                    if os.path.exists(image):
                        response = FileResponse(image, request=request)
                    else:
                        response = service_informations.build_response(exception.HTTPNoContent)

                else:
                    response = service_informations.build_response(exception.HTTPNoContent)

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound,
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {post} /challenges/:id/image Upload a challenge's map
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PostChallengeImage
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (Body parameter) {File} Image Challenge's map in jpeg/png format.

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "File is not found."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The size of image is too big."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The file's type is not supported on this server."
  }
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

@apiError (Error 403) {Object} PublishedChallenge Modification of a published challenge
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to modify a published challenge."
  }
}

@apiError (Error 403) {Object} UserNotAdmin User is not administrator
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to perform this action using the credentials that you supplied."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}

@apiError (Error 415) {Object} UnsupportedMediaType File is not found.
@apiErrorExample {json} Error 415 response:
HTTP/1.1 415 Unsupported Media Type

{
  "error": {
    "status": "UNSUPPORTED MEDIA TYPE",
    "message": "The file's type is not supported on this server."
  }
}

"""


@challenge_image.post()
def upload_image(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge is draft
                if challenge.draft:

                    # check if file is uploaded to server
                    if "file" in request.POST:

                        file_type = request.POST["file"].type

                        # check if uploaded file is correct type of image
                        if file_type == "image/jpeg" or file_type == "image/png":

                            # check if uploaded file is not bigger than 8MB
                            if request.POST["file"].bytes_read < 8388608:  # 8MB

                                try:

                                    root = get_project_root()
                                    challenge_uploads_path = "/uploads/challenges"
                                    path = str(root) + challenge_uploads_path

                                    if not os.path.isdir(path):
                                        os.makedirs(path, 0o755)

                                    input_file = request.POST["file"].file
                                    input_file_filename = "challenge_" + str(challenge.id)
                                    input_file_type = "." + file_type.split("/")[1]
                                    input_image = input_file_filename + input_file_type

                                    # delete old map
                                    if os.path.exists(path) and os.path.isdir(path):
                                        if os.listdir(path):
                                            for filename in os.listdir(path):
                                                if filename.startswith(input_file_filename):
                                                    os.remove(os.path.join(path, filename))
                                                    break

                                    file_path = os.path.join(
                                        path,
                                        input_image,
                                    )
                                    temp_file_path = file_path + "~"

                                    input_file.seek(0)
                                    with open(temp_file_path, "wb") as output_file:
                                        shutil.copyfileobj(input_file, output_file)

                                    os.rename(temp_file_path, file_path)

                                    DBSession.query(Challenge).filter(Challenge.id == challenge.id).update(
                                        {Challenge.map_url: challenge_uploads_path + "/" + input_image}
                                    )
                                    DBSession.flush()

                                    response = ServiceInformations().build_response(exception.HTTPNoContent)

                                except Exception as e:
                                    response = service_informations.build_response(exception.HTTPInternalServerError)
                                    logging.getLogger(__name__).warn("Returning: %s", str(e))

                            else:
                                response = service_informations.build_response(
                                    exception.HTTPBadRequest,
                                    None,
                                    error_messages.UPLOAD_IMAGE_FILE_SIZE_IS_TOO_BIG,
                                )

                        else:
                            response = service_informations.build_response(
                                exception.HTTPUnsupportedMediaType,
                                None,
                                error_messages.UPLOAD_IMAGE_TYPE_NOT_SUPPORTED,
                            )
                    else:
                        response = service_informations.build_response(
                            exception.HTTPBadRequest, None, error_messages.UPLOAD_IMAGE_NOT_FOUND
                        )

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.MODIFY_PUBLISHED_CHALLENGE,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


challenge_subscribe = Service(
    name="challenge_subscribe",
    path="challenges/{id:\d+}/subscribe",
    cors_policy=cors_policy,
)

"""
@api {post} /challenges/:id/subscribe User's subscription to a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.2.0
@apiName SubscribeChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} UnfinishedChallenge User's subscription to a unfinished challenge.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to subscribe to a unfinished challenge."
  }
}

@apiError (Error 403) {Object} ChallengesOwner User's subscription to a challenge that he has created.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to subscribe to a challenge you have created."
  }
}

@apiError (Error 403) {Object} AlreadySubscribed User's subscription to a challenge that he has already subscribed.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You are already subscribed to this challenge."
  }
}

@apiError (Error 403) {Object} TerminatedChallenge User's subscription to a challenge that has already been terminated.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to a challenge that has already been terminated."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}

"""


@challenge_subscribe.post()
def subscribe(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if challenge is draft
            if challenge.draft == False:

                # check if user is challenge's admin
                if user.id != challenge.admin_id:

                    now = datetime.datetime.now()

                    if challenge.end_date != None and challenge.end_date < now:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.SUBSCRIPTION_CHALLENGE_TERMINATED,
                        )

                        return response

                    can_subscribe = True

                    subscribed_challenges = (
                        DBSession.query(UserChallenge)
                        .filter(
                            UserChallenge.user_id == user.id,
                            UserChallenge.challenge_id == challenge.id,
                        )
                        .all()
                    )

                    if len(subscribed_challenges) > 0:
                        for subscribed_challenge in subscribed_challenges:
                            """If all challenges are finished or the user withdrew
                            from a challenge, he can subscribe to a challenge again"""
                            if subscribed_challenge.unsubscribe_date == None:
                                can_subscribe = False
                    # else : First time to subscribe a challenge

                    if can_subscribe:

                        try:

                            user_challenge = UserChallenge()
                            user_challenge.user_id = user.id
                            user_challenge.challenge_id = challenge.id
                            user_challenge.subscribe_date = now
                            user_challenge.unsubscribe_date = None

                            DBSession.add(user_challenge)
                            DBSession.flush()

                            response = exception.HTTPNoContent()

                        except Exception as e:
                            response = service_informations.build_response(exception.HTTPInternalServerError)
                            logging.getLogger(__name__).warn("Returning: %s", str(e))

                    else:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.SUBSCRIPTION_CHALLENGE_ALREADY_SUBSCRIBED,
                        )

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.SUBSCRIPTION_OWN_CHALLENGE,
                    )

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.SUBSCRIPTION_CHALLENGE_NOT_CREATED,
                )

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


unsubscribe_challenge = Service(
    name="unsubscribe_challenge",
    path="challenges/{id:\d+}/unsubscribe",
    cors_policy=cors_policy,
)

"""
@api {post} /challenges/:id/unsubscribe User's unsubscription from a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.2.0
@apiName UnSubscribeChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} NotSubscribedChallenge User's unsubscription from a challenge that he is not subscribed to.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to unsubscribe from a challenge that you are not subscribed to."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}

"""


@unsubscribe_challenge.post()
def unsubscribe(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            subscribed_challenge = (
                DBSession.query(UserChallenge)
                .filter(
                    UserChallenge.user_id == user.id,
                    UserChallenge.challenge_id == challenge.id,
                    UserChallenge.unsubscribe_date == None,
                )
                .first()
            )

            if subscribed_challenge != None:

                try:

                    DBSession.query(UserChallenge).filter(UserChallenge.id == subscribed_challenge.id).update(
                        {UserChallenge.unsubscribe_date: datetime.datetime.now()}
                    )

                    DBSession.flush()

                    response = service_informations.build_response(exception.HTTPNoContent)

                except Exception as e:
                    response = service_informations.build_response(exception.HTTPInternalServerError)
                    logging.getLogger(__name__).warn("Returning: %s", str(e))

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.UNSUBSCRIPTION_CHALLENGE_NOT_SUBSCRIBED,
                )

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


verifyChallenge = Service(
    name="verifyChallenge",
    path="challenges/{id:\d+}/verify",
    cors_policy=cors_policy,
)

"""
@api {post} /challenges/:id/verify Verification of graph integrity
@apiParam id Challenge's unique ID.
@apiVersion 0.2.0
@apiName VerifyChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK
{
  "loop": [
      [
          {
              "id": 1,
              "name": "L'armoire",
              "position_x": 0.142,
              "position_y": 0.324511
          },
          {
              "id": 2,
              "name": "La passe du faune",
              "position_x": 0.524667,
              "position_y": 0.335221
          },
          {
              "id": 14,
              "name": "Crossing point",
              "position_x": 0.586207,
              "position_y": 0.0824353
          }
      ]
  ],
  "deadend": [
      {
          "id": 14,
          "name": "Crossing point",
          "position_x": 0.586207,
          "position_y": 0.0824353
      }
  ],
  "orphans": [
      {
          "id": 14,
          "name": "Crossing point",
          "position_x": 0.586207,
          "position_y": 0.0824353
      }
  ]
}

@apiSuccessExample Success response:
HTTP/1.1 200 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} NotSubscribedChallenge User's unsubscription from a challenge that he is not subscribed to.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You cannot unsubscribe from a challenge that you are not subscribed to."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@verifyChallenge.post()
def verify(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge is draft
                if challenge.draft:

                    if challenge.start_crossing_point_id is None:
                        return service_informations.build_response(
                            exception.HTTPBadRequest, None, error_messages.VERIFICATION_CHALLENGE_START_MISSING
                        )

                    if challenge.end_crossing_point_id is None:
                        return service_informations.build_response(
                            exception.HTTPBadRequest, None, error_messages.VERIFICATION_CHALLENGE_END_MISSING
                        )

                    try:

                        # On vérifie qu'aucun crossing point n'est orphelin
                        orphans = []

                        crossingPoints = (
                            DBSession.query(CrossingPoint).filter(CrossingPoint.challenge_id == challenge.id).all()
                        )
                        # On vérifie qu'il y ai des crossings points
                        if len(crossingPoints) < 2:
                            orphans = crossingPoints

                            response = service_informations.build_response(
                                exception.HTTPOk,
                                {
                                    "orphans": CrossingPointSchema(many=True).dump(orphans),
                                },
                            )

                        else:
                            for crossing in crossingPoints:
                                if (len(crossing.segments_end) == 0 and len(crossing.segments_start) == 0) or (
                                    crossing.id != challenge.start_crossing_point_id
                                    and len(crossing.segments_end) == 0
                                ):

                                    orphans.append(crossing)

                                loops, deadend = checkChallenge(challenge)

                                if len(loops) != 0 or len(deadend) != 0 or len(orphans) != 0:
                                    response = service_informations.build_response(
                                        exception.HTTPOk,
                                        {
                                            "loop": [CrossingPointSchema(many=True).dump(loop) for loop in loops],
                                            "deadend": CrossingPointSchema(many=True).dump(deadend),
                                            "orphans": CrossingPointSchema(many=True).dump(orphans),
                                        },
                                    )
                                else:
                                    response = service_informations.build_response(exception.HTTPNoContent)

                    except Exception as e:
                        response = service_informations.build_response(exception.HTTPInternalServerError)
                        logging.getLogger(__name__).warn("Returning: %s", str(e))

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.MODIFY_PUBLISHED_CHALLENGE,
                    )
            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


challenge_duplicate = Service(
    name="challenge_duplicate",
    path="challenges/{id:\d+}/duplicate",
    cors_policy=cors_policy,
)

"""
@api {post} /challenges/:id/duplicate Duplication of challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.2.0
@apiName DuplicateChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (Body parameters) {Date} start_date Challenge's start date in format "YYYY-MM-DD"
@apiSuccess (Body parameters) {Date} end_date Challenge's end date in format "YYYY-MM-DD"

@apiSuccessExample {json} Body:

{
	"start_date":"2021-08-22",
	"end_date":"2021-09-01"
}

@apiSuccessExample {json} Success response:
HTTP/1.1 201 Created
{
  "id": 47,
  "name": "A la recherche d'Aslan",
  "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
  "start_date": "2021-05-27T10:12:52",
  "end_date": "2021-03-18T12:00:00",
  "alone_only": null,
  "level": "1",
  "scalling": 2,
  "step_length": 0.7,
  "draft": true,
  "start_crossing_point_id": 364,
  "end_crossing_point_id": 365
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's start date must be greater of today's date (16-05-2021, 14:49)"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Challenge's end date must be greater of today's date (16-05-2021, 14:49)"
  }
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

@apiError (Error 403) {Object} UserNotOwner Duplication of challenge that user is not creator of.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You cannot duplicate a challenge that you did not create."
  }
}

@apiError (Error 403) {Object} PermanentChallenge Duplication of a permanent challenge.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You cannot duplicate a permanent challenge."
  }
}

@apiError (Error 403) {Object} ChallengeNotTerminated Duplication of challenge that is not terminated yet.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You cannot duplicate a challenge that hasn't been terminated yet."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}

@apiError (Error 422) {Object} ErrorOnCreation Informations were missing during challenge duplication.
@apiErrorExample {json} Error 422 response:
HTTP/1.1 422 Unprocessable Entity

{
  "error": {
    "status": "UNPROCESSABLE ENTITY",
    "message": "Challenge's start and end crossing points were missing."
  }
}

@apiError (Error 422) {Object} ErrorOnCreation Informations were missing during challenge duplication.
@apiErrorExample {json} Error 422 response:
HTTP/1.1 422 Unprocessable Entity

{
  "error": {
    "status": "UNPROCESSABLE ENTITY",
    "message": "Segment's start and end crossing points were missing."
  }
}
"""


@challenge_duplicate.post()
def duplicate(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge exists
        if challenge != None:

            # check if user is challenge's administrator
            if user.id == challenge.admin_id:

                # check if challenge is draft
                if challenge.draft == False:

                    now = datetime.datetime.now()

                    # check if challenge is not permanent
                    if challenge.end_date != None:

                        # check if challenge is already finished
                        if challenge.end_date < now:

                            try:

                                old_challenge = challenge

                                name_splitter = old_challenge.name.split(" *")
                                old_challenge_name = name_splitter[0]

                                last_challenge_with_same_name = ChallengeResources().find_last_challenge_by_name(
                                    old_challenge_name
                                )

                                counter_splitter = last_challenge_with_same_name.name.split(" *")
                                name_counter = int(counter_splitter[1]) if len(counter_splitter) > 1 else 1

                                challenge_schema = ChallengeSchema()

                                new_challenge_data = request.json
                                new_challenge_data["name"] = old_challenge_name + " *" + str(name_counter + 1)

                                new_challenge = challenge_schema.load(new_challenge_data)

                                # check if new start and end date are not null
                                if new_challenge.start_date != None and new_challenge.end_date != None:
                                    # new challenge creation
                                    new_challenge.description = old_challenge.description
                                    new_challenge.level = old_challenge.level
                                    new_challenge.scalling = old_challenge.scalling
                                    new_challenge.step_length = old_challenge.step_length
                                    # duplicated challenge could be modifiable
                                    new_challenge.draft = True
                                    new_challenge.admin_id = user.id

                                    DBSession.add(new_challenge)
                                    DBSession.flush()

                                    # new crossing points creation
                                    old_crossing_points = (
                                        DBSession.query(CrossingPoint)
                                        .filter(CrossingPoint.challenge_id == old_challenge.id)
                                        .all()
                                    )

                                    for old_crossing_point in old_crossing_points:
                                        new_crossing_point = CrossingPoint()
                                        new_crossing_point.name = old_crossing_point.name
                                        new_crossing_point.position_x = old_crossing_point.position_x
                                        new_crossing_point.position_y = old_crossing_point.position_y
                                        new_crossing_point.challenge_id = new_challenge.id
                                        DBSession.add(new_crossing_point)

                                    DBSession.flush()

                                    # start crossing point for new challenge
                                    old_start_crossing_point = None
                                    if old_challenge.start_crossing_point_id != None:
                                        old_start_crossing_point = (
                                            DBSession().query(CrossingPoint).get(old_challenge.start_crossing_point_id)
                                        )

                                    new_start_crossing_point = None
                                    if old_start_crossing_point != None:
                                        new_start_crossing_point = (
                                            DBSession.query(CrossingPoint)
                                            .filter(
                                                CrossingPoint.name == old_start_crossing_point.name,
                                                CrossingPoint.challenge_id == new_challenge.id,
                                            )
                                            .first()
                                        )
                                    # end crossing point for new challenge
                                    old_end_crossing_point = None
                                    if old_challenge.end_crossing_point_id != None:
                                        old_end_crossing_point = (
                                            DBSession().query(CrossingPoint).get(old_challenge.end_crossing_point_id)
                                        )

                                    new_end_crossing_point = None
                                    if old_end_crossing_point != None:
                                        new_end_crossing_point = (
                                            DBSession.query(CrossingPoint)
                                            .filter(
                                                CrossingPoint.name == old_end_crossing_point.name,
                                                CrossingPoint.challenge_id == new_challenge.id,
                                            )
                                            .first()
                                        )

                                    # check if new start and end date are not null
                                    if new_start_crossing_point != None and new_end_crossing_point != None:
                                        # update of challenge
                                        DBSession.query(Challenge).filter(Challenge.id == new_challenge.id).update(
                                            {
                                                Challenge.start_crossing_point_id: new_start_crossing_point.id,
                                                Challenge.end_crossing_point_id: new_end_crossing_point.id,
                                            }
                                        )

                                        DBSession.flush()
                                    else:
                                        raise EnvironmentError(
                                            error_messages.DUPLICATION_CHALLENGE_START_AND_END_MISSING
                                        )

                                    # challenge's map's url
                                    if old_challenge.map_url != None:
                                        old_challenge_image = str(get_project_root()) + old_challenge.map_url

                                        if os.path.exists(old_challenge_image):
                                            map_url_splitter = old_challenge.map_url.split("_")
                                            image_format = old_challenge.map_url.split(".")[1]
                                            new_challenge_map_url = (
                                                map_url_splitter[0] + "_" + str(new_challenge.id) + "." + image_format
                                            )
                                            # copy of new file
                                            shutil.copyfile(
                                                old_challenge_image,
                                                str(get_project_root()) + new_challenge_map_url,
                                            )
                                            if os.path.exists(str(get_project_root()) + new_challenge_map_url):
                                                # update of challenge
                                                DBSession.query(Challenge).filter(
                                                    Challenge.id == new_challenge.id
                                                ).update({Challenge.map_url: new_challenge_map_url})

                                                DBSession.flush()

                                    # new segments creation
                                    old_segments = (
                                        DBSession.query(Segment).filter(Segment.challenge_id == old_challenge.id).all()
                                    )

                                    for old_segment in old_segments:
                                        new_segment = Segment()
                                        new_segment.name = old_segment.name
                                        new_segment.coordinates = old_segment.coordinates
                                        new_segment.challenge_id = new_challenge.id

                                        DBSession.add(new_segment)

                                    DBSession.flush()

                                    # update start and end crossing points for segment
                                    new_segments = (
                                        DBSession.query(Segment).filter(Segment.challenge_id == new_challenge.id).all()
                                    )

                                    for new_segment in new_segments:
                                        # find old segment by name
                                        old_segment = (
                                            DBSession.query(Segment)
                                            .filter(
                                                Segment.name == new_segment.name,
                                                Segment.challenge_id == old_challenge.id,
                                            )
                                            .first()
                                        )
                                        # find old segment's start crossing point
                                        old_segment_start_crossing_point = (
                                            DBSession().query(CrossingPoint).get(old_segment.start_crossing_point_id)
                                        )
                                        # find new segment's start crossing point
                                        new_segment_start_crossing_point = (
                                            DBSession.query(CrossingPoint)
                                            .filter(
                                                CrossingPoint.name == old_segment_start_crossing_point.name,
                                                CrossingPoint.challenge_id == new_challenge.id,
                                            )
                                            .first()
                                        )
                                        # find old segment's end crossing point
                                        old_segment_end_crossing_point = (
                                            DBSession().query(CrossingPoint).get(old_segment.end_crossing_point_id)
                                        )
                                        # find new segment's start crossing point
                                        new_segment_end_crossing_point = (
                                            DBSession.query(CrossingPoint)
                                            .filter(
                                                CrossingPoint.name == old_segment_end_crossing_point.name,
                                                CrossingPoint.challenge_id == new_challenge.id,
                                            )
                                            .first()
                                        )

                                        # check if new start and end date are not null
                                        if (
                                            new_segment_start_crossing_point != None
                                            and new_segment_end_crossing_point != None
                                        ):
                                            # segment update
                                            DBSession.query(Segment).filter(Segment.id == new_segment.id).update(
                                                {
                                                    Segment.start_crossing_point_id: new_segment_start_crossing_point.id,
                                                    Segment.end_crossing_point_id: new_segment_end_crossing_point.id,
                                                }
                                            )

                                            DBSession.flush()
                                        else:
                                            raise EnvironmentError(
                                                error_messages.DUPLICATION_SEGMENT_START_AND_END_MISSING
                                            )

                                        # check if old segment had obstacles
                                        if len(old_segment.obstacles) > 0:
                                            for old_obstacle in old_segment.obstacles:
                                                new_obstacle = Obstacle()
                                                new_obstacle.label = old_obstacle.label
                                                new_obstacle.description = old_obstacle.description
                                                new_obstacle.progress = old_obstacle.progress
                                                new_obstacle.question_type = old_obstacle.question_type
                                                new_obstacle.result = old_obstacle.result
                                                new_obstacle.segment_id = new_segment.id
                                                DBSession.add(new_obstacle)

                                            DBSession.flush()

                                    response = service_informations.build_response(
                                        exception.HTTPCreated,
                                        challenge_schema.dump(new_challenge),
                                    )

                                else:
                                    return service_informations.build_response(
                                        exception.HTTPBadRequest,
                                        None,
                                        error_messages.DUPLICATE_CHALLENGE_MANDATORY_FIELD,
                                    )

                            except ValidationError as validation_error:
                                response = service_informations.build_response(
                                    exception.HTTPBadRequest,
                                    None,
                                    str(validation_error),
                                )

                            except ValueError as value_error:
                                response = service_informations.build_response(
                                    exception.HTTPBadRequest, None, str(value_error)
                                )

                            except EnvironmentError as ee:
                                response = service_informations.build_response(
                                    exception.HTTPUnprocessableEntity, None, str(ee)
                                )

                            except Exception as e:
                                response = service_informations.build_response(exception.HTTPInternalServerError)
                                logging.getLogger(__name__).warn("Returning: %s", str(e))

                        else:
                            response = service_informations.build_response(
                                exception.HTTPForbidden,
                                None,
                                error_messages.DUPLICATION_CHALLENGE_NOT_TERMINATED,
                            )

                    else:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.DUPLICATION_CHALLENGE_PERMANENT,
                        )

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.DUPLICATION_CHALLENGE_NOT_PUBLISHED,
                    )

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.DUPLICATION_CHALLENGE_NOT_OWNER,
                )

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    # solution pour ce sprint, penser à optimiser
    if response.status == "422 Unprocessable Entity":
        if new_challenge != None:
            if new_challenge.map_url != None:
                image = str(get_project_root()) + new_challenge.map_url
                if os.path.exists(image):
                    os.remove(image)

            new_challenge.start_crossing_point_id = None
            new_challenge.end_crossing_point_id = None

            crossing_points_to_delete = DBSession.query(CrossingPoint).filter_by(challenge_id=new_challenge.id)

            for crossing_point_to_delete in crossing_points_to_delete:
                DBSession.delete(crossing_point_to_delete)

            DBSession.delete(new_challenge)
            DBSession.flush()

    return response


user_challenges = Service(
    name="user_challenges",
    path="user/challenges",
    cors_policy=cors_policy,
)


@user_challenges.get()
def get_challenges_for_user(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenges = []
        if request.query_string != "":
            splitter = request.query_string.split("=")
            if len(splitter) == 2 and splitter[0] == "subscribed":
                if splitter[1] == "true":
                    challenges = ChallengeResources().find_all_subscribed_challenges_by_user(user.id)
                elif splitter[1] == "false":
                    challenges = ChallengeResources().find_all_unsubscribed_challenges_by_user(user.id)

        if len(challenges) == 0:
            return service_informations.build_response(exception.HTTPNoContent())

        data = {"challenges": ChallengeSchema(many=True).dump(challenges)}

        response = service_informations.build_response(exception.HTTPOk, data)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


admin_challenges = Service(
    name="user_created_challenges",
    path="admin/challenges",
    cors_policy=cors_policy,
)


@admin_challenges.get()
def get_challenges_created_by_admin(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        # check if user has the admin rights
        if user.is_admin:

            challenges = []
            if request.query_string != "":
                splitter = request.query_string.split("=")
                if len(splitter) == 2 and splitter[0] == "draft":
                    if splitter[1] == "false":
                        challenges = challenges = (
                            DBSession.query(Challenge)
                            .filter(Challenge.admin_id == user.id, Challenge.draft == False)
                            .all()
                        )

                    elif splitter[1] == "true":
                        challenges = challenges = (
                            DBSession.query(Challenge)
                            .filter(Challenge.admin_id == user.id, Challenge.draft == True)
                            .all()
                        )

            if len(challenges) == 0:
                return service_informations.build_response(exception.HTTPNoContent())

            data = {"challenges": ChallengeSchema(many=True).dump(challenges)}

            response = service_informations.build_response(exception.HTTPOk, data)

        else:
            response = service_informations.build_response(
                exception.HTTPForbidden,
                None,
                error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


challenge_image_mobile = Service(
    name="challenge_image_mobile",
    path="challenges/{id:\d+}/image-mobile",
    cors_policy=cors_policy,
)


@challenge_image_mobile.get()
def download_image_mobile(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                if challenge.map_url != None:
                    image = str(get_project_root()) + challenge.map_url

                    if os.path.exists(image):
                        file_image = open(image, "rb")
                        image_read = file_image.read()
                        image_64_encode = bytes.decode(base64.encodebytes(image_read)).replace("\n", "")

                        response = service_informations.build_response(exception.HTTPOk, image_64_encode)

                    else:
                        response = service_informations.build_response(exception.HTTPNoContent)

                else:
                    response = service_informations.build_response(exception.HTTPNoContent)

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound,
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


challenge_publish = Service(
    name="challenge_publish",
    path="challenges/{id:\d+}/publish",
    cors_policy=cors_policy,
)

"""
@api {patch} /challenges/:id/publish Publication of challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.3.0
@apiName PublishChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin


@apiSuccessExample {json} Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} ChallengeStartDateAlreadyPassed Publication of a challenge whose start date has already passed.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to publish a challenge whose start date has already passed (10-05-2021, 19:04)."
  }
}

@apiError (Error 403) {Object} ChallengeEndDateAlreadyPassed Publication of a challenge whose end date has already passed.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to publish a challenge whose end date has already passed (10-05-2021, 19:04)."
  }
}

@apiError (Error 403) {Object} ChallengeAlreadyPublished Publication of a challenge that has already been challenged.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to publish the challenge that has already been published."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_publish.patch()
def publish_challenge(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge has not already been published
                if challenge.draft:

                    can_be_published = True
                    reason = ""
                    now = datetime.datetime.now()

                    if challenge.start_date != None and challenge.start_date < now:
                        can_be_published = False
                        reason = error_messages.PUBLISH_CHALLENGE_START_DATE_HAS_PASSED

                    if challenge.end_date != None and challenge.end_date < now:
                        can_be_published = False
                        reason = error_messages.PUBLISH_CHALLENGE_END_DATE_HAS_PASSED

                    if can_be_published:

                        try:

                            DBSession.query(Challenge).filter(Challenge.id == challenge.id).update(
                                {Challenge.draft: False}
                            )

                            DBSession.flush()

                            response = service_informations.build_response(exception.HTTPNoContent)

                        except Exception as e:
                            response = service_informations.build_response(exception.HTTPInternalServerError)
                            logging.getLogger(__name__).warn("Returning: %s", str(e))

                    else:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            reason,
                        )

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        error_messages.PUBLISH_CHALLENGE_ALREADY_PUBLISHED,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden())

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound,
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


challenge_revoke = Service(
    name="challenge_revoke",
    path="challenges/{id:\d+}/revoke",
    cors_policy=cors_policy,
)

"""
@api {patch} /challenges/:id/revoke Revoke one challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.3.0
@apiName UnpublishChallenge
@apiGroup Challenge
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccessExample {json} Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} ChallengeAlreadyUnpublished Unpublish a challenge that has already been unpublished.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to unpublish the challenge that has already been unpublished."
  }
}

@apiError (Error 403) {Object} ChallengeAlreadyStarted Unpublish a challenge that has already subscribed users.
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to unpublish challenge that has already subscribed users."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_revoke.patch()
def revoke_challenge(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge has already been published
                if challenge.draft == False:

                    can_be_revoke = True

                    current_subscriptions = UserChallengeResources().find_current_subscriptions(challenge)

                    # if there are no users who are subscribed to challenge, challenge can be revoke
                    if len(current_subscriptions) > 0:
                        can_be_revoke = False

                    if can_be_revoke:

                        try:

                            DBSession.query(Challenge).filter(Challenge.id == challenge.id).update(
                                {Challenge.draft: True}
                            )

                            DBSession.flush()

                            response = service_informations.build_response(exception.HTTPNoContent)

                        except Exception as e:
                            response = service_informations.build_response(exception.HTTPInternalServerError)
                            logging.getLogger(__name__).warn("Returning: %s", str(e))

                    else:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.REVOKE_CHALLENGE_WITH_SUBSCRIBED_USERS,
                        )

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.REVOKE_CHALLENGE_ALREADY_REVOKED,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden())

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound,
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
