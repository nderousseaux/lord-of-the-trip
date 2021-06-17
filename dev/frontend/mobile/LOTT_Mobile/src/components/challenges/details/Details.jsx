import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView } from "react-native";
import { Icon } from 'react-native-elements'

import { timeFormat } from 'helpers/DateHelper.js';
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';
import ChallengesService from 'services/challenges/Challenges.service.js'
import styles from './Details.style.js';
import colors  from 'colors/Colors.style.js'
import { distanceFormat } from 'helpers/ChallengesHelper.js';


export default function Description(props){

  const [{ challengeSelected }] = ChallengesConsumerHook();
  const [nbObstacles, setNbObstacles] = useState(0)
  const [nbSegments, setNbSegments] = useState(0)
  const [nbSubscribers, setNbSubscribers] = useState(0)
  const [progression, setProgression] = useState(0)
  const [time, setTime] = useState(0)
  const [transport, setTransport] = useState(null)

  useEffect(() => {
    let nbObst = 0
    challengeSelected.segments.forEach(segment => {
      nbObst += segment.obstacles.length
    })
    setNbObstacles(nbObst)
    setNbSegments(challengeSelected.segments.length)
    setNbSubscribers(challengeSelected.nb_subscribers)

    if(props.route.params.type != 'subscribing'){

      ChallengesService.getStatistiques(challengeSelected.id)
      .then((res) => {
        let t = 0
        for (const [key, value] of Object.entries(res.data.statistics.results)) {
          t += value.time
        }
        setTime(t)
        setProgression(res.data.statistics.distance)
        setTransport(res.data.statistics.average_move_type)
      })
      .catch((err) => {
        console.log(err.response)
      })

    }

  }, [challengeSelected]);

  return(   
    <ScrollView horizontal>
        <View style={styles.mainContainer}>
      { nbObstacles != 0
        ? <View style={styles.oneDetailContainer}>
            <Text style={styles.textTitle}>
              OBSTACLES
            </Text>
            <Icon
              style={styles.icon}
              name='shield-alt' 
              type='font-awesome-5'
              size='40'
              color={colors.primary}
            />
            <Text style={styles.textMain}>
              {nbObstacles}
            </Text>

          </View>
        : <></>
      }

      { nbSegments != 0
        ? <View style={styles.oneDetailContainer}>
            <Text style={styles.textTitle}>
              SEGMENTS
            </Text>
            <Icon
              style={styles.icon}
              name='road' 
              type='font-awesome-5'
              size='42'
              color={colors.primary}
            />
            <Text style={styles.textMain}>
              {nbSegments}
            </Text>

          </View>
        : <></>
      }

      { nbSubscribers != 0
        ? <View style={styles.oneDetailContainer}>
            <Text style={styles.textTitle}>
              INSCRITS
            </Text>
            <Icon
              style={styles.icon}
              name='users' 
              type='font-awesome'
              size='42'
              color={colors.primary}
            />
            <Text style={styles.textMain}>
              {nbSubscribers}
            </Text>

          </View>
        : <></>
      }

      { progression != 0
        ? <View style={styles.oneDetailContainer}>
            <Text style={styles.textTitle}>
              PARCOURU
            </Text>
            <Icon
              style={styles.icon}
              name='shoe-prints' 
              type='font-awesome-5'
              size='42'
              color={colors.primary}
            />
            <Text style={styles.textMain}>
              {distanceFormat(progression).distance + ' ' + distanceFormat(progression).unitee}
            </Text>

          </View>
        : <></>
      }
      { time != 0
        ? <View style={styles.oneDetailContainer}>
            <Text style={styles.textTitle}>
              TEMPS
            </Text>
            <Icon
              style={styles.icon}
              name='stopwatch' 
              type='font-awesome-5'
              size='42'
              color={colors.primary}
            />
            <Text style={styles.textMain}>
              {timeFormat(Math.trunc(time/1000)).duree}
            </Text>
            <Text style={styles.textMain}>
              {timeFormat(Math.trunc(time/1000)).unitee}
            </Text>


          </View>
        : <></>
        
      }
      
      { transport != null
        ? <View style={styles.oneDetailContainer}>
            <Text style={styles.textTitle}>
              TRANSPORT
            </Text>
            <Icon
              style={styles.icon}
              name='fighter-jet' 
              type='font-awesome-5'
              size='42'
              color={colors.primary}
            />
            <Text style={styles.textMain}>
              Privilégié :
            </Text>
            <Text style={styles.textMain}>
              { transport == 0
                ? 'Marche'
                : transport == 1
                ? 'Course'
                : 'Vélo'
              }
            </Text>


          </View>
        : <></>
        
      }

        {/* <Text>
            {nbObstacles}/  
            {nbSegments}/
            {nbSubscribers}/
            {progression}/
            {transport}/
            {time}
        </Text> */}
    </View>
      
    </ScrollView> 
  
  );

}