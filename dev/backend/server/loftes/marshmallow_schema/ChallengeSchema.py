from loftes.models import Challenge
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load,
    pre_load
)

from loftes.marshmallow_schema.ParcoursSchema import ParcoursSchema
import datetime

class ChallengeSchema(Schema):
    id_challenge = fields.Int()
    name_challenge = fields.Str()
    description_challenge = fields.Str()
    end_date = fields.DateTime()
    alone_only = fields.Int()
    url_map = fields.Str()
    level = fields.Str()
    scalling = fields.Int()
    id_admin = fields.Int()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    list_segment = fields.List(fields.Nested(lambda: SegmentSchema()))
    
    @post_load
    def make_challenge(self, data, **kwargs):
        return Challenge(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):
        data['end_date'] = datetime.datetime.fromisoformat(data['end_date']).isoformat()

        return data
