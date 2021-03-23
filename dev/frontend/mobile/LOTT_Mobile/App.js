import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DrawerContent from './src/Components/Drawer/DrawerContent';
import SelectChallenge from './src/Components/Tab/SelectChallenge';
import GO from './src/Components/Tab/GO';
import EditProfile from './src/Components/Stack/EditProfile';
import api from './src/api/api'
import {API_URL} from "@env"
/* Exemple of how to connect the screens to Redux
let NewJsxSyntax = connect(state => ({ main: state.main }))(JsxComponent);
*/

//Initialise axios
api.init(API_URL)

// Create Reducer
function mainReducer(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  return state;
}

// Create Redux store
let store = createStore(combineReducers({ main: mainReducer }));

// Create needed navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create and custom Tab navigator content
const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Select Challenge':
              iconName = 'ios-list';
              break;
            case 'GO !':
              iconName = 'ios-navigate-outline';
              break;
            default:
              iconName = 'help';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}>
      <Tab.Screen name="Select Challenge" component={SelectChallenge} />
      <Tab.Screen name="GO !" component={GO} />
    </Tab.Navigator>
  );
}

// Create and custom Drawer
const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <DrawerContent { ...props} />}
      headerMode={'none'}
      initialRouteName={'Main Screen'}>
      <Drawer.Screen name="Main Screen" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={DrawerNavigator} options={{header: () => null}}/>
          <Stack.Screen name="Edit Profile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});