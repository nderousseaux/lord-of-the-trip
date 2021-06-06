from loftes.models import Obstacle, Segment, DBSession

from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate
from loftes.marshmallow_schema.SegmentSchema import SegmentSchema

import loftes.error_messages as error_messages
import json


class ObstacleSchema(Schema):
    id = fields.Int(dump_only=True)
    segment_id = fields.Int()
    label = fields.Str()
    progress = fields.Float(
        required=True,
        error_messages={
            "required": error_messages.FIELD_MANDATORY,
            "null": error_messages.FIELD_NOT_NULL,
        },
    )
    description = fields.Str()
    question_type = fields.Int()
    result = fields.Str()
    segment = fields.Nested("SegmentSchema", exclude=("obstacles",))

    class Meta:
        ordered = True

    @post_load
    def make_obstacle(self, data, **kwargs):
        return Obstacle(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if "label" in data:

            if data["label"] == None:                
                raise ValueError(error_messages.FIELD_NOT_NULL)

            if data["label"] == "":
                raise ValueError(error_messages.FIELD_NOT_NULL)

            segment = (
                DBSession().query(Segment).get(data["segment_id"])
            )
            
            if segment != None:
                
                challenge_id = segment.challenge_id
                
                obstacle = (
                    DBSession()
                    .query(Obstacle)
                    .join(Segment, Segment.id==Obstacle.segment_id)
                    .filter(Obstacle.label==data["label"])
                    .filter(Segment.challenge_id==challenge_id)
                    .first()
                )

                if obstacle != None:
                    raise ValueError(
                            "The given value '"
                            + data["label"]
                            + "' is already used as a obstacle label for this challenge."
                        )
    
        if "progress" in data:

            if float(data["progress"]) < 0:
                raise ValueError("This value (" + str(data["progress"]) + ") is not valid for progress.")

            obstacle = (
                DBSession.query(Obstacle)
                .filter(
                    Obstacle.segment_id == int(data["segment_id"]),
                    Obstacle.progress == data["progress"],
                )
                .first()
            )

            if obstacle != None:
                if ("id" in data and obstacle.id != data["id"]) or "id" not in data:
                    raise ValueError("There is already one obstacle at this position for this segment.")

        return data

    def check_json(self, data, **kwargs):

        if "progress" in data and (data["progress"] == None or data["progress"] == ""):
            raise ValueError("Field progress must not be null.")

        if "question_type" in data and (data["question_type"] == None or data["question_type"] == ""):
            raise ValueError("Field question type must not be null.")

        return self.pre_load(data, True)
