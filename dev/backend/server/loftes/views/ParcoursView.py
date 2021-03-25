from loftes.cors import cors_policy

# from cornice import Service

# from loftes.models import Parcours, Segment, DBSession

# from loftes.marshmallow_schema import ParcoursSchema

# import pyramid.httpexceptions as exception

# import json

# import sys


# parcours = Service(name='parcours',
#                    path='/parcours',
#                    cors_policy=cors_policy)
# @parcours.get()
# def get_parcours(request):

#     parcoursdata = DBSession.query(Parcours).all()

#     if len(parcoursdata) == 0:
#         raise exception.HTTPError("Aucun parcours")

#     res = ParcoursSchema(many=True).dump(parcoursdata)
#     return res

# @parcours.post()
# def add_parcours(request):
    
#     try:
#         parcoursdata = ParcoursSchema().load(request.json)

#         DBSession.add(parcoursdata)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(ParcoursSchema().dump(parcoursdata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
    
#     return response

# parcours_id = Service(name='parcours_id',
#                       path='/parcours/{id}',
#                       cors_policy=cors_policy)
              
# @parcours_id.get()
# def get_parcours_by_id(request):

#     id = request.matchdict['id']

#     parcoursdata = DBSession.query(Parcours).get(id)

#     res = ParcoursSchema().dump(parcoursdata)

#     return res

# @parcours_id.put()
# def modify_parcours(request):

#     try:
#         id = request.matchdict['id']
#         ParcoursSchema().load(request.json)

#         parcoursdata = DBSession.query(Parcours).filter(Parcours.id_parcours == id).update(request.json)
#         DBSession.flush()
        
#         response = exception.HTTPCreated()
#         response.text = json.dumps(ParcoursSchema().dump(parcoursdata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response


# @parcours_id.delete()
# def delete_parcours(request):
   
#     try:
#         id = request.matchdict['id']

#         parcoursdata = DBSession.query(Parcours).get(id)

#         DBSession.delete(parcoursdata)
#         # supression en cascade comment faire ?????
#         #DBSession.flush()

#         response = exception.HTTPAccepted
        
#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)