from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import scoped_session, sessionmaker

from zope.sqlalchemy import register

DBSession = scoped_session(sessionmaker())
register(DBSession)
Base = declarative_base()

# Challenge Data
from .Challenge import Challenge
from .CrossingPoint import CrossingPoint
from .Segment import Segment
from .Obstacle import Obstacle
from .Question import Question

# User Data
from .User import User
from .UserSubscribe import UserSubscribe
from .Events import Events

# Constante
from .EventTypes import EventTypes


from .Root import Root
