from loftes.models import Event, Challenge, User, Segment, Obstacle, DBSession

def findAllEventForUserByChallenge(user_id,challenge_id):

    data = (
        DBSession.query(Event)
        .filter(Event.user_id == user_id)
        .join(Segment,Event.segment_id==Segment.id)
        .filter(Segment.challenge_id==challenge_id)
        .order_by(Event.event_date.desc())
        .all()
    ) 
    
    return data