from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class CrossingPoint(Base):
    __tablename__ = 'CrossingPoint'
    id = Column(Integer, primary_key=True)
    name_crossing = Column(String(255), unique=True)
    challenge_id = Column(Integer, ForeignKey('Challenge.id'))
    x_position = Column(Float(precision=2))
    y_position = Column(Float(precision=2))
