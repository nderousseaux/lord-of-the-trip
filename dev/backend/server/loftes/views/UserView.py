from loftes.cors import cors_policy

from cornice import Service

from loftes.models import User, Challenge, UserChallenge, DBSession

from loftes.marshmallow_schema import UserSchema
from loftes.services.ServiceInformations import ServiceInformations
from loftes.resources.UserResources import UserResources
from loftes.resources.EventResources import EventResources
from loftes.resources.ChallengeResources import ChallengeResources
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema

import loftes.error_messages as error_messages

from marshmallow import ValidationError

import logging
import datetime

import pyramid.httpexceptions as exception

challenge_subscribers = Service(
    name="challenge_subscribers",
    path="challenges/{id:\d+}/subscribers",
    cors_policy=cors_policy,
)

"""
@api {get} /challenges/:id/subscribers Request all subscribers of a challenge
@apiVersion 0.3.0
@apiName GetSubscribers
@apiGroup User
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (OK 200) {Array} Subscribers All users subscribed
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "subscribers": [
    {
      "first_name": "Bilbo",
      "last_name": "Baggins",
      "pseudo": "ring_bearer",
      "email": "littlehobbit@yahoo.com",
      "is_admin": false
    },
    {
      "first_name": "Daenerys",
      "last_name": "Targaryen",
      "pseudo": "motherOfDragons",
      "email": "d.targaryen@gmail.com",
      "is_admin": true
    }
  ]
}

@apiSuccessExample {json} Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} PermissionDenied User is not challenge's admin
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to view this resource using the credentials that you supplied."
  }
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


@challenge_subscribers.get()
def get_all_subscribers(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            # check if user is challenge's admin
            if user.id == challenge.admin_id:

                subscribers = UserResources().find_all_subscribers_by_challenge(challenge)

                if len(subscribers) > 0:

                    data = {"subscribers": UserSchema(many=True).dump(subscribers)}

                    response = service_informations.build_response(exception.HTTPOk, data)
                else:
                    response = service_informations.build_response(exception.HTTPNoContent())

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden, None, error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION
                )
        else:
            response = service_informations.build_response(exception.HTTPNotFound())

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response

"""
@api {get} /challenges/:id/admin Request admin informations for a challenge_id
@apiVersion 0.3.0
@apiName GetChallengeAdmin
@apiGroup User
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiSuccess (OK 200) {Object} User Challenge's admin
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

    {
        "first_name": "Bilbo",
        "last_name": "Baggins",
        "pseudo": "ring_bearer",
        "email": "littlehobbit@yahoo.com",
        "is_admin": false
    }

@apiSuccessExample {json} Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} PermissionDenied User is not challenge's admin
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to view this resource using the credentials that you supplied."
  }
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
admin_challenge = Service(name="admin_challenge", path="/challenges/{id:\d+}/admin", cors_policy=cors_policy)


