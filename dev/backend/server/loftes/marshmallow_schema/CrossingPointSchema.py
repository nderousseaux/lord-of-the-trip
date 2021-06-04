from loftes.models import CrossingPoint, Challenge, Segment, DBSession
from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate


class CrossingPointSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
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

            challenge_id = kwargs.get("challenge_id", None)

            if challenge_id != None:
                crossing_point = (
                    DBSession()
                    .query(CrossingPoint)
                    .filter(CrossingPoint.name == data["name"], CrossingPoint.challenge_id == challenge_id)
                    .first()
                )

                if crossing_point != None:
                    raise ValueError(
                        "The given value '"
                        + data["name"]
                        + "' is already used as a crossing point name for this challenge."
                    )

        return self.pre_load(data, True)
