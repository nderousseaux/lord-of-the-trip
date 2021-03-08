from sqlalchemy import *

from sqlalchemy.orm import relationship

from loftes.models import Base
#from models import Base

class Obstacle(Base):
    __tablename__ = 'Obstacle'
    idObstacle = Column(Integer, primary_key=True)
    nameObstacle = Column(String(255), unique=True)
    xPosition = Column(Integer)
    yPosition = Column(Integer) 
    descriptionObstacle = Column(String(255))
    segmentId = Column(Integer, ForeignKey('Segment.idSegment'))
    QuestionId = Column(Integer, ForeignKey('Question.idQuestion'))