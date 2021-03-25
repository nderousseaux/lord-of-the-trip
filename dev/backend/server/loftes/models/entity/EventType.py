import enum

class EventType(enum.Enum):
    SUBSCRIBE = 1
    START = 2
    ARRIVAL = 3
    MOVE = 4
    CROSS_PT_ARRIVAL = 5
    CHOOSE_SEGMENT = 6
    OBSTACLE_ARR = 7
    OBSTACLE_REP = 8
    OBSTACLE_REP_OK = 9
    OBSTACLE_REP_KO = 10
