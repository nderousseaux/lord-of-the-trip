import * as React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TextInput } from 'react-native';
import { useState } from 'react';

export default function ChallengeElementModal(props) {

    const [ obstacle, setObstacle ] = useState(props.obstacle);

    return(
        <>
            {obstacle
                ? <>
                    <Text>{obstacle.label}</Text>
                    <Text>Points de l'obstacle : {obstacle.nb_points}</Text>
                    <TextInput 
                        placeholder="Saisissez votre réponse..."
                    />
                </>
                : <ActivityIndicator size="large" color="#0000ff" />
            }
        </>
    );
}