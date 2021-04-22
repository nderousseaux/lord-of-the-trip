from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Event, Challenge, User, Segment, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.EventSchema import EventSchema

import pyramid.httpexceptions as exception
import logging
import json

event = Service(
    name="event", 
    path="/challenges/{challenge_id:\d+}/events", 
    cors_policy=cors_policy
)

"""
@api {get} /challenges/:challenge_id/events Request all events informations of challenge's id.
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.1.0
@apiName GetEvents
@apiGroup Event
@apiSampleRequest off

@apiSuccess (OK 200) {Array} Event All events created of challenge's id.
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
    "events": [
        {
            "id": 9,
            "duration": 5400,
            "move_type": 3,
            "event_type_id": 1,
            "event_type_info": {
                "id": 1,
                "code": "START",
                "label": "Départ du parcours"
            },
            "event_date": 2224567999999,
            "distance": 350,
            "footstep": null,
            "obstacle_id": null,
            "response": null
        },
        {
            "id": 8,
            "duration": 5400,
            "move_type": 3,
            "event_type_id": 1,
            "event_type_info": {
                "id": 1,
                "code": "START",
                "label": "Départ du parcours"
            },
            "event_date": 2224567999998,
            "distance": 350,
            "footstep": null,
            "obstacle_id": null,
            "response": nullobstacle
            "id": 7,
            "duration": 5400,
            "move_type": 3,
            "event_type_id": 1,
            "event_type_info": {
                "id": 1,
                "code": "START",
                "label": "Départ du parcours"
            },
            "event_date": 1224567999998,
            "distance": 350,
            "footstep": null,
            "obstacle_id": null,
            "response": null
        },
        {
            "id": 4,
            "duration": 5400,
            "move_type": 3,
            "event_type_id": 1,
            "event_type_info": {
                "id": 1,
                "code": "START",
                "label": "Départ du parcours"
            },
            "event_date": 1224567999998,
            "distance": 350,
            "footstep": null,
            "obstacle_id": null,
            "response": null
        },
        {
            "id": 5,
            "duration": 5400,
            "move_type": 3,
            "event_type_id": 1,
            "event_type_info": {
                "id": 1,
                "code": "START",
                "label": "Départ du parcours"
            },
            "event_date": 1224567999998,
            "distance": 350,
            "footstep": null,
            "obstacle_id": null,
            "response": null
        },
        {
            "id": 6,
            "duration": 5400,
            "move_type": 3,
            "event_type_id": 1,
            "event_type_info": {
                "id": 1,
                "code": "START",
                "label": "Départ du parcours"
            },
            "event_date": 1224567999998,
            "distance": 350,
            "footstep": null,
            "obstacle_id": null,
            "response": null
        },
        {
            "id": 3,
            "duration": null,
            "move_type": 2,
            "event_type_id": 2,
            "event_type_info": {
                "id": 2,
                "code": "ARRIVAL",
                "label": "Arrivée à la fin du parcours"
            },
            "event_date": null,
            "distance": null,
            "footstep": null,
            "obstacle_id": null,
            "response": null
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

@event.get()
def get_event(request):

    service_informations = ServiceInformations()
    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])
    
    if challenge != None:
    
        events = (
            DBSession.query(Event)
            .join(Segment,Event.segment_id==Segment.id)
            .filter(Segment.challenge_id==request.matchdict["challenge_id"])
            .order_by(Event.event_date.desc())
            .all()
        )          
        
        if len(events) == 0:
            return service_informations.build_response(exception.HTTPNotFound())
               
        data = {"events": EventSchema(many=True).dump(events)}
        response = service_informations.build_response(exception.HTTPOk, data)
    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested ressource 'Challenge' is not found.",
        )

    return response

event_id = Service(
    name="event_id", 
    path="/segments/{segment_id:\d+}/events/{id:\d+}", 
    cors_policy=cors_policy
)

"""
@api {get} /segments/:segment_id/events/:event_id/ Request one event by id.
@apiParam segment_id Segment's unique ID.
@apiParam event_id Event's unique ID.
@apiVersion 0.1.0
@apiName GetEvent
@apiGroup Event
@apiSampleRequest off

