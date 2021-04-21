from loftes.models import CrossingPoint, Challenge, DBSession
from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate


class CrossingPointSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    position_x = fields.Float(
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    position_y = fields.Float(
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    challenge_id = fields.Int(load_only=True)

    class Meta:
        ordered = True

    @post_load
    def make_crossing_point(self, data, **kwargs):
        return CrossingPoint(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        # Check mandatory field
        if "position_x" in data:
            data["position_x"] = float(data["position_x"])

        # Check mandatory field
        if "position_y" in data:
            data["position_y"] = float(data["position_y"])

        return data

    def check_json(self, data, **kwargs):

        if "name" in data:
            if data["name"] == None:
                raise ValueError("Field must not be null.")

            if data["name"] == "":
                raise ValueError("Invalid value.")

        return self.pre_load(data, True)
