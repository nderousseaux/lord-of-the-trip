from loftes.models import Challenge, CrossingPoint, User, Event, DBSession

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

from sqlalchemy import func

from loftes.marshmallow_schema.CrossingPointSchema import CrossingPointSchema
from loftes.marshmallow_schema.UserSchema import UserSchema
from loftes.resources.UserResources import UserResources

# from loftes.marshmallow_schema.EventSchema import EventSchema

import datetime
import json


class ChallengeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    description = fields.Str()
    start_date = fields.DateTime()
    end_date = fields.DateTime()
    alone_only = fields.Int()
    level = fields.Str()
    scalling = fields.Int()
    step_length = fields.Float()
    draft = fields.Bool()
    start_crossing_point_id = fields.Int(load_only=True)
    end_crossing_point_id = fields.Int(load_only=True)
    start_crossing_point = fields.Nested(CrossingPointSchema)
    end_crossing_point = fields.Nested(CrossingPointSchema)
    segments = fields.List(fields.Nested("SegmentSchema", exclude=("challenge",)))
    nb_subscribers = fields.Int(dump_only=True)
    admin = fields.Nested(UserSchema)
    admin_id = fields.Int(load_only=True)
    event_sum = fields.Int(dump_only=True)
    # event_sum2 = fields.Int(dump_only=True)

    class Meta:
        ordered = True

    @pre_dump
    def get_nb_subscribers(self, data, **kwargs):

        subscribers = UserResources().find_all_subscribers_by_challenge(data)
        data.nb_subscribers = len(subscribers)

        return data

    # @pre_dump
    # def get_eventsum(self,data, **kwargs):
    #     data["event_sum"] = DBSession.query(func.sum(Events.duration)).filter(Events.challenge_id==data["id"]).filter(Events.user_id==1).first()
    #     return data

    @post_load
    def make_challenge(self, data, **kwargs):

        now = datetime.datetime.now()

        if "start_date" in data and data["start_date"] < now:
            raise ValueError(
                "Challenge's start date must be greater of today's date (" + now.strftime("%d-%m-%Y, %H:%M") + ")"
            )

        if "end_date" in data and data["end_date"] < now:
            raise ValueError(
                "Challenge's end date must be greater of today's date (" + now.strftime("%d-%m-%Y, %H:%M") + ")"
            )

        if "start_date" in data and "end_date" in data:
            if data["start_date"] > now and data["end_date"] > now:
                if data["start_date"] > data["end_date"]:
                    raise ValueError("Challenge's end date must be greater of challenge's start date.")
            else:
                raise ValueError(
                    "Challenge's start and end date must be greater of today's date ("
                    + now.strftime("%d-%m-%Y, %H:%M")
                    + ")"
                )

        return Challenge(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if "name" in data:
            challenge = DBSession().query(Challenge).filter_by(name=data["name"]).first()

            if challenge != None:
                raise ValueError("The given value '" + data["name"] + "' is already used as a challenge name.")

        if "start_date" in data:
            data["start_date"] = datetime.datetime.fromisoformat(data["start_date"]).isoformat()

        if "end_date" in data:
            data["end_date"] = datetime.datetime.fromisoformat(data["end_date"]).isoformat()

        if "scalling" in data and int(data["scalling"]) < 0:
            raise ValueError("This value (" + str(data["scalling"]) + ") is not valid for scalling.")

        if "draft" in data:
            raise PermissionError("The field draft is not used on challenge's creation")

        return data

    """This method is used to verify the data in json if methods are PUT or PATCH """

    def check_json(self, data, **kwargs):


        if len(data) == 0:
            raise ValueError('Nothing to update.')

        if "name" in data:
            if data["name"] == None:
                raise ValueError("Field must not be null.")

            if data["name"] == "":
                raise ValueError("Invalid value.")

        if "start_crossing_point_id" in data:
            start_crossing_point = DBSession.query(CrossingPoint).get(int(data["start_crossing_point_id"]))
            if start_crossing_point != None:
                data["start_crossing_point_id"] = start_crossing_point.id
            else:
                raise ValueError("Start crossing point does not exist.")

        if "end_crossing_point_id" in data:
            end_crossing_point = DBSession.query(CrossingPoint).get(int(data["end_crossing_point_id"]))
            if end_crossing_point != None:
                data["end_crossing_point_id"] = end_crossing_point.id
            else:
                raise ValueError("End crossing point does not exist.")

        return self.pre_load(data, True)
