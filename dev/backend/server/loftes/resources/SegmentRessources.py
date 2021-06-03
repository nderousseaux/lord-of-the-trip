from loftes.models import Segment, Challenge, CrossingPoint,  DBSession

import json
import math

from PIL import Image
from loftes.utils import get_project_root

def calculate_length_between_two_points(start_point,end_point, map_length, map_heigth):
        
        distance_x = (end_point['position_x'] - start_point['position_x']) * map_length
        distance_y = (end_point['position_y'] - start_point['position_y']) * map_heigth

        distance_x2 = distance_x * distance_x
        distance_y2 = distance_y * distance_y

        real_length = math.sqrt(distance_x2 + distance_y2)

        return real_length

def calculate_segment_length(segment_id):

  segment = DBSession.query(Segment).get(segment_id)
  if segment != None:

    challenge = DBSession.query(Challenge).get(segment.challenge_id)

    if challenge.map_url != None and challenge.map_url != '':

      #Get image dimension
      url = str(get_project_root()) + challenge.map_url
      try:
        img = Image.open(url)
        dim = img.size
        size_length = dim[0]
        size_heigth = dim[1] 

        map_heigth = (challenge.scalling * size_heigth) / size_length

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

          point_length = calculate_length_between_two_points(list_coordinates[i],list_coordinates[i+1], challenge.scalling, map_heigth)
          
          length += point_length
        
        return length

      except OSError as e:
        return 0

    else:
      return 0

  else:
    return 0
