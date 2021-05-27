from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError, INCLUDE

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Segment, Challenge, User, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import SegmentSchema
from loftes.resources import UserCheckRessources

import pyramid.httpexceptions as exception
from pyramid.authentication import AuthTicket
import logging
import json

segment = Service(
    name="segment",
    path="/challenges/{challenge_id:\d+}/segments",
    cors_policy=cors_policy,
)


"""
@api {get} /challenges/:challenge_id/segments Request all segments informations of challenge's id.
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.1.0
@apiName GetSegments
@apiGroup Segment
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (OK 200) {Array} Segments All segments created of challenge's id.
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "segments": [
    {
      "id": 1,
      "name": "A travers le bois d'entre les mondes",
      "start_crossing_point": {
        "id": 1,
        "name": "L'armoire",
        "position_x": 0.1,
        "position_y": 0.1
      },
      "end_crossing_point": {
        "id": 2,
        "name": "La passe du faune",
        "position_x": 0.1,
        "position_y": 0.1
      },
      "coordinates": [],
      "challenge": {
        "id": 1,
        "name": "A la recherche d'Aslan",
        "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        "end_date": "2020-03-18T00:00:00",
        "alone_only": null,
        "level": "1",
        "scalling": 4,
        "draft": false,
        "start_crossing_point": {
          "id": 10,
          "name": "cr 1",
          "position_x": 0.417391,
          "position_y": 0.207442
        },
        "end_crossing_point": {
          "id": 12,
          "name": "cr 3",
          "position_x": 0.573043,
          "position_y": 0.492283
        },
        "admin": {
          "id": 1,
          "first_name": "Missy",
          "last_name": "Of Gallifrey",
          "pseudo": "Le maitre",
          "email": "lemaitre@gmail.com"
        }
      }
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

@apiError (Error 404) {Object} RessourceNotFound No segments were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@segment.get()
def get_segments(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                segments = DBSession.query(Segment).filter(Segment.challenge_id == challenge.id).all()

                if len(segments) == 0:
                    return service_informations.build_response(exception.HTTPNotFound())

                data = {"segments": SegmentSchema(many=True).dump(segments)}

                response = service_informations.build_response(exception.HTTPOk, data)

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    "You do not have permission to view this resource using the credentials that you supplied.",
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Challenge' is not found.",
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {post} /challenges/:challenge_id/segments Create a new segment of challenge's id.
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PostSegment
@apiGroup Segment
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (Body parameters) {String} name Segment's name
@apiSuccess (Body parameters) {Number} start_crossing_point_id ID of crossing point choosed as start of a segment
@apiSuccess (Body parameters) {Number} end_crossing_point_id ID of crossing point choosed as end of a segment
@apiSuccess (Body parameters) {Array} coordinates Array of segment's coordinates

@apiSuccessExample {json} Body:

{
  "name": "A travers le bois d'entre les mondes",
  "start_crossing_point_id":5,
	"end_crossing_point_id":6,
  "coordinates":[
    {
      "position_x": 355,
      "position_y": 365.125
    },
    {
      "position_x": 300,
      "position_y": 347.125
    }
  ]
}

@apiSuccessExample {json} Success response:
HTTP/1.1 201 Created

{
    "id": 1,
    "name": "A travers le bois d'entre les mondes",
    "start_crossing_point": {
      "id": 1,
      "name": "L'armoire",
      "position_x": 0.1,
      "position_y": 0.1
    },
    "end_crossing_point": {
      "id": 2,
      "name": "La passe du faune",
      "position_x": 0.1,
      "position_y": 0.1
    },
    "coordinates": [
      {
        "position_x": 355,
        "position_y": 365.125
      },
      {
        "position_x": 300,
        "position_y": 347.125
      }
    ],
    "challenge": {
        "id": 1,
        "name": "A la recherche d'Aslan",
        "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        "end_date": "2020-03-18T00:00:00",
        "alone_only": null,
        "level": "1",
        "scalling": 4,
        "draft": false,
        "start_crossing_point": {
            "id": 10,
            "name": "cr 1",
            "position_x": 0.417391,
            "position_y": 0.207442
        },
        "end_crossing_point": {
            "id": 12,
            "name": "cr 3",
            "position_x": 0.573043,
            "position_y": 0.492283
        },
        "admin": {
            "id": 1,
            "first_name": "Missy",
            "last_name": "Of Gallifrey",
            "pseudo": "Le maitre",
            "email": "lemaitre@gmail.com"
        }
    }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The segment's coordinates must be of the type array."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The coordinates must have x and y positions."
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

@apiError (Error 404) {Object} RessourceNotFound No segments were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@segment.post()
def create_segment(request):

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

                        segment_schema = SegmentSchema()
                        segment = segment_schema.load(request.json, unknown=INCLUDE)
                        segment.challenge_id = challenge.id
                        print(segment)

                        DBSession.add(segment)
                        DBSession.flush()

                        response = service_informations.build_response(
                            exception.HTTPCreated, segment_schema.dump(segment)
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
                        "You do not have permission to modify a published challenge.",
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Challenge' is not found.",
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


segment_id = Service(
    name="segment_id",
    path="/challenges/{challenge_id:\d+}/segments/{id:\d+}",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:challenge_id/segments/:id Request a segment informations of segment's id
@apiParam challenge_id Challenge's unique ID.
@apiParam id Segment's unique ID.
@apiVersion 0.1.0
@apiName GetSegment
@apiGroup Segment
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (OK 200) {Number} id Segment's ID
@apiSuccess (OK 200) {String} name Segment's name
@apiSuccess (OK 200) {Object} start_crossing_point Segment's start crossing point
@apiSuccess (OK 200) {Object} end_crossing_point Segment's end crossing point
@apiSuccess (OK 200) {Array} coordinates Array of segment's coordinates

@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
    "id": 1,
    "name": "A travers le bois d'entre les mondes",
    "start_crossing_point": {
      "id": 1,
      "name": "L'armoire",
      "position_x": 0.1,
      "position_y": 0.1
    },
    "end_crossing_point": {
      "id": 2,
      "name": "La passe du faune",
      "position_x": 0.1,
      "position_y": 0.1
    },
    "coordinates": [],
    "challenge": {
        "id": 1,
        "name": "A la recherche d'Aslan",
        "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
        "end_date": "2020-03-18T00:00:00",
        "alone_only": null,
        "level": "1",
        "scalling": 4,
        "draft": false,
        "start_crossing_point": {
            "id": 10,
            "name": "cr 1",
            "position_x": 0.417391,
            "position_y": 0.207442
        },
        "end_crossing_point": {
            "id": 12,
            "name": "cr 3",
            "position_x": 0.573043,
            "position_y": 0.492283
        },
        "admin": {
            "id": 1,
            "first_name": "Missy",
            "last_name": "Of Gallifrey",
            "pseudo": "Le maitre",
            "email": "lemaitre@gmail.com"
        }
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

@apiError (Error 404) {Object} RessourceNotFound No segments were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@segment_id.get()
def get_segment_by_id(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                segment = (
                    DBSession.query(Segment)
                    .filter(
                        Segment.challenge_id == challenge.id,
                        Segment.id == request.matchdict["id"],
                    )
                    .first()
                )

                # check if segment point is found
                if segment == None:
                    return service_informations.build_response(exception.HTTPNotFound())

                response = service_informations.build_response(exception.HTTPOk, SegmentSchema().dump(segment))

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    "You do not have permission to view this resource using the credentials that you supplied.",
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Challenge' is not found.",
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {put} /challenges/:challenge_id/segments/:id Update a segment
@apiParam challenge_id Challenge's unique ID.
@apiParam id Segment's unique ID.
@apiVersion 0.1.0
@apiName PutSegment
@apiGroup Segment
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (Body parameters) {String} name Segment's name
@apiSuccess (Body parameters) {Number} start_crossing_point_id ID of crossing point choosed as start of a segment
@apiSuccess (Body parameters) {Number} end_crossing_point_id ID of crossing point choosed as end of a segment
@apiSuccess (Body parameters) {Array} coordinates Array of segment's coordinates

@apiSuccessExample {json} Body:

{
  "name": "A travers le bois d'entre les mondes",
  "start_crossing_point_id":5,
	"end_crossing_point_id":6,
  "coordinates":[
    {
      "position_x": 355,
      "position_y": 365.125
    },
    {
      "position_x": 300,
      "position_y": 347.125
    }
  ]
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

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The segment's coordinates must be of the type array."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The coordinates must have x and y positions."
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

@apiError (Error 404) {Object} RessourceNotFound No segments were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@segment_id.put()
def update_segment(request):

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

                    id = request.matchdict["id"]

                    query = DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == id)
                    segment = query.first()

                    # check if segment point is found
                    if segment != None:

                        try:

                            query.update(SegmentSchema().check_json(request.json, segment))
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
                        response = service_informations.build_response(exception.HTTPNotFound)

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        "You do not have permission to modify a published challenge.",
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Challenge' is not found.",
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {patch} /challenges/:challenge_id/segments/:id Partially modify a segment
@apiParam challenge_id Challenge's unique ID.
@apiParam id Segment's unique ID.
@apiVersion 0.1.0
@apiName PatchSegment
@apiGroup Segment
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.

@apiSuccess (Body parameters) {String} name Segment's name
@apiSuccess (Body parameters) {Number} start_crossing_point_id ID of crossing point choosed as start of a segment
@apiSuccess (Body parameters) {Number} end_crossing_point_id ID of crossing point choosed as end of a segment
@apiSuccess (Body parameters) {Array} coordinates Array of segment's coordinates

@apiSuccessExample {json} Body:

{
  "coordinates":[
    {
      "position_x": 455,
      "position_y": 465.125
    },
    {
      "position_x": 567,
      "position_y": 591.125
    }
  ]
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

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The segment's coordinates must be of the type array."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The coordinates must have x and y positions."
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

@apiError (Error 404) {Object} RessourceNotFound No segments were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@segment_id.patch()
def modify_segment(request):

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

                    id = request.matchdict["id"]

                    query = DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == id)
                    segment = query.first()

                    # check if segment point is found
                    if segment != None:

                        try:

                            query.update(SegmentSchema().check_json(request.json, segment))
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
                        response = service_informations.build_response(exception.HTTPNotFound)

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        "You do not have permission to modify a published challenge.",
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Challenge' is not found.",
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
@api {delete} /challenges/:challenge_id/segments/:id Delete a segment
@apiParam challenge_id Challenge's unique ID.
@apiParam id Segment's unique ID.
@apiVersion 0.1.0
@apiName DeleteSegment
@apiGroup Segment
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

@apiError (Error 404) {Object} RessourceNotFound No segments were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@segment_id.delete()
def delete_segment(request):

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

                    id = request.matchdict["id"]

                    segment = (
                        DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == id).first()
                    )

                    # check if segment point is found
                    if segment != None:

                        try:

                            DBSession.delete(segment)
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
                        response = service_informations.build_response(exception.HTTPNotFound)

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        "You do not have permission to modify a published challenge.",
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Challenge' is not found.",
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
