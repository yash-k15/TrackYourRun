import React, { useContext, useEffect } from 'react';
//import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, createTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AccountScreen from './src/Screens/AccountScreen';
import SigninScreen from './src/Screens/SigninScreen';
import SignupScreen from './src/Screens/SignupScreen';
//import TrackListScreen from './src/Screens/TrackListScreen';
import TrackCreateScreen from './src/Screens/TrackCreateScreen';
//import TrackDetailsScreen from './src/Screens/TrackDetailsScreen';
import { Provider as AuthProvider, Context as AuthContext} from './src/Context/AuthContext';
import TrackListNavigator from './src/navigators/TrackListNavigator';
import { Provider as LocationProvider } from './src/Context/LocationContext';
import { Provider as TrackProvider } from './src/Context/TrackContext';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const switchNavigator = createSwitchNavigator({
//   loginFlow: createStackNavigator({
//     Signup: SignupScreen,
//     Signin: SigninScreen
//   }),

//   mainFlow: createBottomTabNavigator({
//     trackListFlow: createStackNavigator({
//       TrackList: TrackListScreen,
//       TrackDetails: TrackDetailsScreen
//     }),
//     TrackCreate: TrackCreateScreen,
//     Account: AccountScreen
//   })
// })

const App = () => {
  const { state, tryLocalSignin } = useContext(AuthContext); 

  useEffect(() => {
    tryLocalSignin();
}, [state.token])
 
  return (
    <NavigationContainer theme={MyTheme}>
      {state.token != null ? (
        <Tab.Navigator initialRouteName='TrackListNavigator' >
          <Tab.Screen
            name="TrackList"
            component={TrackListNavigator}
            options={{
              tabBarLabel: 'Tracks',
              tabBarIcon: ({color, size}) => ( <FontAwesome name='list-ul' olor={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="TrackCreate"
            component={TrackCreateScreen}
            options={{
              tabBarLabel: 'Add Track',
              tabBarIcon: ({color, size}) => ( <FontAwesome name='plus' olor={color} size={size} />)
            }}
          />
          <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({color, size}) => ( <FontAwesome name='gear' olor={color} size={size} />)
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
          initialRouteName='SignUp'
        >
          <Stack.Screen
            name="SignIn"
            component={SigninScreen}
          />
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

Tab.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};
 
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff'
  }
};

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}