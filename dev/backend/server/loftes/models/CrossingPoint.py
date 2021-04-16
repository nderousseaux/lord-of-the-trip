from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class CrossingPoint(Base):
    __tablename__ = "CrossingPoint"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    position_x = Column(Float(precision=2), nullable=False)
    position_y = Column(Float(precision=2), nullable=False)
    challenge_id = Column(Integer, ForeignKey("Challenge.id"))
    # challenge = relationship("Challenge", backref="challenge_point")    
    
Index('idx_name_cp', CrossingPoint.challenge_id, CrossingPoint.name, unique=True)