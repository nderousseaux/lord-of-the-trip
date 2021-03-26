from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker
    )

from zope.sqlalchemy import register

DBSession = scoped_session(sessionmaker())
register(DBSession)
Base = declarative_base()

# Challenge Data
from .entity.Challenge import Challenge
from .entity.CrossingPoint import CrossingPoint
from .entity.Segment import Segment
from .entity.Obstacle import Obstacle
from .entity.Question import Question

# User Data
from .entity.User import User
from .entity.UserSubscribe import UserSubscribe
from .entity.Events import Events

from .Root import Root
