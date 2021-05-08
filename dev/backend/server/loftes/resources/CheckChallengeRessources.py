class Ant:
    def __init__(self, currentPosition, road=None):
        self.status = "moving" # Status de la fourmi, peut être moving, blocked, islost ou arrived
        # Liste des crossing point par laquelle la fourmi est passée
        if road == None:
            self.road = []
        else:
            self.road = road
        self.currentPosition = currentPosition

    def cloneHimself(self):
        return Ant(self.currentPosition, self.road.copy())

    def move(self, position):
        self.road.append(self.currentPosition)
        self.currentPosition = position


def allAntsBlocked(ants):
    for ant in ants:
        if ant.status == "moving":
            return False
    
    return True


# Pour un crossing point, on regarde tout les crossing_points relié
def crossingPointConnect(crossingPoint):
    arrival = []

    segments_start = crossingPoint.segments_start
    
    # On ajoute à la liste le crossing point si il n'existe pas
    for segment in segments_start:
        if not segment.end_crossing_point in arrival:
            arrival.append(segment.end_crossing_point)

    return arrival

# Renvoie la liste entre deux occurences d'un élément
def listElementBetweenItem(seq,item):
    subList = []

    recording = False
    
    for elem in seq:
        if not recording and elem == item:
            recording == True
            subList.append(elem)
        
        elif recording and elem != item:
            subList.append(elem)
    
        elif recording and elem == item:
            subList.append(elem)
            return subList


def checkChallenge(challenge):
    loop, deadend = [], []

    starting_point = challenge.start_crossing_point

    #On prépare une armée de fourmis, elles sont sur un crossing point
    ants = [ Ant(starting_point) ]

    # On fait bouger les fourmis
    while not allAntsBlocked(ants):

        # Pour chaque fourmi qui bouge
        for ant in [ant for ant in ants if ant.status == "moving"]:

            #On regarde les choix que la fourmi à devant elle
            choix = crossingPointConnect(ant.currentPosition)

            # Si elle n'a rien devant elle, c'est un cul de sac
            if len(choix) == 0:
                ant.status = "blocked"

            # Sinon elle bouge
            else:
                # Si elle à plusieur possibilités, elle se dédouble autant de foix qu'il faudra  
                while len(choix) > 1:
                    enfant = ant.cloneHimself()
                    ants.append(enfant)
                    enfant.move(choix.pop())

                ant.move(choix.pop())

            #Si la fourmi est arrivée
            if ant.currentPosition == challenge.end_crossing_point:
                ant.status = "arrived"

            #Si la fourmi est déjà passée par là
            if ant.currentPosition in ant.road:
                
                ant.status = "isLost"

    #Si certaines fourmis sont bloquée on renvoie leur position
    for ant in [ant for ant in ants if ant.status == "blocked"]:
        deadend.append(ant.currentPosition)

    #Si certaines fourmis tournent en rond, on renvoie leurs boucles
    for ant in [ant for ant in ants if ant.status == "isLost"]:
        loop.append(ant.road[ant.road.index(ant.currentPosition):])


    return loop, deadend