from loftes.cors import cors_policy

from cornice import Service

from loftes.models import Obstacle, DBSession

from loftes.marshmallow_schema import ObstacleSchema

import pyramid.httpexceptions as exception

obstacle = Service(name='obstacle',
                   path='/obstacle',
                   cors_policy=cors_policy)
# @obstacle.get()
# def get_obstacle(request):

#     obstacledata = DBSession.query(Obstacle).all()

#     if len(obstacledata) == 0:
#         raise exception.HTTPError("Aucun Obstacle")

#     res = ObstacleSchema(many=True).dump(obstacledata)
#     return res

# @obstacle.post()
# def obstacle_add(request):

#    try:
#         obstacledata = ObstacleSchema().load(request.json)

#         DBSession.add(obstacledata)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(ObstacleSchema().dump(obstacledata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
    
#     return response

# obstacle_id = Service(name='obstacle_id',
#                       path='/obstacle/{id}',
#                       cors_policy=cors_policy)
              
# @obstacle_id.get()
# def get_obstacle_by_id(request):

#     try:

#         id = request.matchdict['id']

#         obstacledata  = DBSession.query(Obstacle).get(id)

#         res = ObstacleSchema().dump(obstacledata)
#         response.text = res

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response

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
