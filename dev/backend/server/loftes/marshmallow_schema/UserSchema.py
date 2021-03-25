from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class UserSchema(Schema):
    id = fields.Int()
    first_name = fields.Str()
    last_name = fields.Str()
    pseudo = fields.Str()
    mail = fields.Str()
    password = fields.Str(load_only=True) # permet de ne pas afficher le mot de passe
    managed_challenges = fields.List(fields.Nested(lambda: ChallengeSchema()))

    class Meta:
        ordered = True
