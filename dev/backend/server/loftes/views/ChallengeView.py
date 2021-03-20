from cornice import Service
from cornice.validators import marshmallow_body_validator

from loftes.cors import cors_policy
from loftes.models import Challenge, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema

import pyramid.httpexceptions as exception

from pyramid.response import Response

challenge = Service(name='challenge',
                    path='/challenge',
                    cors_policy=cors_policy)

@challenge.get()
def get_challenges(request):

    challenges = DBSession.query(Challenge).all()

    if len(challenges) == 0:
        return ServiceInformations().build_response(exception.HTTPNotFound(), None, None)

    data = {
        'challenges' : ChallengeSchema(many=True).dump(challenges)
    }

    return ServiceInformations().build_response(exception.HTTPOk, data, None)

challenge_by_id = Service(name='challenge_by_id',
                          path='challenge/{id_challenge:\d+}',
                          cors_policy=cors_policy)

@challenge_by_id.get()
def get_challenge(request):

    id_challenge = request.matchdict['id_challenge']
    challenge = DBSession.query(Challenge).get(id_challenge)

    if challenge == None:
        return ServiceInformations().build_response(exception.HTTPNotFound(), None, None)

    return ServiceInformations().build_response(exception.HTTPOk, ChallengeSchema().dump(challenge), None)


@challenge.post()
def create_challenge(request):

    try:
        challenge = ChallengeSchema().load(request.json)

        DBSession.add(challenge)
        DBSession.flush()

        code = exception.HTTPCreated.code
        content = ChallengeSchema().dump(challenge)

    except Exception as e:
        http_exception = exception.HTTPInternalServerError
        code = http_exception.code

        content = {
            'error' : {
                'code' : http_exception.title.upper(),
                'message' : str(e)
            }
        }

    response = Response(content_type='application/json')
    response.status_code = code
    response.text = json.dumps(content)

    return response
