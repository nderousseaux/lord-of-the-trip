from marshmallow import (
    Schema,
    fields,
    pre_dump
)

class QuestionSchema(Schema):
    id_question = fields.Int()
    name_question = fields.Str()
    type_question = fields.Str()
    description_question = fields.Str()
    nb_point = fields.Int()
    result = fields.Str()
