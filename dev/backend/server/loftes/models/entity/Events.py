from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base
from loftes.models.entity.EventType import EventType
from loftes.models.entity.EventTypeMove import EventTypeMove

class Events(Base):
    __tablename__ = 'Events'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    challenge_id = Column(Integer, ForeignKey('Challenge.id'))
    segment_id = Column(Integer, ForeignKey('Segment.id'))
    # event_type = Column(Enum(EventType))
    # move_type = Column(Enum(EventTypeMove))
    event_date = Column(DateTime(timezone=False))
    footstep = Column(Integer)
    distance = Column(Integer)