from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class Question(Base):
    __tablename__ = 'Question'
    id = Column(Integer, primary_key=True)
    name_question = Column(String(255), unique=True)
    type_question = Column(String(255))
    description_question = Column(String(255))
    nb_point = Column(Integer)
    result = Column(String(255))
