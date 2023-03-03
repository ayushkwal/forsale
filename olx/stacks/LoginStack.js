import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from '../screens/Signup'
import Login from '../screens/Login'

const Stack = createStackNavigator();

const LoginStack = ()=>{
    return (
        <Stack.Navigator
      screenOptions={{
        headerLeft:null,
        headerShown:false
      }}
      >
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      );
}
export default LoginStack