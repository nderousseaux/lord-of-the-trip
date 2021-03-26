from loftes.models import Challenge, User, DBSession
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load,
    pre_load,
    ValidationError
)

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
from loftes.marshmallow_schema.SegmentSchema import SegmentSchema
from loftes.marshmallow_schema.UserSchema import UserSchema

import datetime

class ChallengeSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    description = fields.Str()
    end_date = fields.DateTime()
    alone_only = fields.Int()
    map_url = fields.Str()
    level = fields.Str()
    scalling = fields.Int()
    draft = fields.Bool()
    start_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    end_crossing_point = fields.Nested(lambda: CrossingPointSchema())
    segments = fields.List(fields.Nested(lambda: SegmentSchema()))
    admin = fields.Nested(lambda: UserSchema())
    admin_id = fields.Int(load_only=True)

    class Meta:
        ordered = True

    @post_load
    def make_challenge(self, data, **kwargs):
        return Challenge(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        admin = DBSession.query(User).get(1) # solution en ce moment. Il faut penser à trouver lutilisateur authentifie
        if admin != None:
            data['admin_id'] = admin.id
        else:
             raise PermissionError()

        if 'name' in data:
            challenge = DBSession().query(Challenge).filter_by(name=data['name']).first()
            if challenge != None:
                raise ValueError("The given value '"+data['name']+"' is already used as a challenge name.")

        if 'end_date' in data:
            data['end_date'] = datetime.datetime.fromisoformat(data['end_date']).isoformat()

        return data

    def check_json(self, data, **kwargs):
        return self.pre_load(data, True)
