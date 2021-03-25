from loftes.models import Segment

from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load,
    pre_load
)

class SegmentSchemaAdd(Schema):
    name_segment = fields.Str()
    start_crossing_point = fields.Int()
    end_crossing_point = fields.Int()
    challenge_id = fields.Int()
    list_points  = fields.Str()

    @post_load
    def make_segment(self, data, **kwargs):
        return Segment(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):
        data['start_crossing_point'] = int(data['start_crossing_point'])
        data['end_crossing_point'] = int(data['end_crossing_point'])
        data['challenge_id'] = int(data['challenge_id'])
        #data['list_points']  = str((data['list_points']))
        
        
  
        return data