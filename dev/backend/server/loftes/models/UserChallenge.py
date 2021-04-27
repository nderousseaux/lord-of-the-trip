from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base


class UserChallenge(Base):
    __tablename__ = "UserChallenge"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("User.id"))
    user = relationship("User")
    challenge_id = Column(Integer, ForeignKey("Challenge.id"))
    challenge = relationship("Challenge")
    subscribe_date = Column(DateTime(timezone=False))
    unsubscribe_date = Column(DateTime(timezone=False))
