import React, { useState } from 'react';

import { UserConsumerHook } from 'store/user/User.store.js';
import Button from "components/basics/button/ButtonComponent.jsx";
import { signin } from "helpers/AuthHelper.js";
import { ChallengesConsumerHook } from 'store/challenges/Challenges.store.js';


export default function SigninButton(props){

  const [{}, dispatchChallenges] = ChallengesConsumerHook()
  const [{}, dispatchUser] = UserConsumerHook();
  const [loading, setLoading] = useState(false);
  
  let pressSignin = () => {
    signin(
      (a) => setLoading(a), 
      (data) => {
        dispatchUser({
          type: 'SET_USER',
          newUser: data.user,
          newToken: data.token
        });
        props.navigation.navigate('Main Drawer');
      },
      props.login,
      props.password,
      dispatchChallenges
    )
    
  }

  return(    
    <Button
        title="Se connecter"
        onPress={() => {pressSignin()}}
        type={loading ? 'clear': undefined}
        loading={loading}
        disabled={loading}
    />
  );

}