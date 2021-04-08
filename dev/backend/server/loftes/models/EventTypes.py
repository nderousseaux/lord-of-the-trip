from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class EventTypes(Base):
    __tablename__ = 'EventTypes'
    id = Column(Integer, primary_key=True)
    code = Column(String(25), unique=True, nullable=False)
    label = Column(String(255), unique=True, nullable=False)    
    # place a unique index on col3, col4

Index('idx_code', EventTypes.code)
Index('idx_label', EventTypes.label)