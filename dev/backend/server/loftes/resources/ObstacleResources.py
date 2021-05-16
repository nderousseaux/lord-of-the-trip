from loftes.models import Obstacle, Segment, DBSession


def find_all_obstacles_by_challenge(challenge_id):

    query = (
        DBSession.query(Obstacle)
        .join(Segment, Obstacle.segment_id == Segment.id)
        .filter(Segment.challenge_id == challenge_id)
    )

    return query.all()


def find_all_obstacles_by_segment(segment_id, challenge_id):

    query = (
        DBSession.query(Obstacle)
        .join(Segment, Obstacle.segment_id == Segment.id)
        .filter(Obstacle.segment_id == segment_id, Segment.challenge_id == challenge_id)
    )

    return query.all()
