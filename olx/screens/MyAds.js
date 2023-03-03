import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, FlatList, Text, Image, TextInput, TouchableOpacity, StyleSheet,RefreshControl, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native';
import { AsyncStorage } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const MyAds = ({ navigation }) => {
  const [ads, setAds] = useState([])
  const [r,setR] = useState('')

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Add your refresh logic here
    setRefreshing(true);

    // Simulate a delay before refreshing
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    async function getad()
    {
      const user = await AsyncStorage.getItem('user')
      const a =await fetch(`http://192.168.29.33:3000/myads/${user}`, {
        method: 'get'
      });
      const b =await a.json();
      console.log(typeof(b[0]))
      console.log(b.ads)
      setAds([...b.ads])
    }
    getad()
  }, [])
  return (
    <View>
      {ads.length>0?
      <FlatList
       
        keyExtractor={(key) => key.id}
        numColumns={2}
        data={ads}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('ShowAd',{id:item._id}) }}>
            <View style={styles.detailsContainer}>

              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />:
      <Text style={{color:'crimson',fontSize:25,textAlign:'center',justifyContent:'center',alignItems:'center'}}>No Ads Yet</Text>
      }
    </View>


  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    width: '45%',
    marginLeft: '3.3%',
    borderColor: 'gray',
    marginBottom: 5

  },
  image: {
    width: '100%',
    height: 120,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
});
export default MyAds