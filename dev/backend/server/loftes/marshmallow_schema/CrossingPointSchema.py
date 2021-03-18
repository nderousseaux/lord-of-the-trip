from marshmallow import (
    Schema,
    fields,
    pre_dump
)

# from loftes.marshmallow_schema.ParcoursSchema import ParcoursSchema
# from loftes.marshmallow_schema.SegmentSchema import SegmentSchema

class CrossingPointSchema(Schema):
    id_crossing_point = fields.Int()
    name_crossing = fields.Str()
    x_position = fields.Int()
    y_position = fields.Int()
    # segment_info = fields.Nested(lambda: SegmentSchema(exclude=["start_crossing_point,end_crossing_point"]))
    # parcours_info = fields.Nested(lambda: ParcoursSchema(exclude=["start_crossing_point,end_crossing_point"]))
