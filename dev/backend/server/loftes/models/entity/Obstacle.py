from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class Obstacle(Base):
    __tablename__ = 'Obstacle'
    id_obstacle = Column(Integer, primary_key=True)
    name_obstacle = Column(String(255), unique=True)
    x_position = Column(Integer)
    y_position = Column(Integer)
    description_obstacle = Column(String(255))
    segment_id = Column(Integer, ForeignKey('Segment.id_segment'))
    question_id = Column(Integer, ForeignKey('Question.id_question'))
