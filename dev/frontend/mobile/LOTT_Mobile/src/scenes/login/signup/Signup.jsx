import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from "react-native";

import Button from "components/basics/button/ButtonComponent.jsx";
import Input from "components/basics/input/InputComponent.jsx";
import styles from "./Signup.style.js";
import SignupButton from "../../../components/login/signupButton/SignupButton.jsx";

export default function Signup(props){

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let pressSignin = () => {
    props.navigation.navigate('Signin');
  }

  return(    
  
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior="padding"
    >

      <Input
        label='Prénom'
        placeholder='Jean'
        value={firstName}
        onChangeText={value => setFirstName(value)}
      ></Input>

      <Input
        label='Nom'
        placeholder='Dupont'
        value={lastName}
        onChangeText={value => setLastName(value)}
      ></Input>

      <Input
        label='Pseudo'
        placeholder='superDupont67'
        value={pseudo}
        onChangeText={value => setPseudo(value)}
      ></Input>

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

      <Input
        label='Confirmation du mot de passe'
        placeholder='secret'
        secureTextEntry
        value={confirmPassword}
        onChangeText={value => setConfirmPassword(value)}
      ></Input>

      <SignupButton
        firstName={firstName}
        lastName={lastName}
        pseudo={pseudo}
        login={login}
        password={password}
        confirmPassword={confirmPassword}
        {...props}
      />

      <View style={styles.bottonContainer}>
        <Button
          title="J'ai déjà un compte"
          type='clear'
          onPress={() => {pressSignin()}}
        />  
      </View>

    </KeyboardAvoidingView>
  );

}