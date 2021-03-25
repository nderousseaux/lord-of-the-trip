from marshmallow import (
    Schema,
    fields,
    pre_dump
    )

from .ChallengeSchema import ChallengeSchema
from .CrossingPointSchema import CrossingPointSchema
from .ObstacleSchema import ObstacleSchema
from .QuestionSchema import QuestionSchema
from .SegmentSchema import SegmentSchema
from .UserSchema import UserSchema
from .UserSubscribeSchema import UserSubscribeSchema

from .schema_add.SegmentSchemaAdd import SegmentSchemaAdd
from .schema_add.ChallengeAddSchema import ChallengeAddSchema
from .schema_add.ParcoursSchema import ParcoursAddSchema