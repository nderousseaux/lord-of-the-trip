from loftes.cors import cors_policy

from cornice import Service

from loftes.models import User, DBSession

from loftes.marshmallow_schema import UserSchema

import pyramid.httpexceptions as exception

user = Service(name="user", path="/user", cors_policy=cors_policy)
# @user.get()
# def get_users(request):

#     userdata = DBSession.query(User).all()

#     if len(userdata) == 0:
#         raise exception.HTTPError("Aucune utilisateur")

#     res = UserSchema(many=True).dump(userdata)
#     return res

# @user.post()
# def user_add(request):

#    try:
#         userdata = UserSchema().load(request.json)

#         DBSession.add(userdata)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(UserSchema().dump(userdata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)

#     return response

# user_id = Service(name='user_id',
#                   path='/user/{id}',
#                   cors_policy=cors_policy)

# @user_id.get()
# def get_user_by_id(request):

#     try:

#         id = request.matchdict['id']

#         userdata  = DBSession.query(User).get(id)

#         res = UserSchema().dump(userdata)
#         response.text = res

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)

#     return response

# @user_id.put()
# def modify_user(request):

#     try:
#         id = request.matchdict['id']
#         UserSchema().load(request.json)

#         userdata = DBSession.query(User).filter(User.id_user == id).update(request.json)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(QuestionSchema().dump(questiondata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)

#     return response

# @user_id.delete()
# def delete_user(request):

#     try:
#         id = request.matchdict['id']

#         userdata = DBSession.query(User).get(id)

#         DBSession.delete(userdata)

#         response = exception.HTTPAccepted

#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
