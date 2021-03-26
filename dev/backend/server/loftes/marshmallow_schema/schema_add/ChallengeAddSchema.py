from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class ChallengeAddSchema(Schema):
    name_challenge = fields.Str()
    description_challenge = fields.Str()
    end_date = fields.DateTime()
    alone_only = fields.Int()
