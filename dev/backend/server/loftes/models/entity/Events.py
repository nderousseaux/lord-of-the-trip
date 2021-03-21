from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base
from loftes.models.entity.EventType import EventType
from loftes.models.entity.EventTypeMove import EventTypeMove

class Events(Base):
    __tablename__ = 'Events'
    id_Event = Column(Integer, primary_key=True)
    id_user_event = Column(Integer, ForeignKey('User.id_user'))
    id_challenge = Column(Integer, ForeignKey('Challenge.id_challenge'))
    id_segment = Column(Integer, ForeignKey('Segment.id_segment'))
    event_type = Column(Enum(EventType))
    move_type = Column(Enum(EventTypeMove))
    event_date = Column(DateTime(timezone=False))
    footstep = Column(Integer)
    distance = Column(Integer)