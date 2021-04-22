from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from loftes.cors import cors_policy
from loftes.models import Obstacle, Segment, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import ObstacleSchema

import pyramid.httpexceptions as exception
import logging
import json

obstacle = Service(name='obstacle',
                   path='/segments/{segment_id:\d+}/obstacles',
                   cors_policy=cors_policy)
@obstacle.get()
def get_obstacle(request):

    service_informations = ServiceInformations()
    segment = DBSession.query(Segment).get(request.matchdict["segment_id"])
    
    if segment != None:
        
        obstacle_data = DBSession.query(Obstacle).filter(Obstacle.segment_id==request.matchdict["segment_id"]).all()
        
        if len(obstacle_data) == 0:
            return service_informations.build_response(exception.HTTPNotFound())

        data = {"obstacles": ObstacleSchema(many=True).dump(obstacle_data)}
        response = service_informations.build_response(exception.HTTPOk, data)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested ressource 'Segment' is not found.",
        )    
    
    return response

@obstacle.post()
def obstacle_add(request):
    
    service_informations = ServiceInformations()
    segment_id = request.matchdict["segment_id"]
    segment = DBSession.query(Segment).get(segment_id)
    
    if segment != None:
        try :
            obstacle_schema = ObstacleSchema()
            obstacle_data = obstacle_schema.load(request.json)
            obstacle_data.segment_id = segment_id

            DBSession.add(obstacle_data)
            DBSession.flush()

            response = service_informations.build_response(
                exception.HTTPOk, obstacle_schema.dump(obstacle_data)
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
            "Requested ressource 'Segment' is not found.",
        )

    return response
    
obstacle_id = Service(name='obstacle_id',
                      path='/segments/{segment_id:\d+}/obstacles/{id}',
                      cors_policy=cors_policy)
              
@obstacle_id.get()
def get_obstacle_by_id(request):

    service_informations = ServiceInformations()
    segment_id = request.matchdict["segment_id"]  
    segment = DBSession.query(Segment).get(segment_id)

    if segment != None:

        obstacle = (
            DBSession.query(Obstacle)
            .filter(
                Obstacle.segment_id == segment.id,
                Obstacle.id == request.matchdict["id"],
            )
            .first()
        )

        if obstacle == None:
            return service_informations.build_response(exception.HTTPNotFound())

        return service_informations.build_response(
            exception.HTTPOk, ObstacleSchema().dump(obstacle)
        )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Segment' is not found.",
        )

    return response

@obstacle_id.put()
def get_obstacle_update(request):

    service_informations = ServiceInformations()
    segment_id = request.matchdict["segment_id"]  
    segment = DBSession.query(Segment).get(segment_id)

    if segment != None:

        query = DBSession.query(Obstacle).filter( Obstacle.segment_id == segment.id, Obstacle.id == request.matchdict["id"],)

        obstacle = query.first()

        if obstacle != None:
            try:
                
                # query.update(CrossingPointSchema().check_json(request.json))
                query.update(ObstacleSchema().check_json(request.json))
                DBSession.flush()

                response = service_informations.build_response(exception.HTTPNoContent)

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
                response = service_informations.build_response(
                    exception.HTTPUnauthorized
                )
                DBSession.close()

            except Exception as e:
                response = service_informations.build_response(
                    exception.HTTPInternalServerError
                )
                logging.getLogger(__name__).warn("Returning: %s", str(e))
                DBSession.close()
        else:
            response = service_informations.build_response(exception.HTTPNotFound)
    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Segment' is not found.",
        )

    return response

@obstacle_id.patch()
def get_obstacle_modify(request):

    service_informations = ServiceInformations()
    segment_id = request.matchdict["segment_id"]  
    segment = DBSession.query(Segment).get(segment_id)

    if segment != None:

        query = DBSession.query(Obstacle).filter( Obstacle.segment_id == segment.id, Obstacle.id == request.matchdict["id"],)

        obstacle = query.first()

        if obstacle != None:
            try:
                
                # query.update(CrossingPointSchema().check_json(request.json))
                query.update(ObstacleSchema().check_json(request.json))
                DBSession.flush()

                response = service_informations.build_response(exception.HTTPNoContent)

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
                response = service_informations.build_response(
                    exception.HTTPUnauthorized
                )
                DBSession.close()

            except Exception as e:
                response = service_informations.build_response(
                    exception.HTTPInternalServerError
                )
                logging.getLogger(__name__).warn("Returning: %s", str(e))
                DBSession.close()
        else:
            response = service_informations.build_response(exception.HTTPNotFound)
    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Segment' is not found.",
        )

    return response



# @obstacle_id.put()
# def modify_obstacle(request):

#     try:
#         id = request.matchdict['id']
#         ObstacleSchema().load(request.json)

#         obstacledata = DBSession.query(Obstacle).filter(Obstacle.id_obstacle == id).update(request.json)
#         DBSession.flush()
        
#         response = exception.HTTPCreated()
#         response.text = json.dumps(ObstacleSchema().dump(obstacledata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response

# @obstacle_id.delete()
# def delete_obstacle(request):

#     try:
#         id = request.matchdict['id']

#         obstacledata = DBSession.query(Obstacle).get(id)

#         DBSession.delete(obstacledata)
#         # supression en cascade comment faire ?????
#         #DBSession.flush()

#         response = exception.HTTPAccepted
        
#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)   
