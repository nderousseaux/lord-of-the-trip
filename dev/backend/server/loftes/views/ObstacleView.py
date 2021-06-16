from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from loftes.cors import cors_policy
from loftes.models import Obstacle, Segment, Challenge, User, Event, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import ObstacleSchema
from loftes.marshmallow_schema.EventSchema import EventSchema
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema
from loftes.resources import ObstacleResources
from loftes.resources.EventResources import EventResources
from loftes.resources import UserManager
from loftes.utils import get_project_root

import pyramid.httpexceptions as exception
import loftes.error_messages as error_messages
from pyramid.authentication import AuthTicket
import logging
import json
import datetime
import os
import shutil
import base64

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
    @apiHeader {String} Bearer-Token User's login token.

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

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                obstacles = ObstacleResources.find_all_obstacles_by_challenge(challenge.id)

                if len(obstacles) == 0:
                    return service_informations.build_response(exception.HTTPNoContent())

                data = {"obstacles": ObstacleSchema(many=True).dump(obstacles)}

                response = service_informations.build_response(exception.HTTPOk, data)

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


obstacle = Service(
    name="obstacle",
    path="/segments/{segment_id:\d+}/obstacles",
    cors_policy=cors_policy,
)

"""
    @api {get} /segments/:segment_id/obstacles Request all obstacles informations of segment's id.
    @apiParam segment_id Segment's unique ID.
    @apiVersion 0.2.0
    @apiName GetObstaclesBySegment
    @apiGroup Obstacle
    @apiSampleRequest off
    @apiHeader {String} Bearer-Token User's login token.

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

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        segment = DBSession.query(Segment).get(request.matchdict["segment_id"])

        # check if segment is found
        if segment != None:

            challenge = segment.challenge

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id or challenge.draft == False:

                obstacles = ObstacleResources.find_all_obstacles_by_segment(segment)

                if len(obstacles) == 0:
                    return service_informations.build_response(exception.HTTPNoContent())

                data = {"obstacles": ObstacleSchema(many=True).dump(obstacles)}

                response = service_informations.build_response(exception.HTTPOk, data)

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION,
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
    @api {post} /segments/:segment_id/obstacles Create a new obstacle of segment's id.
    @apiParam segment_id Segment's unique ID.
    @apiVersion 0.2.0
    @apiName PostObstacle
    @apiGroup Obstacle
    @apiSampleRequest off
    @apiHeader {String} Bearer-Token User's login token.

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

    @apiError (Error 404) {Object} SegmentNotFound The id of the Segment was not found.
    @apiErrorExample {json} Error 404 response:
    HTTP/1.1 404 Not Found

    {
    "error": {
        "status": "NOT FOUND",
        "message": "Requested ressource 'Segment' is not found."
    }
    }
"""


@obstacle.post()
def create_obstacle(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        segment = DBSession.query(Segment).get(request.matchdict["segment_id"])

        # check if segment is found
        if segment != None:

            challenge = segment.challenge

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                # check if challenge is draft
                if challenge.draft:

                    try:
                        obstacle_data = request.json
                        obstacle_data["segment_id"] = segment.id

                        obstacle_schema = ObstacleSchema()
                        obstacle = obstacle_schema.load(obstacle_data)

                        DBSession.add(obstacle)
                        DBSession.flush()

                        response = service_informations.build_response(
                            exception.HTTPCreated, obstacle_schema.dump(obstacle)
                        )

                    except ValidationError as validation_error:
                        response = service_informations.build_response(
                            exception.HTTPBadRequest, None, str(validation_error)
                        )

                    except ValueError as value_error:
                        response = service_informations.build_response(
                            exception.HTTPBadRequest, None, str(value_error)
                        )

                    except Exception as e:
                        response = service_informations.build_response(exception.HTTPInternalServerError)
                        logging.getLogger(__name__).warn("Returning: %s", str(e))

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden,
                        None,
                        error_messages.MODIFY_PUBLISHED_CHALLENGE,
                    )

            else:
                response = service_informations.build_response(exception.HTTPForbidden)

        else:
            response = service_informations.build_response(exception.HTTPNotFound)
    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


