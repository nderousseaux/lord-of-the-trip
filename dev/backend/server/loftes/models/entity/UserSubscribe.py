from sqlalchemy import *
from sqlalchemy.orm import relationship

from loftes.models import Base

class UserSubscribe(Base):
    __tablename__ = 'UserSubscribe'
    id_subscrbe = Column(Integer, primary_key=True)
    id_user_subs = Column(Integer, ForeignKey('User.id_user'))
    id_parcours_subs = Column(Integer, ForeignKey('Parcours.id_parcours'))
    subscribe_date = Column(DateTime(timezone=False))