@admin_challenge.get()
def get_challenge_admin(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            admin = DBSession.query(User).get(challenge.admin_id)

            if admin != None:
                response = service_informations.build_response(exception.HTTPOk, UserSchema().dump(admin))
            else:
                response = service_informations.build_response(exception.HTTPNoContent())

        else:
            response = service_informations.build_response(exception.HTTPNotFound())

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response

"""
@api {get} /user/challenges/:id/statistics Request statistics for challenge id where user is subsribed to.
@apiVersion 0.3.0
@apiName StatisticsChallengeId
@apiGroup Statistic
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiParam {Bool} [date] Date

@apiSuccess (OK 200) {Object} Statistic Challenge's statistics
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "statistics": {
    "distance": 6162,
    "time": 371582.691999,
    "average_move_type": 1,
    "results": {
      "1": {
        "distance": 6162,
        "time": 1246612
      }
    },
    "subscribe_date": "18/06/2021",
    "date_finished_challenge": null
  }
}

@apiSuccessExample {json} Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} PermissionDenied User is not challenge's admin
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to view this resource using the credentials that you supplied."
  }
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
challenge_statistics = Service(
    name="challenge_statistics",
    path="/user/challenges/{id:\d+}/statistics",
    cors_policy=cors_policy,
)


@challenge_statistics.get()
def get_statistics_for_challenge_by_id(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenge = DBSession.query(Challenge).get(request.matchdict["id"])

        # check if challenge is found
        if challenge != None:

            subscribers = UserResources().find_all_subscribers_by_challenge(challenge)

            user_is_subscribed = False
            for subscriber in subscribers:
                # user is subscribed
                if subscriber.id == user.id:
                    user_is_subscribed = True

            if user_is_subscribed:

                param_date = None

                if request.query_string != "":
                    splitter = request.query_string.split("=")
                    if len(splitter) == 2 and splitter[0] == "date":
                        response = service_informations.format_date(splitter[1])
                        if isinstance(response, datetime.datetime):
                            param_date = response
                        else:
                            return service_informations.build_response(exception.HTTPBadRequest, None, response)
                    else:
                        return service_informations.build_response(
                            exception.HTTPBadRequest, None, error_messages.unknown_field(splitter[0])
                        )

                distance = EventResources().sum_events_distance_by_challenge(user.id, challenge.id, param_date)
                time = EventResources().sum_events_time_by_challenge(user.id, challenge.id, param_date)
                average_move_type = EventResources().avg_events_move_type_by_challenge(
                    user.id, challenge.id, param_date
                )

                distance_and_time_by_challenge = EventResources().sum_events_distance_and_time_by_move_type(
                    user.id, challenge.id, param_date
                )
                subscribe_date = (
                    DBSession.query(UserChallenge)
                    .filter(
                        UserChallenge.unsubscribe_date == None,
                        UserChallenge.challenge_id == challenge.id,
                        UserChallenge.user_id == user.id,
                    )
                    .first()
                    .subscribe_date
                )

                date_finished_challenge = EventResources().find_arrival_date_for_user_by_challenge(
                    user.id, challenge.id
                )

                data = {
                    "distance": distance,
                    "time": time,
                    "average_move_type": average_move_type,
                    "results": distance_and_time_by_challenge,
                    "subscribe_date": subscribe_date.strftime("%d/%m/%Y"),
                    "date_finished_challenge": date_finished_challenge,
                }

                response = service_informations.build_response(exception.HTTPOk(), {"statistics": data})
            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden, None, error_messages.REQUEST_RESSOURCE_WITHOUT_PERMISSION
                )

        else:
            response = service_informations.build_response(exception.HTTPNotFound())

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response

"""
@api {get} /user/challenges/statistics Request statistics for all challenges where user is subsribed to.
@apiVersion 0.3.0
@apiName StatisticsChallenges
@apiGroup Statistic
@apiSampleRequest off
@apiHeader {String} Bearer-Token User's login token.
@apiPermission admin

@apiParam {Bool} [date] Date

@apiSuccess (OK 200) {Object} Statistic All Challenge's statistics
@apiSuccessExample {json} Success response:
HTTP/1.1 200 OK

{
  "statistics": {
    "distance": 7211,
    "time": 1119480.90958,
    "average_move_type": 1
  }
}

@apiSuccessExample {json} Success response:
HTTP/1.1 204 No Content

@apiError (Error 401) {Object} Unauthorized Bad credentials.
@apiErrorExample {json} Error 401 response:
HTTP/1.1 401 Unauthorized

{
  "error": {
    "status": "UNAUTHORIZED",
    "message": "Bad credentials."
  }
}

@apiError (Error 403) {Object} PermissionDenied User is not challenge's admin
@apiErrorExample {json} Error 403 response:
HTTP/1.1 403 Forbidden

{
  "error": {
    "status": "FORBIDDEN",
    "message": "You do not have permission to view this resource using the credentials that you supplied."
  }
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
challenges_statistics = Service(
    name="challenges_statistics",
    path="/user/challenges/statistics",
    cors_policy=cors_policy,
)


@challenges_statistics.get()
def get_statistics_for_challenge_by_id(request):

    service_informations = ServiceInformations()

    user = DBSession.query(User).filter(User.email == request.authenticated_userid).first()

    # check if user is authenticated
    if user != None:

        challenges = ChallengeResources().find_all_subscribed_challenges_by_user(user.id)

        param_date = None

        if request.query_string != "":
            splitter = request.query_string.split("=")
            if len(splitter) == 2 and splitter[0] == "date":
                response = service_informations.format_date(splitter[1])
                if isinstance(response, datetime.datetime):
                    param_date = response
                else:
                    return service_informations.build_response(exception.HTTPBadRequest, None, response)
            else:
                return service_informations.build_response(
                    exception.HTTPBadRequest, None, error_messages.unknown_field(splitter[0])
                )

        distance = 0
        time = 0
        move_types = []

        challenges_ids = []
        for challenge in challenges:
            distance = distance + EventResources().sum_events_distance_by_challenge(user.id, challenge.id, param_date)
            time = time + EventResources().sum_events_time_by_challenge(user.id, challenge.id, param_date)
            challenges_ids.append(challenge.id)

        average_move_type = EventResources().avg_events_move_type_by_challenges_subscribed(
            user.id, challenges_ids, param_date
        )

        data = {"distance": distance, "time": time, "average_move_type": average_move_type}

        response = service_informations.build_response(exception.HTTPOk(), {"statistics": data})

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
