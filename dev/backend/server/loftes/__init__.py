from pyramid.renderers import JSON
from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)

    json_renderer = JSON()
    config.add_renderer('json', json_renderer)

    config.include("cornice")

    config.include('.routes')
    return config.make_wsgi_app()
