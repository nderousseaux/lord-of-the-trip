from sqlalchemy import *
<<<<<<< HEAD

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
=======
from sqlalchemy.orm import relationship

from loftes.models import Base

class CrossingPoint(Base):
    __tablename__ = 'CrossingPoint'
    id_crossing_point = Column(Integer, primary_key=True)
    name_crossing = Column(String(255), unique=True)
    x_position = Column(Integer)
    y_position = Column(Integer)
    parcours_id = Column(Integer, ForeignKey('Parcours.id_parcours'))
>>>>>>> 1aab4cbbef95588d6b6ad7e0ffe1e4c3bcb58de6
