from loftes.cors import cors_policy

from cornice import Service

from loftes.models import User, Challenge, DBSession

from loftes.marshmallow_schema import UserSchema
from loftes.services.ServiceInformations import ServiceInformations
from loftes.resources.UserResources import UserResources
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema

import pyramid.httpexceptions as exception

challenge_subscribers= Service(
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

            # check if user is challenge's admin or challenge is published
            if user.id == challenge.admin_id:

                subscribers = UserResources().find_all_subscribers_by_challenge(challenge)

                if len(subscribers) > 0:

                    data = {"subscribers": UserSchema(many=True).dump(subscribers)}

                    response = service_informations.build_response(exception.HTTPOk, data)
                else:
                    response = service_informations.build_response(exception.HTTPNotFound())

            else:
                response = service_informations.build_response(
                    exception.HTTPForbidden,
                    None,
                    "You do not have permission to view this resource using the credentials that you supplied.",
                )
        else:
            response = service_informations.build_response(exception.HTTPNotFound())

    else:
        response = service_informations.build_response(exception.HTTPUnauthorized)

    return response
