from loftes.models import Challenge, User, DBSession
from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_dump,
    post_load,
    pre_load,
    ValidationError,
    validate,
)

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
from loftes.marshmallow_schema.SegmentSchema import SegmentSchema
from loftes.marshmallow_schema.UserSchema import UserSchema

import datetime
import simplejson


class ChallengeSchema(Schema):
    id = fields.Int()
    name = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    description = fields.Str()
    end_date = fields.DateTime()
    alone_only = fields.Int()
    level = fields.Str()
    scalling = fields.Int()
    draft = fields.Bool()
    start_crossing_point_id = fields.Int(load_only=True)
    end_crossing_point_id = fields.Int(load_only=True)
    start_crossing_point = fields.Nested(CrossingPointSchema)
    end_crossing_point = fields.Nested(CrossingPointSchema)
    segments = fields.List(fields.Nested(SegmentSchema))
    admin = fields.Nested(UserSchema)
    admin_id = fields.Int(load_only=True)

    class Meta:
        ordered = True

    @post_load
    def make_challenge(self, data, **kwargs):
        return Challenge(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        admin = DBSession.query(User).get(1)
        if admin != None:
            data["admin_id"] = admin.id
        else:
            raise PermissionError()

        if "name" in data:
            challenge = (
                DBSession().query(Challenge).filter_by(name=data["name"]).first()
            )

            if challenge != None:
                raise ValueError(
                    "The given value '"
                    + data["name"]
                    + "' is already used as a challenge name."
                )

        if "end_date" in data:
            data["end_date"] = datetime.datetime.fromisoformat(
                data["end_date"]
            ).isoformat()

        return data

    """This method is used to verify the data in json if methods are PUT or PATCH """

    def check_json(self, data, **kwargs):

        if "name" in data:
            if data["name"] == None:
                raise ValueError("Field must not be null.")

            if data["name"] == "":
                raise ValueError("Invalid value.")

        return self.pre_load(data, True)
