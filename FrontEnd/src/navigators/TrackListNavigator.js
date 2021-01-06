import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
 
import TrackDetailsScreen from '../Screens/TrackDetailsScreen';
import TrackListScreen from '../Screens/TrackListScreen';
 
const Stack = createStackNavigator();
 
export default function TrackListNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen 
                name='TrackList'
                component={TrackListScreen}
            />
            <Stack.Screen 
                name='TrackDetails'
                component={TrackDetailsScreen}
            />
        </Stack.Navigator>
    );
};