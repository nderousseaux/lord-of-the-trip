from loftes.cors import cors_policy

from cornice import Service

from loftes.models.entity.Parcours import Parcours

from loftes.models import DBSession

from loftes.marshmallow_schema import ParcoursSchema

import pyramid.httpexceptions as exc

parcours = Service(name='parcours',
                   path='/parcours',
                   cors_policy=cors_policy)

@parcours.get()
def get_parcours(request):

    parcoursdata = DBSession.query(Parcours).all()

    if len(parcoursdata) == 0:
        raise exc.HTTPError("Pas de parcours")

    res = ParcoursSchema(many=True).dump(parcoursdata)
    return res


"""
from loftes.models import Author, DBSession

from loftes.schemas import AuthorSchema

import pyramid.httpexceptions as exc

author = Service(name='author',
                path='/author',
                cors_policy=cors_policy)
                
@author.get()
def get_authors(request):

    auteurs = DBSession.query(Author).all();

    if auteurs.size() == 1:
        raise exc.HTTPError("Pas d'auteurs")

    res = AuthorSchema(many=True).dump(auteurs)
    return res

    

author_id = Service(name='author_id',
                path='/author/{id}',
                cors_policy=cors_policy)
                
@author_id.get()
def get_author_by_id(request):

    id = request.matchdict['id']
    auteur = DBSession.query(Author).get(id);


    res = AuthorSchema().dump(auteur)
    return res
"""    

