from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from loftes.cors import cors_policy
from loftes.models import Challenge, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema
from loftes.utils import get_project_root

from pathlib import Path

from sqlalchemy import exc

import pyramid.httpexceptions as exception
import logging
import os


challenge = Service(name="challenge", path="/challenge", cors_policy=cors_policy)


@challenge.get()
def get_challenges(request):

    service_informations = ServiceInformations()
    challenges = DBSession.query(Challenge).all()

    if len(challenges) == 0:
        return service_informations.build_response(exception.HTTPNotFound())

    data = {"challenges": ChallengeSchema(many=True).dump(challenges)}

    return service_informations.build_response(exception.HTTPOk, data)


@challenge.post()
def create_challenge(request):

    service_informations = ServiceInformations()

    try:
        challenge_schema = ChallengeSchema()
        challenge = challenge_schema.load(request.json)

        DBSession.add(challenge)
        DBSession.flush()

        response = service_informations.build_response(
            exception.HTTPOk, challenge_schema.dump(challenge)
        )

    except ValidationError as validation_error:
        response = service_informations.build_response(
            exception.HTTPBadRequest, None, str(validation_error)
        )
        DBSession.close()

    except ValueError as value_error:
        response = service_informations.build_response(
            exception.HTTPBadRequest, None, str(value_error)
        )
        DBSession.close()

    except PermissionError as pe:
        response = service_informations.build_response(exception.HTTPUnauthorized)
        DBSession.close()

    except Exception as e:
        response = service_informations.build_response(
            exception.HTTPInternalServerError
        )
        logging.getLogger(__name__).warn("Returning: %s", str(e))
        DBSession.close()

    return response


challenge_by_id = Service(
    name="challenge_by_id", path="challenge/{id:\d+}", cors_policy=cors_policy
)


@challenge_by_id.get()
def get_challenge(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["id"])

    if challenge == None:
        return service_informations.build_response(exception.HTTPNotFound())

    return service_informations.build_response(
        exception.HTTPOk, ChallengeSchema().dump(challenge)
    )


@challenge_by_id.put()
def update_challenge(request):

    service_informations = ServiceInformations()

    id = request.matchdict["id"]

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:
        try:
            DBSession.query(Challenge).filter(Challenge.id == id).update(
                ChallengeSchema().check_json(request.json)
            )
            DBSession.flush()

            response = service_informations.build_response(exception.HTTPNoContent)

        except ValidationError as validation_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(validation_error)
            )
            DBSession.close()

        except ValueError as value_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(value_error)
            )
            DBSession.close()

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)
            DBSession.close()

        except Exception as e:
            response = service_informations.build_response(
                exception.HTTPInternalServerError
            )
            logging.getLogger(__name__).warn("Returning: %s", str(e))
            DBSession.close()

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response


@challenge_by_id.patch()
def modify_challenge(request):

    service_informations = ServiceInformations()

    id = request.matchdict["id"]

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:
        try:
            DBSession.query(Challenge).filter(Challenge.id == id).update(
                ChallengeSchema().check_json(request.json)
            )
            DBSession.flush()

            response = service_informations.build_response(exception.HTTPNoContent)

        except ValidationError as validation_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(validation_error)
            )
            DBSession.close()

        except ValueError as value_error:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, str(value_error)
            )
            DBSession.close()

        except PermissionError as pe:
            response = service_informations.build_response(exception.HTTPUnauthorized)
            DBSession.close()

        except Exception as e:
            response = service_informations.build_response(
                exception.HTTPInternalServerError
            )
            logging.getLogger(__name__).warn("Returning: %s", str(e))
            DBSession.close()

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response


@challenge_by_id.delete()
def delete_challenge(request):
    service_informations = ServiceInformations()

    id = request.matchdict["id"]

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:
        try:
            challenge_to_delete = (
                DBSession.query(Challenge).filter(Challenge.id == id).first()
            )
            DBSession.delete(challenge_to_delete)
            DBSession.flush()

            response = service_informations.build_response(exception.HTTPNoContent)

        except Exception as e:
            response = service_informations.build_response(
                exception.HTTPInternalServerError
            )
            logging.getLogger(__name__).warn("Returning: %s", str(e))
            DBSession.close()

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response


challenge_image = Service(
    name="challenge_image",
    path="challenge/{id:\d+}/upload-image",
    cors_policy=cors_policy,
)


@challenge_image.post()
def upload_image(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["id"])

    if challenge != None:

        if "file" in request.POST:

            file_type = request.POST["file"].type

            if file_type == "image/jpeg" or file_type == "image/png":

                if request.POST["file"].bytes_read < 8388608:  # 8MB

                    try:

                        root = get_project_root()
                        challenge_uploads_path = str(root) + "/uploads/challenges"

                        if not os.path.isdir(challenge_uploads_path):
                            os.makedirs(challenge_uploads_path, 0o755)

                        input_file = request.POST["file"].file
                        input_file_filename = "challenge_" + str(challenge.id)
                        input_file_type = "." + file_type.split("/")[1]

                        file_path = os.path.join(
                            challenge_uploads_path,
                            input_file_filename + input_file_type,
                        )
                        temp_file_path = file_path + "~"

                        input_file.seek(0)
                        with open(temp_file_path, "wb") as output_file:
                            shutil.copyfileobj(input_file, output_file)

                        os.rename(temp_file_path, file_path)

                        response = ServiceInformations().build_response(
                            exception.HTTPNoContent
                        )

                    except Exception as e:
                        response = service_informations.build_response(
                            exception.HTTPInternalServerError
                        )
                        logging.getLogger(__name__).warn("Returning: %s", str(e))
                        DBSession.close()

                else:
                    response = service_informations.build_response(
                        exception.HTTPBadRequest, None, "The size of image is too big."
                    )

            else:
                response = service_informations.build_response(
                    exception.HTTPUnsupportedMediaType,
                    None,
                    "The file type is not supported on this server.",
                )

        else:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, "File is not found."
            )

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response
