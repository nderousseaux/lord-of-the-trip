from pyramid.paster import get_app, setup_logging
ini_path = '/var/www/lord-of-the-trips/dev/backend/server/production.ini'
setup_logging(ini_path)
application = get_app(ini_path, 'main')