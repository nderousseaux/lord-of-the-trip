from sqlalchemy import *

from sqlalchemy.orm import relationship

from loftes.models import Base
#from models import Base

class CrossingPoint(Base):
    __tablename__ = 'CrossingPoint'
    idCrossingPoint = Column(Integer, primary_key=True)
    nameCrossing = Column(String(255), unique=True)
    xPosition = Column(Integer)
    yPosition = Column(Integer) 
    parcoursId = Column(Integer, ForeignKey('Parcours.idParcours'))