from marshmallow import (
    Schema,
    fields,
    pre_dump
)

from loftes.marshmallow_schema.SegmentSchema import SegmentSchema
from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema

class ParcoursSchema(Schema):
    id_parcours = fields.Int()
    name_parcours = fields.Str()
    description = fields.Str()
    url_map = fields.Str()
    level = fields.Str()
    segment_list = fields.List(fields.Nested(lambda: SegmentSchema(exclude=["parcours_info"])))
    scalling = fields.Int()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema(exclude=["parcours_info"]))
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema(exclude=["parcours_info"]))
