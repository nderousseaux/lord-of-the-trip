from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class ParcoursSchema(Schema):
    id_parcours = fields.Int()
    name_parcours = fields.Str()
    description = fields.Str()
    url_map = fields.Str()
    level = fields.Str()
    segment_list = fields.List(fields.Nested(lambda: SegmentSchema(exclude=["parcoursInfo"])))
    scalling = fields.Int()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema(exclude=["parcoursInfo"]))
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema(exclude=["parcoursInfo"]))
