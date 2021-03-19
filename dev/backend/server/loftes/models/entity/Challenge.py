from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class Challenge(Base):
    __tablename__ = 'Challenge'
    id_challenge = Column(Integer, primary_key=True)
    name_challenge = Column(String(255), unique=True)
    description_challenge = Column(String(255))
    end_date = Column(DateTime(timezone=False))
    alone_only = Column(Integer)
    url_map = Column(String(255))
    level = Column(String(255))
    scalling = Column(Integer)
    draft = Column(Boolean,server_default=text("0"))
    id_admin = Column(Integer, ForeignKey('User.id_user'))
    start_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    end_crossing_point = Column(Integer, ForeignKey('CrossingPoint.id_crossing_point'))
    list_segment = relationship("Segment")
