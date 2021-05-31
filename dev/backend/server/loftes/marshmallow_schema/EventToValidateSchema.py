from loftes.models import Event

from marshmallow import Schema, fields
#, pre_dump, post_load, pre_load, validate

# from loftes.marshmallow_schema.EventTypeSchema import EventTypeSchema

# import datetime, time
import json


class EventToValidateSchema(Schema):
    challenge_id = fields.Int()
    challenge_name = fields.Str()
    event_id = fields.Int()
    label = fields.Str()
    description = fields.Str()
    response = fields.Str()
    
    class Meta:
        ordered = True