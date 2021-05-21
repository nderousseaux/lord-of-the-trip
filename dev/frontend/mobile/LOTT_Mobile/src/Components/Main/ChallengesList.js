import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { ListItem } from 'react-native-elements';
import api from '../../api/api';

export default function ChallengeList(props) {
    
    const [isLoading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        api.getChallenges()
        .then((response) => response.data)
        .then((json) => setChallenges(json.challenges))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));

        /*setChallenges(api.getChallengesNoRequest().challenges);
        setLoading(false);*/
    }, []);

    return (
        <>
            {isLoading
                ? <View style={styles.spinnerContainer}><ActivityIndicator size="large" color="#0000ff" /></View>
                : <View style={styles.listContainer}>
                    {challenges?.map((challenge, i) => (
                        <ListItem key={i} onPress={() => props.navigation.navigate("Infos", {
                            challenge: challenge})}>
                            <ListItem.Content>
                                <ListItem.Title>{challenge.name}</ListItem.Title>
                                <ListItem.Subtitle>{new Date(challenge.end_date).toLocaleDateString()}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>))}
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
});