from loftes.models import Obstacle, Segment, DBSession


def findAllObstaclesByChallenge(challenge_id):

    data = (
        DBSession.query(Obstacle)
        .join(Segment, Obstacle.segment_id == Segment.id)
        .filter(Segment.challenge_id == challenge_id)
        .all()
    )

    return data


def findAllObstaclesBySegment(segment_id, challenge_id):

    data = (
        DBSession.query(Obstacle)
        .join(Segment, Obstacle.segment_id == Segment.id)
        .filter(Obstacle.segment_id == segment_id, Segment.challenge_id == challenge_id)
        .all()
    )

    return data
