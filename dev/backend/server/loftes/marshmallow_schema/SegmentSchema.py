from loftes.models import Segment
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load,
    pre_load
)

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
from loftes.marshmallow_schema.ObstacleSchema import ObstacleSchema

class SegmentSchema(Schema):
    id_segment = fields.Int()
    name_segment = fields.Str()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    challenge_id = fields.Int()
    list_points  = fields.Str()
    list_obstacle = fields.List(fields.Nested(lambda: ObstacleSchema()))

    @post_load
    def make_segment(self, data, **kwargs):
        return Segment(**data)
