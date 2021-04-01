from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class Challenge(Base):
    __tablename__ = "Challenge"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(String(255))
    map_url = Column(String(255))
    end_date = Column(DateTime(timezone=False))
    alone_only = Column(Integer)
    level = Column(String(255))
    scalling = Column(Integer)
    draft = Column(Boolean, server_default=text("0"))
    start_crossing_point_id = Column(Integer, ForeignKey("CrossingPoint.id"))
    start_crossing_point = relationship(
        "CrossingPoint", foreign_keys=[start_crossing_point_id]
    )
    end_crossing_point_id = Column(Integer, ForeignKey("CrossingPoint.id"))
    end_crossing_point = relationship(
        "CrossingPoint", foreign_keys=[end_crossing_point_id]
    )
    segments = relationship("Segment", backref="segments", cascade="all,delete")
    admin_id = Column(Integer, ForeignKey("User.id"))
    admin = relationship("User", backref="challenge_manager")
