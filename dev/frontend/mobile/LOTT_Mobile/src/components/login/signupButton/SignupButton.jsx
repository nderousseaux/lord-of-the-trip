import React, { useState } from 'react';

import { AlertHelper } from "helpers/AlertHelper.js";
import { signup } from "helpers/AuthHelper.js";
import Button from "components/basics/button/ButtonComponent.jsx";


export default function SignupButton(props){

  const [loading, setLoading] = useState(false);

  
  let pressSignup = () => {
    if (
      props.firstName == '' ||
      props.lastName == '' ||
      props.pseudo == '' ||
      props.login == '' ||
      props.password == '' 
    ){
      AlertHelper.show("error", "Erreur !", "Certains champs sont vides")
    }
    else{
      if (props.password !== props.confirmPassword) {
        AlertHelper.show("error", "Erreur !", "Les mots de passe ne correspondent pas.")
      }
      else{
        signup(
          (a) => setLoading(a), 
          () => {props.navigation.navigate('Signin')},
          props.firstName,
          props.lastName,
          props.pseudo,
          props.login,
          props.password  
        )
      }
    }
  }

  return(    
    <Button
        title="Créer un compte"
        onPress={() => {pressSignup()}}
        type={loading ? 'clear': undefined}
        loading={loading}
        disabled={loading}
    />
  );

}