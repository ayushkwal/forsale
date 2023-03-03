import React, { useState, useEffect } from 'react';
import axios from 'axios'
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const ShowAd = ({ navigation, route }) => {
  const typer = route.params?.id;
  console.log(typer)
  const [product, setProduct] = useState(
    {
      // name: 'IPhone 13 Pro Max',
      // price: 300,
      // description: '96% Battery Health, Refurbished Mobile.',
      // image: 'https://cdn.pixabay.com/photo/2020/05/25/17/21/link-5219567__340.jpg',
      // location: 'AF School Staff Quarters, Car Nic...',
      // date: '24 June 2022',
      // details: [
      //   { title: 'Brand', value: 'IPhone' },
      //   { title: 'Model', value: '13 Pro Max' },
      //   { title: 'Color', value: 'Silver' },
      //   { title: 'Storage', value: '256GB' },
      //   { title: 'Condition', value: 'Refurbished' }
      // ]
    }
  );
  useEffect(() => {
    async function getData() {
      const a = await fetch(`http://192.168.29.33:3000/ad/${typer}`, {
        method: 'get'
      });
      const b = await a.json();
      setProduct(b.ads[0])
    }
    getData()
  }, [])


  const chatUser = ({ _id, username }) => {
    navigation.navigate('Chat', {
      screen: 'Chat',
      params: {
        id:_id, username
      }
    })
  }
  const likeAd = async()=>{
    const a = await fetch(`http://192.168.29.33:3000/likead/${product._id}`, {
        method: 'get'
      });
      const b = await a.json();

  }
  return (
    <>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            <Ionicons name="heart-outline" size={30} color="gray" onPress={()=>{likeAd()}}/>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={15} />
            <Text style={styles.location}>{product.location}</Text>
            {/* <Text style={styles.date}>{moment(Date(product.date * 1000)).fromNow()}</Text> */}
            <Text style={styles.date}>{product.date}</Text>
          </View>
          <Text style={styles.detailsTitle}>Details: </Text>
          <FlatList
            data={product.details}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <View style={styles.detail}>
                <Text style={styles.detailTitle}>{Object.keys(item)[0]}:</Text>
                <Text style={styles.detailValue}>{Object.values(item)[0]}</Text>
              </View>
            )}
          />
          <Text style={styles.detailsTitle}>Description:</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.detailsTitle}>Posted By:</Text>
          <Text style={styles.postedby}> {product.sellingBy?.username} </Text>
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => chatUser(product.sellingBy)} style={styles.btnStyle}><Text>Chat</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} onPress={() => chatUser(product.sellingBy)}><Text>Make Offer</Text></TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    height: "70%"
  },
  imageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9'
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  },
  detailsContainer: {
    padding: 20,
    fontSize: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  fav: {
    fontSize: 24
  },
  description: {
    fontSize: 16,
    marginBottom: 10
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  locationIcon: {
    fontSize: 24,
    marginRight: 5
  },
  location: {
    fontSize: 13,
    marginRight: 10
  },
  date: {
    fontSize: 16,
    color: 'gray'
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 5
  },
  detailTitle: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 20
  },
  detailValue: {
    color: 'gray',
    fontSize: 20
  },
  buttons: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
  },
  btnStyle: {
    padding: 15,
    width: '43%',
    backgroundColor: '#3498db',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#3498db',
    fontWeight: 400,
  },
  postedby: {
    fontSize: 25,
    padding: 20
  }
});

export default ShowAd