from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Segment, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import SegmentSchema

import pyramid.httpexceptions as exception
import logging
import json

segment = Service(name='segment',
                   path='/segment',
                   cors_policy=cors_policy)

segment_id = Service(name='segment_id',
                     path='/segment/{id}',
                     cors_policy=cors_policy)

@segment.get()
def get_segment(request):

    service_informations = ServiceInformations()
    segmentdata = DBSession.query(Segment).all()

    if len(segmentdata) == 0:
        return service_informations.build_response(exception.HTTPNotFound())

    data = {
        'segments' : SegmentSchema(many=True).dump(segmentdata)
    }

    return service_informations.build_response(exception.HTTPOk, data)

@segment_id.get()
def get_segment_by_id(request):

    service_informations = ServiceInformations()
    segmentdata  = DBSession.query(Segment).get(request.matchdict['id'])

    if segmentdata == None:
        return service_informations.build_response(exception.HTTPNotFound())

    return service_informations.build_response(exception.HTTPOk, SegmentSchema().dump(segmentdata))  

@segment.post()
def segment_add(request):
    
    service_informations = ServiceInformations()
    
    try:
        segment_schema = SegmentSchema()
        segmentdata = segment_schema.load(request.json)

        DBSession.add(segmentdata)
        DBSession.flush()

        response = service_informations.build_response(exception.HTTPOk, segment_schema.dump(segmentdata))

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
        logging.getLogger(__name__).warn('Returning: %s', str(e))
        DBSession.close()
    
    return response              


@segment_id.put()
def modify_segment(request):
    
    service_informations = ServiceInformations()
    
    try:
        
        segment_schema = SegmentSchema()
        # segmentdataload = segment_schema.load(request.json) TODO Fonction controle update

        segmentdata = DBSession.query(Segment).filter(Segment.id == request.matchdict['id']).update(request.json)
        DBSession.flush()
        
        response = service_informations.build_response(exception.HTTPOk, segment_schema.dump(segmentdata))

    except Exception as e:
        response = service_informations.build_response(exception.HTTPNotImplemented, None, str(e))
        print(e)
    
    return response

@segment_id.delete()
def delete_segment(request):
    
    service_informations = ServiceInformations()
    
    try:
        id = request.matchdict['id']

        segmentdata = DBSession.query(Segment).get(request.matchdict['id'])
        DBSession.delete(segmentdata)
        # supression en cascade des obstacle ou mise à vide des id segment comment faire ?????
        DBSession.flush()

        #TODO réponse
        response = service_informations.build_response(exception.HTTPOk, None, str("Segment deleted"))
        
    except Exception as e:
        response = exception.HTTPNotImplemented()
        response.text = str(e)
        print(e)   
