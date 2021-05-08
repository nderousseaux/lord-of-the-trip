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

@obstacle_all.get()
def get_obstacles_by_challenge(request):

    service_informations = ServiceInformations()
    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        obstacles = ObstacleResources.findAllObstaclesByChallenge(challenge.id)

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


@obstacle.get()
def get_obstacles_by_segment(request):

    service_informations = ServiceInformations()

    challenge_id = request.matchdict["challenge_id"]
    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment)
            .filter(Segment.challenge_id == challenge.id, Segment.id == segment_id)
            .first()
        )

        if segment != None:

            obstacles = ObstacleResources.findAllObstaclesBySegment(
                segment.id, challenge.id
            )

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


@obstacle.post()
def create_obstacle(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment)
            .filter(Segment.challenge_id == challenge.id, Segment.id == segment_id)
            .first()
        )

        if segment != None:

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
                DBSession.close()

            except ValueError as value_error:
                response = service_informations.build_response(
                    exception.HTTPBadRequest, None, str(value_error)
                )
                DBSession.close()

            except Exception as e:
                response = service_informations.build_response(
                    exception.HTTPInternalServerError
                )
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


@obstacle_id.get()
def get_obstacle_by_id(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment)
            .filter(Segment.challenge_id == challenge.id, Segment.id == segment_id)
            .first()
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

            response = service_informations.build_response(
                exception.HTTPOk, ObstacleSchema().dump(obstacle)
            )

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


@obstacle_id.put()
def get_obstacle_update(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment)
            .filter(Segment.challenge_id == challenge.id, Segment.id == segment_id)
            .first()
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

                    response = service_informations.build_response(
                        exception.HTTPNoContent
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
                    response = service_informations.build_response(
                        exception.HTTPUnauthorized
                    )
                    DBSession.close()

                except Exception as e:
                    response = service_informations.build_response(
                        exception.HTTPInternalServerError
                    )
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


@obstacle_id.patch()
def get_obstacle_modify(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment)
            .filter(Segment.challenge_id == challenge.id, Segment.id == segment_id)
            .first()
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

                    response = service_informations.build_response(
                        exception.HTTPNoContent
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
                    response = service_informations.build_response(
                        exception.HTTPUnauthorized
                    )
                    DBSession.close()

                except Exception as e:
                    response = service_informations.build_response(
                        exception.HTTPInternalServerError
                    )
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


@obstacle_id.delete()
def delete_obstacle(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment_id = request.matchdict["segment_id"]

        segment = (
            DBSession.query(Segment)
            .filter(Segment.challenge_id == challenge.id, Segment.id == segment_id)
            .first()
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

                    response = service_informations.build_response(
                        exception.HTTPNoContent
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
                    response = service_informations.build_response(
                        exception.HTTPUnauthorized
                    )
                    DBSession.close()

                except Exception as e:
                    response = service_informations.build_response(
                        exception.HTTPInternalServerError
                    )
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
