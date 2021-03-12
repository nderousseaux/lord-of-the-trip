from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class ChallengeSchema(Schema):
    id_challenge = fields.Int()
    name_challenge = fields.Str()
    description_challenge = fields.Str()
    end_date = fields.DateTime()
    alone_only = fields.Int()
    parcours_info = fields.Nested(lambda: ParcoursSchema())
