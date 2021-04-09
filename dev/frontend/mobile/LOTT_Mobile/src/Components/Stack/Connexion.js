import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';

export default function EditProfile(props) {

    const [login, setLogin] = useState([]);
    const [password, setPassword] = useState([]);

    return(
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text h1 style={{ textAlign:"center", fontWeight: "200"}}>Connexion</Text>
            </View>
            <View style={styles.bodyBox}>
                <Input
                    placeholder='Login'
                    onChangeText={value => setLogin({ login: value })}
                />
                <Input
                    placeholder='Mot de passe'
                    onChangeText={value => setPassword({ password: value })}
                    secureTextEntry={true}
                />
                <View>
                <Button
                            title="Se connecter"
                            onPress={() => {
                                props.navigation.navigate('Home')
                                props.navigation.setOptions({ headerShown: false, })
                            }}
                        />
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
});