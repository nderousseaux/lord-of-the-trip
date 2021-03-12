from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class CrossingPointSchema(Schema):
    id_crossing_point = fields.Int()
    name_crossing = fields.Str()
    x_position = fields.Int()
    y_position = fields.Int()
    parcours_info = fields.Nested(lambda: ParcoursSchema(exclude=["startCrossingPoint,endCrossingPoint"]))
