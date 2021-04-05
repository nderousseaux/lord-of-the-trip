from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base
#from loftes.models.entity.EventType import EventType
#from loftes.models.entity.EventTypeMove import EventTypeMove

class Events(Base):
    __tablename__ = 'Events'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    challenge_id = Column(Integer, ForeignKey("Challenge.id"))
    #challenge_info = relationship("Challenge")
    segment_id = Column(Integer, ForeignKey('Segment.id'))
    #segment_info = relationship("Segment")
    duration = Column(Time)
    #event_type = Column(Enum(EventType))
    move_type = Column(Integer)
    event_date = Column(DateTime(timezone=False))
    # footstep = Column(Integer)
    distance = Column(Integer)
