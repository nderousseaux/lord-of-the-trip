from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from loftes.cors import cors_policy
from loftes.models import Challenge, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema
from loftes.utils import get_project_root

from pathlib import Path

import pyramid.httpexceptions as exception
from pyramid.response import FileResponse

from sqlalchemy import exc

import logging
import os
import shutil


challenge = Service(name="challenge", path="/challenge", cors_policy=cors_policy)

"""
@api {get} /challenges Request all challenges informations
@apiVersion 0.1.0
@apiName GetChallenges
@apiGroup Challenge
@apiSampleRequest off

@apiSuccess (OK 200) {Array} Challenges All challenges created
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "challenges": [
    {
      "id": 1,
      "name": "A la recherche d'Aslan",
      "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
      "end_date": "2020-03-18T00:00:00",
      "alone_only": null,
      "level": "1",
      "scalling": 4,
      "draft": false,
      "start_crossing_point": null,
      "end_crossing_point": null,
      "segments": [
        {
          "id": 1,
          "name": "A travers le bois d'entre les mondes",
          "start_crossing_point": {
            "id": 1,
            "name": "L'armoire",
            "position_x": 0.1,
            "position_y": 0.1
          },
          "end_crossing_point": {
            "id": 2,
            "name": "La passe du faune",
            "position_x": 0.1,
            "position_y": 0.1
          },
          "list_points": null
        },
        {
          "id": 2,
          "name": "La route d'Ettinsmoor",
          "start_crossing_point": {
            "id": 2,
            "name": "La passe du faune",
            "position_x": 0.1,
            "position_y": 0.1
          },
          "end_crossing_point": {
            "id": 3,
            "name": "La passe du magicien",
            "position_x": 0.2,
            "position_y": 0.4
          },
          "list_points": null
        },
        {
          "id": 3,
          "name": "La traversée du grand désert",
          "start_crossing_point": {
            "id": 2,
            "name": "La passe du faune",
            "position_x": 0.1,
            "position_y": 0.1
          },
          "end_crossing_point": {
            "id": 3,
            "name": "La passe du magicien",
            "position_x": 0.2,
            "position_y": 0.4
          },
          "list_points": null
        },
        {
          "id": 4,
          "name": "La traversée du Grand Océan Oriental",
          "start_crossing_point": {
            "id": 5,
            "name": "Le pont des centaures",
            "position_x": 0.3,
            "position_y": 0.5
          },
          "end_crossing_point": {
            "id": 8,
            "name": "La table de pierre",
            "position_x": 0.2,
            "position_y": 0.5
          },
          "list_points": null
        }
      ],
      "admin": {
        "id": 1,
        "first_name": "Missy",
        "last_name": "Of Gallifrey",
        "pseudo": "Le maitre",
        "mail": "lemaitre@gmail.com"
      }
    },
    {
      "id": 2,
      "name": "Oops, on a perdu Han Solo",
      "description": "Leia Organa, Lando Calrissian et le reste de l'équipe ont merdé et ont été capturé par Jabba le Hutt. Les services secrets de la résistance ont trouvé le lieu ou ils sont tenus captifs. Il te faut donc jeune padawan allait sauver tout ce beau monde, et fissa car la lutte n'attends pas",
      "end_date": "2020-03-18T00:00:00",
      "alone_only": null,
      "level": "2",
      "scalling": 4,
      "draft": false,
      "start_crossing_point": null,
      "end_crossing_point": null,
      "segments": [],
      "admin": {
        "id": 1,
        "first_name": "Missy",
        "last_name": "Of Gallifrey",
        "pseudo": "Le maitre",
        "mail": "lemaitre@gmail.com"
      }
    }
  ]
}

@apiError (Error 404) {Object} RessourceNotFound No challenges were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge.get()
def get_challenges(request):
    service_informations = ServiceInformations()
    challenges = DBSession.query(Challenge).all()

    if len(challenges) == 0:
        return service_informations.build_response(exception.HTTPNotFound())

    data = {"challenges": ChallengeSchema(many=True).dump(challenges)}

    return service_informations.build_response(exception.HTTPOk, data)


"""
@api {post} /challenges Create a new Challenge
@apiVersion 0.1.0
@apiName PostChallenge
@apiGroup Challenge
@apiSampleRequest off

