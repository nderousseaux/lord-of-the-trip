from loftes.models import Challenge
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_load
)

from loftes.marshmallow_schema.ParcoursSchema import ParcoursSchema

class ChallengeSchema(Schema):
    id_challenge = fields.Int()
    name_challenge = fields.Str()
    description_challenge = fields.Str()
    end_date = fields.DateTime()
    alone_only = fields.Int()
    parcours_info = fields.Nested(lambda: ParcoursSchema())

    @post_load
    def make_challenge(self, data, **kwargs):
        return Challenge(**data)
