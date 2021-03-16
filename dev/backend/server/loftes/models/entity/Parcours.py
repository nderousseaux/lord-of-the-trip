from sqlalchemy import *
from sqlalchemy.types import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class Parcours(Base):
    __tablename__ = 'Parcours'
    id_parcours = Column(Integer, primary_key=True)
    name_parcours = Column(String(255), unique=True)
    description = Column(String(255), unique=False)
    url_map = Column(String(255))
    level = Column(String(255))
    scalling = Column(Integer)
    start_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    end_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    list_segment = relationship("Segment")
