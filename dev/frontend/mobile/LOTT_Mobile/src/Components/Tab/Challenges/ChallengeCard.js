import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

export default function ChallengeCard(props) {

    const [ challenge ] = useState(props.route.params.challenge);

    console.log(challenge);

    return(
        <View style={styles.cardContainer}>
            {challenge === null
                ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                    {console.log(challenge)}
                    <Text>{"Nom : " + challenge.name}</Text>
                    <Text>{"Longueur : " + challenge.length + "kms"}</Text>
                    <Text>{"Expiration : " + new Date(challenge.duration).toLocaleDateString()}</Text>
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
    }
});