import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Sell = ({navigation}) => {
  console.log(navigation.getState().routes)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('IncludeSomeDetails', { type: 'car' })}}>
        <Ionicons name='car-outline' size={100} />
        <Text>Cars</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('IncludeSomeDetails', { type: 'properties' })}}>
        <Ionicons name='ios-home-outline' size={100} />
        <Text>Properties</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('IncludeSomeDetails', { type: 'mobiles' })}}>
        <Ionicons name='md-call' size={100} />
        <Text>Mobiles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('IncludeSomeDetails', { type: 'jobs' })}}>
        <Ionicons name='car-outline' size={100} />
        <Text>Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('IncludeSomeDetails', { type: 'bikes' })}}>
        <Ionicons name='ios-bicycle-outline' size={100} />
        <Text>Bikes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('IncludeSomeDetails', { type: 'electronics' })}}>
        <Ionicons name='ios-laptop-outline' size={100} />
        <Text>Electronic/Appliances</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('IncludeSomeDetails', { type: 'others' })}}>
      <Ionicons name='ios-list-outline' size={100} />
        <Text>Other Category</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200
  },
});
export default Sell