from pyramid.renderers import JSON
from pyramid.config import Configurator

from sqlalchemy import engine_from_config
from loftes.models import DBSession, Base


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("pyramid_tm")
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    json_renderer = JSON()
    config.add_renderer('json', json_renderer)

    config.include("cornice")

    config.include('.routes')
    return config.make_wsgi_app()
