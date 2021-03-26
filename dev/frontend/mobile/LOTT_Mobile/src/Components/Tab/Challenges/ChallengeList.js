import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { ListItem } from 'react-native-elements';
import api from '../../../api/api';

export default function ChallengeList(props) {
    
    const [isLoading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        api.getChallenges()
        .then((response) => response.data)
        .then((json) => setChallenges(json.challenges))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            {isLoading
                ? <ActivityIndicator size="large" color="#0000ff" />
                : challenges?.map((challenge, i) => (
                    <ListItem key={i} onPress={() => props.navigation.navigate("Card")}>
                        <ListItem.Content>
                            <ListItem.Title>{challenge.name}</ListItem.Title>
                            <ListItem.Subtitle>{challenge.duration}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});