from loftes.models import Event, Challenge, User, Segment, Obstacle, UserChallenge, EventType, DBSession
from sqlalchemy import func

import datetime


def find_all_events_for_user_by_challenge(user_id, challenge_id):

    query = (
        DBSession.query(Event)
        .filter(Event.user_id == user_id)
        .join(Segment, Event.segment_id == Segment.id)
        .filter(Segment.challenge_id == challenge_id)
        .order_by(Event.event_date.desc())
        .order_by(Event.id.desc())
    )

    return query.all()


def distance_event_for_user_by_challenge(user_id, challenge_id):

    data = (
        DBSession.query(func.sum(Event.distance).label("distance"))
        .filter(Event.user_id == user_id)
        .join(Segment, Event.segment_id == Segment.id)
        .filter(Segment.challenge_id == challenge_id)
        .first()
    )

    return data


def distance_event_for_user_by_segment(user_id, segment_id):

    data = (
        DBSession.query(func.sum(Event.distance).label("distance"))
        .filter(Event.user_id == user_id)
        .filter(Event.segment_id == segment_id)
        .first()
    )

    return data


def find_last_event_for_user_by_challenge(user_id, challenge_id):

    query = (
        DBSession.query(Event)
        .filter(Event.user_id == user_id)
        .join(Segment, Event.segment_id == Segment.id)
        .filter(Segment.challenge_id == challenge_id)
        .order_by(Event.event_date.desc())
        .order_by(Event.id.desc())
    )

    return query.first()


def check_challenge_for_event(challenge_id, user_id):

    challenge = DBSession.query(Challenge).get(challenge_id)

    if challenge != None:

        if challenge.draft == True:
            response = "You cannot subscribe to a unfinished challenge"
        else:
            now = datetime.datetime.now()

            if challenge.end_date != None and challenge.end_date < now:
                response = "You cannot use a challenge that has already been terminated."
            else:
                subscribed = (
                    DBSession.query(UserChallenge)
                    .filter(
                        UserChallenge.user_id == user_id,
                        UserChallenge.challenge_id == challenge_id,
                    )
                    .order_by(UserChallenge.id.desc())
                    .first()
                )
                if subscribed == None:
                    response = "You cannot use a challenge where you are not registered."
                else:
                    if subscribed.unsubscribe_date != None:
                        response = "You cannot use a challenge where you are unsubscribed."
                    else:
                        response = ""
    else:
        response = "Requested resource 'Challenge' is not found."

    return response


def check_event_type_rule(event_type_id, user_id, challenge_id, segment_id):

    # Get last challenge subscription
    lastsubscribed = (
        DBSession.query(UserChallenge)
        .filter(UserChallenge.user_id == user_id, UserChallenge.challenge_id == challenge_id)
        .order_by(UserChallenge.id.desc())
        .first()
    )

    if (lastsubscribed == None) or (lastsubscribed.unsubscribe_date != None):
        return "You are not subcribed to this challenge"

    lastevent = (
        DBSession.query(Event)
        .filter(Event.user_id == user_id)
        .join(Segment, Event.segment_id == Segment.id)
        .filter(Segment.challenge_id == challenge_id)
        .order_by(Event.id.desc())
        .first()
    )

    if lastevent != None:
        eventtype = DBSession.query(EventType).get(lastevent.event_type_id)

    # Except for START, all the other event must follow another
    if event_type_id != 1:
        if (lastevent == None) or (lastevent.event_date < lastsubscribed.subscribe_date):
            return "You must start the challenge first"

    # Event_type = 1 => START
    if (event_type_id == 1) and (lastevent != None):
        if lastevent.event_date > lastsubscribed.subscribe_date:
            return "You already have started this challenge"

    # Event_type = 2 => ARRIVAL
    if (event_type_id == 2) and (lastevent.event_type_id != 3):
        return "The last event before 'ARRIVAL' must be 'MOVE' not '" + eventtype.code + "'"

    # Event_type = 3 => MOVE
    if event_type_id == 3:
        if (
            (lastevent.event_type_id != 1)
            and (lastevent.event_type_id != 3)
            and (lastevent.event_type_id != 6)
            and (lastevent.event_type_id != 9)
        ):
            return (
                "The last event before 'MOVE' must be 'START','MOVE' ,'OBSTACLE_REP_OK' or 'CHOOSE_SEGMENT', not '"
                + eventtype.code
                + "'"
            )

    # Event_type = 4 => OBSTACLE_ARR
    if (event_type_id == 4) and (lastevent.event_type_id != 3):
        return "The last event before 'OBSTACLE_ARR' must be 'MOVE', not '" + eventtype.code + "'"

    # Event_type = 5 => OBSTACLE_REP
    if event_type_id == 5:
        if (lastevent.event_type_id != 4) and (lastevent.event_type_id != 7):
            return (
                "The last event before 'OBSTACLE_REP' must be 'OBSTACLE_ARR' or 'OBSTACLE_REP_KO', not '"
                + eventtype.code
                + "'"
            )

    # Event_type = 6 => OBSTACLE_REP_OK
    if (event_type_id == 6) and (lastevent.event_type_id != 5):
        return "The last event before 'OBSTACLE_REP_OK' must be 'OBSTACLE_REP', not '" + eventtype.code + "'"

    # Event_type = 7 => OBSTACLE_REP_KO
    if (event_type_id == 7) and (lastevent.event_type_id != 5):
        return "The last event before 'OBSTACLE_REP_KO' must be 'OBSTACLE_REP', not '" + eventtype.code + "'"

    # Event_type = 8 => CROSS_PT_ARRIVAL
    if (event_type_id == 8) and (lastevent.event_type_id != 3):
        return "The last event before 'CROSS_PT_ARRIVAL' must be 'MOVE', not '" + eventtype.code + "'"

    # Event_type = 9 => CHOOSE_SEGMENT
    if (event_type_id == 9) and (lastevent.event_type_id != 8):
        return "The last event before 'CHOOSE_SEGMENT' must be 'CROSS_PT_ARRIVAL', not '" + eventtype.code + "'"


def find_event_responded_with_photo(user_id, obstacle_id):

    query = DBSession.query(Event).filter(
        Event.obstacle_id == obstacle_id,
        Event.user_id == user_id,
        Event.photo_response_url != None,
        Event.proceeded == False,
    )

    return query.all()


def find_obstacles_responses_to_verify_by_admin(user_id):

    query = (
        DBSession.query(Event)
        .join(Segment, Event.segment_id == Segment.id)
        .join(Challenge, Challenge.id == Segment.challenge_id)
        .join(Obstacle, Obstacle.id == Event.obstacle_id)
        .filter(Event.proceeded == False, Event.event_type_id == 5, Event.photo_response_url != None)
        .filter(Challenge.admin_id == user_id)
        .filter(Obstacle.question_type == 1)
        .order_by(Event.event_date)
    )

    return query.all()
