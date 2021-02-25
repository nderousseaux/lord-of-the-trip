from loftes.cors import cors_policy

from cornice import Service

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

    

