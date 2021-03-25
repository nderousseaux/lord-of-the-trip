from loftes.cors import cors_policy

# from cornice import Service

<<<<<<< HEAD
# from loftes.models import Parcours, Segment, DBSession

# from loftes.marshmallow_schema import ParcoursSchema
=======
from loftes.models.entity import Segment
from loftes.models import DBSession
>>>>>>> 8b5ef97ec4628e0472d44112b7614a94a49890d5

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

<<<<<<< HEAD
# @parcours.post()
# def add_parcours(request):
    
#     try:
#         parcoursdata = ParcoursSchema().load(request.json)
=======
@parcours.post()
def add_parcours(request):

    try:
        parcoursdata = ParcoursSchema().load(request.json)
>>>>>>> 8b5ef97ec4628e0472d44112b7614a94a49890d5

#         DBSession.add(parcoursdata)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(ParcoursSchema().dump(parcoursdata))

<<<<<<< HEAD
#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
    
#     return response

# parcours_id = Service(name='parcours_id',
#                       path='/parcours/{id}',
#                       cors_policy=cors_policy)
              
# @parcours_id.get()
# def get_parcours_by_id(request):
=======
    except Exception as e:
        response = exception.HTTPNotImplemented()
        print(e)

    return response

parcours_id = Service(name='parcours_id',
                      path='/parcours/{id}',
                      cors_policy=cors_policy)

@parcours_id.get()
def get_parcours_by_id(request):
>>>>>>> 8b5ef97ec4628e0472d44112b7614a94a49890d5

#     id = request.matchdict['id']

#     parcoursdata = DBSession.query(Parcours).get(id)

#     res = ParcoursSchema().dump(parcoursdata)

#     return res

# @parcours_id.put()
# def modify_parcours(request):

#     try:
#         id = request.matchdict['id']
#         ParcoursSchema().load(request.json)

<<<<<<< HEAD
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
=======
        parcoursdata = DBSession.query(Parcours).filter(Parcours.id_parcours == id).update(request.json)
        DBSession.flush()

        response = exception.HTTPCreated()
        response.text = json.dumps(ParcoursSchema().dump(parcoursdata))

    except Exception as e:
        response = exception.HTTPNotImplemented(e)
        print(e)

    return response


@parcours_id.delete()
def delete_parcours(request):

    try:
        id = request.matchdict['id']
>>>>>>> 8b5ef97ec4628e0472d44112b7614a94a49890d5

#         parcoursdata = DBSession.query(Parcours).get(id)

#         DBSession.delete(parcoursdata)
#         # supression en cascade comment faire ?????
#         #DBSession.flush()

<<<<<<< HEAD
#         response = exception.HTTPAccepted
        
#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
=======
        response = exception.HTTPAccepted

    except Exception as e:
        response = exception.HTTPNotImplemented()
        print(e)
>>>>>>> 8b5ef97ec4628e0472d44112b7614a94a49890d5
