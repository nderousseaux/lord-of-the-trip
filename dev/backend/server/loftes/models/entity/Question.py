from sqlalchemy import *

from sqlalchemy.orm import relationship

from loftes.models import Base
#from models import Base

class Question(Base):
    __tablename__ = 'Question'
    idQuestion = Column(Integer, primary_key=True)
    nameQuestion = Column(String(255), unique=True)
    typeQuestion = Column(String(255))
    descriptionQuestion = Column(String(255))
    nbPoint = Column(Integer)
    result = Column(String(255))