from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class Obstacle(Base):
    __tablename__ = "Obstacle"
    id = Column(Integer, primary_key=True)
    label = Column(String(255), nullable=false)
    description = Column(TEXT(length=65535))
    progress = Column(Float(), nullable=False)
    question_type = Column(Integer)
    result = Column(String(255))
    segment_id = Column(Integer, ForeignKey("Segment.id"))
    segment = relationship("Segment", backref="segment_obstacles")
