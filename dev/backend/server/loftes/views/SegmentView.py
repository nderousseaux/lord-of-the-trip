from loftes.cors import cors_policy

from cornice import Service

from loftes.models import Segment, DBSession

from loftes.marshmallow_schema import SegmentSchema

import pyramid.httpexceptions as exc

segment = Service(name='segment',
                   path='/segments',
                   cors_policy=cors_policy)
@segment.get()
def get_segment(request):

    segmentdata = DBSession.query(Segment).all()

    if len(segmentdata) == 0:
        raise exc.HTTPError("Aucun segment")

    res = SegmentSchema(many=True).dump(segmentdata)
    return res

segment_id = Service(name='segment_id',
                     path='/segment/{id}',
                     cors_policy=cors_policy)
              
@segment_id.get()
def get_segment_by_id(request):

#     # if 'id' in request.get:
#     #     raise exc.HTTPError("Aucun id de parcours")

    id = request.matchdict['id']

    segmentdata  = DBSession.query(Segment).get(id)

    res = SegmentSchema().dump(segmentdata)
    return res
   
# segment_update = Service(name='segment_update',
#                           path='/segment/update',
#                           cors_policy=cors_policy)

# def is_id(request):
#     if not 'id' in request.body:
#         request.errors.add('query', 'id',
#                             'the id parameter is required')

# @segment_update.put()
# def update_segment(request):
    
#     id = request.matchdict['id']

#     raise exc.HTTPError("ID OK")
    
    # if 'name' in request.get:
    #     nameparcours = request.matchdict['name']

    # if 'description' in request.get:
    #     descriptionparcours = request.matchdict['description']
    
    # if 'urlmap' in request.get:
    #     urlparcours = request.matchdict['urlmap']

    # if 'level' in request.get:
    #     levelparcours = request.matchdict['level']
    
    # if 'scalling' in request.get:
    #     scallingparcours = request.matchdict['scalling']

    # if 'startpoint' in request.get:
    #     startparcours = request.matchdict['startpoint']
    
    # if 'endpoint' in request.get:
    #     startparcours = request.matchdict['endpoint']

