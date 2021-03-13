from marshmallow import (
    Schema,
    fields,
    pre_dump
)

from loftes.marshmallow_schema.ParcoursSchema import ParcoursSchema

class CrossingPointSchema(Schema):
    id_crossing_point = fields.Int()
    name_crossing = fields.Str()
    x_position = fields.Int()
    y_position = fields.Int()
    parcours_info = fields.Nested(lambda: ParcoursSchema(exclude=["start_crossing_point,end_crossing_point"]))
