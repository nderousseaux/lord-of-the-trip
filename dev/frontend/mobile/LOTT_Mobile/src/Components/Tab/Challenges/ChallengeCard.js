import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Svg, { Polyline, Image } from 'react-native-svg';

export default function ChallengeCard(props) {

    const [ challenge ] = useState(props.route.params.challenge);

    const [ coordinatesValues, setCoordinatesValues ] = useState(() => {
        let value = "";

        challenge?.parkour?.forEach(segment => {
            segment.points?.forEach(point => {
                value += point.x * 100 + "," + point.y * 100 + " ";
            });
        })

        return value;
    });

    console.log(coordinatesValues);

    return(
        <View style={styles.cardContainer}>
            {challenge === null
                ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                    {console.log(challenge)}
                    <Text>{"Nom : " + challenge.name}</Text>
                    <Text>{"Longueur : " + challenge.length + "kms"}</Text>
                    <Text>{"Expiration : " + new Date(challenge.duration).toLocaleDateString()}</Text>
                    <Svg 
                        height="100%"
                        width="100%"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMinYMin slice" 
                        style={styles.svgContainer}
                    >
                        <Image
                            width="100%"
                            height="100%"
                            //href={"https://upload.wikimedia.org/wikipedia/commons/9/9a/PNG_transparency_demonstration_2.png"}
                        />
                        <Polyline
                            points={coordinatesValues ? coordinatesValues : ""}
                            fill="none"
                            stroke="black"
                            strokeWidth="1"
                        />
                    </Svg>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    svgContainer: {
        backgroundColor: 'lightgrey'
    }
});