from cornice import Service
from cornice.validators import marshmallow_body_validator

from loftes.cors import cors_policy
from loftes.models import Challenge, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema

import pyramid.httpexceptions as exception
import logging

challenge = Service(name='challenge',
                    path='/challenge',
                    cors_policy=cors_policy)

@challenge.get()
def get_challenges(request):

    challenges = DBSession.query(Challenge).all()

    if len(challenges) == 0:
        return ServiceInformations().build_response(exception.HTTPNotFound())

    data = {
        'challenges' : ChallengeSchema(many=True).dump(challenges)
    }

    return ServiceInformations().build_response(exception.HTTPOk, data)

challenge_by_id = Service(name='challenge_by_id',
                          path='challenge/{id_challenge:\d+}',
                          cors_policy=cors_policy)

@challenge_by_id.get()
def get_challenge(request):

    id_challenge = request.matchdict['id_challenge']
    challenge = DBSession.query(Challenge).get(id_challenge)

    if challenge == None:
        return ServiceInformations().build_response(exception.HTTPNotFound())

    return ServiceInformations().build_response(exception.HTTPOk, ChallengeSchema().dump(challenge))


@challenge.post()
def create_challenge(request):

    service_informations = ServiceInformations()

    try:
        challenge_schema = ChallengeSchema()
        challenge = challenge_schema.load(request.json)

        DBSession.add(challenge)
        DBSession.flush()

        response = service_informations.build_response(exception.HTTPOk, challenge_schema.dump(challenge))

    except ValueError as ve:
        response = service_informations.build_response(exception.HTTPBadRequest, None, str(ve))
        DBSession.close()

    except Exception as e:
        response = service_informations.build_response(exception.HTTPInternalServerError)
        logging.getLogger(__name__).warn('Returning: %s', str(e))
        DBSession.close()

    return response
