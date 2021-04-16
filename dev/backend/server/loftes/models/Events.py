from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base
#from loftes.models.entity.EventType import EventType
#from loftes.models.entity.EventTypeMove import EventTypeMove

class Events(Base):
    __tablename__ = 'Events'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    segment_id = Column(Integer, ForeignKey('Segment.id'))
    event_type_id = Column(Integer, ForeignKey('EventTypes.id'))
    event_type_info = challenge = relationship("EventTypes")
    move_type = Column(Integer)
    event_date = Column(BigInteger)
    duration = Column(Integer)
    footstep = Column(Integer)
    distance = Column(Integer)
    obstacle_id = Column(Integer, ForeignKey('Obstacle.id'))
    response = Column(String(255))
