from sqlalchemy import *

from sqlalchemy_utils import PasswordType, EmailType, force_auto_coercion

from loftes.models import Base
#from models import Base

class User(Base):
    __tablename__ = 'User'
    idUser = Column(Integer, primary_key=True)
    firstName = Column(String(255))
    lastName = Column(String(255))
    pseudo = Column(String(255), unique=True)
    mail = Column(String(255), unique=True)
    password = Column(PasswordType(max_length=None))