from sqlalchemy import exc
from loftes.models import Obstacle, DBSession

def check_response(obstacle_id,response):

    obstacle = DBSession.query(Obstacle).get(obstacle_id)

    if obstacle  == None:
        return 0
    else:
        if (response.upper() == obstacle.result.upper()):
            return 6
        else:
            return 7