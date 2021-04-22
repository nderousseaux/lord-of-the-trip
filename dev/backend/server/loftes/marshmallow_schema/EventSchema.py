from loftes.models import Event

from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate

from loftes.marshmallow_schema.EventTypeSchema import EventTypeSchema

import datetime, time
import json


class EventSchema(Schema):
    id = fields.Int()
    user_id = fields.Int(load_only=True)
    segment_id = fields.Int(load_only=True)
    duration = fields.Int()
    move_type = fields.Int()
    event_type_id = fields.Int(        
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    event_type_info = fields.Nested(EventTypeSchema)
    event_date = fields.Int()       
    distance = fields.Int()
    footstep = fields.Int()
    obstacle_id = fields.Int()
    response = fields.Str()

    class Meta:
        ordered = True

    @post_load
    def make_event(self, data, **kwargs):
        return Event(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):
        
        if "obstacle_id" in data:
            if data["obstacle_id"] == None:
                raise ValueError("the obstacle not be null.")

            if "response" not in data: 
                raise ValueError("You must specified a response for the obstacle.")
            
            if data["response"] == None:  
                raise ValueError("You must specified a response for the obstacle.")

        return data