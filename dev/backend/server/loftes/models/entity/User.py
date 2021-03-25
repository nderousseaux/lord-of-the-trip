from sqlalchemy import *
from sqlalchemy_utils import PasswordType, EmailType, force_auto_coercion

from loftes.models import Base

class User(Base):
    __tablename__ = 'User'
    id_user = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    pseudo = Column(String(255), unique=True)
    mail = Column(String(255), unique=True)
    password = Column(PasswordType(max_length=None))
    is_admin = Column(Boolean,server_default=text("0"))
