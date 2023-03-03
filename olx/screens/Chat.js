import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

const ChatApp = ({ navigation, route }) => {
  const [user, setUser] = useState(AsyncStorage.getItem('user'))
  const [username, setUsername] = useState(route.params?.username)
  const [receiver, setReceiver] = useState(route.params?.id)
  const [chatRoom, setChatRoom] = useState(null)

  navigation.setOptions({
    headerTitle: () => <Text style={{ fontSize: 23 }}>{username}</Text>,
  });


  const [socket, setSocket] = useState(null)
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  //For Saving into Database
  useEffect(() => {
    async function getChatRoom() {
      const userdata = await AsyncStorage.getItem('user');
      setUser(userdata)
      const a = await fetch('http://192.168.29.33:3000/createconversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ receiver: receiver, sender: user._z })
      })
      const b = await a.json();
      setChatRoom(b.id)
    }
    getChatRoom()
  }, [])


  //For Socket IO connection
  useEffect(() => {
    // establish a connection with the Socket.io server
    const newSocket = io('http://192.168.29.33:8000');
    setSocket(newSocket);

    // listen for incoming chat messages
    newSocket.on("connect", async () => {
      newSocket.send("Hello!");
      const user = await AsyncStorage.getItem('user');
      newSocket.emit('new-user-joined', user)
    });

    newSocket.on('getMessage', (message) => {
      console.log(receiver, message.from)
      if (receiver === message.from)
        setMessages(messages => [...messages, { message: message.msg, sender: message.from }])
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  //For Getting previous chats from database
  useEffect(() => {
    if (chatRoom) {
      console.log('chatroom found',chatRoom)
      async function getchats() {
        const a = await fetch('http://192.168.29.33:3000/getmessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ chatRoom:chatRoom })
        })
        const b = await a.json();
        console.log(b.messages);
        setMessages(b.messages)
      }
      getchats()
    }else{
      console.log('no chatroom found')
    }
  }, [chatRoom])


  const sendMessage = async () => {
    if (text.trim() !== '') {
      const user = await AsyncStorage.getItem('user');
      setMessages(messages => [...messages, { message: text, sender: user }]);
      console.log('ffffff', text)
      const a = await fetch('http://192.168.29.33:3000/savemessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text, sender: user, chatRoom: chatRoom })
      })
      const b = await a.json();
      if (b.success) console.log(b.success)
      else console.log(b.error)
      socket.emit('sendMessage', { msg: text, to: route.params?.id, from: user });
      setText('');
    }
  };


  //To scroll your flatlist at end when message changes
  const flatListRef = useRef();
  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        <FlatList
          ref={flatListRef}
          data={messages}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (
            <View style={item.sender === user ? styles.userMessage : styles.otherMessage}>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          placeholder="Type your message here..."
          value={text}
          onChangeText={(value) => setText(value)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => { sendMessage() }}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  },
  messages: {
    flex: 1,
  },
  userMessage: {
    backgroundColor: '#3498db',
    alignSelf: 'flex-end',
    maxWidth: '75%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  otherMessage: {
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
    maxWidth: '75%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    minHeight: 30
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatApp;
