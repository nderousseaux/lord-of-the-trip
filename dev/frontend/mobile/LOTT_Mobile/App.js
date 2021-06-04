import * as React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { StatusBar } from 'react-native';

import { UserProvider } from 'store/user/User.store.js';
import { ChallengesProvider } from 'store/challenges/Challenges.store.js';
import MainStack from 'navigation/MainStack.jsx';
import { AlertHelper } from 'helpers/AlertHelper';


export default function App() {
  return (
    <ChallengesProvider>
      <UserProvider> 
        <MainStack/>
        <DropdownAlert
            defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
            ref={ref => AlertHelper.setDropDown(ref)}
            onClose={() => AlertHelper.invokeOnClose()}
          />
      </UserProvider>
    </ChallengesProvider>
  )
}