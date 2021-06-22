from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Event, Challenge, User, Segment, Obstacle, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.EventSchema import EventSchema
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema
from loftes.marshmallow_schema.ObstacleSchema import ObstacleSchema
from loftes.marshmallow_schema.EventDistanceSchema import EventDistanceSchema
from loftes.resources.EventResources import EventResources
from loftes.resources import UserManager

import loftes.error_messages as error_messages
from loftes.utils import get_project_root

import pyramid.httpexceptions as exception
from pyramid.authentication import AuthTicket
import datetime
import logging
import json
import os
import shutil
import base64

events = Service(name="events", path="/challenges/{challenge_id:\d+}/events", cors_policy=cors_policy)

"""
  @api {get} /challenges/:challenge_id/events Request events informations of challenge's id.
  @apiParam challenge_id Challenge's unique ID.
  @apiVersion 0.3.0
  @apiName GetEvents
  @apiGroup Event
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Array} Events All events created of challenge's id.
  @apiSuccessExample {json} Success response:
  HTTP/1.1 200 OK

  {
    "events": [
        {
        "id": 1013,
        "segment_id": 195,
        "duration": 11864,
        "move_type": 1,
        "event_type_id": 3,
        "event_type_info": {
            "id": 3,
            "code": "MOVE",
            "label": "Déplacement"
        },
        "event_date": "2021-06-18T18:58:11",
        "distance": 8,
        "footstep": null,
        "obstacle_id": null,
        "response": null
        },
        {
        "id": 1010,
        "segment_id": 195,
        "duration": 1234748,
        "move_type": 1,
        "event_type_id": 3,
        "event_type_info": {
            "id": 3,
            "code": "MOVE",
            "label": "Déplacement"
        },
        "event_date": "2021-06-18T15:46:36",
        "distance": 6154,
        "footstep": null,
        "obstacle_id": null,
        "response": null
        },
        {
        "id": 981,
        "segment_id": 195,
        "duration": null,
        "move_type": null,
        "event_type_id": 1,
        "event_type_info": {
            "id": 1,
            "code": "START",
            "label": "Départ du parcours"
        },
        "event_date": "2021-06-18T15:25:59",
        "distance": null,
        "footstep": null,
        "obstacle_id": null,
        "response": null
        }
    ]
  }

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


@events.get()
def get_events(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        # check if challenge is found
        if challenge != None:

            events = EventResources().find_all_events_for_user_by_challenge(user.id, challenge.id)

            if len(events) == 0:
                return service_informations.build_response(exception.HTTPNoContent())

            data = {"events": EventSchema(many=True).dump(events)}

            response = service_informations.build_response(exception.HTTPOk, data)

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {get} /challenges/:challenge_id/events/last Request last event that user cretaed of challenge's id.
  @apiParam challenge_id Challenge's unique ID.
  @apiVersion 0.3.0
  @apiName GetLastEvent
  @apiGroup Event
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Object} Event Last event created by user.
  @apiSuccessExample {json} Success response:
  HTTP/1.1 200 OK

  {
    "id": 1013,
    "segment_id": 195,
    "duration": 11864,
    "move_type": 1,
    "event_type_id": 3,
    "event_type_info": {
        "id": 3,
        "code": "MOVE",
        "label": "Déplacement"
    },
    "event_date": "2021-06-18T18:58:11",
    "distance": 8,
    "footstep": null,
    "obstacle_id": null,
    "response": null
   }

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
last_event = Service(
    name="last_event",
    path="/challenges/{challenge_id:\d+}/events/last",
    cors_policy=cors_policy,
)


@last_event.get()
def get_last_event(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        if challenge != None:

            event = EventResources().find_last_event_for_user_by_challenge(user.id, request.matchdict["challenge_id"])

            if event == None:
                return service_informations.build_response(exception.HTTPNotFound())

            return service_informations.build_response(exception.HTTPOk, EventSchema().dump(event))

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {get} /challenges/:challenge_id/events/distance Request sum of distance events for challenge's id.
  @apiParam challenge_id Challenge's unique ID.
  @apiVersion 0.3.0
  @apiName GetDistanceEventChallenge
  @apiGroup Event
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Number} Distance Sum of distance events.
  @apiSuccessExample {json} Success response:
  HTTP/1.1 200 OK

  {
    "distance": 6162
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
event_distance_challenge = Service(
    name="event_distance",
    path="/challenges/{challenge_id:\d+}/events/distance",
    cors_policy=cors_policy,
)


@event_distance_challenge.get()
def get_event_distance_challenge(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        if challenge != None:

            distance = EventResources().distance_event_for_user_by_challenge(user.id, challenge.id)

            return service_informations.build_response(exception.HTTPOk, EventDistanceSchema().dump(distance))

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {get} /segments/:challenge_id/events/distance Request sum of distance events for segments's id.
  @apiParam challenge_id Challenge's unique ID.
  @apiVersion 0.3.0
  @apiName GetDistanceEventSegment
  @apiGroup Event
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Number} Distance Sum of distance events.
  @apiSuccessExample {json} Success response:
  HTTP/1.1 200 OK

  {
    "distance": 483
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
event_distance_segment = Service(
    name="event_distance_segment",
    path="/segments/{segment_id:\d+}/events/distance",
    cors_policy=cors_policy,
)


@event_distance_segment.get()
def get_event_distance_segment(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)
    if user != None:

        segment = DBSession.query(Segment).get(request.matchdict["segment_id"])

        if segment != None:

            distance = EventResources().distance_event_for_user_by_segment(user.id, segment.id)

            return service_informations.build_response(exception.HTTPOk, EventDistanceSchema().dump(distance))

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {post} /challenges/:challenge_id/segments/:segment_id/events Create a new event for segment id.
  @apiParam challenge_id Challenge's unique ID.
  @apiParam segment_id Segment's unique ID.
  @apiVersion 0.3.0
  @apiName PostEvents
  @apiGroup Event
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Object} Created event.
  @apiSuccess (Body parameters) {Number} event_type_id Event type's id
  @apiSuccessExample {json} Success response:
  HTTP/1.1 201 Created

  {
    "event_type_id":4
  }

  @apiError (Error 400) {Object} BadRequest Malformed request syntax.
  @apiErrorExample {json} Error 400 response:
  HTTP/1.1 400 Bad Request

  {
    "error": {
        "status": "BAD REQUEST",
        "message": "{'event_type_id': ['Field must not be null.']}"
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
event_create = Service(
    name="event_create",
    path="/challenges/{challenge_id:\d+}/segments/{segment_id:\d+}/events",
    cors_policy=cors_policy,
)


@event_create.post()
def event_add(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)
    if user != None:

        checkchallenge = EventResources().check_challenge_for_event(request.matchdict["challenge_id"], user.id)

        if checkchallenge == "":

            segment_id = request.matchdict["segment_id"]
            segment = DBSession.query(Segment).get(segment_id)

            if segment != None:

                try:

                    event_schema = EventSchema()
                    eventdata = event_schema.load(request.json)
                    eventdata.segment_id = segment_id
                    eventdata.user_id = user.id
                    eventdata.event_date = datetime.datetime.now()

                    if eventdata.event_type_id == 5:
                        response = service_informations.build_response(
                            exception.HTTPBadRequest, None, error_messages.EVENT_CHECK_RESPONSE
                        )
                    else:
                        eventrulescheck = EventResources().check_event_type_rule(
                            eventdata.event_type_id,
                            user.id,
                            request.matchdict["challenge_id"],
                            segment_id,
                        )
                        if eventrulescheck == None:

                            DBSession.add(eventdata)
                            DBSession.flush()

                            response = service_informations.build_response(
                                exception.HTTPCreated, event_schema.dump(eventdata)
                            )
                        else:
                            response = service_informations.build_response(
                                exception.HTTPForbidden(),
                                None,
                                eventrulescheck,
                            )

                except ValidationError as validation_error:
                    response = service_informations.build_response(
                        exception.HTTPBadRequest, None, str(validation_error)
                    )

                except ValueError as value_error:
                    response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))

                except PermissionError as pe:
                    response = service_informations.build_response(exception.HTTPUnauthorized)

                except Exception as e:
                    response = service_informations.build_response(exception.HTTPInternalServerError)
                    logging.getLogger(__name__).warn("Returning: %s", str(e))

            else:
                response = service_informations.build_response(
                    exception.HTTPNotFound(),
                )
        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                checkchallenge,
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {post} /events/:id/manage-response Manage response sent by user.
  @apiParam id Event's unique ID.
  @apiVersion 0.3.0
  @apiName ManageResponse
  @apiGroup Event
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (Body parameters) {Bool} validate A true or false to validate the response sent by user

  @apiSuccessExample {json} Success response:
  HTTP/1.1 204 No Content.

  @apiError (Error 400) {Object} BadRequest Malformed request syntax.
  @apiErrorExample {json} Error 400 response:
  HTTP/1.1 400 Bad Request

  {
    "error": {
        "status": "BAD REQUEST",
        "message": "Field 'validate' is a mandatory field."
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
event_manage_response = Service(
    name="event_manage_response",
    path="/events/{id:\d+}/manage-response",
    cors_policy=cors_policy,
)


@event_manage_response.post()
def manage_response(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)

    if user != None:

        event = DBSession.query(Event).get(request.matchdict["id"])

        if event != None and event.event_type_id == 5:

            obstacle = DBSession.query(Obstacle).get(event.obstacle_id)

            if obstacle != None:

                if request.content_length > 0:

                    if "validate" in request.json and (
                        request.json["validate"] == "true" or request.json["validate"] == "false"
                    ):

                        # delete old answer
                        if event.photo_response_url != None:
                            image = str(get_project_root()) + event.photo_response_url
                            if os.path.exists(image):
                                os.remove(image)

                        event_type_id = 7

                        if request.json["validate"] == "true":
                            event_type_id = 6

                        try:

                            DBSession.query(Event).filter(Event.id == event.id).update(
                                {Event.proceeded: True, Event.photo_response_url: None}
                            )

                            event_response = Event(
                                user_id=event.user_id,
                                segment_id=event.segment_id,
                                event_date=datetime.datetime.now(),
                                event_type_id=event_type_id,
                                obstacle_id=event.obstacle_id,
                            )

                            DBSession.add(event_response)

                            DBSession.query(Event).filter(Event.id == event.id).update(
                                {Event.proceeded: True, Event.photo_response_url: None}
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
                            response = (
                                service_informations.build_response(exception.HTTPInternalServerError)
                                .logging.getLogger(__name__)
                                .warn("Returning: %s", str(e))
                            )

                    else:
                        response = service_informations.build_response(
                            exception.HTTPBadRequest, None, error_messages.EVENT_MANAGE_ANSWER
                        )

                else:
                    response = service_informations.build_response(
                        exception.HTTPBadRequest,
                        None,
                        error_messages.NOTHING_TO_UPDATE,
                    )
            else:
                response = service_informations.build_response(
                    exception.HTTPNotFound(),
                )
        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {get} /admin/verified-responses All responses sent by users to be verified by user.
  @apiVersion 0.3.0
  @apiName GetEvents
  @apiGroup Event
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Array} Events All events to be verified.
  @apiSuccessExample {json} Success response:
  HTTP/1.1 200 OK

  {
    "events": [
      {
        "id": 44,
        "response": null,
        "challenge": {
        "id": 13,
        "name": "Narnia"
      },
      "obstacle": {
        "label": "Photo",
        "description": "Une photo"
      }
    ]
  }

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
responses_to_verify = Service(
    name="responses_to_verify",
    path="/admin/verified-responses",
    cors_policy=cors_policy,
)


@responses_to_verify.get()
def get_responses_to_verify(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        # check if user has rights admin
        if user.is_admin == True:

            events_to_verify = EventResources().find_obstacles_responses_to_verify_by_admin(user.id)

            if len(events_to_verify) != 0:

                events = []
                for event in events_to_verify:

                    obstacle = DBSession.query(Obstacle).get(event.obstacle_id)
                    challenge = obstacle.segment.challenge

                    image_64_encode = None
                    if event.photo_response_url != None:
                        image = str(get_project_root()) + event.photo_response_url

                        if os.path.exists(image):
                            file_image = open(image, "rb")
                            image_read = file_image.read()
                            image_64_encode = bytes.decode(base64.encodebytes(image_read)).replace("\n", "")

                    events.append(
                        {
                            "id": event.id,
                            "response": image_64_encode,
                            "challenge": ChallengeSchema(only=("id", "name")).dump(challenge),
                            "obstacle": ObstacleSchema(only=("label", "description")).dump(obstacle),
                        }
                    )

                response = service_informations.build_response(exception.HTTPOk, {"events": events})

            else:
                response = service_informations.build_response(
                    exception.HTTPNoContent(),
                )

        else:
            response = service_informations.build_response(exception.HTTPForbidden)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
