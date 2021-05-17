from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class Event(Base):
    __tablename__ = "Event"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("User.id"))
    segment_id = Column(Integer, ForeignKey("Segment.id"))
    event_type_id = Column(Integer, ForeignKey("EventType.id"))
    event_type_info = relationship("EventType", foreign_keys=[event_type_id])
    move_type = Column(Integer)
    event_date = Column(DateTime)
    duration = Column(BigInteger)
    footstep = Column(Integer)
    distance = Column(Integer)
    obstacle_id = Column(Integer, ForeignKey("Obstacle.id"))
    response = Column(String(255))
