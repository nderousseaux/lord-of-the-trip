from sqlalchemy import *
from sqlalchemy.types import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class Segment(Base):
    __tablename__ = 'Segment'
    id_segment = Column(Integer, primary_key=True)
    name_segment = Column(String(255), unique=True)
    start_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    end_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    # listPoints  = Column(ARRAY(Integer))
    parcours_id = Column(Integer, ForeignKey('Parcours.id_parcours'))
    list_obstacle = relationship("Obstacle", backref="Segment")
