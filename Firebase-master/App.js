import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { firestore, collection, addDoc,MESSAGES, serverTimestamp, query, onSnapshot } from './Firebase/Config'
import { useState , useEffect} from 'react';
import { convertFirebaseTimeStampToJS } from './helpers/Function';
import { orderBy } from 'firebase/firestore';


export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const q = query(collection(firestore,MESSAGES),orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return() =>{
      unsubscribe()
    }
  }, [])

  const save = async() =>{
    const docRef = await addDoc(collection(firestore, MESSAGES), {
        text:newMessage,
        created: serverTimestamp()
    })
    setNewMessage('')
    console.log('message saved.')
  }

  return (
    <SafeAreaView style={styles.container}>
     <ScrollView >
      {
          messages.map((messages) => (
            <View style={styles.message} key={messages.id} >
              <Text style={styles.messageInfo}>{messages.created}</Text>
              <Text>{messages.text}</Text>
            </View>
          ))
      }
      
      </ScrollView>
      <View style={styles.SendContainer}>
      <TextInput style={styles.textInput} placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)} />
      <Button style={styles.button} title="Send" type="button" onPress={save} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   paddingTop: 50,
   flex: 1,
   backgroundColor: '#fff'
  },
  message:{
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo:{
    fontSize: 12
  },
  SendContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  textInput: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 8,
    width: 200,
  },
  button: {
    marginLeft: 8,
    borderRadius: 5,
  },
});

