import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import axios from 'axios';
import {API_URL} from "@env"
import { saveUserToken } from '../../ReduxElements/Action.js'
import * as SecureStore from 'expo-secure-store';


export default function Connexion(props) {

    const [login, setLogin] = useState('potter@hotmail.com');
    const [password, setPassword] = useState('hogwarts');
    const [error, setError] = useState(false);
    const [badCredentials, setBadCredentials] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleConnexion() {

        setError(false);
        setBadCredentials(false);
        setLoading(true);

        axios.post(API_URL + '/login', { email: login, password: password })
            .then(function (response) {
                SecureStore.setItemAsync('secure-token', response.data.token)
                props.navigation.navigate('Home');
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                if (error.response.status === 401) {
                    setBadCredentials(true);
                } else {
                    setError(true);
                }
            });
            
        setLoading(false);
    }

    return(
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text h1 style={{ textAlign:"center", fontWeight: "200"}}>Connexion</Text>
            </View>
            <View style={styles.bodyBox}>
                <Input
                    placeholder='Login'
                    value={login}
                    onChangeText={value => setLogin(value)}
                />
                <Input
                    placeholder='Mot de passe'
                    value={password}
                    onChangeText={value => setPassword(value)}
                    secureTextEntry={true}
                />
                <Button
                    
                    title="Se connecter"
                    onPress={() => {
                        handleConnexion();
                        props.navigation.setOptions({ headerShown: false, })
                    }}
                />
                <View style={styles.validateArea}>
                    {(error && !loading) && <Text style={{color: "red"}}>Une erreur est survenue lors de la connexion</Text>}
                    {(badCredentials && !loading) && <Text style={{color: "red"}}>Identifiants incorrects</Text>}
                    {loading && <ActivityIndicator size='large' color="blue"/>}
                </View>
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
    validateArea: {
        alignItems: 'center',
        width: '100%'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#ff00ff"
    }
});