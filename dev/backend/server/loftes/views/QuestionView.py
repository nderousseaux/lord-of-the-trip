from loftes.cors import cors_policy

from cornice import Service

from loftes.models import Question, DBSession

from loftes.marshmallow_schema import QuestionSchema

import pyramid.httpexceptions as exception

question = Service(name='question',
                   path='/question',
                   cors_policy=cors_policy)
# @question.get()
# def get_question(request):

#     questiondata = DBSession.query(Question).all()

#     if len(questiondata) == 0:
#         raise exception.HTTPError("Aucune question")

#     res = QuestionSchema(many=True).dump(questiondata)
#     return res

# @question.post()
# def question_add(request):

#    try:
#         questiondata = QuestionSchema().load(request.json)

#         DBSession.add(questiondata)
#         DBSession.flush()

#         response = exception.HTTPCreated()
#         response.text = json.dumps(QuestionSchema().dump(questiondata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)
    
#     return response

# question_id = Service(name='question_id',
#                       path='/question/{id}',
#                       cors_policy=cors_policy)
              
# @question_id.get()
# def get_question_by_id(request):

#     try:

#         id = request.matchdict['id']

#         questiondata  = DBSession.query(Question).get(id)

#         res = QuestionSchema().dump(questiondata)
#         response.text = res

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response

# @question_id.put()
# def modify_question(request):

#     try:
#         id = request.matchdict['id']
#         QuestionSchema().load(request.json)

#         questiondata = DBSession.query(Question).filter(Question.id_question == id).update(request.json)
#         DBSession.flush()
        
#         response = exception.HTTPCreated()
#         response.text = json.dumps(QuestionSchema().dump(questiondata))

#     except Exception as e:
#         response = exception.HTTPNotImplemented(e)
#         print(e)
    
#     return response

# @question_id.delete()
# def delete_question(request):

#     try:
#         id = request.matchdict['id']

#         questiondata = DBSession.query(Question).get(id)

#         DBSession.delete(questiondata)

#         response = exception.HTTPAccepted
        
#     except Exception as e:
#         response = exception.HTTPNotImplemented()
#         print(e)   
