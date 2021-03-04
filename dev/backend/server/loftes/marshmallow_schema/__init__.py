from marshmallow import (
    Schema, 
    fields,
    pre_dump
    )

class ParcoursSchema(Schema):
    idParcours = fields.Int()
    nameParcours = fields.Str()
    description = fields.Str()
    urlMap = fields.Str()
    level = fields.Str()
    segmentList = fields.List(fields.Nested(lambda: SegmentSchema(exclude=["parcoursInfo"])))
    scalling = fields.Int()
    startCrossingPoint = fields.Nested(lambda: CrossingPointSchema(exclude=["parcoursInfo"]))
    endCrossingPoint = fields.Nested(lambda: CrossingPointSchema(exclude=["parcoursInfo"]))

class CrossingPointSchema(Schema):
    idCrossingPoint = fields.Int()
    nameCrossing = fields.Str()
    xPosition = fields.Int()
    yPosition = fields.Int() 
    parcoursInfo = fields.Nested(lambda: ParcoursSchema(exclude=["startCrossingPoint,endCrossingPoint"]))

class SegmentSchema(Schema):
    idSegment = fields.Int()
    nameSegment = fields.Str()
    startCrossingPoint = fields.Nested(lambda: CrossingPointSchema())
    endCrossingPoint = fields.Nested(lambda: CrossingPointSchema())
    listPoints  = fields.Int()
    parcoursInfo = fields.Nested(lambda: ParcoursSchema())
    listObstacle = fields.Nested(lambda: ObstacleSchema())

class ObstacleSchema(Schema):
    idObstacle = fields.Int()
    nameObstacle = fields.Str()
    xPosition = fields.Int()
    yPosition = fields.Int() 
    descriptionObstacle = fields.Str()
    QuestionId = fields.Nested(lambda: QuestionSchema())

class QuestionSchema(Schema):
    idQuestion = fields.Int()
    nameQuestion = fields.Str()
    typeQuestion = fields.Str()
    descriptionQuestion = fields.Str()
    nbPoint = fields.Int()
    result = fields.Str()
    

class ChallengeSchema(Schema):
    idChallenge = fields.Int()
    nameChallenge = fields.Str()
    descriptionChallenge = fields.Str()
    endDate = fields.DateTime()
    aloneOnly = fields.Int()
    parcoursInfo = fields.Nested(lambda: ParcoursSchema())

class UserSchema(Schema):
    idUser = fields.Int()
    firstName = fields.Str()
    lastName = fields.Str()
    pseudo = fields.Str()
    mail = fields.Str()

class UserSubscribeSchema(Schema):
    idSubscrbe = fields.Int()
    idUserInfo = fields.Nested(lambda: UserSchema())
    idParcoursInfo = fields.Nested(lambda: ParcoursSchema())
    subscribeDate = fields.DateTime()
