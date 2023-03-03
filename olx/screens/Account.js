import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Image } from 'react-native';

const Account = () => {
  const [name, setName] = useState('Ayush Khandelwal');
  const [username, setUsername] = useState('ayushkwal');
  const [bio, setBio] = useState('A very good Software Developer');
  const [phone, setPhone] = useState('9953807994');
  const [image, setImage] = useState('https://cdn.pixabay.com/photo/2020/05/25/17/21/link-5219567__340.jpg');

  const handleSave = () => {
    console.log(name,username,bio,phone,image)
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Set Profile"
        value={image}
        onChangeText={setImage}
        style={[styles.input, styles.bioInput]}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={bio}
        onChangeText={setBio}
        style={[styles.input, styles.bioInput]}
        multiline
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={[styles.input, styles.bioInput]}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 18,
  },
  bioInput: {
    height: 80,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Account;
