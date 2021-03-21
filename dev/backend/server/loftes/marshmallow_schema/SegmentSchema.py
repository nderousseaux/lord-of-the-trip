from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load
)

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
# from loftes.marshmallow_schema.ParcoursSchema import ParcoursSchema
from loftes.marshmallow_schema.ObstacleSchema import ObstacleSchema

class SegmentSchema(Schema):
    id_segment = fields.Int()
    name_segment = fields.Str()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    list_points  = fields.Str()
    list_obstacle = fields.Nested(lambda: ObstacleSchema())
