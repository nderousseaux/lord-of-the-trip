from pyramid.renderers import JSON
from pyramid.config import Configurator
from pyramid.authorization import ACLAuthorizationPolicy

from sqlalchemy import engine_from_config
from loftes.models import DBSession, Base


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("pyramid_tm")
    engine = engine_from_config(settings, "sqlalchemy.")
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    json_renderer = JSON()
    config.add_renderer("json", json_renderer)

    config.include("cornice")

    config.include(".routes")

    config.set_authorization_policy(ACLAuthorizationPolicy())
    # Enable JWT authentication.
    config.include("pyramid_jwt")
    config.set_jwt_authentication_policy("secret", auth_type="Bearer", expiration=3600)

    return config.make_wsgi_app()
