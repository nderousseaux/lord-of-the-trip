from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import CrossingPoint, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import CrossingPointSchema

import pyramid.httpexceptions as exception
import logging
import json

crossingpoint = Service(name='crossingpoint',
                        path='/crossingpoint',
                        cors_policy=cors_policy)
                        
crossingpoint_id = Service(name='crossingpoint_id',
                           path='/crossingpoint/{id}',
                           cors_policy=cors_policy)

@crossingpoint.get()
def get_crossingpoint(request):

    service_informations = ServiceInformations()
    crossingpointdata = DBSession.query(CrossingPoint).all()

    if len(crossingpointdata) == 0:
        return service_informations.build_response(exception.HTTPNotFound())
    
    data = {
        'crossingpoints' : CrossingPointSchema(many=True).dump(crossingpointdata)
    }

    return service_informations.build_response(exception.HTTPOk, data)

@crossingpoint.post()
def crossingpoint_add(request):

    service_informations = ServiceInformations()

    try:
        
        crossingpoint_schema = CrossingPointSchema()
        crossingpoint_schema.check_json_create(request.json)
        crossingpointdata = crossingpoint_schema.load(request.json)
        
        DBSession.add(crossingpointdata)
        DBSession.flush()

        response = service_informations.build_response(exception.HTTPOk, crossingpoint_schema.dump(crossingpointdata))

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

@crossingpoint_id.get()
def get_crossingpoint_by_id(request):

    service_informations = ServiceInformations()
    crossingpointdata  = DBSession.query(CrossingPoint).get(request.matchdict['id'])

    if crossingpointdata == None:
        return service_informations.build_response(exception.HTTPNotFound())
       
    return service_informations.build_response(exception.HTTPOk, CrossingPointSchema().dump(crossingpointdata))
          
@crossingpoint_id.put()
def update_crossingpoint(request):

    service_informations = ServiceInformations()

    #Check if the crossing point exist
    id = request.matchdict['id']
    crossingpoint = DBSession.query(CrossingPoint).get(id)

    if crossingpoint != None :

        try:
            
            crossingpointmodify = DBSession.query(CrossingPoint).filter(CrossingPoint.id == id).update(CrossingPointSchema().check_json(request.json))
            DBSession.flush()

            # crossingpointmodify = DBSession.query(CrossingPoint).get(id)
            response = service_informations.build_response(exception.HTTPOk, CrossingPointSchema().dump(crossingpointmodify))

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

@crossingpoint_id.patch()
def modify_crossingpoint(request):

    service_informations = ServiceInformations()

    #Check if the crossing point exist
    id = request.matchdict['id']
    crossingpoint = DBSession.query(CrossingPoint).get(id)
    
    if crossingpoint != None :
        try:
            
            crossingpointmodify = DBSession.query(CrossingPoint).filter(CrossingPoint.id == id).update(CrossingPointSchema().check_json(request.json))
            DBSession.flush()
            
            #crossingpointmodify = DBSession.query(CrossingPoint).get(id)
            response = service_informations.build_response(exception.HTTPOk, CrossingPointSchema().dump(crossingpointmodify))

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

@crossingpoint_id.delete()
def delete_crossingpoint(request):

    service_informations = ServiceInformations()
    #Check if the crossing point exist
    id = request.matchdict['id']
    crossingpoint = DBSession.query(CrossingPoint).get(id)

    if crossingpoint != None :

        try:
            
            crossingpointdelete = DBSession.query(CrossingPoint).get(id)
            DBSession.delete(crossingpointdelete)
            DBSession.flush()
            
            #TODO réponse
            response = service_informations.build_response(exception.HTTPOk, None, str("Crossing point deleted"))
            
        except Exception as e:
            response = service_informations.build_response(exception.HTTPNotImplemented, None, str(e))
            print(e)   
    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response