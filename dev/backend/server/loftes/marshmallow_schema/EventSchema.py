from marshmallow import (
    Schema,
    fields,
    pre_dump
)

from loftes.marshmallow_schema.UserSchema import UserSchema

class EventSchema(Schema):
    # id_user_info = fields.Nested(lambda: UserSchema())
    # id_challenge = fields.Nested(lambda: ParcoursSchema())
    # id_segment = fields.Nested(lambda: SegmentSchema())
    id_user_info = fields.Int()
    id_challenge = fields.Int()
    id_segment = fields.Int()
    event_type = fields.Int()
    move_type = fields.Int()
    event_date = fields.DateTime()
    footstep = fields.Int()
    distance = fields.Int()
