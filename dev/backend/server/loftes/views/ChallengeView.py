from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

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

    service_informations = ServiceInformations()
    challenges = DBSession.query(Challenge).all()

    if len(challenges) == 0:
        return service_informations.build_response(exception.HTTPNotFound())

    data = {
        'challenges' : ChallengeSchema(many=True).dump(challenges)
    }

    return service_informations.build_response(exception.HTTPOk, data)


@challenge.post()
def create_challenge(request):

    service_informations = ServiceInformations()

    try:
        challenge_schema = ChallengeSchema()
        challenge = challenge_schema.load(request.json)

        DBSession.add(challenge)
        DBSession.flush()

        response = service_informations.build_response(exception.HTTPOk, challenge_schema.dump(challenge))

    except ValidationError as validation_error:
        response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))
        DBSession.close()

    except ValueError as value_error:
        response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
        DBSession.close()

    except PermissionError as pe:
        response = service_informations.build_response(exception.HTTPUnauthorized)
        DBSession.close()

    except Exception as e:
        response = service_informations.build_response(exception.HTTPInternalServerError)
        logging.getLogger(__name__).warn('Returning: %s', str(e))
        DBSession.close()

    return ServiceInformations().build_response(exception.HTTPCreated, data)


challenge_by_id = Service(name='challenge_by_id',
                          path='challenge/{id:\d+}',
                          cors_policy=cors_policy)

@challenge_by_id.get()
def get_challenge(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict['id'])

    if challenge == None:
        return service_informations.build_response(exception.HTTPNotFound())

    return service_informations.build_response(exception.HTTPOk, ChallengeSchema().dump(challenge))


@challenge_by_id.put()
def update_challenge(request):

    service_informations = ServiceInformations()

    id = request.matchdict['id']

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:
        try:
            DBSession.query(Challenge).filter(Challenge.id == id).update(ChallengeSchema().check_json(request.json))
            DBSession.flush()

            response = service_informations.build_response(exception.HTTPNoContent)

        except ValidationError as validation_error:
            response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))
            DBSession.close()

        except ValueError as value_error:
            response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
            DBSession.close()

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)
            DBSession.close()

        except Exception as e:
            response = service_informations.build_response(exception.HTTPInternalServerError)
            logging.getLogger(__name__).warn('Returning: %s', str(e))
            DBSession.close()

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response


@challenge_by_id.patch()
def modify_challenge(request):
    service_informations = ServiceInformations()

    id = request.matchdict['id']

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:
        try:
            DBSession.query(Challenge).filter(Challenge.id == id).update(ChallengeSchema().check_json(request.json))
            DBSession.flush()

            response = service_informations.build_response(exception.HTTPNoContent)

        except ValidationError as validation_error:
            response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))
            DBSession.close()

        except ValueError as value_error:
            response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
            DBSession.close()

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)
            DBSession.close()

        except Exception as e:
            response = service_informations.build_response(exception.HTTPInternalServerError)
            logging.getLogger(__name__).warn('Returning: %s', str(e))
            DBSession.close()

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response

@challenge_by_id.delete()
def delete_challenge(request):
    service_informations = ServiceInformations()

    id = request.matchdict['id']

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:
        try:
            challenge_to_delete = DBSession.query(Challenge).filter(Challenge.id == id).first()
            DBSession.delete(challenge_to_delete)
            DBSession.flush()

            response = service_informations.build_response(exception.HTTPNoContent)

        except Exception as e:
            response = service_informations.build_response(exception.HTTPInternalServerError)
            logging.getLogger(__name__).warn('Returning: %s', str(e))
            DBSession.close()

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response
