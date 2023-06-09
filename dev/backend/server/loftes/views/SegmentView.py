from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError, INCLUDE

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Segment, Challenge, User, CrossingPoint, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import SegmentSchema
from loftes.resources.UserResources import UserResources

import loftes.error_messages as error_messages

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


    @apiError (Error 401) {Object} Unauthorized Bad credentials.
    @apiErrorExample {json} Error 401 response:
    HTTP/1.1 401 Unauthorized

    {
        "error": {
            "status": "UNAUTHORIZED",
            "message": "Bad credentials."
        }
    }

    @apiError (Error 403) {Object} UserNotAdmin User is not admin
    @apiErrorExample {json} Error 403 response:
    HTTP/1.1 403 Forbidden

    {
        "error": {
        "status": "FORBIDDEN",
        "message": "You do not have permission to view this resource using the credentials that you supplied."
        }
    }

    @apiError (Error 404) {Object} RessourceNotFound No events were found.
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
                    return service_informations.build_response(exception.HTTPNoContent)

                data = {"segments": SegmentSchema(many=True).dump(segments)}

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
  @api {get} /crossing-points/:crossing-point_id/segments Request all segments informations of start crossing point's id.
  @apiParam crossing-point_id Crossing point's unique ID.
  @apiVersion 0.3.0
  @apiName GetSegmentsByStartCrossingPoint
  @apiGroup Segment
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.

  @apiSuccess (OK 200) {Array} Segments All segments created for start crossing point.
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


    @apiError (Error 401) {Object} Unauthorized Bad credentials.
    @apiErrorExample {json} Error 401 response:
    HTTP/1.1 401 Unauthorized

    {
        "error": {
            "status": "UNAUTHORIZED",
            "message": "Bad credentials."
        }
    }

    @apiError (Error 403) {Object} UserNotAdmin User is not admin
    @apiErrorExample {json} Error 403 response:
    HTTP/1.1 403 Forbidden

    {
        "error": {
        "status": "FORBIDDEN",
        "message": "You do not have permission to view this resource using the credentials that you supplied."
        }
    }

    @apiError (Error 404) {Object} RessourceNotFound No events were found.
    @apiErrorExample {json} Error 404 response:
    HTTP/1.1 404 Not Found

    {
        "error": {
        "status": "NOT FOUND",
        "message": "Requested resource is not found."
        }
    }

"""
crossing_point_segments = Service(
    name="crossingpoint_segments",
    path="/crossing-points/{id:\d+}/segments",
    cors_policy=cors_policy,
)


@crossing_point_segments.get()
def get_crossing_point_segments(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    if user != None:

        crossing_point = DBSession.query(CrossingPoint).get(request.matchdict["id"])

        # check if crossing point is found
        if crossing_point != None:

            challenge = DBSession.query(Challenge).get(crossing_point.challenge_id)

            if challenge != None:

                subscribers = UserResources().find_all_subscribers_by_challenge(challenge)

                user_is_subscribed = False
                for subscriber in subscribers:
                    # user is subscribed
                    if subscriber.id == user.id:
                        user_is_subscribed = True

                if user.id == challenge.admin_id:
                    user_is_subscribed = True

                # check if user is subscribed
                if user_is_subscribed:

                    segments = (
                        DBSession.query(Segment)
                        .filter(
                            Segment.challenge_id == challenge.id,
                            Segment.start_crossing_point_id == crossing_point.id,
                        )
                        .all()
                    )

                    if len(segments) == 0:
                        return service_informations.build_response(exception.HTTPNoContent())

                    data = {"segments": SegmentSchema(many=True).dump(segments)}

                    response = service_informations.build_response(exception.HTTPOk, data)

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
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

                        segment_request = request.json
                        segment_request["challenge_id"] = challenge.id

                        segment_schema = SegmentSchema()
                        segment = segment_schema.load(segment_request, unknown=INCLUDE)
                        # segment.challenge_id = challenge.id

                        # segment_schema = SegmentSchema()
                        # segment = segment_schema.load(request.json, unknown=INCLUDE)
                        # segment.challenge_id = challenge.id

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
                        error_messages.MODIFY_PUBLISHED_CHALLENGE,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


segment_id = Service(
    name="segment_id",
    path="/segments/{id:\d+}",
    cors_policy=cors_policy,
)

"""
  @api {get} /segments/:id Request a segment informations of segment's id
  @apiParam {Number} id Segment's unique ID.
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

        segment = DBSession.query(Segment).get(request.matchdict["id"])

        # check if segment is found
        if segment != None:

            challenge = segment.challenge

            if challenge != None:

                # check if user is challenge's admin or challenge is published
                if user.id == challenge.admin_id or challenge.draft == False:

                    response = service_informations.build_response(exception.HTTPOk, SegmentSchema().dump(segment))

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
  @api {put} /segments/:id Update a segment
  @apiParam {Number} id Segment's unique ID.
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

        segment = DBSession.query(Segment).get(request.matchdict["id"])

        # check if segment is found
        if segment != None:

            challenge = segment.challenge

            # check if challenge is found
            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            DBSession.query(Segment).filter(Segment.id == segment.id).update(
                                SegmentSchema().check_json(request.json, segment)
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
  @api {patch} /segments/:id Partially modify a segment
  @apiParam {Number} id Segment's unique ID.
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

        segment = DBSession.query(Segment).get(request.matchdict["id"])

        # check if segment is found
        if segment != None:

            challenge = segment.challenge

            # check if challenge is found
            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            DBSession.query(Segment).filter(Segment.id == segment.id).update(
                                SegmentSchema().check_json(request.json, segment)
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
  @api {delete} /segments/:id Delete a segment
  @apiParam challenge_id Challenge's unique ID.
  @apiParam {Number} id Segment's unique ID.
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

        segment = DBSession.query(Segment).get(request.matchdict["id"])

        # check if segment is found
        if segment != None:

            challenge = segment.challenge

            # check if challenge is found
            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

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
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.MODIFY_PUBLISHED_CHALLENGE,
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