@apiSuccess (Created 201) {Object} Challenge Created challenge.
@apiSuccessExample {json} Success response:
HTTP/1.1 201 Created


{
  "id": 1,
  "name": "A la recherche d'Aslan",
  "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
  "end_date": "2021-12-15T03:16:00",
  "alone_only": 0,
  "level": "3",
  "scalling": 3,
  "draft": false,
  "start_crossing_point": {
    "id": 2,
    "name": "La passe du faune",
    "position_x": 0.1,
    "position_y": 0.1
  },
  "end_crossing_point": {
    "id": 3,
    "name": "La passe du magicien",
    "position_x": 0.2,
    "position_y": 0.4
  },
  "segments": [],
  "admin": {
    "id": 1,
    "first_name": "Missy",
    "last_name": "Of Gallifrey",
    "pseudo": "Le maitre",
    "mail": "lemaitre@gmail.com"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The given value {name} is already used as a challenge name."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Invalid value']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Invalid isoformat string: '2022-10-'"
  }
}

"""


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

"""
@api {get} /challenges/:id Request a challenge informations
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName GetChallenge
@apiGroup Challenge
@apiSampleRequest off

@apiSuccess (OK 200) {Object} Challenge Challenge of id
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "id": 1,
  "name": "A la recherche d'Aslan",
  "description": "Fille d'Eve et Fils d'Adam, vous voila revenu à Narnia. Aslan, notre brave Aslan a disparu. Vous devez le retrouver pour le bien de tous",
  "end_date": "2021-12-15T03:16:00",
  "alone_only": 0,
  "level": "3",
  "scalling": 3,
  "draft": false,
  "start_crossing_point": {
    "id": 2,
    "name": "La passe du faune",
    "position_x": 0.1,
    "position_y": 0.1
  },
  "end_crossing_point": {
    "id": 3,
    "name": "La passe du magicien",
    "position_x": 0.2,
    "position_y": 0.4
  },
  "segments": [
    {
      "id": 2,
      "name": "La route d'Ettinsmoor",
      "start_crossing_point": {
        "id": 2,
        "name": "La passe du faune",
        "position_x": 0.1,
        "position_y": 0.1
      },
      "end_crossing_point": {
        "id": 3,
        "name": "La passe du magicien",
        "position_x": 0.2,
        "position_y": 0.4
      },
      "list_points": null
    },
    {
      "id": 3,
      "name": "La traversée du grand désert",
      "start_crossing_point": {
        "id": 2,
        "name": "La passe du faune",
        "position_x": 0.1,
        "position_y": 0.1
      },
      "end_crossing_point": {
        "id": 3,
        "name": "La passe du magicien",
        "position_x": 0.2,
        "position_y": 0.4
      },
      "list_points": null
    },
    {
      "id": 4,
      "name": "La traversée du Grand Océan Oriental",
      "start_crossing_point": {
        "id": 5,
        "name": "Le pont des centaures",
        "position_x": 0.3,
        "position_y": 0.5
      },
      "end_crossing_point": {
        "id": 8,
        "name": "La table de pierre",
        "position_x": 0.2,
        "position_y": 0.5
      },
      "list_points": null
    }
  ],
  "admin": {
    "id": 1,
    "first_name": "Missy",
    "last_name": "Of Gallifrey",
    "pseudo": "Le maitre",
    "mail": "lemaitre@gmail.com"
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_by_id.get()
def get_challenge(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["id"])

    if challenge == None:
        return service_informations.build_response(exception.HTTPNotFound())

    return service_informations.build_response(
        exception.HTTPOk, ChallengeSchema().dump(challenge)
    )


"""
@api {put} /challenges/:id Update a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PutChallenge
@apiGroup Challenge
@apiSampleRequest off

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The given value {name} is already used as a challenge name."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Invalid value']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Invalid isoformat string: '2022-10-'"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Crossing point does not exist."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


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


"""
@api {patch} /challenges/:id Partially modify a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PatchChallenge
@apiGroup Challenge
@apiSampleRequest off

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The given value {name} is already used as a challenge name."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'name': ['Invalid value']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Invalid isoformat string: '2022-10-'"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "Crossing point does not exist."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


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


"""
@api {delete} /challenges/:id Delete a challenge
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName DeleteChallenge
@apiGroup Challenge
@apiSampleRequest off

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_by_id.delete()
def delete_challenge(request):
    service_informations = ServiceInformations()

    id = request.matchdict["id"]

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:
        try:

            if challenge.map_url != None:
                image = str(get_project_root()) + challenge.map_url
                if os.path.exists(image):
                    os.remove(image)

            DBSession.delete(challenge)
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
    path="challenge/{id:\d+}/image",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:id/image Request a challenge's map
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName GetChallengeImage
@apiGroup Challenge
@apiSampleRequest off

@apiSuccess (OK 200) {File} Image Challenge's map in jpeg/png format.

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} ImageNotFound Challenge's map is not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@challenge_image.get()
def download_image(request):

    service_informations = ServiceInformations()

    id = request.matchdict["id"]

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:

        if challenge.map_url != None:
            image = str(get_project_root()) + challenge.map_url

            if os.path.exists(image):
                response = FileResponse(image, request=request)
            else:
                response = service_informations.build_response(exception.HTTPNotFound)

        else:
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound, None, "Requested resource 'Challenge' is not found."
        )

    return response


"""
@api {post} /challenges/:id/image Upload a challenge's map
@apiParam id Challenge's unique ID.
@apiVersion 0.1.0
@apiName PostChallengeImage
@apiGroup Challenge
@apiSampleRequest off

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "File is not found."
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "The size of image is too big."
  }
}

