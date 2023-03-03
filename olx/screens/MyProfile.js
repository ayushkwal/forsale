import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity,AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MyProfile = ({navigation}) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    async function getDetails(){
      const user = await AsyncStorage.getItem('user');
      const a = await fetch(`http://192.168.29.33:3000/user/${user}`, {
        method: 'get'
      });
      const b = await a.json();
      console.log(b)
      setUser(b)
    }
    getDetails()
  },[])

  return (
    <View style={styles.container}>
      
       <Ionicons name='person-circle-outline' size={80} color='gray' />
                       
      <Text style={styles.name}>Full Name: {user.username}</Text>
      <Text style={styles.name}>Email: {user.email}</Text>
      <Text style={styles.bio}>Bio: {user.bio}</Text>
      <Text style={styles.bio}>Phone Number: {user.phone}</Text>
      <Text style={styles.bio}>Address: {user.address}</Text>
      <Text style={styles.bio}>Pincode: {user.pincode}</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image
              style={styles.postImage}
              source={{ uri: item.imageUrl }}
            />
            <Text style={styles.postCaption}>{item.caption}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('EditProfile',{user})}}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 70,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
    color:'crimson'
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor:'#fff'
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postCaption: {
    fontSize: 16,
    marginTop: 10,
  },
  heading:{
    borderTopColor:'gray',
    borderTopWidth:6,
    width:'100%',
    textAlign:'center',
    paddingTop:17,
    fontSize:20,
    color:'crimson'
  },
  button: {
    backgroundColor: 'crimson',
    padding: 10,
    width:'85%',
    borderRadius: 5,
    marginTop:20,
    marginBottom:20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default MyProfile;
