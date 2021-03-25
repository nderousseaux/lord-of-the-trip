from marshmallow import (
    Schema,
    fields,
    pre_dump
)

from loftes.marshmallow_schema.QuestionSchema import QuestionSchema

class ObstacleSchema(Schema):
    id_obstacle = fields.Int()
    name_obstacle = fields.Str()
    x_position = fields.Int()
    y_position = fields.Int()
    description_obstacle = fields.Str()
    question_id = fields.Nested(lambda: QuestionSchema())
