from sqlalchemy import *
# from sqlalchemy.types import *
from sqlalchemy.types import VARCHAR
from sqlalchemy.orm import relationship

from loftes.models import Base

class Segment(Base):
    __tablename__ = 'Segment'
    id_segment = Column(Integer, primary_key=True)
    name_segment = Column(String(255), unique=True)    
    id_start_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    id_end_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    start_crossing_point = relationship("CrossingPoint")
    end_crossing_point = relationship("CrossingPoint")
    list_points  = Column(TEXT(length=65535))
    challenge_id = Column(Integer, ForeignKey('Challenge.id_challenge'))
    challenge_info = relationship("Challenge")
    list_obstacle = relationship("Obstacle", backref="Segment")
