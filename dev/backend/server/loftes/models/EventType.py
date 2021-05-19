from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class EventType(Base):
    __tablename__ = "EventType"
    id = Column(Integer, primary_key=True)
    code = Column(String(25), unique=True, nullable=False)
    label = Column(String(255), unique=True, nullable=False)
    # place a unique index on col3, col4


Index("idx_code", EventType.code)
Index("idx_label", EventType.label)
