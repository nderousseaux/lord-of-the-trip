from loftes.cors import cors_policy

from cornice import Service

from loftes.models import CrossingPoint, DBSession

from loftes.marshmallow_schema import CrossingPointSchema

import pyramid.httpexceptions as exception

import json

crossingpoint = Service(name='crossingpoint',
                        path='/crossingpoint',
                        cors_policy=cors_policy)
@crossingpoint.get()
def get_crossingpoint(request):

    crossingpointdata = DBSession.query(CrossingPoint).all()

    if len(crossingpointdata) == 0:
        raise exception.HTTPError("Aucun Point de passage")
    
    response = exception.HTTPOk()
    res = CrossingPointSchema(many=True).dump(crossingpointdata)
    response.text = json.dumps(CrossingPointSchema(many=True).dump(crossingpointdata))

    return response

@crossingpoint.post()
def crossingpoint_add(request):

    try:
        
        crossingpointdata = CrossingPointSchema().load(request.json)
        DBSession.add(crossingpointdata)
        DBSession.flush()

        response = exception.HTTPCreated() 
        response.text = json.dumps(CrossingPointSchema().dump(crossingpointdata))

    except Exception as e:
        response = exception.HTTPNotImplemented()
        response.text = str(e)
        print(e)
    
    return response

crossingpoint_id = Service(name='crossingpoint_id',
                           path='/crossingpoint/{id}',
                           cors_policy=cors_policy)
              
@crossingpoint_id.get()
def get_crossingpoint_by_id(request):

    try:

        id = request.matchdict['id']
        crossingpointdata  = DBSession.query(CrossingPoint).get(id)

        response = exception.HTTPOk()
        response.text = json.dumps(CrossingPointSchema().dump(crossingpointdata))

    except Exception as e:
        response = exception.HTTPNotImplemented(e)
        response.text = str(e)
        print(e)
    
    return response

@crossingpoint_id.put()
def modify_crossingpoint(request):

    try:
        id = request.matchdict['id']
        CrossingPointSchema().load(request.json)
        
        crossingpointdata = DBSession.query(CrossingPoint).filter(CrossingPoint.id_crossing_point == id).update(request.json)
        DBSession.flush()
        
        response = exception.HTTPAccepted()
        response.text = json.dumps(CrossingPointSchema().dump(crossingpointdata))

    except Exception as e:
        response = exception.HTTPNotImplemented(e)
        response.text = str(e)
        print(e)
    
    return response

@crossingpoint_id.delete()
def delete_crossingpoint(request):

    try:
        id = request.matchdict['id']

        crossingpointdata = DBSession.query(CrossingPoint).get(id)

        DBSession.delete(crossingpointdata)
        DBSession.flush()

        response = exception.HTTPAccepted
        
    except Exception as e:
        response = exception.HTTPNotImplemented()
        response.text = str(e)
        print(e)   
