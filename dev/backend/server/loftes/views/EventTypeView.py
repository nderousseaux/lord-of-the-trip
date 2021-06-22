from cornice import Service
from marshmallow import ValidationError
from loftes.cors import cors_policy

from loftes.models import EventType, Event, User, DBSession
from loftes.marshmallow_schema.EventTypeSchema import EventTypeSchema

from loftes.services.ServiceInformations import ServiceInformations
from loftes.resources import UserManager

import pyramid.httpexceptions as exception
from pyramid.authentication import AuthTicket
import logging
import json

event_type = Service(name="event_type", path="/event-types", cors_policy=cors_policy)

"""
  @api {get} /event-types Request all event types
  @apiVersion 0.3.0
  @apiName GetEventTypes
  @apiGroup EventTypes
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Array} EventTypes All event types created.
  @apiSuccessExample {json} Success response:
  HTTP/1.1 200 OK

{
  "event-types": [
    {
      "id": 1,
      "code": "START",
      "label": "Départ du parcours"
    },
    {
      "id": 2,
      "code": "ARRIVAL",
      "label": "Arrivée à la fin du parcours"
    },
    {
      "id": 3,
      "code": "MOVE",
      "label": "Déplacement"
    },
    {
      "id": 4,
      "code": "OBSTACLE_ARR",
      "label": "Arrivée sur un obstacle"
    },
    {
      "id": 5,
      "code": "OBSTACLE_REP",
      "label": "Réponse à un obstacle"
    },
    {
      "id": 6,
      "code": "OBSTACLE_REP_OK",
      "label": "Réponse validée"
    },
    {
      "id": 7,
      "code": "OBSTACLE_REP_KO",
      "label": "Refus de la réponse par un administrateur ou par le système"
    },
    {
      "id": 8,
      "code": "CROSS_PT_ARRIVAL",
      "label": "Arrivée à un point de passage"
    },
    {
      "id": 9,
      "code": "CHOOSE_SEGMENT",
      "label": "Choix d'un segment"
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

"""


@event_type.get()
def get_event_types(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)
    if user != None:

        event_types = DBSession.query(EventType).all()

        if len(event_types) == 0:
            return service_informations.build_response(exception.HTTPNoContent())

        data = {"event-types": EventTypeSchema(many=True).dump(event_types)}

        response = service_informations.build_response(exception.HTTPOk, data)

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {post} /event-types Create a new event type
  @apiVersion 0.3.0
  @apiName PostEventTypes
  @apiGroup EventTypes
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (Body parameters) {String} code Event type's code
  @apiSuccess (Body parameters) {String} label Event type's label

  @apiSuccessExample {json} Body:

  {
    "code": "ARRIVAL",
    "label": "Arrivée à la fin du parcours"
  }

  @apiSuccessExample {json} Success response:
  HTTP/1.1 201 Created

  {
    "id": 1,
    "code": "ARRIVAL",
    "label": "Arrivée à la fin du parcours"
  }

  @apiError (Error 400) {Object} BadRequest Malformed request syntax.
  @apiErrorExample {json} Error 400 response:
  HTTP/1.1 400 Bad Request

  {
    "error": {
      "status": "BAD REQUEST",
      "message": "{'code': ['Field must not be null.']}"
    }
  }

  @apiError (Error 400) {Object} BadRequest Malformed request syntax.
  @apiErrorExample {json} Error 400 response:
  HTTP/1.1 400 Bad Request

  {
    "error": {
      "status": "BAD REQUEST",
      "message": "{'code': ['Invalid value']}"
    }
  }

  @apiError (Error 400) {Object} BadRequest Malformed request syntax.
  @apiErrorExample {json} Error 400 response:
  HTTP/1.1 400 Bad Request

  {
    "error": {
      "status": "BAD REQUEST",
      "message": "{'label': ['Field must not be null.']}"
    }
  }

  @apiError (Error 400) {Object} BadRequest Malformed request syntax.
  @apiErrorExample {json} Error 400 response:
  HTTP/1.1 400 Bad Request

  {
    "error": {
      "status": "BAD REQUEST",
      "message": "{'label': ['Invalid value']}"
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

"""


@event_type.post()
def event_type_add(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)
    if user != None:

        try:

            event_type_schema = EventTypeSchema()
            event_type_data = event_type_schema.load(request.json)

            DBSession.add(event_type_data)
            DBSession.flush()

            response = service_informations.build_response(exception.HTTPOk, event_type_schema.dump(event_type_data))

        except ValidationError as validation_error:
            response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))

        except ValueError as value_error:
            response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)

        except Exception as e:
            response = service_informations.build_response(exception.HTTPInternalServerError)
            logging.getLogger(__name__).warn("Returning: %s", str(e))
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


event_type_id = Service(name="event_type_id", path="/event-type/{id:\d+}", cors_policy=cors_policy)


"""
  @api {get} /event-types/:id Request all event types
  @apiVersion 0.3.0
  @apiName GetEventType
  @apiGroup EventTypes
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.
  @apiPermission admin

  @apiSuccess (OK 200) {Array} EventTypes All event types created.
  @apiSuccessExample {json} Success response:
  HTTP/1.1 200 OK

{
  "event-types": [
    {
      "id": 1,
      "code": "START",
      "label": "Départ du parcours"
    },
    {
      "id": 2,
      "code": "ARRIVAL",
      "label": "Arrivée à la fin du parcours"
    },
    {
      "id": 3,
      "code": "MOVE",
      "label": "Déplacement"
    },
    {
      "id": 4,
      "code": "OBSTACLE_ARR",
      "label": "Arrivée sur un obstacle"
    },
    {
      "id": 5,
      "code": "OBSTACLE_REP",
      "label": "Réponse à un obstacle"
    },
    {
      "id": 6,
      "code": "OBSTACLE_REP_OK",
      "label": "Réponse validée"
    },
    {
      "id": 7,
      "code": "OBSTACLE_REP_KO",
      "label": "Refus de la réponse par un administrateur ou par le système"
    },
    {
      "id": 8,
      "code": "CROSS_PT_ARRIVAL",
      "label": "Arrivée à un point de passage"
    },
    {
      "id": 9,
      "code": "CHOOSE_SEGMENT",
      "label": "Choix d'un segment"
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

"""


@event_type_id.get()
def get_event_type_by_id(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)
    if user != None:

        event_type = DBSession.query(EventType).filter(EventType.id == request.matchdict["id"]).first()

        if event_type == None:
            return service_informations.build_response(exception.HTTPNotFound())

        response = service_informations.build_response(exception.HTTPOk, EventTypeSchema().dump(event_type))
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
