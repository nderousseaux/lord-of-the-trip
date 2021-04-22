
from loftes.models import Obstacle

from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate
from loftes.marshmallow_schema.SegmentSchema import SegmentSchema

import json

class ObstacleSchema(Schema):
    id = fields.Int()
    segment_id = fields.Int(load_only=True)
    libelle = fields.Str(required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    progress = fields.Float(
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    description = fields.Str()
    type_question = fields.Int(
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    nb_point = fields.Int()
    result = fields.Str()    
    # segment_info = fields.Nested(lambda: SegmentSchema())

    class Meta:
        ordered = True

    @post_load
    def make_obstacle(self, data, **kwargs):
        return Obstacle(**data)

    # @pre_load
    # def pre_load(self, data, many, **kwargs):
    #     return data

    def check_json(self, data, **kwargs):

        if "libelle" in data:
            if data["libelle"] == None:
                raise ValueError("Field libelle must not be null.")
        
        if "progress" in data:
            if data["progress"] == None:
                raise ValueError("Field progress must not be null.")
        
        if "type_question" in data:
            if data["type_question"] == None:
                raise ValueError("Field type question must not be null.")
        
        return data
        #return self.pre_load(data, True)