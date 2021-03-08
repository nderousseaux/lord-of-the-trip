from sqlalchemy import *

from sqlalchemy.orm import relationship

from loftes.models import Base
#from models import Base

class Challenge(Base):
    __tablename__ = 'Challenge'
    idChallenge = Column(Integer, primary_key=True)
    nameChallenge = Column(String(255), unique=True)
    descriptionChallenge = Column(String(255))
    endDate = Column(DateTime(timezone=False))
    aloneOnly = Column(Integer)
    parcoursId = Column(Integer, ForeignKey('Parcours.idParcours'))