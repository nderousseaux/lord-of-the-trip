from loftes.models import EventType, User, DBSession

from marshmallow import (
    Schema,
    fields,
    pre_dump,
    post_dump,
    post_load,
    pre_load,
    validate,
)

import datetime, time
import json


class EventTypeSchema(Schema):
    id = fields.Int(dump_only=True)

    code = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )

    label = fields.Str(
        required=True,
        validate=validate.NoneOf("", error="Invalid value"),
        error_messages={
            "required": "This field is mandatory.",
            "null": "Field must not be null.",
        },
    )

    class Meta:
        ordered = True

    @post_load
    def make_event_type(self, data, **kwargs):
        return EventType(**data)

    @pre_load
    def pre_load(self, data, many, **kwargs):

        # Uniquement administrateur
        # admin = DBSession.query(User).get(1)
        # if admin != None:
        #     data["admin_id"] = admin.id
        # else:
        #     raise PermissionError()

        if "code" in data:
            event_types = (
                DBSession().query(EventType).filter_by(code=data["code"]).first()
            )

            if event_types != None:
                raise ValueError(
                    "The given value '"
                    + data["code"]
                    + "' is already used as an event type code."
                )

        if "label" in data:
            event_types = (
                DBSession().query(EventType).filter_by(label=data["label"]).first()
            )

            if event_types != None:
                raise ValueError(
                    "The given value '"
                    + data["label"]
                    + "' is already used as an event type label."
                )

        return data