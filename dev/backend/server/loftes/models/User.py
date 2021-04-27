from sqlalchemy import *

from loftes.models import Base


class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    pseudo = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, server_default=text("0"), nullable=False)
