import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ToChatWith = ({navigation}) => {


    const [userList, setUserList] = useState([]);
    useEffect(()=>{
        async function getData(){
            const user = await AsyncStorage.getItem('user')
            const a = await fetch('http://192.168.29.33:3000/getchatrooms',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({user:user}) 
            })
            const b = await a.json();
            console.log(b.chatlist)
            setUserList(b.chatlist)
        }
        getData()
    },[])
    return (
        <>
            <FlatList
                data={userList}
                keyExtractor={(item) => item.receiver?._id||item.sender?._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>{navigation.navigate('Chat',{id:item.receiver?._id||item.sender?._id,username:item.receiver?.username||item.sender?.username||'Myself(you)'})}}>
                    <View style={styles.container}>
                       
                        <Ionicons name='person-circle-outline' size={40} color='gray' />
                        <Text style={styles.name}> {item.receiver?.username||item.sender?.username||'Myself(you)'}</Text>
                    </View>
                    </TouchableOpacity>
                )}
            />
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomColor:'#f2f2f2',
        borderTopColor:'#f2f2f2',
        borderWidth:1,
        marginBottom:1,
        marginTop:1,
        borderRadius:7,
        paddingBottom:15,
        backgroundColor:'#fff'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 22,
        color:'#3498db'
    },
});

export default ToChatWith;
