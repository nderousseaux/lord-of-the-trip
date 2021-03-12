from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class SegmentSchema(Schema):
    id_segment = fields.Int()
    name_segment = fields.Str()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    list_points  = fields.Int()
    parcours_info = fields.Nested(lambda: ParcoursSchema())
    list_obstacle = fields.Nested(lambda: ObstacleSchema())
