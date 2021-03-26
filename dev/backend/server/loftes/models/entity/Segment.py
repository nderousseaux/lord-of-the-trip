from sqlalchemy import *
# from sqlalchemy.types import *
from sqlalchemy.types import VARCHAR
from sqlalchemy.orm import relationship

from loftes.models import Base

class Segment(Base):
    __tablename__ = 'Segment'
    id = Column(Integer, primary_key=True)
    name_segment = Column(String(255), unique=True)
    start_crossing_point_id = Column(Integer, ForeignKey('CrossingPoint.id'))
    end_crossing_point_id = Column(Integer, ForeignKey('CrossingPoint.id'))
    list_points  = Column(VARCHAR(255))
    challenge_id = Column(Integer, ForeignKey('Challenge.id'))
    obstacles = relationship("Obstacle", backref="Segment")
