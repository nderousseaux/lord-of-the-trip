from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class UserSubscribe(Base):
    __tablename__ = 'UserSubscribe'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('User.id'))
    challenge_id = Column(Integer, ForeignKey('Challenge.id'))
    subscribe_date = Column(DateTime(timezone=False))
