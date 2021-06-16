# marshmallow_schema
FIELD_MANDATORY = "This field is mandatory."
FIELD_NOT_NULL = "Field must not be null."
FIELD_INVALID = "Invalid value."

# admin
REQUEST_RESSOURCE_WITHOUT_PERMISSION = (
    "You do not have permission to view this resource using the credentials that you supplied."
)
# challenges
MODIFY_PUBLISHED_CHALLENGE = "You do not have permission to modify a published challenge."
DUPLICATE_CHALLENGE_MANDATORY_FIELD = "A mandatory field is missing : start_date or end_date."
CHALLENGE_IS_MISSING = "Challenge is missing."
# challenge subscriptions
SUBSCRIPTION_CHALLENGE_TERMINATED = (
    "You do not have permission to subscribe to a challenge that has already been terminated."
)
SUBSCRIPTION_CHALLENGE_NOT_CREATED = "You do not have permission to subscribe to a unfinished challenge."
SUBSCRIPTION_OWN_CHALLENGE = "You do not have permission to subscribe to a challenge you have created."
SUBSCRIPTION_CHALLENGE_ALREADY_SUBSCRIBED = "You are already subscribed to this challenge."
# challenge unsubscriptions
UNSUBSCRIPTION_CHALLENGE_NOT_SUBSCRIBED = (
    "You do not have permission to unsubscribe from a challenge that you are not subscribed to."
)
# challenge verification
VERIFICATION_CHALLENGE_START_MISSING = "Start crossing point is missing."
VERIFICATION_CHALLENGE_END_MISSING = "End crossing point is missing."
# challenge duplication
DUPLICATION_CHALLENGE_START_AND_END_MISSING = "Challenge's start and end crossing points were missing."
DUPLICATION_SEGMENT_START_AND_END_MISSING = "Segment's start and end crossing points were missing."
DUPLICATION_CHALLENGE_NOT_TERMINATED = (
    "You do not have permission to duplicate a challenge that hasn't been terminated yet."
)
DUPLICATION_CHALLENGE_PERMANENT = "You do not have permission to duplicate a permanent challenge."
DUPLICATION_CHALLENGE_NOT_PUBLISHED = "You do not have permission to duplicate an unpublished challenge."
DUPLICATION_CHALLENGE_NOT_OWNER = "You cannot duplicate a challenge that you did not create."
# challenge publication
PUBLISH_CHALLENGE_START_DATE_HAS_PASSED = (
    "You do not have permission to publish a challenge whose start date has already passed."
)
PUBLISH_CHALLENGE_END_DATE_HAS_PASSED = (
    "You do not have permission to publish a challenge whose end date has already passed."
)
PUBLISH_CHALLENGE_ALREADY_PUBLISHED = (
    "You do not have permission to publish a challenge that has already been published."
)
PUBLISH_CHALLENGE_WITH_NO_LEVEL = "You do not have permission to publish a challenge that has no difficulty level."
PUBLISH_CHALLENGE_WITH_NO_DESCRIPTION = "You do not have permission to publish a challenge that has no description."
PUBLISH_CHALLENGE_WITH_NO_MAP = "You do not have permission to publish a challenge that has no map uploaded."
PUBLISH_CHALLENGE_WITH_NO_SCALLING = "You do not have permission to publish a challenge that has no scalling."
PUBLISH_CHALLENGE_WITH_NO_STEP_LENGTH = "You do not have permission to publish a challenge that has no step length."
REVOKE_CHALLENGE_WITH_SUBSCRIBED_USERS = (
    "You do not have permission to revoke a challenge that has already subscribed users."
)
REVOKE_CHALLENGE_ALREADY_REVOKED = "You do not have permission to revoke a challenge that has already been revoked."
# images
UPLOAD_IMAGE_NOT_FOUND = "File is not found."
UPLOAD_IMAGE_TYPE_NOT_SUPPORTED = "The file's type is not supported on this server."
UPLOAD_IMAGE_FILE_SIZE_IS_TOO_BIG = "The size of image is too big."
# events
EVENT_CHECK_RESPONSE = "You must use the check response."
EVENT_MANAGE_ANSWER = "Field 'validate' is a mandatory field."
# obstacles
OBSTACLE_RESPONSE_NOT_FOUND = "Field progress must not be null."
OBSTACLE_PHOTO_ALREADY_SEND = (
    "You do not have permission to respond on an obstacle where you have already send the answer."
)
OBSTACLE_LABEL_MISSING = "You do not have permission to publish a challenge because there is no label for an obstacle."
OBSTACLE_RESULT_MISSING = "You do not have permission to publish a challenge because there is no result for an obstacle of type question."
OBSTACLE_DESCRIPTION_MISSING = "You do not have permission to publish a challenge because there is no description for an obstacle of type photo."

# general
NOTHING_TO_UPDATE = "Nothing to update."


def unknown_field(field):

    return "Unknown field: '" + field + "'."


def error_format_date(date):

    return "Not a valid date: '{0}'.".format(date)
