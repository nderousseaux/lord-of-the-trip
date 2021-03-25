from marshmallow import (
    Schema,
    fields,
    pre_dump
)

from loftes.marshmallow_schema.UserSchema import UserSchema
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema

class UserSubscribeSchema(Schema):
    id_subscrbe = fields.Int()
    id_user_info = fields.Nested(lambda: UserSchema())
    id_challenege_info = fields.Nested(lambda: ChallengeSchema())
    subscribe_date = fields.DateTime()
