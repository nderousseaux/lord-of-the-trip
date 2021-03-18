from cornice import Service
from cornice.validators import marshmallow_body_validator

from loftes.cors import cors_policy
from loftes.models import Challenge, DBSession
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema

import pyramid.httpexceptions as exception

import transaction

import json

import sys

challenge = Service(name='challenge',
                    path='/challenge',
                    cors_policy=cors_policy)

@challenge.get()
def get_challenges(request):

    challenges = DBSession.query(Challenge).all()

    if len(challenges) == 0:
        raise exception.HTTPNotFound()

    response = ChallengeSchema(many=True).dump(challenges)

    return response

challenge_by_id = Service(name='challenge_by_id',
                          path='challenge/{id_challenge:\d+}',
                          cors_policy=cors_policy)

@challenge_by_id.get()
def get_challenge(request):

    id_challenge = request.matchdict['id_challenge']
    challenge = DBSession.query(Challenge).get(id_challenge)

    if challenge == None:
        raise exception.HTTPNotFound()

    response = ChallengeSchema().dump(challenge)

    return response

@challenge.post()
def create_challenge(request):

    try:
        challenge = ChallengeSchema().load(request.json)

        DBSession.add(challenge)
        DBSession.flush()

        response = exception.HTTPCreated()
        response.text = json.dumps(ChallengeSchema().dump(challenge))

    except Exception as e:
        response = exception.HTTPNotImplemented()
        print(e)
        #arr_errors = {'errors':e.messages}
        #response.text = json.dumps({'error':e.message})

    # challenge = ChallengeSchema().load(request.json)
    # DBSession().add(challenge)
    # DBSession().flush()
    # DBSession().commit()
    # response = exception.HTTPCreated()

    #response.text = json.dumps(ChallengeSchema().dump(challenge))


    return response
