from marshmallow import (
    Schema,
    fields,
    pre_dump
)

from loftes.marshmallow_schema.UserSchema import UserSchema
# from loftes.marshmallow_schema.ParcoursSchema import ParcoursSchema

class UserSubscribeAddSchema(Schema):
    id_user_sub = fields.Int()
    id_challenge_sub = fields.Int()
    subscribe_date = fields.DateTime()
