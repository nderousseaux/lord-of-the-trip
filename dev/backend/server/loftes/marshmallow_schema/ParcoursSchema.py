from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load
)

from loftes.models import Parcours
from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
from loftes.marshmallow_schema.SegmentSchema import SegmentSchema

class ParcoursSchema(Schema):
    id_parcours = fields.Int()
    name_parcours = fields.Str()
    description = fields.Str()
    url_map = fields.Str()
    level = fields.Str()
    scalling = fields.Int()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    list_segment = fields.List(fields.Nested(lambda: SegmentSchema()))

    @post_load
    def make_parcours(self, data, **kwargs):
        return Parcours(**data)