from loftes.models import Challenge, User, DBSession

from marshmallow import (
    Schema,
    fields,
    pre_dump,
    pre_load,
    post_load
)

import datetime

from loftes.marshmallow_schema.UserSchema import UserSchema
from loftes.marshmallow_schema.ChallengeSchema import ChallengeSchema

class UserSubscribeSchema(Schema):
    id_subscribe = fields.Int()
    id_user_info = fields.Nested(lambda: UserSchema())
    id_challenege_info = fields.Nested(lambda: ChallengeSchema())
    subscribe_date = fields.DateTime()
    
    @post_load
    def make_challenge(self, data, **kwargs):
        return Challenge(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if 'user_id' not in data:
            raise ValueError("You must have a user id for subscription.")

        user = DBSession.query(User).get(int(data['user_id']))
        if user == None:
            raise ValueError("No user with the id '"+data['user_id']+"'")


        if 'challenge_id' not in data:
            raise ValueError("You must have a challenge id for subscription.")

        challenge = DBSession.query(Challenge).get(int(data['challenge_id']))
        if challenge == None:
            raise ValueError("No challenge with the id '"+data['challenge_id']+"'.")

        if 'subscribe_date' in data:
            data['subscribe_date'] = datetime.datetime.fromisoformat(data['end_date']).isoformat()

        return data