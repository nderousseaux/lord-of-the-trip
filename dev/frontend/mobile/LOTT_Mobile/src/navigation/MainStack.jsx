import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import EditProfile from 'scenes/drawer/EditProfile.jsx'
import Signin from 'scenes/login/signin/Signin.jsx';
import Signup from 'scenes/login/signup/Signup.jsx';
import ChallengeStack from 'navigation/ChallengeStack.jsx';


const Stack = createStackNavigator();

export default function MainStack() {
  return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
          <Stack.Screen name='Main Drawer' component={ChallengeStack} options={{headerShown: false}} />
          <Stack.Screen name="Edit Profile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

