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

# User Data
from .User import User
from .UserSubscribe import UserSubscribe
from .Event import Event

# Constante
from .EventType import EventType


from .Root import Root
