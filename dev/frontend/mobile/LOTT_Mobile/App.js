import * as React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import { StatusBar } from 'react-native';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'

import { UserProvider } from 'store/user/User.store.js';
import { RunProvider } from 'store/run/Run.store.js';
import { ChallengesProvider } from 'store/challenges/Challenges.store.js';
import MainStack from 'navigation/MainStack.jsx';
import { AlertHelper } from 'helpers/AlertHelper';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

function App() {
  return (
    <RunProvider>
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
    </RunProvider>
  )
}

const ConnectedApp = connectActionSheet(App)

export default function AppContainer() {
  return(
    <ActionSheetProvider>
      <ConnectedApp/>
    </ActionSheetProvider>
  )
}