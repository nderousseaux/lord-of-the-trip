from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from loftes.cors import cors_policy
from loftes.models import Obstacle, Segment, Challenge, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import ObstacleSchema
from loftes.resources import ObstacleResources

import pyramid.httpexceptions as exception
import logging
import json

obstacle_all = Service(
    name="obstacle_all",
    path="/challenges/{challenge_id:\d+}/obstacles",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:challenge_id/obstacles Request all obstacles informations of challenge's id.
@apiParam challenge_id Challenge's unique ID.
@apiVersion 0.2.0
@apiName GetObstaclesByChallenge
@apiGroup Obstacle
@apiSampleRequest off

@apiSuccess (OK 200) {Array} Obstacles All obstacles created of challenge's id.
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "obstacles": [
    {
      "id": 1,
      "label": "Quelle est le vrai nom de la sorcière blanche ?",
      "progress": 50.0,
      "description": null,
      "question_type": 0,
      "nb_points": 25,
      "result": "Jadis",
      "segment_id": 1
    },
    {
      "id": 2,
      "label": "Qui est le père d'Aslan ?",
      "progress": 50.0,
      "description": null,
      "question_type": 0,
      "nb_points": 25,
      "result": "L'empereur d'au-delà des Mers",
      "segment_id": 2
    },
    {
      "id": 3,
      "label": "Télécharger une photo",
      "progress": 50.0,
      "description": null,
      "question_type": 1,
      "nb_points": 30,
      "result": null,
      "segment_id": 3
    }
  ]
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No obstacles were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@obstacle_all.get()
def get_obstacles_by_challenge(request):

    service_informations = ServiceInformations()
    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        obstacles = ObstacleResources.find_all_obstacles_by_challenge(challenge.id)

        if len(obstacles) == 0:
            return service_informations.build_response(exception.HTTPNotFound())

        data = {"obstacles": ObstacleSchema(many=True).dump(obstacles)}

        response = service_informations.build_response(exception.HTTPOk, data)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested ressource 'Challenge' is not found.",
        )

    return response


obstacle = Service(
    name="obstacle",
    path="/challenges/{challenge_id:\d+}/segments/{segment_id:\d+}/obstacles",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:challenge_id/segments/:segment_id/obstacles Request all obstacles informations of segment's id.
@apiParam challenge_id Challenge's unique ID.
@apiParam segment_id Segment's unique ID.
@apiVersion 0.2.0
@apiName GetObstaclesBySegment
@apiGroup Obstacle
@apiSampleRequest off

@apiSuccess (OK 200) {Array} Obstacles All obstacles created of segment's id.
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "obstacles": [
    {
      "id": 1,
      "label": "Quelle est le vrai nom de la sorcière blanche ?",
      "progress": 50.0,
      "description": null,
      "question_type": 0,
      "nb_points": 25,
      "result": "Jadis",
      "segment_id": 1
    }
  ]
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} SegmentNotFound The id of the Segment was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Segment' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No obstacles were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@obstacle.get()
def get_obstacles_by_segment(request):

    service_informations = ServiceInformations()

    challenge_id = request.matchdict["challenge_id"]
    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == segment_id).first()
        )

        if segment != None:

            obstacles = ObstacleResources.find_all_obstacles_by_segment(segment.id, challenge.id)

            if len(obstacles) == 0:
                return service_informations.build_response(exception.HTTPNotFound())

            data = {"obstacles": ObstacleSchema(many=True).dump(obstacles)}

            response = service_informations.build_response(exception.HTTPOk, data)

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested ressource 'Segment' is not found.",
            )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested ressource 'Challenge' is not found.",
        )

    return response


"""
@api {post} /challenges/:challenge_id/segments/:segment_id/obstacles Create a new obstacle of segment's id.
@apiParam challenge_id Challenge's unique ID.
@apiParam segment_id Segment's unique ID.
@apiVersion 0.2.0
@apiName PostObstacle
@apiGroup Obstacle
@apiSampleRequest off

@apiSuccess (Body parameters) {Float} progress Obstacle's progress on segment's line

@apiSuccessExample {json} Body:

{
	"progress":14.6
}

@apiSuccessExample {json} Success response:
HTTP/1.1 201 Created

{
  "id": 4,
  "label": null,
  "progress": 14.6,
  "description": null,
  "question_type": null,
  "nb_points": null,
  "result": null,
  "segment_id": 5
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'progress': ['This field is mandatory.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'progress': ['Field must not be null.']}"
  }
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} SegmentNotFound The id of the Segment was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested ressource 'Segment' is not found for this challenge."
  }
}
"""


