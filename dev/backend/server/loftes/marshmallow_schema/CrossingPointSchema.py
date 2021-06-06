from loftes.models import CrossingPoint, Challenge, Segment, DBSession
from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate

import loftes.error_messages as error_messages

class CrossingPointSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    position_x = fields.Float(
        required=True,
        error_messages={
            "required": error_messages.FIELD_MANDATORY,
            "null": error_messages.FIELD_NOT_NULL,
        },
    )
    position_y = fields.Float(
        required=True,
        error_messages={
            "required": error_messages.FIELD_MANDATORY,
            "null": error_messages.FIELD_NOT_NULL,
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

        if "name" in data and "challenge_id" in data:

            msg = self.check_unique_name(data,data["challenge_id"])
            if msg != "":
                raise ValueError(msg)

        # Check mandatory field
        if "position_x" in data:
            data["position_x"] = float(data["position_x"])

        # Check mandatory field
        if "position_y" in data:
            data["position_y"] = float(data["position_y"])

        return data

    def check_json(self, data, **kwargs):

        if "name" in data:

            challenge_id = kwargs.get("challenge_id", None)

            msg = self.check_unique_name(data,challenge_id)
            if msg != "":
                raise ValueError(msg)

        return self.pre_load(data, True)

    def check_unique_name(self,data,challenge_id):

        msg = ""

        if data["name"] == None:                
            msg = error_messages.FIELD_NOT_NULL

        if data["name"] == "":
            msg = error_messages.FIELD_NOT_NULL

        crossing_point = (
            DBSession()
            .query(CrossingPoint)
            .filter(CrossingPoint.name == data["name"], CrossingPoint.challenge_id == challenge_id)
            .first()
        )

        if crossing_point != None:
            msg = (
                "The given value '"
                + data["name"]
                + "' is already used as a crossing point name for this challenge."
            )
        
        return msg
