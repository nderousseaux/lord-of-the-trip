import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import DrawerContent from './src/Components/Drawer/DrawerContent';
import Main from './src/Components/Main/Main';
import EditProfile from './src/Components/Stack/EditProfile';
import Connexion from './src/Components/Stack/Connexion';
import api from './src/api/api'
import {API_URL} from "@env"
import { Provider as PaperProvider } from 'react-native-paper';
console.disableYellowBox = true;

/* Exemple of how to connect the screens to Redux
let NewJsxSyntax = connect(state => ({ main: state.main }))(JsxComponent);
*/

console.log("api url : " + API_URL);

//Initialise axios
api.init(API_URL);

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

// Create and custom Tab navigator content
const TabNavigator = (props) => {
  return (
    <Main />
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
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Connexion">
            <Stack.Screen name="Connexion" component={Connexion} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={DrawerNavigator} options={{headerShown: false, headerLeft:null}}/>
            <Stack.Screen name="Edit Profile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
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