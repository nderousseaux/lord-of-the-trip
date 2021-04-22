from loftes.models import Segment, Challenge, CrossingPoint, DBSession
from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate, INCLUDE

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
import json


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
    coordinates = fields.Method("deserialize_coordinates")
    challenge_id = fields.Int(load_only=True)
    challenge = fields.Nested("ChallengeSchema", exclude=("segments",))
    # obstacles = fields.List(ObstacleSchema)

    class Meta:
        ordered = (True,)
        unknown = INCLUDE

    def deserialize_coordinates(self, obj):

        coordinates = json.loads(obj.coordinates) if obj.coordinates != None else []

        return coordinates

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
                raise ValueError("Start crossing point does not exist.")
            data["start_crossing_point_id"] = start_crossing_point.id

        if "end_crossing_point_id" in data:
            # Check if crossing point exist
            end_crossing_point = (
                DBSession().query(CrossingPoint).get(int(data["end_crossing_point_id"]))
            )
            if end_crossing_point == None:
                raise ValueError("End crossing point does not exist.")
            data["end_crossing_point_id"] = int(data["end_crossing_point_id"])

        if "start_crossing_point_id" in data and "end_crossing_point_id" in data:
            if data["start_crossing_point_id"] == data["end_crossing_point_id"]:
                raise ValueError("The start and end crossing points must be different.")

        if "coordinates" in data:
            if data["coordinates"] == None:
                raise ValueError("The segment must have coordinates.")

            if isinstance(data["coordinates"], list):

                has_error_in_array = False

                for coordinate in data["coordinates"]:
                    if "position_x" not in coordinate or "position_y" not in coordinate:
                        has_error_in_array = True
                        break

                if not has_error_in_array:
                    data["coordinates"] = json.dumps(data["coordinates"])
                else:
                    raise ValueError("The coordinates must have x and y positions.")
            else:
                raise ValueError("The segment's coordinates must be of the type array.")

                data["coordinates"] = json.dumps(data["coordinates"])

        return data

    def check_json(self, data, segment, **kwargs):

        # Check mandatory fields
        if "name" in data:
            if data["name"] == None:
                raise ValueError("Field must not be null.")

            if data["name"] == "":
                raise ValueError("Invalid value.")

        if "name" in data:
            if data["name"] == None:
                raise ValueError("Field must not be null.")

            if data["name"] == "":
                raise ValueError("Invalid value.")

        if "start_crossing_point_id" in data and "end_crossing_point_id" in data:
            if data["start_crossing_point_id"] == data["end_crossing_point_id"]:
                raise ValueError("The segment cannot have the same start and end.")

        elif "start_crossing_point_id" in data and "end_crossing_point_id" not in data:
            start_crossing_point = (
                DBSession()
                .query(CrossingPoint)
                .get(int(data["start_crossing_point_id"]))
            )

            if start_crossing_point != None:
                if start_crossing_point.id == segment.end_crossing_point.id:
                    raise ValueError("The segment cannot have the same start and end.")

        elif "end_crossing_point_id" in data and "start_crossing_point_id" not in data:
            end_crossing_point = (
                DBSession().query(CrossingPoint).get(int(data["end_crossing_point_id"]))
            )

            if end_crossing_point != None:
                if end_crossing_point.id == segment.start_crossing_point.id:
                    raise ValueError("The segment cannot have the same start and end.")

        if "coordinates" in data and (data["coordinates"] == None):
            raise ValueError("The segment must have coordinates.")

        return self.pre_load(data, True)
