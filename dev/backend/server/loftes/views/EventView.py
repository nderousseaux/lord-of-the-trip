from cornice import Service
from marshmallow import ValidationError
from loftes.cors import cors_policy

from loftes.models import Events, Challenge, User, Segment, DBSession
from loftes.marshmallow_schema.EventSchema import EventSchema

from loftes.services.ServiceInformations import ServiceInformations
from pathlib import Path

import pyramid.httpexceptions as exception
from pyramid.response import FileResponse
from sqlalchemy import exc

import logging
import json

event = Service(
    name='event',
    path='/challenges/{challenge_id:\d+}/events',
    cors_policy=cors_policy
)

@event.get()
def get_event(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        events = (
            DBSession.query(Events)
            .join(Segment,Events.segment_id==Segment.id)
            .filter(Segment.challenge_id==request.matchdict["challenge_id"])
            .order_by(Events.event_date.desc())
            .all()
        )          
        if len(events) == 0:
            return service_informations.build_response(exception.HTTPNotFound())
        
        if len(events) == 1:
            response = service_informations.build_response(
                exception.HTTPOk, EventSchema().dump(events))
        else:        
            data = {"events": EventSchema(many=True).dump(events)}
            response = service_informations.build_response(exception.HTTPOk, data)
 
    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'challenge' is not found.",
        )        

    return response

event_create = Service(
    name='event_create',
    path='/segments/{segment_id:\d+}/events',
    cors_policy=cors_policy
)

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
    

 
# event_id = Service(
#     name="event_id",
#     path="/challenges/{challenge_id:\d+}/segments/{segment_id:\d+}/events/{id:\d+}",
#     cors_policy=cors_policy
# )

# @event_id.get()
# def get_event_by_id(request):

#     service_informations = ServiceInformations()

#     challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

#     if challenge != None:

#         event = (
#             DBSession.query(Events)
#             .filter(
#                 Events.challenge_id == challenge.id,
#                 Events.id == request.matchdict["id"]
#             )
#             .first()
#         )

#         if event == None:
#             return service_informations.build_response(exception.HTTPNotFound())

#         response = service_informations.build_response(
#                 exception.HTTPOk, EventSchema().dump(event)
#         )

#     else:
#         response = service_informations.build_response(
#             exception.HTTPNotFound(),
#             None,
#             "Requested resource 'Challenge' is not found.",
#         )

#     return response
