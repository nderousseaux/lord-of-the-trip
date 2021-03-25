from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class UserSchema(Schema):
    id_user = fields.Int()
    first_name = fields.Str()
    last_name = fields.Str()
    pseudo = fields.Str()
    mail = fields.Str()


