from loftes.cors import cors_policy

from cornice import Service

from loftes.models import UserSubscribe, DBSession

from loftes.marshmallow_schema import UserSubscribeSchema, UserSubscribeAddSchema

import pyramid.httpexceptions as exception

# Utilité ?
subcribeUser = Service(name='subscribe',
                       path='/subscribe',
                       cors_policy=cors_policy)
# @subcribeUser.get()
# def get_subcribeUser(request):

#     subscribedata = DBSession.query(UserSubscribe).all()

#     if len(subscribedata) == 0:
#         raise exception.HTTPError("Aucune inscription")

#     res = QuestionSchema(many=True).dump(questiondata)
#     return res

# @subcribeUser.post()
# def subscribe_add(request):

#    try:
#         subscribedata = UserSubscribeAddSchema().load(request.json)

#         DBSession.add(subscribedata)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(UserSubscribeSchema().dump(subscribedata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
    
#     return response

# # Utilité => par user ou par challenge
# susbcribe_id = Service(name='susbcribe_id',
#                        path='/subscribe/{id}',
#                        cors_policy=cors_policy)
              
# @susbcribe_id.get()
# def get_subcribe_by_id(request):

#     try:

#         id = request.matchdict['id']

#         subscribedata  = DBSession.query(UserSubscribe).get(id)

#         res = UserSubscribeSchema().dump(subscribedata)
#         response.text = res

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response

# # inutile
# # @susbcribe_id.put()
# # def modify_subscribe(request):


# @susbcribe_id.delete()
# def delete_subscribe(request):

#     try:
#         id = request.matchdict['id']

#         subscribedata = DBSession.query(UserSubscribe).get(id)
#         # Plus mise à false pour éviter suppression en cascade => rajouter champs
#         DBSession.delete(subscribedata)

#         response = exception.HTTPAccepted
        
#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)   
