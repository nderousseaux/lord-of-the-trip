import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ChallengeStack from 'navigation/ChallengeStack.jsx';
import DrawerContent from 'scenes/drawer/DrawerContent.jsx';


const Drawer = createDrawerNavigator()

export default function MainDrawer() {
  return (
    <Drawer.Navigator 
        drawerContent={(props) => <DrawerContent { ...props} />}
        headerMode={'none'}
        initialRouteName={'ChallengeStack'}>
      <Drawer.Screen name="ChallengeStack" component={ChallengeStack} />
    </Drawer.Navigator>
  )
}