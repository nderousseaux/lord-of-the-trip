from loftes.models import Obstacle, Segment, Challenge, Event, DBSession


def find_all_obstacles_by_challenge(challenge_id):

    query = (
        DBSession.query(Obstacle)
        .join(Segment, Obstacle.segment_id == Segment.id)
        .filter(Segment.challenge_id == challenge_id)
    )

    return query.all()


def find_all_obstacles_by_segment(segment):

    query = (
        DBSession.query(Obstacle)
        .join(Segment, Obstacle.segment_id == Segment.id)
        .filter(Obstacle.segment_id == segment.id, Segment.challenge_id == segment.challenge.id)
    )

    return query.all()


def check_obstacles_position(segment, position):

    obstacle = (
        DBSession.query(Obstacle)
        .join(Segment, Obstacle.segment_id == Segment.id)
        .filter(Obstacle.segment_id == segment.id, Obstacle.progress == position)
        .first()
    )

    return obstacle
