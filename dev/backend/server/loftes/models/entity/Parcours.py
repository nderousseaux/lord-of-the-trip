from sqlalchemy import *

from sqlalchemy.types import *

from sqlalchemy.orm import relationship

from loftes.models import Base
#from models import Base

class Parcours(Base):
    __tablename__ = 'Parcours'
    idParcours = Column(Integer, primary_key=True)
    nameParcours = Column(String(255), unique=True)
    description = Column(String(255), unique=False)
    urlMap = Column(String(255))
    level = Column(String(255))
    # segmentList = Column(ARRAY(Integer))
    # segmentList2 = Column(ARRAY(Integer, ForeignKey('Segment.idSegment')))
    scalling = Column(Integer)
    startCrossingPoint = Column(Integer, ForeignKey('CrossingPoint.idCrossingPoint'))
    endCrossingPoint = Column(Integer, ForeignKey('CrossingPoint.idCrossingPoint'))