@apiSuccess (OK 200) {Number} id Event's ID
@apiSuccess (OK 200) {String} duration Event's duration
@apiSuccess (OK 200) {Number} move_type Move type on the event.If 0 it is walking, 1 is running and 2 is riding a bicycle
@apiSuccess (OK 200) {Array}  event_type_id Id's of event type
@apiSuccess (OK 200) {Array}  event_type_info Information of the event type
@apiSuccess (OK 200) {Number} event_date Date of the event in millisecond
@apiSuccess (OK 200) {Number} distance Event's distance passed
@apiSuccess (OK 200) {Number} footstep footstep's number of the event 
@apiSuccess (OK 200) {Number} obstacle_id Id of obstacle, for obstacle event
@apiSuccess (OK 200) {Float}  response User's response

@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
    "id": 3,
    "duration": null,
    "move_type": 2,
    "event_type_id": 2,
    "event_type_info": {
        "id": 2,
        "code": "ARRIVAL",
        "label": "Arrivée à la fin du parcours"
    },
    "event_date": null,
    "distance": null,
    "footstep": null,
    "obstacle_id": null,
    "response": null
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


@event_id.get()
def get_event_by_id(request):

    service_informations = ServiceInformations()
    segment_id = request.matchdict["segment_id"]  
    segment = DBSession.query(Segment).get(segment_id)

    if segment != None:

        event = (
            DBSession.query(Event)
            .filter(
                Event.segment_id == segment.id,
                Event.id == request.matchdict["id"],
            )
            .first()
        )

        if event == None:
            return service_informations.build_response(exception.HTTPNotFound())

        return service_informations.build_response(
            exception.HTTPOk, EventSchema().dump(event)
        )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Segment' is not found.",
        )

    return response

event_create = Service(
    name='event_create',
    path='/segments/{segment_id:\d+}/events',
    cors_policy=cors_policy
)

"""
@api {post} /challenges/:challenge_id/events Create a new event of challenge's id.
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PostEvent
@apiGroup Event
@apiSampleRequest off

@apiSuccess (Body parameters) {Number} duration Event's duration
@apiSuccess (Body parameters) {Number} move_type Event's move type. If 0 it is walking, 1 is running and 2 is riding a bicycle
@apiSuccess (Body parameters) {Date} event_date Event's date start in format datetime
@apiSuccess (Body parameters) {Number} distance Event's distance passed
@apiSuccess (Body parameters) {Number} event_type_id Id's of event type
@apiSuccess (Body parameters) {Number} footstep footstep's number of the event 
@apiSuccess (Body parameters) {Number} obstacle_id Id of obstacle, for obstacle event
@apiSuccess (Body parameters) {Float}  response User's response

@apiSuccessExample {json} Body:

{
    "duration": 300,
    "move_type": 1,
    "event_date": "2021-10-18T00:00:00",
    "distance": 250
}

@apiSuccessExample {json} Success response:
HTTP/1.1 201 Created

{
    "id": 10,
    "duration": 5400,
    "move_type": 3,
    "event_type_id": 1,
    "event_type_info": {
        "id": 1,
        "code": "START",
        "label": "Départ du parcours"
    },
    "event_date": 2224567999998,
    "distance": 350,
    "footstep": null,
    "obstacle_id": null,
    "response": null
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

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
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
@event_create.post()
def event_add(request):

    service_informations = ServiceInformations()
    segment_id = request.matchdict["segment_id"]  
    segment = DBSession.query(Segment).get(segment_id)

    if segment != None:

        try:
            event_schema = EventSchema()
            eventdata = event_schema.load(request.json)
            eventdata.segment_id = segment_id

            user = DBSession.query(User).first()
            if user != None:
                eventdata.user_id = user.id
                
            DBSession.add(eventdata)
            DBSession.flush()

            response = service_informations.build_response(
                exception.HTTPOk, event_schema.dump(eventdata)
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

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)
            DBSession.close()

        except Exception as e:
            response = service_informations.build_response(
                exception.HTTPInternalServerError
            )
            logging.getLogger(__name__).warn("Returning: %s", str(e))
            DBSession.close()
    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Segment' is not found.",
        )

    return response