from cornice import Service
from marshmallow import ValidationError
from loftes.cors import cors_policy

from loftes.models import EventType, Event, DBSession
from loftes.marshmallow_schema.EventTypeSchema import EventTypeSchema

from loftes.services.ServiceInformations import ServiceInformations

import pyramid.httpexceptions as exception
import logging
import json

event_type = Service(name="event_type", path="/event-type", cors_policy=cors_policy)


@event_type.get()
def get_event_type(request):

    service_informations = ServiceInformations()

    event_types = DBSession.query(EventType).all()

    if len(event_types) == 0:
        return service_informations.build_response(exception.HTTPNotFound())

    data = {"eventTypes": EventTypeSchema(many=True).dump(event_types)}

    response = service_informations.build_response(exception.HTTPOk, data)

    return response


@event_type.post()
def event_type_add(request):

    service_informations = ServiceInformations()

    try:

        event_type_schema = EventTypeSchema()
        event_type_data = event_type_schema.load(request.json)

        DBSession.add(event_type_data)
        DBSession.flush()

        response = service_informations.build_response(exception.HTTPOk, event_type_schema.dump(event_type_data))

    except ValidationError as validation_error:
        response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))
        DBSession.close()

    except ValueError as value_error:
        response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
        DBSession.close()

    except PermissionError as pe:
        response = service_informations.build_response(exception.HTTPUnauthorized)
        DBSession.close()

    except Exception as e:
        response = service_informations.build_response(exception.HTTPInternalServerError)
        logging.getLogger(__name__).warn("Returning: %s", str(e))
        DBSession.close()

    return response


event_type_id = Service(name="event_type_id", path="/event-type/{id:\d+}", cors_policy=cors_policy)


@event_type_id.get()
def get_event_type_by_id(request):

    service_informations = ServiceInformations()

    event_type = DBSession.query(EventType).filter(EventType.id == request.matchdict["id"]).first()

    if event_type == None:
        return service_informations.build_response(exception.HTTPNotFound())

    response = service_informations.build_response(exception.HTTPOk, EventTypeSchema().dump(event_type))

    return response
