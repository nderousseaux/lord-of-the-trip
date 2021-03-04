from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker
    )

from zope.sqlalchemy import register

from sqlalchemy.orm import relationship

DBSession = scoped_session(sessionmaker())
register(DBSession)
Base = declarative_base()

from .entity.Parcours import Parcours
from .entity.CrossingPoint import CrossingPoint
from .entity.Segment import Segment
from .entity.Obstacle import Obstacle
from .entity.Question import Question
from .entity.Challenge import Challenge
from .entity.User import User
from .entity.UserSubscribe import UserSubscribe

# from .Parcours import Parcours
# from .CrossingPoint import CrossingPoint
# from .Segment import Segment
# from .Obstacle import Obstacle
# from .Question import Question
# from .Challenge import Challenge
# from .User import User
# from .UserSubscribe import UserSubscribe

from .Root import Root