obstacle_id = Service(
    name="obstacle_id",
    path="/obstacles/{id}",
    cors_policy=cors_policy,
)

"""
    @api {get} /segments/:segment_id/obstacles/:id Request a obstacle informations of obstacle's id
    @apiParam segment_id Segment's unique ID.
    @apiParam id Obstacle's unique ID.
    @apiVersion 0.2.0
    @apiName GetObstacle
    @apiGroup Obstacle
    @apiSampleRequest off
    @apiHeader {String} Bearer-Token User's login token.

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

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        obstacle = DBSession.query(Obstacle).get(request.matchdict["id"])

        # check if obstacle is found
        if obstacle != None:

            challenge = obstacle.segment.challenge

            if challenge != None:

                # check if user is challenge's admin or challenge is published
                if user.id == challenge.admin_id or challenge.draft == False:

                    response = service_informations.build_response(exception.HTTPOk, ObstacleSchema().dump(obstacle))

                else:
                    response = service_informations.build_response(
                        exception.HTTPForbidden, None, error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION
                    )

            else:
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
    @api {put} /segments/:segment_id/obstacles/:id Update an obstacle
    @apiParam segment_id Segment's unique ID.
    @apiParam id Obstacle's unique ID.
    @apiVersion 0.2.0
    @apiName PutObstacle
    @apiGroup Obstacle
    @apiSampleRequest off
    @apiHeader {String} Bearer-Token User's login token.

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
def obstacle_update(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        obstacle = DBSession.query(Obstacle).get(request.matchdict["id"])

        # check if obstacle is found
        if obstacle != None:

            challenge = obstacle.segment.challenge

            # check if challenge is found
            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            obstacle_data = request.json
                            obstacle_data["segment_id"] = obstacle.segment.id
                            obstacle_data["id"] = obstacle.id

                            DBSession.query(Obstacle).filter(Obstacle.id == obstacle.id).update(
                                ObstacleSchema().check_json(obstacle_data)
                            )
                            DBSession.flush()

                            response = service_informations.build_response(exception.HTTPNoContent)

                        except ValidationError as validation_error:
                            response = service_informations.build_response(
                                exception.HTTPBadRequest, None, str(validation_error)
                            )

                        except ValueError as value_error:
                            response = service_informations.build_response(
                                exception.HTTPBadRequest, None, str(value_error)
                            )

                        except PermissionError as pe:
                            response = service_informations.build_response(exception.HTTPUnauthorized)

                        except Exception as e:
                            response = service_informations.build_response(exception.HTTPInternalServerError)
                            logging.getLogger(__name__).warn("Returning: %s", str(e))

                    else:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.MODIFY_PUBLISHED_CHALLENGE,
                        )

                else:
                    response = service_informations.build_response(exception.HTTPForbidden)

            else:
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
    @api {patch} /segments/:segment_id/obstacles/:id Partially modify an obstacle
    @apiParam segment_id Segment's unique ID.
    @apiParam id Obstacle's unique ID.
    @apiVersion 0.2.0
    @apiName PatchObstacle
    @apiGroup Obstacle
    @apiSampleRequest off
    @apiHeader {String} Bearer-Token User's login token.

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
def obstacle_modify(request):

    service_informations = ServiceInformations()

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        obstacle = DBSession.query(Obstacle).get(request.matchdict["id"])

        # check if obstacle is found
        if obstacle != None:

            challenge = obstacle.segment.challenge

            # check if challenge is found
            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            obstacle_data = request.json
                            obstacle_data["segment_id"] = obstacle.segment.id
                            obstacle_data["id"] = obstacle.id

                            DBSession.query(Obstacle).filter(Obstacle.id == obstacle.id).update(
                                ObstacleSchema().check_json(obstacle_data)
                            )
                            DBSession.flush()

                            response = service_informations.build_response(exception.HTTPNoContent)

                        except ValidationError as validation_error:
                            response = service_informations.build_response(
                                exception.HTTPBadRequest, None, str(validation_error)
                            )

                        except ValueError as value_error:
                            response = service_informations.build_response(
                                exception.HTTPBadRequest, None, str(value_error)
                            )

                        except PermissionError as pe:
                            response = service_informations.build_response(exception.HTTPUnauthorized)

                        except Exception as e:
                            response = service_informations.build_response(exception.HTTPInternalServerError)
                            logging.getLogger(__name__).warn("Returning: %s", str(e))

                    else:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.MODIFY_PUBLISHED_CHALLENGE,
                        )

                else:
                    response = service_informations.build_response(exception.HTTPForbidden)

            else:
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


"""
  @api {delete} /segments/:segment_id/obstacles/:id Delete an obstacle
  @apiParam segment_id Segment's unique ID.
  @apiParam id Obstacle's unique ID.
  @apiVersion 0.2.0
  @apiName DeleteObstacle
  @apiGroup Obstacle
  @apiSampleRequest off
  @apiHeader {String} Bearer-Token User's login token.

  @apiSuccessExample Success response:
  HTTP/1.1 204 No Content

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

    user = UserManager.check_user_connection(request)

    # check if user is authenticated
    if user != None:

        obstacle = DBSession.query(Obstacle).get(request.matchdict["id"])

        # check if obstacle is found
        if obstacle != None:

            challenge = obstacle.segment.challenge

            # check if challenge is found
            if challenge != None:

                # check if user is challenge's admin
                if user.id == challenge.admin_id:

                    # check if challenge is draft
                    if challenge.draft:

                        try:

                            DBSession.delete(obstacle)
                            DBSession.flush()

                            response = service_informations.build_response(exception.HTTPNoContent)

                        except ValidationError as validation_error:
                            response = service_informations.build_response(
                                exception.HTTPBadRequest, None, str(validation_error)
                            )

                        except ValueError as value_error:
                            response = service_informations.build_response(
                                exception.HTTPBadRequest, None, str(value_error)
                            )

                        except PermissionError as pe:
                            response = service_informations.build_response(exception.HTTPUnauthorized)

                        except Exception as e:
                            response = service_informations.build_response(exception.HTTPInternalServerError)
                            logging.getLogger(__name__).warn("Returning: %s", str(e))

                    else:
                        response = service_informations.build_response(
                            exception.HTTPForbidden,
                            None,
                            error_messages.MODIFY_PUBLISHED_CHALLENGE,
                        )

                else:
                    response = service_informations.build_response(exception.HTTPForbidden)

            else:
                response = service_informations.build_response(
                    exception.HTTPUnprocessableEntity, None, error_messages.CHALLENGE_IS_MISSING
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response


obstacle_answer = Service(
    name="obstacle_answer",
    path="/obstacles/{id}/answer",
    cors_policy=cors_policy,
)


@obstacle_answer.post()
def respond_on_obstacle(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        obstacle = DBSession.query(Obstacle).get(request.matchdict["id"])

        # check if obstacle is found
        if obstacle != None:

            event_rules = EventResources().check_event_type_rule(
                5, user.id, obstacle.segment.challenge.id, obstacle.segment.id
            )

            if event_rules == None:

                event_type_id = 5

                try:

                    if obstacle.question_type == 0:

                        if "response" not in request.json or request.json["response"] == None:
                            return service_informations.build_response(
                                exception.HTTPBadRequest(), None, error_messages.OBSTACLE_RESPONSE_NOT_FOUND
                            )

                        obstacle_response = request.json["response"]

                        user_response = service_informations.replace_accents(
                            service_informations.replace_specials(obstacle_response)
                        ).upper()

                        obstacle_result = service_informations.replace_accents(
                            service_informations.replace_specials(obstacle.result)
                        ).upper()

                        event_type_id = 7
                        proceeded = False

                        if user_response == obstacle_result:
                            event_type_id = 6
                            proceeded = True

                        data = Event(
                            user_id=user.id,
                            segment_id=obstacle.segment.id,
                            event_date=datetime.datetime.now(),
                            event_type_id=event_type_id,
                            obstacle_id=obstacle.id,
                            response=obstacle_response,
                            proceeded=proceeded,
                        )

                        DBSession.add(data)
                        DBSession.flush()

                        response = service_informations.build_response(
                            exception.HTTPCreated,
                            EventSchema().dump(data),
                        )

                    # photo
                    elif obstacle.question_type == 1:
                        # check if user has already responded on obstacle
                        photos_sent = EventResources().find_event_responded_with_photo(user.id, obstacle.id)

                        if len(photos_sent) == 0:

                            # check if file is uploaded to server
                            if "file" in request.POST:

                                file_type = request.POST["file"].type

                                # check if uploaded file is correct type of image
                                if file_type == "image/jpeg" or file_type == "image/png":

                                    # check if uploaded file is not bigger than 8MB
                                    if request.POST["file"].bytes_read < 8388608:  # 8MB

                                        root = get_project_root()
                                        obstacle_uploads_path = "/uploads/obstacles/user_" + str(user.id)
                                        path = str(root) + obstacle_uploads_path

                                        if not os.path.isdir(path):
                                            os.makedirs(path, 0o755)

                                        input_file = request.POST["file"].file
                                        input_file_filename = "obstacle_" + str(obstacle.id)
                                        input_file_type = "." + file_type.split("/")[1]
                                        input_image = input_file_filename + input_file_type

                                        # delete old obstacle photo
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

                                        # create event

                                        data = Event(
                                            user_id=user.id,
                                            segment_id=obstacle.segment.id,
                                            event_date=datetime.datetime.now(),
                                            event_type_id=event_type_id,
                                            obstacle_id=obstacle.id,
                                            photo_response_url=obstacle_uploads_path + "/" + input_image,
                                        )

                                        DBSession.add(data)
                                        DBSession.flush()

                                        response = service_informations.build_response(
                                            exception.HTTPCreated,
                                            EventSchema().dump(data),
                                        )

                                    else:
                                        response = service_informations.build_response(
                                            exception.HTTPBadRequest,
                                            None,
                                            error_messages.UPLOAD_IMAGE_FILE_SIZE_IS_TOO_BIG,
                                        )

                                else:
                                    response = service_informations.build_response(
                                        exception.HTTPUnsupportedMediaType,
                                        None,
                                        error_messages.UPLOAD_IMAGE_TYPE_NOT_SUPPORTED,
                                    )

                            else:
                                response = service_informations.build_response(
                                    exception.HTTPBadRequest, None, error_messages.UPLOAD_IMAGE_NOT_FOUND
                                )

                        else:
                            response = service_informations.build_response(
                                exception.HTTPForbidden, None, error_messages.OBSTACLE_PHOTO_ALREADY_SEND
                            )

                except ValidationError as validation_error:
                    response = service_informations.build_response(
                        exception.HTTPBadRequest, None, str(validation_error)
                    )

                except ValueError as value_error:
                    response = service_informations.build_response(exception.HTTPBadRequest, None, str(value_error))

                except PermissionError as pe:
                    response = service_informations.build_response(exception.HTTPUnauthorized)

                except Exception as e:
                    response = service_informations.build_response(exception.HTTPInternalServerError)
                    logging.getLogger(__name__).warn("Returning: %s", str(e))

            else:
                response = service_informations.build_response(
                    exception.HTTPNotFound(),
                    None,
                    event_rules,
                )

        else:
            response = service_informations.build_response(
                exception.HTTPNotFound(),
            )

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
