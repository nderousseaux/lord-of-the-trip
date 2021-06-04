from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Challenge, CrossingPoint, Segment, User, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import CrossingPointSchema
from loftes.marshmallow_schema import SegmentSchema

import loftes.error_messages as error_messages

import pyramid.httpexceptions as exception
import logging
import json

crossing_point = Service(
    name="crossingpoint",
    path="/challenges/{challenge_id:\d+}/crossing-points",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:challenge_id/crossing-points Request all crossing points informations of challenge's id.
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.1.0
@apiName GetCrossingPoints
@apiGroup CrossingPoint
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (OK 200) {Array} CrossingPoints All crossing points created of challenge's id.
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "crossing_points": [
    {
      "id": 1,
      "name": "L'armoire",
      "position_x": 0.1,
      "position_y": 0.1
    },
    {
      "id": 2,
      "name": "La passe du faune",
      "position_x": 0.1,
      "position_y": 0.1
    },
    {
      "id": 3,id
    },
    {
      "id": 4,
      "name": "Le carrousel des ours",
      "position_x": 0.3,
      "position_y": 0.4
    },
    {
      "id": 5,
      "name": "Le pont des centaures",
      "position_x": 0.3,
      "position_y": 0.5
    },
    {
      "id": 6,
      "name": "Le pont de la sorcière",
      "position_x": 0.2,
      "position_y": 0.5
    },
    {
      "id": 7,
      "name": "Le nid des griffons",
      "position_x": 0.2,
      "position_y": 0.5
    },
    {
      "id": 8,
      "name": "La table de pierre",
      "position_x": 0.2,
      "position_y": 0.5
    },
    {
      "id": 9,
      "name": "Cair Paravel",
      "position_x": 0.2,
      "position_y": 0.5
    },
    {
      "id": 10,
      "name": "Test4",
      "position_x": 13.0099,
      "position_y": 87.1313
    }
  ]
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No crossing points were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@crossing_point.get()
def get_crossing_points(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                crossing_points = (
                    DBSession.query(CrossingPoint).filter(CrossingPoint.challenge_id == challenge.id).all()
                )

                if len(crossing_points) == 0:
                    return service_informations.build_response(exception.HTTPNoContent())

                data = {"crossing_points": CrossingPointSchema(many=True).dump(crossing_points)}

                response = service_informations.build_response(exception.HTTPOk, data)

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {post} /challenges/:challenge_id/crossing-points Create a new Crossing point of challenge's id
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PostCrossingPoint
@apiGroup CrossingPoint
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (Body parameters) {String} name Crossing point's name
@apiSuccess (Body parameters) {Float} position_x Crossing point's position x on map
@apiSuccess (Body parameters) {Float} position_y Crossing point's position y on map

@apiSuccessExample {json} Body:

{
  "name": "La passe du faune",
  "position_x": 0.1,
  "position_y": 0.1
}

@apiSuccessExample {json} Success response:
HTTP/1.1 201 Created

{
  "id": 1,
  "name": "La passe du faune",
  "position_x": 0.1,
  "position_y": 0.1
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
    "message": "The given value 'La passe du faune' is already used as a crossing point name for this challenge."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

"""


@crossing_point.post()
def create_crossing_point(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge is draft
                if challenge.draft:

                    try:
                        crossing_point_data = request.json
                        crossing_point_data["challenge_id"] = challenge.id

                        crossing_point_schema = CrossingPointSchema()
                        crossing_point = crossing_point_schema.load(crossing_point_data)

                        DBSession.add(crossing_point)
                        DBSession.flush()

                        response = service_informations.build_response(
                            exception.HTTPCreated,
                            crossing_point_schema.dump(crossing_point),
                        )

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
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.MODIFY_PUBLISHED_CHALLENGE,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


crossing_point_id = Service(
    name="crossingpoint_id",
    path="/crossing-points/{id:\d+}",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:challenge_id/crossing-points/:id Request a crossing-point informations of challenge's id
@apiParam challenge_id Challenge's unique ID.
@apiParam id Crossing point's unique ID.
@apiVersion 0.1.0
@apiName GetCrossingPoint
@apiGroup CrossingPoint
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (OK 200) {Number} id Crossing point's ID
@apiSuccess (OK 200) {String} name Crossing point's name
@apiSuccess (OK 200) {Float} position_x Crossing point's position x on map
@apiSuccess (OK 200) {Float} position_y Crossing point's position y on map

@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "id": 1,
  "name": "La passe du faune",
  "position_x": 0.1,
  "position_y": 0.1
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No crossing points were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@crossing_point_id.get()
def get_crossing_point(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        crossing_point = DBSession.query(CrossingPoint).get(request.matchdict["id"])

        # check if crossing point is found
        if crossing_point != None:

            challenge = DBSession.query(Challenge).get(crossing_point.challenge_id)

            if challenge != None:

                # check if user is challenge's admin or challenge is published
                if user.id == challenge.admin_id or challenge.draft == False:

                    response = service_informations.build_response(
                        exception.HTTPOk, CrossingPointSchema().dump(crossing_point)
                    )

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden, None, error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION
                    )

            else:
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {put} /challenges/:challenge_id/crossing-points/:id Update a crossing point
@apiParam challenge_id Challenge's unique ID.
@apiParam id Crossing point's unique ID.
@apiVersion 0.1.0
@apiName PutCrossingPoint
@apiGroup CrossingPoint
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (Body parameters) {String} name Crossing point's name
@apiSuccess (Body parameters) {Float} position_x Crossing point's position x on map
@apiSuccess (Body parameters) {Float} position_y Crossing point's position y on map

@apiSuccessExample {json} Body:

{
  "name": "La passe du faune",
  "position_x": 0.1,
  "position_y": 0.1
}

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

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

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No crossing points were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@crossing_point_id.put()
def update_crossing_point(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        crossing_point = DBSession.query(CrossingPoint).get(request.matchdict["id"])

        # check if crossing point is found
        if crossing_point != None:

            challenge = DBSession.query(Challenge).get(crossing_point.challenge_id)

            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            DBSession.query(CrossingPoint).filter(CrossingPoint.id == crossing_point.id).update(
                                CrossingPointSchema().check_json(request.json)
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
                            response = service_informations.build_response(exception.HTTPUnauthorized)

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
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )
        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {patch} /challenges/:challenge_id/crossing-points/:id Partially modify a crossing point
@apiParam challenge_id Challenge's unique ID.
@apiParam id Crossing point's unique ID.
@apiVersion 0.1.0
@apiName PatchCrossingPoint
@apiGroup CrossingPoint
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (Body parameters) {String} name Crossing point's name
@apiSuccess (Body parameters) {Float} position_x Crossing point's position x on map
@apiSuccess (Body parameters) {Float} position_y Crossing point's position y on map

@apiSuccessExample {json} Body:

{
  "name": "La passe du magicien"
}

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

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

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No crossing points were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@crossing_point_id.patch()
def modify_crossing_point(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        crossing_point = DBSession.query(CrossingPoint).get(request.matchdict["id"])

        # check if crossing point is found
        if crossing_point != None:

            challenge = DBSession.query(Challenge).get(crossing_point.challenge_id)

            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            DBSession.query(CrossingPoint).filter(CrossingPoint.id == crossing_point.id).update(
                                CrossingPointSchema().check_json(request.json)
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
                            response = service_informations.build_response(exception.HTTPUnauthorized)

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
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )
        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {delete} /challenges/:challenge_id/crossing-points/:id Delete a crossing point
@apiParam challenge_id Challenge's unique ID.
@apiParam id Crossing point's unique ID.
@apiVersion 0.1.0
@apiName DeleteCrossingPoint
@apiGroup CrossingPoint
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No crossing points were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@crossing_point_id.delete()
def delete_crossing_point(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        crossing_point = DBSession.query(CrossingPoint).get(request.matchdict["id"])

        # check if crossing point is found
        if crossing_point != None:

            challenge = DBSession.query(Challenge).get(crossing_point.challenge_id)

            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            if challenge.start_crossing_point_id == crossing_point.id:
                                challenge.start_crossing_point_id = None

                            if challenge.end_crossing_point_id == crossing_point.id:
                                challenge.end_crossing_point_id = None

                            DBSession.delete(crossing_point)
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
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.MODIFY_PUBLISHED_CHALLENGE,
                        )

                else:
                    response = service_informations.build_response(exception.HTTPForbidden)

            else:
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )
        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
