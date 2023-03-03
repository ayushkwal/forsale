import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import ShowAd from '../screens/ShowAd';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
            }}
        >
            <Stack.Screen name="Homepage" component={Home} />
            <Stack.Screen name="ShowAd" component={ShowAd} />
        </Stack.Navigator>
    );
}
export default LoginStack