@apiError (Error 404) {Object} RessourceNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 415) {Object} UnsupportedMediaType File is not found.
@apiErrorExample {json} Error 415 response:
HTTP/1.1 415 Unsupported Media Type

{
  "error": {
    "status": "UNSUPPORTED MEDIA TYPE",
    "message": "The file's type is not supported on this server."
  }
}

"""


@challenge_image.post()
def upload_image(request):

    service_informations = ServiceInformations()

    id = request.matchdict["id"]

    challenge = DBSession.query(Challenge).get(id)

    if challenge != None:

        if "file" in request.POST:

            file_type = request.POST["file"].type

            if file_type == "image/jpeg" or file_type == "image/png":

                if request.POST["file"].bytes_read < 8388608:  # 8MB

                    try:

                        root = get_project_root()
                        challenge_uploads_path = "/uploads/challenges"
                        path = str(root) + challenge_uploads_path

                        if not os.path.isdir(path):
                            os.makedirs(path, 0o755)

                        input_file = request.POST["file"].file
                        input_file_filename = "challenge_" + str(challenge.id)
                        input_file_type = "." + file_type.split("/")[1]
                        input_image = input_file_filename + input_file_type

                        # delete old map
                        if os.path.exists(path) and os.path.isdir(path):
                            if os.listdir(path):
                                for filename in os.listdir(path):
                                    if filename.startswith(input_file_filename):
                                        os.remove(os.path.join(path, filename))
                                        break

                        file_path = os.path.join(
                            path,
                            input_image,
                        )
                        temp_file_path = file_path + "~"

                        input_file.seek(0)
                        with open(temp_file_path, "wb") as output_file:
                            shutil.copyfileobj(input_file, output_file)

                        os.rename(temp_file_path, file_path)

                        DBSession.query(Challenge).filter(Challenge.id == id).update(
                            {
                                Challenge.map_url: challenge_uploads_path
                                + "/"
                                + input_image
                            }
                        )
                        DBSession.flush()

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
                    "The file's type is not supported on this server.",
                )

        else:
            response = service_informations.build_response(
                exception.HTTPBadRequest, None, "File is not found."
            )

    else:
        response = service_informations.build_response(exception.HTTPNotFound)

    return response
