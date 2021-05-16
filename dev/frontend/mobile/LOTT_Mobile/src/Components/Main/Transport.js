import React, {useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Text, Button} from 'react-native-elements';
var _ = require('lodash');

export default function Start(props) {

    const [ challenge, setChallenge ] = useState(props.route.params.challenge);
    const [selectedTransport, setSelectedTransport] = useState("marche");
    
    return(
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text h1 style={{ textAlign:"center", fontWeight: "200"}}>Démarrer un enregistrement</Text>
            </View>
            <View style={styles.bodyBox}>
                <View style={{ flex:1 }}>
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
                    style={styles.Button}
                    onPress={() => props.navigation.navigate("Recording", {
                        challenge: challenge, transport: selectedTransport})}
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
    },
    Button:{
        marginBottom:20
    }
});