import * as React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Components/HomeScreen';
import MapScreen from '../Components/MapScreen';
import PodometerScreen from '../Components/PodometerScreen';
import connect from 'react-redux';

const Drawer = createDrawerNavigator();

let PodometerContainer = connect(state => ({ count: state.count }))(PodometerScreen);

export default function MainPage() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={({route}) => ({title: route.params.count})}/>
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Podometer" component={PodometerContainer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}