from cornice import Service
from cornice.validators import marshmallow_body_validator

from marshmallow import ValidationError

from sqlalchemy import exc

from loftes.cors import cors_policy
from loftes.models import Segment, Challenge, DBSession
from loftes.services.ServiceInformations import ServiceInformations
from loftes.marshmallow_schema import SegmentSchema

import pyramid.httpexceptions as exception
import logging
import json

segment = Service(
    name="segment",
    path="/challenges/{challenge_id:\d+}/segments",
    cors_policy=cors_policy,
)


@segment.get()
def get_segments(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segments = (
            DBSession.query(Segment).filter(Segment.challenge_id == challenge.id).all()
        )

        if len(segments) == 0:
            return service_informations.build_response(exception.HTTPNotFound())

        data = {"segments": SegmentSchema(many=True).dump(segments)}

        response = service_informations.build_response(exception.HTTPOk, data)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


@segment.post()
def create_segment(request):

    service_informations = ServiceInformations()

    challenge_id = request.matchdict["challenge_id"]
    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        try:

            segment_schema = SegmentSchema()
            segment = segment_schema.load(request.json)
            segment.challenge_id = challenge_id

            DBSession.add(segment)
            DBSession.flush()

            response = service_informations.build_response(
                exception.HTTPOk, segment_schema.dump(segment)
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

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


segment_id = Service(
    name="segment_id",
    path="/challenges/{challenge_id:\d+}/segments/{id:\d+}",
    cors_policy=cors_policy,
)


@segment_id.get()
def get_segment_by_id(request):

    service_informations = ServiceInformations()

    challenge = DBSession.query(Challenge).get(request.matchdict["challenge_id"])

    if challenge != None:

        segment = (
            DBSession.query(Segment)
            .filter(
                Segment.challenge_id == challenge.id,
                Segment.id == request.matchdict["id"],
            )
            .first()
        )

        if segment == None:
            return service_informations.build_response(exception.HTTPNotFound())

        response = service_informations.build_response(
            exception.HTTPOk, SegmentSchema().dump(segment)
        )

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


@segment_id.put()
def update_segment(request):

    service_informations = ServiceInformations()

    challenge_id = request.matchdict["challenge_id"]
    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        id = request.matchdict["id"]

        query = DBSession.query(Segment).filter(
            Segment.challenge_id == challenge.id, Segment.id == id
        )
        segment = query.first()

        if segment != None:

            try:

                query.update(SegmentSchema().check_json(request.json))
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
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


@segment_id.patch()
def modify_segment(request):

    service_informations = ServiceInformations()

    challenge_id = request.matchdict["challenge_id"]
    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        id = request.matchdict["id"]

        query = DBSession.query(Segment).filter(
            Segment.challenge_id == challenge.id, Segment.id == id
        )
        segment = query.first()

        if segment != None:

            try:

                query.update(SegmentSchema().check_json(request.json, segment))
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
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response


@segment_id.delete()
def delete_segment(request):

    service_informations = ServiceInformations()

    challenge_id = request.matchdict["challenge_id"]
    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        id = request.matchdict["id"]

        # Check if the crossing point exist
        segment = (
            DBSession.query(Segment)
            .filter(Segment.challenge_id == challenge.id, Segment.id == id)
            .first()
        )

        if segment != None:

            try:

                DBSession.delete(segment)
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
            response = service_informations.build_response(exception.HTTPNotFound)

    else:
        response = service_informations.build_response(
            exception.HTTPNotFound(),
            None,
            "Requested resource 'Challenge' is not found.",
        )

    return response
