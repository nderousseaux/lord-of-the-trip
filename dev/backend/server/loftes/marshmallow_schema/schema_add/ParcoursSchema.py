from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class ParcoursAddSchema(Schema):
    name_parcours = fields.Str()
    description = fields.Str()
    url_map = fields.Str()
    level = fields.Str()
    scalling = fields.Int()
    #start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    #end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    #list_segment = fields.List(fields.Nested(lambda: SegmentSchema()))

