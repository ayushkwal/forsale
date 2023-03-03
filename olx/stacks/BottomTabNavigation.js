import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import SellStack from './SellStack';
import ChatStack from './ChatStack';
import MyAds from '../screens/MyAds';
import ShowAd from '../screens/ShowAd';
import Account from '../screens/Account';
import HomeStack from './HomeStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();



const BottomTabNavigation = ({navigation}) => {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home')iconName = focused? 'home': 'home-outline';
          else if (route.name === 'Account')iconName = focused? 'ios-person': 'ios-person-outline';
          else if (route.name === 'Chat')iconName = focused? 'ios-chatbubbles': 'ios-chatbubbles-outline';
          else if (route.name === 'Sell')iconName = focused? 'ios-add': 'ios-add-outline';
          else if (route.name === 'MyAds')iconName = focused? 'ios-heart': 'ios-heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{headerShown:false}}/>
        <Tab.Screen name="Chat" component={ChatStack} options={{headerShown:false}}/>
        <Tab.Screen name="Sell" component={SellStack} options={{headerShown:false}}/>
        <Tab.Screen name="MyAds" component={MyAds} />
        <Tab.Screen name="Account" component={AccountStack} options={{headerShown:false}}/>
      </Tab.Navigator>
  );
}
export default BottomTabNavigation