from loftes.models import CrossingPoint
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load,
    pre_load
)

class CrossingPointSchema(Schema):
    id_crossing_point = fields.Int()
    name_crossing = fields.Str()
    x_position = fields.Float()
    y_position = fields.Float()
    

    @post_load
    def make_crossingpoint(self, data, **kwargs):
        return CrossingPoint(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):
        data['y_position'] = float(data['y_position'])
        data['x_position'] = float(data['x_position'])
  
        return data