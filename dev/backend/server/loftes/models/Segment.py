from sqlalchemy import *
from sqlalchemy.types import VARCHAR
from sqlalchemy.orm import relationship

from loftes.models import Base


class Segment(Base):
    __tablename__ = "Segment"
    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    start_crossing_point_id = Column(Integer, ForeignKey("CrossingPoint.id"))
    start_crossing_point = relationship(
        "CrossingPoint", foreign_keys="Segment.start_crossing_point_id"
    )
    end_crossing_point_id = Column(Integer, ForeignKey("CrossingPoint.id"))
    end_crossing_point = relationship(
        "CrossingPoint", foreign_keys="Segment.end_crossing_point_id"
    )
    coordinates = Column(TEXT(length=65535))
    challenge_id = Column(Integer, ForeignKey("Challenge.id"))
    challenge = relationship("Challenge", backref="segment_challenge")
    obstacles = relationship(
        "Obstacle", cascade="all,delete", backref="segment_obstacles", lazy=True
    )
