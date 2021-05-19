from loftes.models import Event

from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate

from loftes.marshmallow_schema.EventTypeSchema import EventTypeSchema

import datetime, time
import json


class EventDistanceSchema(Schema):
    distance = fields.Int()
