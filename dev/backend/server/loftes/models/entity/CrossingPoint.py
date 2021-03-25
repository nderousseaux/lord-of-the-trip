from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class CrossingPoint(Base):
    __tablename__ = 'CrossingPoint'
    id = Column(Integer, primary_key=True)
    name_crossing = Column(String(255), unique=True)
    x_position = Column(Integer)
    y_position = Column(Integer)