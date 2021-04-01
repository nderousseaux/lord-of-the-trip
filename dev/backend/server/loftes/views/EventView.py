from loftes.cors import cors_policy

from cornice import Service

from loftes.models import Events, DBSession

from loftes.marshmallow_schema import EventSchema

import pyramid.httpexceptions as exception

event = Service(name='event',
                path='/event',
                cors_policy=cors_policy)

# @event.get()
# def get_event(request):

#     eventdata = DBSession.query(Events).all()

#     if len(eventdata) == 0:
#         raise exception.HTTPError("Aucun Event")

#     res = EventSchema(many=True).dump(eventdata)
#     return res

# @event.post()
# def event_add(request):

#    try:
#         eventdata = EventSchema().load(request.json)

#         DBSession.add(eventdata)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(EventSchema().dump(eventdata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
    
#     return response

# event_id = Service(name='event_id',
#                    path='/event/{id}',
#                    cors_policy=cors_policy)
              
# @event_id.get()
# def get_event_by_id(request):

#     try:

#         id = request.matchdict['id']

#         eventdata  = DBSession.query(Events).get(id)

#         res = EventSchema().dump(eventdata)
#         response.text = res

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response

# @event_id.put()
# def modify_event(request):

#     try:
#         id = request.matchdict['id']
#         EventSchema().load(request.json)

#         eventdata = DBSession.query(Events).filter(Events.id_Event == id).update(request.json)
#         DBSession.flush()
        
#         response = exception.HTTPCreated()
#         response.text = json.dumps(EventSchema().dump(eventdata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response

# @event_id.delete()
# def delete_event(request):

#     try:
#         id = request.matchdict['id']

#         eventdata = DBSession.query(Events).get(id)

#         DBSession.delete(eventdata)
#         response = exception.HTTPAccepted
        
#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)   
