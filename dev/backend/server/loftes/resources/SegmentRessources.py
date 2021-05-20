from loftes.models import Segment, Challenge, CrossingPoint,  DBSession

import json
import math

def calculate_Length_betweeb_Two_Points(start_point,end_point, scalling):
        
        distance_x = end_point['position_x'] - start_point['position_x']
        distance_y = end_point['position_y'] - start_point['position_y']

        distance_x2 = distance_x * distance_x
        distance_y2 = distance_y * distance_y

        pixel_length = math.sqrt(distance_x2 + distance_y2)

        real_length = pixel_length * scalling

        return real_length

def calculate_segment_Length(segment_id):

  segment = DBSession.query(Segment).get(segment_id)
  if segment != None:

    challenge = DBSession.query(Challenge).get(segment.challenge_id)
    start_crossing_point = DBSession.query(CrossingPoint).get(segment.start_crossing_point_id)
    end_crossing_point = DBSession.query(CrossingPoint).get(segment.end_crossing_point_id)

    list_coordinates = json.loads(segment.coordinates)
    start = {
      "position_x": start_crossing_point.position_x,
      "position_y": start_crossing_point.position_y
    }
    list_coordinates.insert(0, start)

    end = {
      "position_x": end_crossing_point.position_x,
      "position_y": end_crossing_point.position_y
    }
    list_coordinates.append(end)

    n = len(list_coordinates) - 1
    #ICI start + End

    length = 0
    for i in range(0,n):

      point_length = calculate_Length_betweeb_Two_Points(list_coordinates[i],list_coordinates[i+1], challenge.scalling)
      
      length += point_length
    
    return length

  else:
    return 0