@obstacle.post()
def create_obstacle(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == segment_id).first()
        )

        if segment != None:

            try:
                obstacle_data = request.json
                obstacle_data["segment_id"] = segment.id

                obstacle_schema = ObstacleSchema()
                obstacle = obstacle_schema.load(obstacle_data)

                DBSession.add(obstacle)
                DBSession.flush()

                response = service_informations.build_response(exception.HTTPCreated, obstacle_schema.dump(obstacle))

            except ValidationError as validation_error:
                response = service_informations.build_response(exception.HTTPBadRequest, None, str(validation_error))
                DBSession.close()

            except ValueError as value_error:
                response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
                DBSession.close()

            except Exception as e:
                response = service_informations.build_response(exception.HTTPInternalServerError)
                logging.getLogger(__name__).warn("Returning: %s", str(e))
                DBSession.close()

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested ressource 'Segment' is not found for this challenge.",
            )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested ressource 'Challenge' is not found.",
        )

    return response


obstacle_id = Service(
    name="obstacle_id",
    path="/challenges/{challenge_id:\d+}/segments/{segment_id:\d+}/obstacles/{id}",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:challenge_id/segments/:segment_id/obstacles/:id Request a obstacle informations of obstacle's id
@apiParam challenge_id Challenge's unique ID.
@apiParam segment_id Segment's unique ID.
@apiParam id Obstacle's unique ID.
@apiVersion 0.2.0
@apiName GetObstacle
@apiGroup Obstacle
@apiSampleRequest off

@apiSuccess (OK 200) {Number} id Obstacle's ID
@apiSuccess (OK 200) {String} label Obstacle's label
@apiSuccess (OK 200) {Float} progress Obstacle's progress on segment's line
@apiSuccess (OK 200) {Number} question_type Obstacle's question type
@apiSuccess (OK 200) {Number} nb_points Obstacle's number of points
@apiSuccess (OK 200) {String} nb_points Obstacle's result
@apiSuccess (OK 200) {Number} segment_id Obstacle's segment's id
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "id": 1,
  "label": "Quelle est le vrai nom de la sorcière blanche ?",
  "progress": 50.0,
  "description": null,
  "question_type": 0,
  "nb_points": 25,
  "result": "Jadis",
  "segment_id": 1
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} SegmentNotFound The id of the Segment was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Segment' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No obstacles were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@obstacle_id.get()
def get_obstacle_by_id(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == segment_id).first()
        )

        if segment != None:

            obstacle = (
                DBSession.query(Obstacle)
                .filter(
                    Obstacle.segment_id == segment.id,
                    Obstacle.id == request.matchdict["id"],
                )
                .first()
            )

            if obstacle == None:
                return service_informations.build_response(exception.HTTPNotFound())

            response = service_informations.build_response(exception.HTTPOk, ObstacleSchema().dump(obstacle))

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Segment' is not found.",
            )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested ressource 'Challenge' is not found.",
        )

    return response


"""
@api {put} /challenges/:challenge_id/segments/:segment_id/obstacles/:id Update an obstacle
@apiParam challenge_id Challenge's unique ID.
@apiParam segment_id Segment's unique ID.
@apiParam id Obstacle's unique ID.
@apiVersion 0.2.0
@apiName PutObstacle
@apiGroup Obstacle
@apiSampleRequest off

@apiSuccess (Body parameters) {Number} id Obstacle's ID
@apiSuccess (Body parameters) {String} label Obstacle's label
@apiSuccess (Body parameters) {Float} progress Obstacle's progress on segment's line
@apiSuccess (Body parameters) {Number} question_type Obstacle's question type
@apiSuccess (Body parameters) {Number} nb_points Obstacle's number of points
@apiSuccess (Body parameters) {String} nb_points Obstacle's result
@apiSuccess (Body parameters) {Number} segment_id Obstacle's segment's id

@apiSuccessExample {json} Body:

{
    "label": "Qui offre des armes aux enfants Pevensie ?",
    "progress": 70,
    "description": "",
    "question_type": 0,
    "nb_points": 25,
    "result": "Le père Noel"
}

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'label': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'progress': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'question_type': ['Field must not be null.']}"
  }
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} SegmentNotFound The id of the Segment was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Segment' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No obstacles were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@obstacle_id.put()
def get_obstacle_update(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == segment_id).first()
        )

        if segment != None:

            query = DBSession.query(Obstacle).filter(
                Obstacle.segment_id == segment.id,
                Obstacle.id == request.matchdict["id"],
            )

            obstacle = query.first()

            if obstacle != None:

                try:

                    query.update(ObstacleSchema().check_json(request.json))
                    DBSession.flush()

                    response = service_informations.build_response(exception.HTTPNoContent)

                except ValidationError as validation_error:
                    response = service_informations.build_response(
                        exception.HTTPBadRequest, None, str(validation_error)
                    )
                    DBSession.close()

                except ValueError as value_error:
                    response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
                    DBSession.close()

                except PermissionError as pe:
                    response = service_informations.build_response(exception.HTTPUnauthorized)
                    DBSession.close()

                except Exception as e:
                    response = service_informations.build_response(exception.HTTPInternalServerError)
                    logging.getLogger(__name__).warn("Returning: %s", str(e))
                    DBSession.close()

            else:
                response = service_informations.build_response(exception.HTTPNotFound())

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Segment' is not found.",
            )
    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


"""
@api {patch} /challenges/:challenge_id/segments/:segment_id/obstacles/:_id Partially modify an obstacle
@apiParam challenge_id Challenge's unique ID.
@apiParam segment_id Segment's unique ID.
@apiParam id Obstacle's unique ID.
@apiVersion 0.2.0
@apiName PatchObstacle
@apiGroup Obstacle
@apiSampleRequest off

