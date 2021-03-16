from loftes.cors import cors_policy

from cornice import Service

from loftes.models import Parcours, Segment, DBSession

from loftes.marshmallow_schema import ParcoursSchema, SegmentSchema

import pyramid.httpexceptions as exc

parcours = Service(name='parcours',
                   path='/parcours',
                   cors_policy=cors_policy)

@parcours.get()
def get_parcours(request):

    parcoursdata = DBSession.query(Parcours).all()

    if len(parcoursdata) == 0:
        raise exc.HTTPError("Aucun parcours")

    res = ParcoursSchema(many=True).dump(parcoursdata)
    return res

parcours_id = Service(name='parcours_id',
                      path='/parcours/{id}',
                      cors_policy=cors_policy)
  
              
@parcours_id.get()
def get_parcours_by_id(request):

    # if 'id' in request.get:
    #     raise exc.HTTPError("Aucun id de parcours")

    id = request.matchdict['id']

    parcoursdata = DBSession.query(Parcours).get(id)
    segmentdata  = DBSession.query(Segment).filter(Segment.parcours_id==id)

    res = ParcoursSchema().dump(parcoursdata)
    # res = SegmentSchema().dump(segmentdata)
    return res
   
parcours_update = Service(name='parcours_update',
                          path='/parcours/update',
                          cors_policy=cors_policy)

def is_id(request):
    if not 'id' in request.body:
        request.errors.add('query', 'id',
                            'the id parameter is required')

@parcours_update.put()
def update_parcours(request):
    
    id = request.matchdict['id']

    raise exc.HTTPError("ID OK")
    
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

