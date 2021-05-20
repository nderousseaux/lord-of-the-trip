from loftes.models import Obstacle, DBSession

from marshmallow import Schema, fields, pre_dump, post_load, pre_load, validate
from loftes.marshmallow_schema.SegmentSchema import SegmentSchema

import json


class ObstacleSchema(Schema):
    id = fields.Int(dump_only=True)
    segment_id = fields.Int()
    label = fields.Str()
    progress = fields.Float(
        required=True,
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    description = fields.Str()
    question_type = fields.Int()
    nb_points = fields.Int()
    result = fields.Str()
    segment = fields.Nested("SegmentSchema", exclude=("obstacles",))

    class Meta:
        ordered = True

    @post_load
    def make_obstacle(self, data, **kwargs):
        return Obstacle(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        if "progress" in data:

            obstacle = (
                DBSession.query(Obstacle)
                .filter(
                    Obstacle.segment_id == int(data["segment_id"]),
                    Obstacle.progress == data["progress"],
                )
                .first()
            )

            if obstacle != None:
                raise ValueError("There is already one obstacle at this position for this segment.")

            return data

    def check_json(self, data, **kwargs):

        if "label" in data:
            if data["label"] == None:
                raise ValueError("Field label must not be null.")

        if "progress" in data:
            if data["progress"] == None:
                raise ValueError("Field progress must not be null.")

        if "question_type" in data:
            if data["question_type"] == None:
                raise ValueError("Field type question must not be null.")

        return self.pre_load(data, True)
