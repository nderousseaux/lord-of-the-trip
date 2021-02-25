from marshmallow import (
    Schema, 
    fields,
    pre_dump
    )

class AuthorSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    books = fields.List(fields.Nested(lambda: BookSchema(exclude=["author"])))

class BookSchema(Schema):
    id= fields.Int()
    name = fields.Str()
    author = fields.Nested(lambda: AuthorSchema(exclude=["books"]))
