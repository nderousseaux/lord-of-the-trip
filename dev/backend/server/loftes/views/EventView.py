from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Event, Challenge, User, Segment, Obstacle, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.EventSchema import EventSchema
from loftes.resources import EventRessources
from loftes.resources import UserCheckRessources

import pyramid.httpexceptions as exception
from pyramid.authentication import AuthTicket
import datetime
import logging
import json

event = Service(name="event", path="/challenges/{challenge_id:\d+}/events", cors_policy=cors_policy)


@event.get()
def get_event(request):

    service_informations = ServiceInformations()

    user = UserCheckRessources.CheckUserConnect(request)
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])
        user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

        if challenge != None:

            if user != None:

                events = (
                    DBSession.query(Event)
                    .filter(Event.user_id == user.id)
                    .join(Segment, Event.segment_id == Segment.id)
                    .filter(Segment.challenge_id == request.matchdict["challenge_id"])
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
                    "Requested resource 'Segment' is not found.",
                )
        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested ressource 'User' is not found.",
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


event_id = Service(name="event_id", path="/segments/{segment_id:\d+}/events/{id:\d+}", cors_policy=cors_policy)


@event_id.get()
def get_event_by_id(request):

    service_informations = ServiceInformations()

    user = UserCheckRessources.CheckUserConnect(request)
    if user != None:

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

            return service_informations.build_response(exception.HTTPOk, EventSchema().dump(event))

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Segment' is not found.",
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


event_create = Service(name="event_create", path="/segments/{segment_id:\d+}/events", cors_policy=cors_policy)


@event_create.post()
def event_add(request):

    service_informations = ServiceInformations()

    user = UserCheckRessources.CheckUserConnect(request)
    if user != None:

        segment_id = request.matchdict["segment_id"]
        segment = DBSession.query(Segment).get(segment_id)

        if segment != None:

            try:
                event_schema = EventSchema()
                eventdata = event_schema.load(request.json)
                eventdata.segment_id = segment_id
                eventdata.user_id = user.id

                eventrulescheck = EventRessources.CheckEventTypeRule(
                    eventdata.event_type_id, user.id, request.matchdict["challenge_id"], segment_id
                )
                if eventrulescheck == None:

                    DBSession.add(eventdata)
                    DBSession.flush()

                    response = service_informations.build_response(exception.HTTPOk, event_schema.dump(eventdata))
                else:
                    response = service_informations.build_response(
                        exception.HTTPNotFound(),
                        None,
                        eventrulescheck,
                    )
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
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Segment' is not found.",
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


event_question = Service(
    name="event_question", path="/segments/{segment_id:\d+}/events/checkresponse", cors_policy=cors_policy
)


@event_question.post()
def event_check_response(request):

    service_informations = ServiceInformations()

    user = UserCheckRessources.CheckUserConnect(request)
    if user != None:

        segment_id = request.matchdict["segment_id"]
        segment = DBSession.query(Segment).get(segment_id)

        if segment != None:

            try:
                event_schema = EventSchema()
                eventdata = event_schema.load(request.json)
                eventdata.segment_id = segment_id
                eventdata.user_id = user.id

                if eventdata.event_type_id == 5:

                    eventrulescheck = EventRessources.CheckEventTypeRule(
                        eventdata.event_type_id, user.id, request.matchdict["challenge_id"], segment_id
                    )
                    if eventrulescheck == None:

                        obstacle = DBSession.query(Obstacle).get(eventdata.obstacle_id)

                        if obstacle != None:

                            DBSession.add(eventdata)
                            DBSession.flush()

                            # Check response

                            if obstacle.question_type == 0:
                                if eventdata.response.upper() == obstacle.result.upper():
                                    event_type = 6
                                else:
                                    event_type = 7

                                now = datetime.datetime.now()
                                eventresponse = Event(
                                    user_id=user.id,
                                    segment_id=eventdata.segment_id,
                                    event_date=now,
                                    event_type_id=event_type,
                                )

                                DBSession.add(eventresponse)
                                DBSession.flush()

                                response = service_informations.build_response(
                                    exception.HTTPOk, event_schema.dump(eventresponse)
                                )

                            else:
                                response = service_informations.build_response(
                                    exception.HTTPOk, event_schema.dump(eventdata)
                                )
                        else:
                            response = service_informations.build_response(
                                exception.HTTPNotFound(),
                                None,
                                "Requested resource 'Obstacle' is not found.",
                            )
                    else:
                        response = service_informations.build_response(
                            exception.HTTPNotFound(),
                            None,
                            eventrulescheck,
                        )
                else:
                    response = service_informations.build_response(
                        exception.HTTPNotFound(),
                        None,
                        "Event type must be 5 (OBSTACLE_REP).",
                    )

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
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Segment' is not found.",
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
