from sqlalchemy import *

from sqlalchemy.types import *

from sqlalchemy.orm import relationship

from loftes.models import Base
#from models import Base

class Segment(Base):
    __tablename__ = 'Segment'
    idSegment = Column(Integer, primary_key=True)
    nameSegment = Column(String(255), unique=True)
    startCrossingPoint = Column(Integer, ForeignKey('CrossingPoint.idCrossingPoint'))
    endCrossingPoint = Column(Integer, ForeignKey('CrossingPoint.idCrossingPoint')) 
    # listPoints  = Column(ARRAY(Integer))
    parcoursId = Column(Integer, ForeignKey('Parcours.idParcours'))
    listObstacle = relationship("Obstacle", backref="Segment")