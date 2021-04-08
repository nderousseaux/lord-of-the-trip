from cornice import Service
from marshmallow import ValidationError
from loftes.cors import cors_policy

from loftes.models import Events, Challenge, User, DBSession
from loftes.marshmallow_schema.EventSchema import EventSchema

from loftes.services.ServiceInformations import ServiceInformations

import pyramid.httpexceptions as exception
import logging
import json

event = Service(
    name="event", path="/challenges/{challenge_id:\d+}/events", cors_policy=cors_policy
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
      "id": 1,
      "duration": 300,
      "move_type": 1,
      "event_date": "2021-10-18T00:00:00",
      "distance": 250
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
            DBSession.query(Events).filter(Events.challenge_id == challenge.id).all()
        )

        if len(events) == 0:
            return service_informations.build_response(exception.HTTPNotFound())

        data = {"events": EventSchema(many=True).dump(events)}

        response = service_informations.build_response(exception.HTTPOk, data)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


"""
@api {post} /challenges/:challenge_id/events Create a new event of challenge's id.
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PostEvent
@apiGroup Event
@apiSampleRequest off

@apiSuccess (OK 201) {Object} Events Created event.
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK


{
    "id": 1,
    "duration": 300,
    "move_type": 1,
    "event_date": "2021-10-18T00:00:00",
    "distance": 250
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


@event.post()
def event_add(request):

    service_informations = ServiceInformations()
    challenge_id = request.matchdict["challenge_id"]
    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        # user_id = request.headers.get('token')
        # user = DBSession.query(User).get(user_id)

        # if user == None:
        #     response = service_informations.build_response(
        #     exception.HTTPNotFound(),
        #     None,
        #     "Requested resource 'User' is not found.",
        #     )
        #     return response

        try:

            event_schema = EventSchema()
            eventdata = event_schema.load(request.json)
            eventdata.challenge_id = challenge_id

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
            "Requested resource 'Challenge' is not found.",
        )

    return response


"""
@api {get} /challenges/:challenge_id/events/:id Request an event informations.
@apiParam challenge_id Challenge's unique ID.
@apiParam id Event's unique ID.
@apiVersion 0.1.0
@apiName GetEvent
@apiGroup Event
@apiSampleRequest off

@apiSuccess (OK 200) {Object} Event All events created of challenge's id.
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "events": [
    {
      "id": 1,
      "duration": 300,
      "move_type": 1,
      "event_date": "2021-10-18T00:00:00",
      "distance": 250
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
event_id = Service(
    name="event_id",
    path="/challenges/{challenge_id:\d+}/events/{id:\d+}",
    cors_policy=cors_policy,
)


@event_id.get()
def get_event_by_id(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        event = (
            DBSession.query(Events)
            .filter(
                Events.challenge_id == challenge.id,
                Events.id == request.matchdict["id"],
            )
            .first()
        )

        if event == None:
            return service_informations.build_response(exception.HTTPNotFound())

        response = service_informations.build_response(
            exception.HTTPOk, EventSchema().dump(event)
        )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response
