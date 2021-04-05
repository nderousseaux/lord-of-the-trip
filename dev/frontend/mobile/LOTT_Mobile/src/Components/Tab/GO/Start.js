import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Text, Button} from 'react-native-elements';
import api from '../../../api/api';


export default function Start(props) {

    const [isLoading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(); //TODO:State undefined si on change pas le selected challenge
    const [selectedTransport, setSelectedTransport] = useState("marche");
    

    useEffect(() => {
        api.getChallenges()
        .then((response) => response.data)
        .then((json) => setChallenges(json.challenges))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    
    return(
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text h1 style={{ textAlign:"center", fontWeight: "200"}}>Démarrer un enregistrement</Text>
            </View>
            <View style={styles.bodyBox}>
                {isLoading ? 
                    <View style={styles.spinnerContainer}><ActivityIndicator size="large" color="#0000ff" /></View> :
                    <View style={styles.challengeBox}>
                        <Text h4 style={{ textAlign:"center", fontWeight: "400"}}>Choisir un challenge</Text>
                        <Picker style={{width: 350, height: 132}} itemStyle={{height: 132}}
                            selectedValue={selectedChallenge}
                            onValueChange={(itemValue, itemIndex) => setSelectedChallenge(itemValue)}
                        >
                            {challenges?.map((challenge) => (
                                <Picker.Item label={challenge["name"]} value={challenge["id"]} />
                            ))}
                        </Picker>
                    </View>
                }
                <View style={{ flex:2 }}>
                </View>
                <View style={styles.deplacementBox}>
                    <Text h4 style={{ textAlign:"center", fontWeight: "400"}}>Choisir un moyen de déplacement</Text>
                    <Picker style={{width: 350, height: 88}} itemStyle={{height: 132}}
                        selectedValue={selectedTransport}
                        onValueChange={(itemValue, itemIndex) => setSelectedTransport(itemValue)}
                    >
                        <Picker.Item label="Marche" value="marche" />
                        <Picker.Item label="Course à pied" value="course" />
                        <Picker.Item label="Vélo" value="velo" />
                    </Picker>
                </View>
                <View style={{ flex:1 }}>
                </View>
                <Button
                    title="Lancer un enregistrement"
                    onPress={() => props.navigation.navigate("Recording", {
                        challenge: selectedChallenge, transport: selectedTransport})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBox: {
        flex:3,
        // backgroundColor: 'red',
        justifyContent:'center',
        alignItems:'center'
    },
    bodyBox: {
        flex:6,
    },
    challengeBox:{
        flex:2,
        alignItems:'center',
        // backgroundColor: 'blue'
    },
    deplacementBox:{
        flex:2,
        alignItems:'center',
        // backgroundColor: 'purple'
    }
});