from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class CrossingPoint(Base):
    __tablename__ = "CrossingPoint"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    position_x = Column(Float(precision=2), nullable=False)
    position_y = Column(Float(precision=2), nullable=False)
    challenge_id = Column(Integer, ForeignKey("Challenge.id"))
    segments_start = relationship(
        "Segment",
        primaryjoin="CrossingPoint.id==Segment.start_crossing_point_id",
        backref="segment_start_crossing-points",
        cascade="all,delete",
    )
    segments_end = relationship(
        "Segment",
        primaryjoin="CrossingPoint.id==Segment.end_crossing_point_id",
        backref="segment_end_crossing-points",
        cascade="all,delete",
    )
    challenges_start = relationship(
        "Challenge",
        primaryjoin="and_(CrossingPoint.id==Challenge.start_crossing_point_id)",
        backref="challenge_start_crossing-points",
        cascade="all,delete",
    )
    challenges_end = relationship(
        "Challenge",
        primaryjoin="and_(CrossingPoint.id==Challenge.end_crossing_point_id)",
        backref="challenge_end_crossing-points",
        cascade="all,delete",
    )


# Index("idx_name_cp", CrossingPoint.challenge_id, CrossingPoint.name, unique=True)
