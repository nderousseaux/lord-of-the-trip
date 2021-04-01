from loftes.models import Segment, Challenge, CrossingPoint, DBSession
from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema


class SegmentSchema(Schema):
    id = fields.Int()

    name = fields.Str(
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "null": "Field must not be null.",
        },
    )

    start_crossing_point_id = fields.Int(
        load_only=True,
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    start_crossing_point = fields.Nested(CrossingPointSchema)
    end_crossing_point_id = fields.Int(
        load_only=True,
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    end_crossing_point = fields.Nested(CrossingPointSchema)
    challenge_id = fields.Int(load_only=True)
    challenge = fields.Nested("ChallengeSchema", exclude=("segments",))
    list_points = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    # obstacles = fields.List(ObstacleSchema)

    class Meta:
        ordered = True

    @post_load
    def make_segment(self, data, **kwargs):
        return Segment(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if "start_crossing_point_id" in data:
            # Check if crossing point exist
            start_crossing_point = (
                DBSession()
                .query(CrossingPoint)
                .get(int(data["start_crossing_point_id"]))
            )
            if start_crossing_point == None:
                raise ValueError(
                    "The start crossing point id '"
                    + data["start_crossing_point_id"]
                    + "' doesn't exits."
                )
            data["start_crossing_point_id"] = int(data["start_crossing_point_id"])

        if "end_crossing_point_id" in data:
            # Check if crossing point exist
            end_crossing_point = (
                DBSession().query(CrossingPoint).get(int(data["end_crossing_point_id"]))
            )
            if end_crossing_point == None:
                raise ValueError(
                    "The end crossing point id '"
                    + data["end_crossing_point_id"]
                    + "' doesn't exits."
                )
            data["end_crossing_point_id"] = int(data["end_crossing_point_id"])

        if ("end_crossing_point_id" in data) and ("start_crossing_point_id" in data):
            if data["start_crossing_point_id"] == data["end_crossing_point_id"]:
                raise ValueError(
                    "The start and end crossing point ids must be different."
                )

        if "list_points" in data:
            data["list_points"] = str((data["list_points"]))

        return data

    def check_json(self, data, **kwargs):

        # Check mandatory fields

        if "name" in data:
            if data["name"] == None:
                raise ValueError("Field must not be null.")

            if data["name"] == "":
                raise ValueError("Invalid value.")

        if "start_crossing_point_id" in data and "end_crossing_point_id" in data:
            if data["start_crossing_point_id"] == data["end_crossing_point_id"]:
                raise ValueError(
                    "The start and end crossing point ids must be different."
                )

        if "list_points" in data and (
            data["list_points"] == "" or data["list_points"] == None
        ):
            raise ValueError("The segment must have a list of point.")

        return self.pre_load(data, True)
