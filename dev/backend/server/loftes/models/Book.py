from sqlalchemy import *

from sqlalchemy.orm import relationship

from . import Base

class Book(Base):
    __tablename__ = 'Book'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    author_id = Column(Integer, ForeignKey('Author.id'))
