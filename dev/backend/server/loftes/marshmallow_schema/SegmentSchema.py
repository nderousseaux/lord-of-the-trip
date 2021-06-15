from loftes.models import Segment, Challenge, CrossingPoint, DBSession
from marshmallow import Schema, fields, pre_dump, post_dump, post_load, pre_load, validate, INCLUDE

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema

from loftes.resources import SegmentManager
import loftes.error_messages as error_messages
import json


class SegmentSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    start_crossing_point_id = fields.Int(
        load_only=True,
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": error_messages.FIELD_MANDATORY,
            "null": error_messages.FIELD_NOT_NULL,
        },
    )
    start_crossing_point = fields.Nested(CrossingPointSchema)
    end_crossing_point_id = fields.Int(
        load_only=True,
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": error_messages.FIELD_MANDATORY,
            "null": error_messages.FIELD_NOT_NULL,
        },
    )
    end_crossing_point = fields.Nested(CrossingPointSchema)
    coordinates = fields.Method("deserialize_coordinates")
    length = fields.Int(dump_only=True)
    challenge_id = fields.Int(load_only=True)
    challenge = fields.Nested("ChallengeSchema", exclude=("segments",))
    obstacles = fields.List(fields.Nested("ObstacleSchema"))

    class Meta:
        ordered = (True,)
        unknown = INCLUDE

    def deserialize_coordinates(self, obj):

        coordinates = json.loads(obj.coordinates) if obj.coordinates != None else []

        return coordinates

    @post_dump
    def get_length(self, data, **kwargs):
        data["length"] = SegmentManager.calculate_segment_length(data["id"])

        return data

    @post_load
    def make_segment(self, data, **kwargs):
        return Segment(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if "name" in data and "challenge_id" in data:
            msg = self.check_name_unique(data, data["challenge_id"], 0)
            if msg != "":
                raise ValueError(msg)

        if "start_crossing_point_id" in data:
            # Check if crossing point exist
            start_crossing_point = DBSession().query(CrossingPoint).get(int(data["start_crossing_point_id"]))
            if start_crossing_point == None:
                raise ValueError("Start crossing point does not exist.")
            data["start_crossing_point_id"] = start_crossing_point.id

        if "end_crossing_point_id" in data:
            # Check if crossing point exist
            end_crossing_point = DBSession().query(CrossingPoint).get(int(data["end_crossing_point_id"]))
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

        return data

    def check_json(self, data, segment, **kwargs):

        # Check mandatory fields
        if "name" in data:
            msg = self.check_name_unique(data, segment.challenge_id, segment.id)
            if msg != "":
                raise ValueError(msg)

        if "start_crossing_point_id" in data and "end_crossing_point_id" in data:
            if data["start_crossing_point_id"] == data["end_crossing_point_id"]:
                raise ValueError("The segment cannot have the same start and end.")

        elif "start_crossing_point_id" in data and "end_crossing_point_id" not in data:
            start_crossing_point = DBSession().query(CrossingPoint).get(int(data["start_crossing_point_id"]))

            if start_crossing_point != None:
                if start_crossing_point.id == segment.end_crossing_point.id:
                    raise ValueError("The segment cannot have the same start and end.")

        elif "end_crossing_point_id" in data and "start_crossing_point_id" not in data:
            end_crossing_point = DBSession().query(CrossingPoint).get(int(data["end_crossing_point_id"]))

            if end_crossing_point != None:
                if end_crossing_point.id == segment.start_crossing_point.id:
                    raise ValueError("The segment cannot have the same start and end.")

        if "coordinates" in data and (data["coordinates"] == None):
            raise ValueError("The segment must have coordinates.")

        return self.pre_load(data, True)

    def check_name_unique(self, data, challenge_id, segment_id):

        msg = ""
        if data["name"] == None:
            msg = "Field must not be null."

        if data["name"] == "":
            msg = "Invalid value."

        segment = (
            DBSession()
            .query(Segment)
            .filter(Segment.name == data["name"], Segment.challenge_id == challenge_id)
            .first()
        )

        if segment != None:
            if (segment_id != 0 and segment.id != segment_id) or segment_id == 0:
                msg = "The given value '" + data["name"] + "' is already used as a segment name for this challenge."

        return msg
