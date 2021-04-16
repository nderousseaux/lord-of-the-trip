from marshmallow import (
    Schema,
    fields,
    pre_dump,
    validate
)

from loftes.marshmallow_schema.SegmentSchema import SegmentSchema

class ObstacleSchema(Schema):
    id_obstacle = fields.Int()
    libelle = fields.Str(required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    progress = fields.Float(
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    description = fields.Str()
    type_question = fields.Int(
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    nb_point = fields.Int()
    result = fields.Str()
    nb_point = fields.Int()
    result = fields.Str()
    segment_id = fields.Int()
    segment_info = fields.Nested(lambda: SegmentSchema())