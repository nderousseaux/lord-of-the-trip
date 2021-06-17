from loftes.models import Event, Challenge, User, Segment, Obstacle, UserChallenge, EventType, DBSession
from sqlalchemy import func, desc

import datetime


class EventResources:
    def find_all_events_for_user_by_challenge(self, user_id, challenge_id):

        query = (
            DBSession.query(Event)
            .filter(Event.user_id == user_id)
            .join(Segment, Event.segment_id == Segment.id)
            .filter(Segment.challenge_id == challenge_id)
            .order_by(Event.event_date.desc())
            .order_by(Event.id.desc())
        )

        return query.all()

    def distance_event_for_user_by_challenge(self, user_id, challenge_id):

        data = (
            DBSession.query(func.sum(Event.distance).label("distance"))
            .filter(Event.user_id == user_id)
            .join(Segment, Event.segment_id == Segment.id)
            .filter(Segment.challenge_id == challenge_id)
            .first()
        )

        return data

    def distance_event_for_user_by_segment(self, user_id, segment_id):

        data = (
            DBSession.query(func.sum(Event.distance).label("distance"))
            .filter(Event.user_id == user_id)
            .filter(Event.segment_id == segment_id)
            .first()
        )

        return data

    def find_last_event_for_user_by_challenge(self, user_id, challenge_id):

        query = (
            DBSession.query(Event)
            .filter(Event.user_id == user_id)
            .join(Segment, Event.segment_id == Segment.id)
            .filter(Segment.challenge_id == challenge_id)
            .order_by(Event.event_date.desc())
            .order_by(Event.id.desc())
        )

        return query.first()

    def check_challenge_for_event(self, challenge_id, user_id):

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

    def check_event_type_rule(self, event_type_id, user_id, challenge_id, segment_id):

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

    def find_event_responded_with_photo(self, user_id, obstacle_id):

        query = DBSession.query(Event).filter(
            Event.obstacle_id == obstacle_id,
            Event.user_id == user_id,
            Event.photo_response_url != None,
            Event.proceeded == False,
        )

        return query.all()

    def find_obstacles_responses_to_verify_by_admin(self, user_id):

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

    def sum_events_distance_by_challenge(self, user_id, challenge_id, param_date):

        if param_date == None:
            query = (
                DBSession.query(func.sum(Event.distance).label("distance"))
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.event_type_id == 3, Event.user_id == user_id)
                .filter(Segment.challenge_id == challenge_id)
            )

        else:
            query = (
                DBSession.query(func.sum(Event.distance).label("distance"))
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.event_type_id == 3, Event.user_id == user_id, Event.event_date >= param_date)
                .filter(Segment.challenge_id == challenge_id)
            )

        distance = 0 if query.all()[0].distance == None else query.all()[0].distance

        return distance

    def sum_events_time_by_challenge(self, user_id, challenge_id, param_date):

        if param_date == None:

            query = (
                DBSession.query(Event)
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.event_type_id == 1, Event.user_id == user_id)
                .filter(Segment.challenge_id == challenge_id)
                .order_by(Event.event_date)
            )

        else:

            query = (
                DBSession.query(Event)
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.user_id == user_id, Event.event_date >= param_date)
                .filter(Segment.challenge_id == challenge_id)
                .order_by(Event.event_date)
            )

        time = 0

        event_start = query.first()

        if event_start != None:

            event_start_date = event_start.event_date

            diff = datetime.datetime.now() - event_start_date

            time = diff.total_seconds()

        return time

    def avg_events_move_type_by_challenge(self, user_id, challenge_id, param_date):

        if param_date == None:

            q1 = (
                DBSession.query(func.count(Event.id).label("nb_move_type"))
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.user_id == user_id, Event.move_type != None)
                .filter(Segment.challenge_id == challenge_id)
                .group_by(Event.move_type)
                .order_by(desc("nb_move_type"))
            )

            ct_max = None if q1.first() == None else q1.first()[0]

            avg_move_type = None

            if ct_max != None:

                q2 = (
                    DBSession.query(Event.move_type)
                    .join(Segment, Segment.id == Event.segment_id)
                    .filter(Event.user_id == user_id, Event.move_type != None)
                    .filter(Segment.challenge_id == challenge_id)
                    .group_by(Event.move_type)
                    .having(func.count(Event.id) == ct_max)
                )

                avg_move_type = []
                if len(q2.all()) == 1:
                    avg_move_type = q2.all()[0].move_type

                elif len(q2.all()) > 1:
                    for result in q2.all():
                        avg_move_type.append(result.move_type)

        else:

            q1 = (
                DBSession.query(func.count(Event.id).label("nb_move_type"))
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.user_id == user_id, Event.move_type != None, Event.event_date >= param_date)
                .filter(Segment.challenge_id == challenge_id)
                .group_by(Event.move_type)
                .order_by(desc("nb_move_type"))
            )

            ct_max = None if q1.first() == None else q1.first()[0]

            avg_move_type = None

            if ct_max != None:

                q2 = (
                    DBSession.query(Event.move_type)
                    .join(Segment, Segment.id == Event.segment_id)
                    .filter(Event.user_id == user_id, Event.move_type != None, Event.event_date >= param_date)
                    .filter(Segment.challenge_id == challenge_id)
                    .group_by(Event.move_type)
                    .having(func.count(Event.id) == ct_max)
                )

                avg_move_type = []
                if len(q2.all()) == 1:
                    avg_move_type = q2.all()[0].move_type

                elif len(q2.all()) > 1:
                    for result in q2.all():
                        avg_move_type.append(result.move_type)

        return avg_move_type

    def avg_events_move_type_by_challenges_subscribed(self, user_id, challenges_ids, param_date):

        if param_date == None:

            q1 = (
                DBSession.query(func.count(Event.id).label("nb_move_type"))
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.user_id == user_id, Event.move_type != None)
                .filter(Segment.challenge_id.in_(challenges_ids))
                .group_by(Event.move_type)
                .order_by(desc("nb_move_type"))
            )

            ct_max = None if q1.first() == None else q1.first()[0]

            avg_move_type = None

            if ct_max != None:

                q2 = (
                    DBSession.query(Event.move_type)
                    .join(Segment, Segment.id == Event.segment_id)
                    .filter(Event.user_id == user_id, Event.move_type != None)
                    .filter(Segment.challenge_id.in_(challenges_ids))
                    .group_by(Event.move_type)
                    .having(func.count(Event.id) == ct_max)
                )

                avg_move_type = []
                if len(q2.all()) == 1:
                    avg_move_type = q2.all()[0].move_type

                elif len(q2.all()) > 1:
                    for result in q2.all():
                        avg_move_type.append(result.move_type)

        else:

            q1 = (
                DBSession.query(func.count(Event.id).label("nb_move_type"))
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.user_id == user_id, Event.move_type != None, Event.event_date >= param_date)
                .filter(Segment.challenge_id.in_(challenges_ids))
                .group_by(Event.move_type)
                .order_by(desc("nb_move_type"))
            )

            ct_max = None if q1.first() == None else q1.first()[0]

            avg_move_type = None

            if ct_max != None:

                q2 = (
                    DBSession.query(Event.move_type)
                    .join(Segment, Segment.id == Event.segment_id)
                    .filter(Event.user_id == user_id, Event.move_type != None, Event.event_date >= param_date)
                    .filter(Segment.challenge_id.in_(challenges_ids))
                    .group_by(Event.move_type)
                    .having(func.count(Event.id) == ct_max)
                )

                avg_move_type = []
                if len(q2.all()) == 1:
                    avg_move_type = q2.all()[0].move_type

                elif len(q2.all()) > 1:
                    for result in q2.all():
                        avg_move_type.append(result.move_type)

        return avg_move_type

    def sum_events_distance_and_time_by_move_type(self, user_id, challenge_id, param_date):

        if param_date == None:
            query = (
                DBSession.query(
                    Event.move_type.label("move_type"),
                    func.sum(Event.distance).label("distance"),
                    func.sum(Event.duration).label("time"),
                )
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.event_type_id == 3, Event.user_id == user_id)
                .filter(Segment.challenge_id == challenge_id)
                .group_by(Event.move_type)
            )

        else:
            query = (
                DBSession.query(
                    Event.move_type.label("move_type"),
                    func.sum(Event.distance).label("distance"),
                    func.sum(Event.duration).label("time"),
                )
                .join(Segment, Segment.id == Event.segment_id)
                .filter(Event.event_type_id == 3, Event.user_id == user_id, Event.event_date >= param_date)
                .filter(Segment.challenge_id == challenge_id)
                .group_by(Event.move_type)
            )

        acceptable_move_types = [1, 2, 3]
        results = {}
        for query in query.all():
            if query.move_type in acceptable_move_types:
                distance = 0 if query.distance == None else query.distance
                time = 0 if query.time == None else query.time
                results.update({query.move_type: {"distance": distance, "time": time}})

        return results

    def find_arrival_date_for_user_by_challenge(self, user_id, challenge_id):
        query = (
            DBSession.query(
                Event,
            )
            .join(Segment, Segment.id == Event.segment_id)
            .filter(Event.event_type_id == 2, Event.user_id == user_id)
            .filter(Segment.challenge_id == challenge_id)
        )

        event_date = None
        if query.first() != None:
            if query.first().event_date != None:
                event_date = query.first().event_date.strftime("%d/%m/%Y")

        return event_date