@apiSuccess (Body parameters) {Number} id Obstacle's ID
@apiSuccess (Body parameters) {String} label Obstacle's label
@apiSuccess (Body parameters) {Float} progress Obstacle's progress on segment's line
@apiSuccess (Body parameters) {Number} question_type Obstacle's question type
@apiSuccess (Body parameters) {Number} nb_points Obstacle's number of points
@apiSuccess (Body parameters) {String} nb_points Obstacle's result
@apiSuccess (Body parameters) {Number} segment_id Obstacle's segment's id

@apiSuccessExample {json} Body:

{
    "nb_points": 25
}

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'label': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'progress': ['Field must not be null.']}"
  }
}

@apiError (Error 400) {Object} BadRequest Malformed request syntax.
@apiErrorExample {json} Error 400 response:
HTTP/1.1 400 Bad Request

{
  "error": {
    "status": "BAD REQUEST",
    "message": "{'question_type': ['Field must not be null.']}"
  }
}

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} SegmentNotFound The id of the Segment was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Segment' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No obstacles were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@obstacle_id.patch()
def get_obstacle_modify(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == segment_id).first()
        )

        if segment != None:

            query = DBSession.query(Obstacle).filter(
                Obstacle.segment_id == segment.id,
                Obstacle.id == request.matchdict["id"],
            )

            obstacle = query.first()

            if obstacle != None:

                try:

                    query.update(ObstacleSchema().check_json(request.json))
                    DBSession.flush()

                    response = service_informations.build_response(exception.HTTPNoContent)

                except ValidationError as validation_error:
                    response = service_informations.build_response(
                        exception.HTTPBadRequest, None, str(validation_error)
                    )
                    DBSession.close()

                except ValueError as value_error:
                    response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
                    DBSession.close()

                except PermissionError as pe:
                    response = service_informations.build_response(exception.HTTPUnauthorized)
                    DBSession.close()

                except Exception as e:
                    response = service_informations.build_response(exception.HTTPInternalServerError)
                    logging.getLogger(__name__).warn("Returning: %s", str(e))
                    DBSession.close()

            else:
                response = service_informations.build_response(exception.HTTPNotFound())

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Segment' is not found.",
            )
    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


"""
@api {delete} /challenges/:challenge_id/segments/:segment_id/obstacles/:id Delete an obstacle
@apiParam challenge_id Challenge's unique ID.
@apiParam segment_id Segment's unique ID.
@apiParam id Obstacle's unique ID.
@apiVersion 0.2.0
@apiName DeleteObstacle
@apiGroup Obstacle
@apiSampleRequest off

@apiSuccessExample Success response:
HTTP/1.1 204 No Content

@apiError (Error 404) {Object} ChallengeNotFound The id of the Challenge was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Challenge' is not found."
  }
}

@apiError (Error 404) {Object} SegmentNotFound The id of the Segment was not found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource 'Segment' is not found."
  }
}

@apiError (Error 404) {Object} RessourceNotFound No segments were found.
@apiErrorExample {json} Error 404 response:
HTTP/1.1 404 Not Found

{
  "error": {
    "status": "NOT FOUND",
    "message": "Requested resource is not found."
  }
}
"""


@obstacle_id.delete()
def delete_obstacle(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment).filter(Segment.challenge_id == challenge.id, Segment.id == segment_id).first()
        )

        if segment != None:

            obstacle = (
                DBSession.query(Obstacle)
                .filter(
                    Obstacle.segment_id == segment.id,
                    Obstacle.id == request.matchdict["id"],
                )
                .first()
            )

            if obstacle != None:

                try:
                    DBSession.delete(obstacle)
                    DBSession.flush()

                    response = service_informations.build_response(exception.HTTPNoContent)

                except ValidationError as validation_error:
                    response = service_informations.build_response(
                        exception.HTTPBadRequest, None, str(validation_error)
                    )
                    DBSession.close()

                except ValueError as value_error:
                    response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))
                    DBSession.close()

                except PermissionError as pe:
                    response = service_informations.build_response(exception.HTTPUnauthorized)
                    DBSession.close()

                except Exception as e:
                    response = service_informations.build_response(exception.HTTPInternalServerError)
                    logging.getLogger(__name__).warn("Returning: %s", str(e))
                    DBSession.close()

            else:
                response = service_informations.build_response(exception.HTTPNotFound())

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
                None,
                "Requested resource 'Segment' is not found.",
            )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response
