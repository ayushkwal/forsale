import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyProfile from '../screens/MyProfile';
import EditProfile from '../screens/EditProfile';

const Stack = createStackNavigator();

const AccountStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                
            }}
        >
            <Stack.Screen name="MyProfile" component={MyProfile} options={{headerTitle:'Account'}} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{headerTitle:'Edit Profile'}} />
        </Stack.Navigator>
    );
}
export default AccountStack