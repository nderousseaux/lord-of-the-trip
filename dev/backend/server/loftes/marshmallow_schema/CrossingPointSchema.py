from loftes.models import CrossingPoint, Challenge, DBSession
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
    challenge_id = fields.Int()
    x_position = fields.Float()
    y_position = fields.Float()
    # rajouter le challenge ?

    @post_load
    def make_crossingpoint(self, data, **kwargs):
        return CrossingPoint(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if 'name_crossing' in data :
            croissingpointdata = DBSession().query(CrossingPoint).filter_by(name_crossing=data['name_crossing']).first()
            if croissingpointdata is not None:
                raise ValueError("The given value '"+data['name_crossing']+"' is already used as a croissing point name.")

        if 'challenge_id' in data :
            # Check if challenge exist
            challenge = DBSession().query(Challenge).get(int(data['challenge_id']))
            if challenge == None:
                raise ValueError("The challenge '"+data['challenge_id']+"' doesn't exits.")
        
        # Check mandatory field
        if 'y_position' in data :
            data['y_position'] = float(data['y_position'])

        # Check mandatory field
        if 'x_position' in data :
            data['x_position'] = float(data['x_position'])
  
        return data

    def check_json_create(self, data, **kwargs):
        
        # Check mandatory fields 

        # Name
        if 'name_crossing' not in data :
            raise ValueError("The crossing name is mandatory.")

        # challenge
        if 'challenge_id' not in data :
            raise ValueError("The crossing point must be link to a challenge.")

        # Position
        if 'x_position' not in data :
            raise ValueError("The y_position is mandatory for a crossing point.")

        if 'y_position' not in data :
            raise ValueError("The y_position is mandatory for a crossing point.")

        #return self.pre_load(data, True)

    def check_json(self, data, **kwargs):
        return self.pre_load(data, True)