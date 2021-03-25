from loftes.cors import cors_policy

from cornice import Service

from loftes.models import Segment, DBSession

from loftes.marshmallow_schema import SegmentSchema, SegmentSchemaAdd

import pyramid.httpexceptions as exception

import json

segment = Service(name='segment',
                   path='/segment',
                   cors_policy=cors_policy)
@segment.get()
def get_segment(request):

    segmentdata = DBSession.query(Segment).all()

    if len(segmentdata) == 0:
        raise exception.HTTPError("Aucun segment")

    response = exception.HTTPOk()
    res = SegmentSchema(many=True).dump(segmentdata)
    response.text = json.dumps(SegmentSchema(many=True).dump(segmentdata))
    
    return response

@segment.post()
def segment_add(request):

    try:
        segmentdata = SegmentSchemaAdd().load(request.json)

        DBSession.add(segmentdata)
        DBSession.flush()

        response = exception.HTTPCreated()
        response.text = json.dumps(SegmentSchema().dump(segmentdata))

    except Exception as e:
        response = exception.HTTPNotImplemented()
        response.text = str(e)         
        print(e)
    
    return response

segment_id = Service(name='segment_id',
                     path='/segment/{id}',
                     cors_policy=cors_policy)
              
@segment_id.get()
def get_segment_by_id(request):

    try:

        id = request.matchdict['id']
        segmentdata  = DBSession.query(Segment).get(id)

        response = exception.HTTPOk()
        response.text = json.dumps(SegmentSchema().dump(segmentdata))

    except Exception as e:
        response = exception.HTTPNotImplemented(e)
        response.text = str(e)
        print(e)
        
    return response

@segment_id.put()
def modify_segment(request):

    try:
        id = request.matchdict['id']
        SegmentSchema().load(request.json)

        segmentdata = DBSession.query(Segment).filter(Segment.id_segment == id).update(request.json)
        DBSession.flush()
        
        response = exception.HTTPCreated()
        response.text = json.dumps(SegmentSchema().dump(segmentdata))

    except Exception as e:
        response = exception.HTTPNotImplemented(e)
        response.text = str(e)
        print(e)
    
    return response

@segment_id.delete()
def delete_segment(request):

    try:
        id = request.matchdict['id']

        segmentdata = DBSession.query(Segment).get(id)

        DBSession.delete(segmentdata)
        # supression en cascade des obstacle ou mise à vide des id segment comment faire ?????
        DBSession.flush()

        response = exception.HTTPAccepted
        
    except Exception as e:
        response = exception.HTTPNotImplemented()
        response.text = str(e)
        print(e)   
