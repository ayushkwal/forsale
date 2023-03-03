import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginStack from './LoginStack'
import BottomTabNavigation from './BottomTabNavigation'

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerLeft:null,
        headerShown:false
      }}
      >
        <Stack.Screen name="LoginStack" component={LoginStack} />
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
export default RootStack