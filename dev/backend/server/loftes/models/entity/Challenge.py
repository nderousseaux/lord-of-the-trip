from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class Challenge(Base):
    __tablename__ = 'Challenge'
    id_challenge = Column(Integer, primary_key=True)
    name_challenge = Column(String(255), unique=True)
    description_challenge = Column(String(255))
    end_date = Column(DateTime(timezone=False))
    alone_only = Column(Integer)
    parcours_id = Column(Integer, ForeignKey('Parcours.id_parcours'))
