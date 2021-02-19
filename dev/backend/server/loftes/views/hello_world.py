from loftes.cors import cors_policy

from cornice import Service


first = Service(name='first',
                path='/',
                cors_policy=cors_policy)
                
@first.get()
def get_first(request):
    return 'Salut monde !'
