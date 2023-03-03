import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AsyncStorage } from 'react-native';
import BottomTabNavigation from '../stacks/BottomTabNavigation';
import { CommonActions} from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';


const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] =useState({})

 
  const handleLogin = (e) => {
    // Handle login logic
    console.log('clicked login');
        e.preventDefault()
        if(email==''||password==''){
          setError({email:'Enter all the details'})
          return;
        }
        async function signup() {
            try {
                const a = await fetch('http://192.168.29.33:3000/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                const b = await a.json();
                if (b.error) {
                    console.log('error occured',b.error)
                    setError(b.error)
                } else {
                    console.log('user created',b,typeof(b))
                    await AsyncStorage.setItem('user', b._id);
                    await navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'BottomTabNavigation'
                          }
                        ]
                      })
                    );
                    navigation.navigate('Home')

                }
            }
            catch (err) {
                console.log('facing error', err)
            }

        }
        signup();

  }

  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
    <View style={styles.container}>
      <Text style={styles.logo}>ForSale</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Text style={{color:'gray',fontSize:16,margin:12}}>{error.email} {error.password}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.haveaccount} onPress={()=>{navigation.navigate('Signup')}}>Don't have an account. Signup Now</Text>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 70,
    color: 'crimson',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    border: 3,
    borderColor: 'gray'
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    backgroundColor: 'crimson',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  haveaccount:{
    color:'#3498db',
    fontSize:16,
    marginTop:8
  }
});

export default Login;
