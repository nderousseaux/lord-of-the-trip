from marshmallow import Schema, fields, pre_load, post_load, validate

from loftes.models import Base, User, DBSession
import hashlib, binascii, os, re

def check_data(data):

    if "email" in data:
        user = DBSession().query(User).filter_by(email=data["email"]).first()

        if user != None:
            raise ValueError("This email is already in use. Please use another one.")

    if "pseudo" in data:
        if not re.match("^[A-Za-z0-9_-]*$", data["pseudo"]):
            raise ValueError("Pseudo can contain only letters, numbers and underscores.")

        user = DBSession().query(User).filter_by(pseudo=data["pseudo"]).first()

        if user != None:
            raise ValueError("This pseudo is already in use. Please use another one.")
    
    return data