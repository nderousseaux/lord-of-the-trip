from loftes.models import Segment, Challenge, CrossingPoint, DBSession
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load,
    pre_load
)

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
from loftes.marshmallow_schema.ObstacleSchema import ObstacleSchema

class SegmentSchema(Schema):
    id = fields.Int()
    name_segment = fields.Str()
    start_crossing_point_id = fields.Int()
    end_crossing_point_id = fields.Int()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    challenge_id = fields.Int()
    list_points  = fields.Str()
    list_obstacle = fields.List(fields.Nested(lambda: ObstacleSchema()))

    @post_load
    def make_segment(self, data, **kwargs):
        return Segment(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        # Check if name already exits
        segment = DBSession().query(Segment).filter_by(name_segment=data['name_segment']).first()
        if segment is not None:
            raise ValueError("The given value '"+data['name_segment']+"' is already used as a segment name.")
        
        #Check mandatory field challenge
        if "challenge_id" not in data :
            raise ValueError("The segment must be link to a challenge.")

        # Check if challenge exist
        challenge = DBSession().query(Challenge).get(int(data['challenge_id']))
        if challenge == None:
            raise ValueError("The challenge id '"+data['challenge_id']+"' doesn't exits.")

        data['challenge_id'] = int(data['challenge_id'])

        if "start_crossing_point_id" in data : 
            # Check if crossing point exist
            startcrossingpoint = DBSession().query(CrossingPoint).get(int(data['start_crossing_point_id']))
            if startcrossingpoint == None:
                raise ValueError("The start crossing point id '"+data['start_crossing_point_id']+"' doesn't exits.")
            data['start_crossing_point_id'] = int(data['start_crossing_point_id'])
        
        if "end_crossing_point_id" in data :

            # Check if crossing point exist
            endcrossingpoint = DBSession().query(CrossingPoint).get(int(data['end_crossing_point_id']))
            if endcrossingpoint == None:
                raise ValueError("The end crossing point id '"+data['end_crossing_point_id']+"' doesn't exits.")
            data['end_crossing_point_id'] = int(data['end_crossing_point_id'])

        if ("end_crossing_point_id" in data) and ("start_crossing_point_id" in data) : 
            if data['start_crossing_point_id'] == data['end_crossing_point_id'] :
                raise ValueError("The start and end crossing point id must be different.")


        #data['list_points']  = str((data['list_points']))
        
        return data
