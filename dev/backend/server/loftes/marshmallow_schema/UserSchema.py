from marshmallow import Schema, fields, pre_load, post_load, validate

from loftes.models import Base, User, DBSession
from loftes.security.PasswordUtils import PasswordUtils
from loftes.services.ServiceInformations import ServiceInformations
from loftes.resources.UserResources import UserResources
from loftes.resources import UserManager
import hashlib, binascii, os, re


class UserSchema(Schema):
    first_name = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    last_name = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    pseudo = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    email = fields.Email(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )
    password = fields.Str(
        required=True,
        validate=[
            validate.NoneOf("", error="Invalid value"),
            validate.Length(min=8),
        ],
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
        load_only=True,
    )
    is_admin = fields.Bool()

    class Meta:
        ordered = True

    @post_load
    def make_user(self, data, **kwargs):
        data["password"] = PasswordUtils().hash_password(data["password"])
        return User(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

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

        # data = UserResources().check_data(data)

        return data

    def check_json(self, data, **kwargs):

        # if "email" in data:
        #     user = DBSession().query(User).filter_by(email=data["email"]).first()

        #     if user != None:UserResources()
        #     if not re.match("^[A-Za-z0-9_-]*$", data["pseudo"]):
        #         raise ValueError("Pseudo can contain only letters, numbers and underscores.")

        #     user = DBSession().query(User).filter_by(pseudo=data["pseudo"]).first()

        #     if user != None:
        #         raise ValueError("This pseudo is already in use. Please use another one.")

        data = UserManager().check_data(data)

        if "password" in data:
            data["password"] = PasswordUtils().hash_password(data["password"])

        return data
