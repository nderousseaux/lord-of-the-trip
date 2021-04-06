from loftes.models import Events

from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_dump,
    post_load,
    pre_load
)

import datetime, time
import json

class EventSchema(Schema):
    id = fields.Int()
    user_id = fields.Int(load_only=True)
    challenge_id = fields.Int(load_only=True)
    segment_id = fields.Int(load_only=True)
    duration = fields.Int()
    move_type = fields.Int()
    event_date = fields.DateTime()   
    distance = fields.Int()
    
    # id_user_info = fields.Nested(lambda: UserSchema())
    # id_challenge = fields.Nested(lambda: ParcoursSchema())
    # id_segment = fields.Nested(lambda: SegmentSchema())
    # event_type = fields.Int()
    #footstep = fields.Int()

    # class Meta:
    #     ordered = True
    
    @post_load
    def make_crossing_point(self, data, **kwargs):
        return Events(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if "event_date" in data:
            data["event_date"] = datetime.datetime.fromisoformat(
                data["event_date"]
            ).isoformat()

        return data