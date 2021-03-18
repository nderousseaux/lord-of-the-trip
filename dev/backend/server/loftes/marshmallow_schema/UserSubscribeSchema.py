from marshmallow import (
    Schema,
    fields,
    pre_dump
)

from loftes.marshmallow_schema.UserSchema import UserSchema
from loftes.marshmallow_schema.ParcoursSchema import ParcoursSchema

class UserSubscribeSchema(Schema):
    id_subscrbe = fields.Int()
    id_user_info = fields.Nested(lambda: UserSchema())
    id_parcours_info = fields.Nested(lambda: ParcoursSchema())
    subscribe_date = fields.DateTime()
