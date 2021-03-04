from sqlalchemy import *

from sqlalchemy.orm import relationship

from loftes.models import Base
#from models import Base

class UserSubscribe(Base):
    __tablename__ = 'UserSubscribe'
    idSubscrbe = Column(Integer, primary_key=True)
    idUserSubs = Column(Integer, ForeignKey('User.idUser'))
    idParcoursSubs = Column(Integer, ForeignKey('Parcours.idParcours'))
    subscribeDate = Column(DateTime(timezone=False))
