import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import ShowAd from '../screens/ShowAd';
import Sell from '../screens/Sell';
import IncludeSomeDetails from '../screens/IncludeSomeDetails'

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                
            }}
        >
            <Stack.Screen name="Sell" component={Sell} options={{headerTitle:'What are you offering?'}} />
            <Stack.Screen name="IncludeSomeDetails" component={IncludeSomeDetails} options={{headerTitle:'Include Some Details'}} />
        </Stack.Navigator>
    );
}
export default LoginStack