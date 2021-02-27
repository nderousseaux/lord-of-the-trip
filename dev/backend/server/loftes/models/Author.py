from sqlalchemy import *

from sqlalchemy.orm import relationship

from . import Base

class Author(Base):
    __tablename__ = 'Author'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    books = relationship("Book", backref="Author")