from pyramid.security import Allow, Everyone

from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
    )

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
    scoped_session,
    sessionmaker
    )

from zope.sqlalchemy import register

from sqlalchemy.orm import relationship

DBSession = scoped_session(sessionmaker())
register(DBSession)
Base = declarative_base()



class Author(Base):
    __tablename__ = 'Author'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    books = relationship("Book", backref="Author")


class Book(Base):
    __tablename__ = 'Book'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)
    author_id = Column(Integer, ForeignKey('Author.id'))


class Root(object):
    __acl__ = [(Allow, Everyone, 'view'),
               (Allow, 'group:editors', 'edit')]

    def __init__(self, request):
        pass