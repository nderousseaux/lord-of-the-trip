from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Segment, Challenge, DBSession
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

segment_challenge = Service(name='segment_challenge',
                            path='/segment/challenge/{id}',
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

@segment.post()
def segment_add(request):
    
    service_informations = ServiceInformations()
    
    try:
        segment_schema = SegmentSchema()
        segment_schema.check_json_create(request.json)
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

@segment_id.get()
def get_segment_by_id(request):

    service_informations = ServiceInformations()
    segmentdata  = DBSession.query(Segment).get(request.matchdict['id'])

    if segmentdata == None:
        return service_informations.build_response(exception.HTTPNotFound())

    return service_informations.build_response(exception.HTTPOk, SegmentSchema().dump(segmentdata))  

@segment_id.put()
def modify_segment(request):
    
    service_informations = ServiceInformations()
    id = request.matchdict['id']
    segmentfind = DBSession.query(Segment).get(id)

    if segmentfind != None :
        try:
            segment_schema = SegmentSchema()
            segmentdata = DBSession.query(Segment).filter(Segment.id == id).update(segment_schema.check_json(request.json))
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
    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response

@segment_id.patch()
def modify_segment(request):
    
    service_informations = ServiceInformations()
    id = request.matchdict['id']
    segmentfind = DBSession.query(Segment).get(id)

    if segmentfind != None :
        try:
            segment_schema = SegmentSchema()
            segmentdata = DBSession.query(Segment).filter(Segment.id == id).update(segment_schema.check_json(request.json))
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
            print(e)
            DBSession.close()
    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response

@segment_id.delete()
def delete_segment(request):
    
    service_informations = ServiceInformations()
    id = request.matchdict['id']

    segmentdata = DBSession.query(Segment).get(request.matchdict['id'])

    if segmentdata != None :
    
        try:           

            segmentdelete = DBSession.query(Segment).get(request.matchdict['id'])
            DBSession.delete(segmentdelete)
            # supression en cascade des obstacle ou mise à vide des id segment comment faire ?????
            DBSession.flush()
            
            response = service_informations.build_response(exception.HTTPOk, None, str("Segment deleted"))
            
        except Exception as e:
            response = exception.HTTPNotImplemented()
            response.text = str(e)
            print(e)   

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response

@segment_challenge.get()
def get_segment_by_parcours(request):

    service_informations = ServiceInformations()
    id = request.matchdict['id']
    challengedata  = DBSession.query(Challenge).get(id)

    if challengedata != None :

        segmentcount = DBSession.query(Segment).filter_by(challenge_id=id).count()
        
        if segmentcount == 0 :
            response = service_informations.build_response(exception.HTTPNotFound())
        else :
            segmentchallenge = DBSession.query(Segment).filter_by(challenge_id=id)
            data = {
                'segments' : SegmentSchema(many=True).dump(segmentchallenge)
            }
            response = service_informations.build_response(exception.HTTPOk, data)

    else:
        notfound = "The Challenge '"+id+"' doesn't exist."
        response = service_informations.build_response(exception.HTTPNotFound,None, str(notfound))

    return response