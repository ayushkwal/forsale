import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const EditProfile = ({ navigation, route }) => {
  const currentUser = route.params.user
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address)
  const [pincode, setPincode] = useState(currentUser.pincode)
  const [bio, setBio] = useState(currentUser.bio)
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status,setStatus] = useState('')

  const handleUpdateProfile = async () => {
    if(newPassword!=confirmPassword){
      setStatus('Confirm Passwords')
      return;
    }
    const userid = await AsyncStorage.getItem('user')
    const obj = {name:displayName,username,email,phone,address,pincode,bio,password,newPassword,id:userid};
    const filteredObj = Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== '')
    );
    const a = await fetch('http://192.168.29.33:3000/editprofile',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(filteredObj)
    })
    const b = await a.json();
    setStatus(b.status)
    if(b.status==='success'){
      setTimeout(()=>{
        navigation.goBack();
      },2000)
    }else{
    setStatus(b.status)
    }
  };


  return (
    <ScrollView style={{paddingVertical:20,paddingBottom:20}}>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Change Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Change Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Change Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Change Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Change Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Change Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
      />
      <Text style={{color:'#2196F3',fontSize:18,marginBottom:3}}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <Text style={{color:'crimson',fontSize:18,marginBottom:5}}>{status}</Text>
      <Button title="Save Changes" onPress={handleUpdateProfile} />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default EditProfile;
