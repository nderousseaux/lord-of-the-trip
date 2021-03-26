from loftes.models import CrossingPoint, DBSession
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load,
    pre_load
)

# from loftes.marshmallow_schema.SegmentSchema import SegmentSchema

class CrossingPointSchema(Schema):
    id = fields.Int()
    name_crossing = fields.Str()
    x_position = fields.Float()
    y_position = fields.Float()
    # rajouter le challenge ?

    @post_load
    def make_crossingpoint(self, data, **kwargs):
        return CrossingPoint(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        croissingpointdata = DBSession().query(CrossingPoint).filter_by(name_crossing=data['name_crossing']).first()
        if croissingpointdata is not None:
            raise ValueError("The given value '"+data['name_crossing']+"' is already used as a croissing point name.")

        data['y_position'] = float(data['y_position'])
        data['x_position'] = float(data['x_position'])
  
        return data
