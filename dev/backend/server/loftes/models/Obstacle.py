from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class Obstacle(Base):
    __tablename__ = "Obstacle"
    id = Column(Integer, primary_key=True)
    name_obstacle = Column(String(255), unique=True)
    position_x = Column(Integer)
    position_y = Column(Integer)
    description_obstacle = Column(String(255))
    segment_id = Column(Integer, ForeignKey("Segment.id"))
    segment_info = relationship(
        "Segment",
    )
    question_id = Column(Integer, ForeignKey("Question.id"))
    question_info = relationship("Question")
