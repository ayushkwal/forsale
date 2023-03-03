import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ToChatWith from '../screens/ToChatWith';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();

const ChatStack = ({navigation}) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor:'#f2f2f2'
                }
            }}
        >
            <Stack.Screen name="ToChatWith" component={ToChatWith} options={{headerTitle:'Chats',headerLeft:null}} />
            <Stack.Screen name="Chat" component={Chat} options={{headerTitle:'Ayush', headerLeft: () => <Ionicons name='chevron-back-outline' size={30} color='black' onPress={() => {navigation.navigate('ToChatWith')}} />,}} />
        </Stack.Navigator>
    );
}
export default ChatStack