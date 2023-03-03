import React from 'react'
import { StyleSheet} from 'react-native';
import RootStack from './stacks/RootStack';




export default function App() {
  return(
    <RootStack />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
