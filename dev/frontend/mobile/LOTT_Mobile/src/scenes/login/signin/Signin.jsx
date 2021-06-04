import React, { useState } from 'react';
import { View, Image } from "react-native";

import Button from "components/basics/button/ButtonComponent.jsx";
import Input from "components/basics/input/InputComponent.jsx";
import styles from "./Signin.style.js";
import SigninButton from "../../../components/login/signinButton/SigninButton.jsx";
let icon = require('assets/icon.png')


export default function Signin(props){

  const [login, setLogin] = useState('potter@hotmail.com');
  const [password, setPassword] = useState('hogwarts');

  let pressSignup = () => {
    props.navigation.navigate('Signup');
  }

  return(    
    <View style={styles.mainContainer}>

      <Image
        style={styles.icon}
        source={icon}
      />

      <Input
        label='Identifiant'
        placeholder='exemple@exemple.com'
        value={login}
        onChangeText={value => setLogin(value)}
      ></Input>

      <Input
        label='Mot de passe'
        placeholder='secret'
        secureTextEntry
        value={password}
        onChangeText={value => setPassword(value)}
      ></Input>
      
      <SigninButton
        login={login}
        password={password}
        {...props}
      />

      <View style={styles.bottonContainer}>
        <Button
          title="Pas de compte ?"
          type='clear'
          onPress={() => {pressSignup()}}
        />  
      </View>

    </View>
  );

}