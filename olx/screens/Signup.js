import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState({})

    useEffect(() => {
        async function checkUser() {
            const user = await AsyncStorage.getItem('user');
            if (user) navigation.navigate('Home', { email: user })
        }
        checkUser()
    }, [])

    const handleSignup = (e) => {
        // Handle signup logic
        console.log('clicked sign');
        e.preventDefault()
        async function signup() {
            try {
                const a = await fetch('http://192.168.29.33:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password,username })
                })
                const b = await a.json();
                if (b.error) {
                    console.log('error occured')
                    setError(b.error)
                } else {
                    console.log('user created')
                    navigation.navigate('Login')

                }
            }
            catch (err) {
                console.log('facing error', err)
            }

        }
        signup();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>ForSale</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setUsername(text)}
                />
            </View>
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
            <Text style={{ color: 'gray', fontSize: 16, margin: 12 }}>{error.email} {error.password} {error.username}</Text>
            <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
                <Text style={styles.signupText}>Signup</Text>
            </TouchableOpacity>
            <Text style={styles.haveaccount} onPress={() => { navigation.navigate('Login') }}>Already have an account. Login Now</Text>
        </View>
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
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
        backgroundColor:'#f2f2f2'
    },
    inputText: {
        height: 50,
        color: 'black',
    },
    signupBtn: {
        backgroundColor: 'crimson',
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    signupText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    haveaccount: {
        color: '#3498db',
        fontSize: 16,
        marginTop: 8
    }
});

export default Signup;
